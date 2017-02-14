package edu.gatech.omscs.cs6440.health_disparities.data.model;

import com.google.gson.annotations.SerializedName;

import java.util.List;

/**
 * Symptom list data class.
 *
 * @author awelton3
 */
public class SymptomList {

    @SerializedName("symptoms")
    private List<String> symptoms;

    public List<String> getSymptoms() {
        return symptoms;
    }
    public void setSymptoms(List<String> symptoms) {
        this.symptoms = symptoms;
    }
    public SymptomList withSymptoms(List<String> symptoms) {
        this.symptoms = symptoms;
        return this;
    }

}
