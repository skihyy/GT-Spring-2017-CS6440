package edu.gatech.omscs.cs6440.health_disparities.rest;

import edu.gatech.omscs.cs6440.health_disparities.data.model.SymptomList;
import edu.gatech.omscs.cs6440.health_disparities.util.JsonUtils;
import org.junit.Test;

import javax.ws.rs.core.Response;

import static org.junit.Assert.*;

/**
 * Class to unit test symptoms endpoint
 */
public class SymptomsEndpointTest {

    @Test
    public void testListSymptoms() {
        SymptomsEndpoint symptomsEndpoint = new SymptomsEndpoint();
        Response listSymptomsResponse = symptomsEndpoint.listSymptoms();
        assertNotNull(listSymptomsResponse);

        String listSymptomsPayload = listSymptomsResponse.getEntity().toString();
        SymptomList symptomList = JsonUtils.getGsonInstance().fromJson(listSymptomsPayload, SymptomList.class);
        assertNotNull(symptomList);
        assertNotNull(symptomList.getSymptoms());
        assertFalse(symptomList.getSymptoms().isEmpty());

        System.out.println(JsonUtils.getPrettyGsonInstance().toJson(symptomList));
    }

}
