package edu.gatech.omscs.cs6440.health_disparities.data.maps;

import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.model.AddressType;
import com.google.maps.model.GeocodingResult;
import com.google.maps.model.LatLng;
import edu.gatech.omscs.cs6440.health_disparities.data.model.maps.UserAddress;
import edu.gatech.omscs.cs6440.health_disparities.data.model.maps.UserLocationData;

import java.util.ArrayList;
import java.util.List;

/**
 * Address geocoding singleton class.
 *
 * @author awelton3
 */
public class AddressGeocoder {

    private static final String GOOGLE_MAPS_API_KEY = "AIzaSyB0XgNv_xuQFF77kYam2oLALQNcX9hAq_U";
    private static final GeoApiContext GEO_API_CONTEXT = new GeoApiContext().setApiKey(GOOGLE_MAPS_API_KEY);

    /**
     * Geocode an address and get the user location data
     * @param address the address
     * @return the user location data
     */
    public static UserLocationData geocode(UserAddress address) throws Exception {
        GeocodingResult[] geocodingResults = GeocodingApi.geocode(GEO_API_CONTEXT, address.getAddressText()).await();
        return convertGeocodingResultsToUserLocationData(geocodingResults);
    }

    /**
     * Reverse geocode a set of coordinates and get the user location data
     * @param latLng the LatLng object
     * @return the user location data
     */
    public static UserLocationData reverseGeocode(LatLng latLng) throws Exception {
        GeocodingResult[] geocodingResults = GeocodingApi.reverseGeocode(GEO_API_CONTEXT, latLng).await();
        return convertGeocodingResultsToUserLocationData(geocodingResults);
    }

    /**
     * Convert the geocoding results to the UserLocationData format
     * @param geocodingResults the geocoding results
     * @return the user location data
     */
    private static UserLocationData convertGeocodingResultsToUserLocationData(GeocodingResult[] geocodingResults) {
        if (geocodingResults == null || geocodingResults.length < 1) {
            return new UserLocationData();
        }

        GeocodingResult firstResult = geocodingResults[0];

        UserLocationData locationData = new UserLocationData();
        if (firstResult.formattedAddress != null) {
            locationData.setAddressText(firstResult.formattedAddress);
        }
        if (firstResult.geometry != null && firstResult.geometry.location != null) {
            locationData.setLatLng(firstResult.geometry.location);
        }
        if (firstResult.placeId != null) {
            locationData.setPlaceId(firstResult.placeId);
        }
        if (firstResult.types != null) {
            List<String> typeList = new ArrayList<>();
            for (AddressType addressType : firstResult.types) {
                typeList.add(addressType.toString());
            }
            locationData.setTypes(typeList);
        }
        return locationData;
    }

}
