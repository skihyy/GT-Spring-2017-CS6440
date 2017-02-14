package edu.gatech.omscs.cs6440.health_disparities.data;

import java.util.*;

/**
 * Storing data in static map for simplicity since there is so little.
 *
 * @author awelton3
 */
public class SymptomProviderLookups {

    private static final boolean EMERGENCY_ROOM_ALWAYS_FIRST = true;
    private static final String EMERGENCY_ROOM = "Emergency Room";

    private static final Map<String, String> symptomProviderMappings;
    static {
        Map<String, String> symptomProviderMap = new TreeMap<>();

        symptomProviderMap.put("Toothache (ache)", "Dentist");
        symptomProviderMap.put("Tooth came out", "Dentist");
        symptomProviderMap.put("Broken tooth", "Dentist");
        symptomProviderMap.put("Trouble Breathing", "Emergency Room");
        symptomProviderMap.put("Can't Move One Side - Arm and/or Leg", "Emergency Room");
        symptomProviderMap.put("Can't Remember Normally", "Emergency Room");
        symptomProviderMap.put("Blindness", "Emergency Room");
        symptomProviderMap.put("Can't Speak Normally", "Emergency Room");
        symptomProviderMap.put("Can't Stop Sweating", "Emergency Room");
        symptomProviderMap.put("Can't Swallow Normally", "Emergency Room");
        symptomProviderMap.put("Can't Walk Normally", "Emergency Room");
        symptomProviderMap.put("Can't Write Normally", "Emergency Room");
        symptomProviderMap.put("Choking", "Emergency Room");
        symptomProviderMap.put("Stopped Breathing", "Emergency Room");
        symptomProviderMap.put("Neck/Spine Injury", "Emergency Room");
        symptomProviderMap.put("Loss of Ability to Move", "Emergency Room");
        symptomProviderMap.put("Electric Shock or Lightning Strike", "Emergency Room");
        symptomProviderMap.put("Severe Burn", "Emergency Room");
        symptomProviderMap.put("Servere Chest Pain/Pressure", "Emergency Room");
        symptomProviderMap.put("Seizure", "Emergency Room");
        symptomProviderMap.put("Heavy Bleeding", "Emergency Room");
        symptomProviderMap.put("Broken Bone", "Emergency Room");
        symptomProviderMap.put("Deep Wound", "Emergency Room");
        symptomProviderMap.put("Coughing up Blood", "Emergency Room");
        symptomProviderMap.put("Severe Allergic Reaction", "Emergency Room");
        symptomProviderMap.put("Drug Overdose", "Emergency Room");
        symptomProviderMap.put("Poisoning", "Emergency Room");
        symptomProviderMap.put("Dehydrated", "Emergency Room");
        symptomProviderMap.put("Hungry", "Food Kitchen");
        symptomProviderMap.put("Earache", "Mini-Clinic");
        symptomProviderMap.put("Sick - Flu", "Mini-Clinic");
        symptomProviderMap.put("Constipation", "Mini-Clinic");
        symptomProviderMap.put("Can't Pass Urine Normally", "Mini-Clinic");
        symptomProviderMap.put("Insomnia", "Mini-Clinic");
        symptomProviderMap.put("Diarrhea", "Mini-Clinic");
        symptomProviderMap.put("Itchiness", "Mini-Clinic");
        symptomProviderMap.put("Can't Taste Properly", "Mini-Clinic");
        symptomProviderMap.put("Allergies", "Mini-Clinic");
        symptomProviderMap.put("Acne", "Mini-Clinic");
        symptomProviderMap.put("Vaccines", "Mini-Clinic");
        symptomProviderMap.put("Insect Bites/Stings", "Mini-Clinic");
        symptomProviderMap.put("Wart Removal", "Mini-Clinic");
        symptomProviderMap.put("Cholesterol Screening", "Mini-Clinic");
        symptomProviderMap.put("Physicals", "Mini-Clinic");
        symptomProviderMap.put("Blood Sugar Testing", "Mini-Clinic");
        symptomProviderMap.put("Blood Pressure Checks", "Mini-Clinic");
        symptomProviderMap.put("Sleepy", "Mini-Clinic");
        symptomProviderMap.put("Withdrawal", "Rehabilitation Service");
        symptomProviderMap.put("Need Somewhere to Rest", "Shelter");
        symptomProviderMap.put("Abdominal Pain", "Urgent Care");
        symptomProviderMap.put("Back Pain", "Urgent Care");
        symptomProviderMap.put("Chest Pain", "Urgent Care");
        symptomProviderMap.put("Headache", "Urgent Care");
        symptomProviderMap.put("Chronic Pelvic Pain", "Urgent Care");
        symptomProviderMap.put("Vaginal Pain", "Urgent Care");
        symptomProviderMap.put("Rectal Pain", "Urgent Care");
        symptomProviderMap.put("Chills", "Urgent Care");
        symptomProviderMap.put("Fever", "Urgent Care");
        symptomProviderMap.put("Light-headed", "Urgent Care");
        symptomProviderMap.put("Dizziness", "Urgent Care");
        symptomProviderMap.put("Dry Mouth", "Urgent Care");
        symptomProviderMap.put("Nauseated", "Urgent Care");
        symptomProviderMap.put("Vomiting", "Urgent Care");
        symptomProviderMap.put("Shortness of breath", "Urgent Care");
        symptomProviderMap.put("Sweaty", "Urgent Care");
        symptomProviderMap.put("Tired", "Urgent Care");
        symptomProviderMap.put("Weak", "Urgent Care");
        symptomProviderMap.put("Hearing Loss", "Urgent Care");
        symptomProviderMap.put("Sounds are too Loud", "Urgent Care");
        symptomProviderMap.put("Ringing or Hissing in Ears", "Urgent Care");
        symptomProviderMap.put("Blurred Vision", "Urgent Care");
        symptomProviderMap.put("Double Vision", "Urgent Care");
        symptomProviderMap.put("Can't Smell things Normally", "Urgent Care");
        symptomProviderMap.put("Cold", "Urgent Care");
        symptomProviderMap.put("Sore Throat", "Urgent Care");
        symptomProviderMap.put("Rash", "Urgent Care");
        symptomProviderMap.put("Sprain", "Urgent Care");
        symptomProviderMap.put("Minor Cut", "Urgent Care");
        symptomProviderMap.put("Bruising", "Urgent Care");
        symptomProviderMap.put("Minor Head Injury", "Urgent Care");
        symptomProviderMap.put("Sexually Transmitted Disease Exposure", "Emergency Room");
        symptomProviderMap.put("Sexual Assault", "Emergency Room");
        symptomProviderMap.put("Urinary Symptoms (Male)", "Urologist");
        symptomProviderMap.put("Urinary Symptoms (Female)", "Gynecologist");
        symptomProviderMap.put("Pregnancy", "Gynecologist");
        symptomProviderMap.put("Chronic Pain", "Emergency Room");

        symptomProviderMappings = Collections.unmodifiableMap(symptomProviderMap);
    }

    /**
     * Test that a symptom is valid and we have a provider for it
     * @param symptom the symptom text
     * @return true if the symptom is valid
     */
    private static synchronized boolean isValidSymptom(String symptom) {
        return symptomProviderMappings.containsKey(symptom);
    }

    /**
     * Get the list of all symptoms from the map
     * @return the list of all symptoms
     */
    public static synchronized List<String> getAllSymptoms() {
        return new ArrayList<>(symptomProviderMappings.keySet());
    }

    /**
     * Get the list of providers for the list of symptoms, prioritized
     * @param symptoms the symptoms
     * @return the list of providers, prioritized
     */
    public static synchronized List<String> getProvidersForSymptoms(List<String> symptoms) {
        if (symptoms == null || symptoms.isEmpty()) {
            return new ArrayList<>();
        }

        // Get frequencies of provider recommendations to provide priority
        Map<String, Integer> providerCounts = new HashMap<>();
        if (EMERGENCY_ROOM_ALWAYS_FIRST) {
            providerCounts.put(EMERGENCY_ROOM, 1000000);
        }
        for (String symptom : symptoms) {
            if (isValidSymptom(symptom)) {
                String provider = getProviderForSymptom(symptom);
                if (providerCounts.containsKey(provider)) {
                    int oldValue = providerCounts.get(provider);
                    providerCounts.replace(provider, oldValue + 1);
                } else {
                    providerCounts.put(provider, 1);
                }
            }
        }

        // Sort according to frequency in descending order
        List<String> providers = new ArrayList<>(providerCounts.keySet());
        providers.sort((o1, o2) -> providerCounts.get(o2).compareTo(providerCounts.get(o1)));
        return providers;
    }

    /**
     * Get the appropriate provider resource for a given symptom
     * @param symptom the symptom text
     * @return the appropriate provider resource, or null
     */
    public static synchronized String getProviderForSymptom(String symptom) {
        if (symptomProviderMappings.containsKey(symptom)) {
            return symptomProviderMappings.get(symptom);
        }
        return null;
    }

}
