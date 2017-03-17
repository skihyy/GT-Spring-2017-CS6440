package edu.gatech.omscs.cs6440.health_disparities.data.model.maps;

import com.google.gson.annotations.SerializedName;
import com.google.maps.model.LatLng;

import java.util.List;

/**
 * Geocode response class.
 *
 * @author awelton3
 */
public class UserLocationData
{

    @SerializedName ("address_text")
    private String addressText;

    @SerializedName ("lat_lng")
    private LatLng latLng;

    @SerializedName ("place_id")
    private String placeId;

    @SerializedName ("types")
    private List<String> types;

    public String getAddressText()
    {
        return addressText;
    }

    public void setAddressText(String addressText)
    {
        this.addressText = addressText;
    }

    public LatLng getLatLng()
    {
        return latLng;
    }

    public void setLatLng(LatLng latLng)
    {
        this.latLng = latLng;
    }

    public String getPlaceId()
    {
        return placeId;
    }

    public void setPlaceId(String placeId)
    {
        this.placeId = placeId;
    }

    public List<String> getTypes()
    {
        return types;
    }

    public void setTypes(List<String> types)
    {
        this.types = types;
    }

}
