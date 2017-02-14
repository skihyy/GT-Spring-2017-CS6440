/*
 CS 6440 Team Radio Star
 */

/**
 * Top level method to set up the symptom picker
 */
function setUpSymptomPicker() {
    loadSymptomsAndPopulateTypeahead();
    setUpSymptomPickerEvents();
    setTimeout(function() {
        requestAndDisplayUserLocation();
    }, 1000);
}

var cachedSymptomList = null;
var selectedSymptoms = [];

/**
 * Set up the events associated with the symptom picker, e.g. buttons
 */
function setUpSymptomPickerEvents() {
    $("#symptomsClearButton").click(function() {
        clearSymptomList();
    });
    $("#symptomsSearchButton").click(function() {
        queryAndShowProvidersForSymptoms(constructSymptomListFromSelectedSymptoms());
    })
}

/**
 * Construct a SymptomList object from the selected symptoms
 */
function constructSymptomListFromSelectedSymptoms() {
    return {
        symptoms: selectedSymptoms
    };
}

/**
 * Load the symptoms from the API and populate the typeahead
 */
function loadSymptomsAndPopulateTypeahead() {
    var symptomsUrl = API_URL_PREFIX + "/symptoms";

    $.ajax({
        type: "GET",
        url: symptomsUrl,
        contentType: "application/json",
        statusCode: {
            200: function(response) {
                cachedSymptomList = response;
                populateSymptomsTypeahead(cachedSymptomList);
            }
        },
        error: function() {
            handleSymptomsTypeaheadError();
        }
    });
}

/**
 * Populate the symptoms typeahead with the symptoms list data
 * @param symptomsList the symptoms list data
 */
function populateSymptomsTypeahead(symptomsList) {
    if (symptomsList != null && symptomsList["symptoms"] != null) {
        var symptomTypeahead = $("#symptomTypeaheadInput");
        symptomTypeahead.typeahead({
            source: symptomsList["symptoms"],
            minLength: 0,
            showHintOnFocus: true,
            items: "all",
            afterSelect: onSymptomSelected
        });
    }
}

/**
 * Populate the symptoms typeahead using the cached symptom list
 */
function populateSymptomsTypeaheadFromCachedSymptoms() {
    if (cachedSymptomList == null) {
        loadSymptomsAndPopulateTypeahead();
    } else {
        populateSymptomsTypeahead(cachedSymptomList);
    }
}

/**
 * Clear the symptom list and load full list of symptoms again
 */
function clearSymptomList() {
    selectedSymptoms = [];
    $("#symptomList").empty();
    resetSymptomsTypeahead();
    loadSymptomsAndPopulateTypeahead();
}

/**
 * Add the symptom to the chosen symptom list, and remove from typeahead
 * @param symptom the symptom
 */
function onSymptomSelected(symptom) {
    if (jQuery.inArray(symptom, selectedSymptoms) > 0) {
        return;
    }

    selectedSymptoms.push(symptom);
    var symptomList = $("#symptomList");
    symptomList.append("<li class=\"symptom-list-item\">" + symptom + "</li>");

    removeSymptomFromCachedSymptomList(symptom);
    resetSymptomsTypeahead();
    populateSymptomsTypeaheadFromCachedSymptoms();
}

/**
 * Remove a symptom from the cached symptom list
 * @param symptom the symptom
 */
function removeSymptomFromCachedSymptomList(symptom) {
    if (cachedSymptomList != null && cachedSymptomList["symptoms"] != null) {
        var symptomIndex = jQuery.inArray(symptom, cachedSymptomList["symptoms"]);
        if (symptomIndex >= 0) {
            cachedSymptomList["symptoms"].splice(symptomIndex, 1);
        }
    }
}

/**
 * Reset the symptoms typeahead input
 */
function resetSymptomsTypeahead() {
    $(".typeahead").typeahead("destroy");
    var typeaheadContainer = $("#symptomTypeaheadContainer");
    typeaheadContainer.empty();
    typeaheadContainer.html("<input id=\"symptomTypeaheadInput\" type=\"text\" data-provide=\"typeahead\" autocomplete=\"off\" placeholder=\" Enter symptom\" />");
}

/**
 * Request and display the user location
 */
function requestAndDisplayUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayUserLocation);
    } else {
        displayLocationUnavailable();
    }
}

/**
 * Display that the location is unavailable
 */
function displayLocationUnavailable() {
    var userLocationContainer = $("#userLocationContainer");
    userLocationContainer.empty();
    userLocationContainer.html("Location unavailable. Please reload the page and share your location when prompted.");
}

/**
 * Display the user location
 * @param location
 */
function displayUserLocation(location) {
    var latLng = new google.maps.LatLng(location.coords.latitude, location.coords.longitude);
    centerMapOnUserLocation(latLng);

    var reverseGeocodeUrl = API_URL_PREFIX + "/maps/reverse_geocode";

    $.ajax({
        type: "POST",
        url: reverseGeocodeUrl,
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(latLng),
        statusCode: {
            200: function(response) {
                if (response != null && response["address_text"] != null) {
                    displayUserAddress(response["address_text"]);
                }
            }
        },
        error: function() {
            handleReverseGeocodeError();
        }
    });
}

/**
 * Display the user address
 * @param address the address
 */
function displayUserAddress(address) {
    var userLocationContainer = $("#userLocationContainer");
    userLocationContainer.empty();
    userLocationContainer.html(address);
}

/**
 * Handle a symptoms typeahead error
 */
function handleSymptomsTypeaheadError() {
    console.log("Symptoms error");
}

/**
 * Handle a reverse geocode error
 */
function handleReverseGeocodeError() {
    console.log("Reverse geocode error");
}
