package edu.gatech.omscs.cs6440.health_disparities.data.model;

import com.google.gson.annotations.SerializedName;

import java.util.List;

/**
 * Data model class for symptom-provider map.
 *
 * @author awelton3
 */
public class SymptomProviderMap {

    @SerializedName("symptom_provider_mappings")
    private List<SymptomProviderMapping> symptomProviderMappings;

    public List<SymptomProviderMapping> getSymptomProviderMappings() {
        return symptomProviderMappings;
    }
    public void setSymptomProviderMappings(List<SymptomProviderMapping> symptomProviderMappings) {
        this.symptomProviderMappings = symptomProviderMappings;
    }
    public SymptomProviderMap withSymptomProviderMappings(List<SymptomProviderMapping> symptomProviderMappings) {
        this.symptomProviderMappings = symptomProviderMappings;
        return this;
    }

}
