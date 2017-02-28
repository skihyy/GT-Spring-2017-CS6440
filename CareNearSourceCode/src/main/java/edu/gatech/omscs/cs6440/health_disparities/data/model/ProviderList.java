package edu.gatech.omscs.cs6440.health_disparities.data.model;

import com.google.gson.annotations.SerializedName;

import java.util.List;

/**
 * Provider list data class.
 *
 * @author awelton3
 */
public class ProviderList
{

    @SerializedName ("providers")
    private List<String> providers;

    public List<String> getProviders()
    {
        return providers;
    }

    public void setProviders(List<String> providers)
    {
        this.providers = providers;
    }

    public ProviderList withProviders(List<String> providers)
    {
        this.providers = providers;
        return this;
    }

}
