/*
 CS 6440 Team Radio Star
 */

var map = null;
var userLocation = null;
var userMarker = null;
var mapBounds = null;

var placesService = null;
var placeInfoWindow = null;

var directionsService = null;
var directionsDisplay = null;
var destinationAddress = null;

/**
 * Initial setup for Google map
 */
function setUpGoogleMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 39.5, lng: -98.35},                        // Center of contiguous US
        scrollwheel: false,
        zoom: 3
    });

    placesService = new google.maps.places.PlacesService(map);
    placeInfoWindow = new google.maps.InfoWindow();
    google.maps.event.addListener(map, "click", function () {
        if (placeInfoWindow != null) {
            placeInfoWindow.close();
        }
    });
    directionsService = new google.maps.DirectionsService();
    mapBounds = new google.maps.LatLngBounds();
}

/**
 * Center the map on a user location
 * @param latLng the LatLng of the user location
 */
function centerMapOnUserLocation(latLng) {
    if (latLng == null) {
        return;
    }

    userLocation = latLng;
    if (map != null) {
        map.setCenter(latLng);
        map.setZoom(12);

        userMarker = new google.maps.Marker({
            position: latLng,
            map: map,
            title: "Your location"
        });
    }
}

/**
 * Get and show the providers for a list of symptoms
 * @param symptomList the symptom list
 */
function queryAndShowProvidersForSymptoms(symptomList) {
    var providersUrl = API_URL_PREFIX + "/providers";

    $.ajax({
        type: "POST",
        url: providersUrl,
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(symptomList),
        statusCode: {
            200: function (response) {
                searchProvidersInGoogleMap(response);
            }
        },
        error: function () {
            handleProvidersQueryError();
        }
    });
}

/**
 * Search the list of providers in the Google map
 * @param providerList the provider list
 */
function searchProvidersInGoogleMap(providerList) {
    if (providerList == null || providerList["providers"] == null) {
        return;
    }

    if (userMarker != null) {
        userMarker.setVisible(true);
    }

    var providers = providerList["providers"];
    if (providers.length < 1) {
        return;
    }

    var request = {
        location: userLocation,
        radius: 2000,
        keyword: providers[0].toLowerCase(),
        types: ["hospital", "health", "doctor"]
    };

    placesService.nearbySearch(request, placeSearchCallback);
}

/**
 * Callback to handle completed places search
 * Adapted from example at https://developers.google.com/maps/documentation/javascript/places#place_searches
 * @param results the place results
 * @param status the API call status
 */
function placeSearchCallback(results, status) {
    if (directionsDisplay != null) {
        directionsDisplay.setMap(null);
    }

    if (status !== google.maps.places.PlacesServiceStatus.OK) {
        console.error(status);
        return;
    }

    mapBounds = new google.maps.LatLngBounds();
    var firstMarker = null;
    for (var i = 0, result; result = results[i]; i++) {
        var currentMarker = addPlaceMarkerToMap(result);
        if (i == 0) {
            firstMarker = currentMarker;
        }
    }

    if (results.length > 0) {
        map.fitBounds(mapBounds);
        showPlaceDetails(results[0], firstMarker);
    }
}

/**
 * Add a place marker to the map and show place details on click
 * Adapted from example at: https://developers.google.com/maps/documentation/javascript/places#place_searches
 * @param place the place to add a marker for
 * @returns {google.maps.Marker} the marker for the place
 */
function addPlaceMarkerToMap(place) {
    if (map == null || placeInfoWindow == null || placesService == null) {
        return;
    }

    // Extend map bounds for place
    mapBounds.extend(place.geometry.location);

    // Add the marker to the map
    var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location,
        icon: {
            url: 'http://maps.gstatic.com/mapfiles/circle.png',
            anchor: new google.maps.Point(10, 10),
            scaledSize: new google.maps.Size(10, 17)
        }
    });

    // Add a listener to show place details on marker click
    google.maps.event.addListener(marker, 'click', function () {
        showPlaceDetails(place, marker);
    });

    return marker;
}

/**
 * Show a given place's details in the map
 * @param place the place
 * @param marker the marker
 */
function showPlaceDetails(place, marker) {
    placesService.getDetails(place, function (result, status) {
        if (status !== google.maps.places.PlacesServiceStatus.OK) {
            console.error(status);
            return;
        }
        placeInfoWindow.setContent(createPlaceInfoWindowContent(result));
        placeInfoWindow.open(map, marker);
    });
}

/**
 * Create the content for the place info window in the google map
 * @param placeResult the place result
 */
function createPlaceInfoWindowContent(placeResult) {
    var infoWindowHtml = "<div class=\"place-info\">";
    infoWindowHtml = infoWindowHtml + "<b>" + placeResult.name + "</b><br>";
    if (placeResult.formatted_phone_number != null && placeResult.international_phone_number != null) {
        infoWindowHtml = infoWindowHtml + createPhoneNumberLink(placeResult.international_phone_number, placeResult.formatted_phone_number) + "<br>";
    }
    if (placeResult.website != null) {
        infoWindowHtml = infoWindowHtml + createWebsiteLink(placeResult.website) + "<br>";
    }

    if (placeResult.opening_hours != null) {

        if (placeResult.opening_hours.open_now == true) {
            infoWindowHtml = infoWindowHtml + "<span style= \"color:green;\">Currently Open </span><br>";
        } else {
            infoWindowHtml = infoWindowHtml + "<span style= \"color:red;\">Currently Closed </span><br>";
        }
    } else {
        infoWindowHtml = infoWindowHtml + "Call to confirm if open <br>";
    }

    if (userLocation != null && placeResult.formatted_address != null) {
        infoWindowHtml = infoWindowHtml + "Address: " + placeResult.formatted_address + "<br>";
        infoWindowHtml = infoWindowHtml + createDirectionsLink(placeResult.formatted_address);
    }
    infoWindowHtml = infoWindowHtml + "</div>";
    return infoWindowHtml;
}

/**
 * Create a phone number link, given the phone number
 * @param internationalPhoneNumber the international phone number
 * @param formattedPhoneNumber the locale-formatted phone number
 * @returns {string} the phone number link HTML
 */
function createPhoneNumberLink(internationalPhoneNumber, formattedPhoneNumber) {
    var fixedInternational = internationalPhoneNumber.split(' ').join('-');
    var phoneLinkHref = "tel:" + fixedInternational;
    var phoneLink = "<a href=\"" + phoneLinkHref + "\">" + formattedPhoneNumber + "</a>";
    return "Phone: " + phoneLink;
}

/**
 * Create a website link, given the website url
 * @param website the website url
 * @returns {string} the website link HTML
 */
function createWebsiteLink(website) {
    var webLink = "<a href=\"" + website + "\">" + website + "</a>";
    return "Website: " + webLink;
}

/**
 * Create a directions link from a location to an address
 * @param toAddress the destination address
 * @returns {string} the directions link HTML
 */
function createDirectionsLink(toAddress) {
    destinationAddress = toAddress;
    var directionsLinkHtml = "<div class=\"place-info-button-group\">Directions:<br>";

    // Button to view in current map
    var inAppDirectionsButton = "<button class=\"btn btn-primary btn-sm place-info-button\" type=\"button\" onclick=\"displayCurrentDirectionsInMap();\">Show in map</button>";
    directionsLinkHtml = directionsLinkHtml + inAppDirectionsButton;

    // Button to open in external map app
    directionsLinkHtml = directionsLinkHtml + createExternalDirectionsLink(toAddress);

    directionsLinkHtml = directionsLinkHtml + "</div>";
    return directionsLinkHtml;
}

/**
 * Display the directions for the current location and destination in the map
 */
function displayCurrentDirectionsInMap() {
    if (userLocation != null && destinationAddress != null) {
        displayDirectionsInMap(userLocation, destinationAddress);
    }
}

/**
 * Display the directions in the map
 * @param fromLocation the start location
 * @param toAddress the destination address
 */
function displayDirectionsInMap(fromLocation, toAddress) {
    if (userMarker != null) {
        userMarker.setVisible(false);
    }

    if (directionsDisplay == null) {
        directionsDisplay = new google.maps.DirectionsRenderer({
            markerOptions: {
                clickable: false
            }
        });
        directionsDisplay.setMap(map);
    }

    var directionsRequest = {
        origin: fromLocation,
        destination: toAddress,
        travelMode: 'DRIVING'
    };
    directionsService.route(directionsRequest, function (result, status) {
        if (status == 'OK') {
            directionsDisplay.setDirections(result);
        }
    });
}

/**
 * Create a directions link to open in user default map application
 * @param toAddress the destination address
 * @returns {string} the directions link HTML
 */
function createExternalDirectionsLink(toAddress) {
    var encodedAddress = encodeURIComponent(toAddress);
    var mapLinkHref = "http://maps.apple.com/?daddr=" + encodedAddress;
    return "<a class=\"btn btn-primary btn-sm place-info-button\" href=\"" + mapLinkHref + "\" role=\"button\">Open in app</a>";
}

/**
 * Handle the providers query error
 */
function handleProvidersQueryError() {
    console.log("Providers error");
}
