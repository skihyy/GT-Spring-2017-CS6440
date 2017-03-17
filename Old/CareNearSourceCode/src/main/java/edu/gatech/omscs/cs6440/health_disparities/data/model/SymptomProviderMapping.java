package edu.gatech.omscs.cs6440.health_disparities.data.model;

import com.google.gson.annotations.SerializedName;

/**
 * Class for individual symptom-provider mapping.
 *
 * @author awelton3
 */
public class SymptomProviderMapping
{

    @SerializedName ("symptom")
    private String symptom;

    @SerializedName ("provider")
    private String provider;

    public String getSymptom()
    {
        return symptom;
    }

    public void setSymptom(String symptom)
    {
        this.symptom = symptom;
    }

    public SymptomProviderMapping withSymptom(String symptom)
    {
        this.symptom = symptom;
        return this;
    }

    public String getProvider()
    {
        return provider;
    }

    public void setProvider(String provider)
    {
        this.provider = provider;
    }

    public SymptomProviderMapping withProvider(String provider)
    {
        this.provider = provider;
        return this;
    }

}
