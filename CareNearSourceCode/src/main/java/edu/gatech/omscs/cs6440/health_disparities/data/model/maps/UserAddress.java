package edu.gatech.omscs.cs6440.health_disparities.data.model.maps;

import com.google.gson.annotations.SerializedName;

/**
 * User address wrapper class.
 *
 * @author awelton3
 */
public class UserAddress
{

    @SerializedName ("address_text")
    private String addressText;

    public String getAddressText()
    {
        return addressText;
    }

    public void setAddressText(String addressText)
    {
        this.addressText = addressText;
    }

}
