package edu.gatech.omscs.cs6440.health_disparities.rest;

import com.google.maps.model.LatLng;
import edu.gatech.omscs.cs6440.health_disparities.data.maps.AddressGeocoder;
import edu.gatech.omscs.cs6440.health_disparities.data.model.maps.UserAddress;
import edu.gatech.omscs.cs6440.health_disparities.data.model.maps.UserLocationData;
import edu.gatech.omscs.cs6440.health_disparities.util.JsonUtils;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * REST endpoint for maps data.
 *
 * @author awelton3
 */
@Path("/maps")
public class MapsEndpoint {

    /**
     * Geocode an address
     * @param body the body containing an address to geocode
     * @return the geocode response
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/geocode")
    public Response geocodeAddress(String body) throws Exception {
        if (body == null || body.isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        UserAddress userAddress = JsonUtils.getGsonInstance().fromJson(body, UserAddress.class);
        if (userAddress == null || userAddress.getAddressText() == null) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        UserLocationData locationData = AddressGeocoder.geocode(userAddress);
        return Response.ok()
                .entity(JsonUtils.getGsonInstance().toJson(locationData))
                .build();
    }

    /**
     * Reverse geocode a set of coordinates
     * @param body the body containing coordinates
     * @return the geocode response
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    @Path("/reverse_geocode")
    public Response reverseGeocodeCoordinates(String body) throws Exception {
        if (body == null || body.isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        LatLng latLng = JsonUtils.getGsonInstance().fromJson(body, LatLng.class);
        if (latLng == null) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        UserLocationData locationData = AddressGeocoder.reverseGeocode(latLng);
        return Response.ok()
                .entity(JsonUtils.getGsonInstance().toJson(locationData))
                .build();
    }

}
