package edu.gatech.omscs.cs6440.health_disparities.rest;

import edu.gatech.omscs.cs6440.health_disparities.data.model.ProviderList;
import edu.gatech.omscs.cs6440.health_disparities.data.model.SymptomList;
import edu.gatech.omscs.cs6440.health_disparities.util.JsonUtils;
import org.junit.Test;

import javax.ws.rs.core.Response;
import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.*;


/**
 * Class to unit test ProvidersEndpoint.
 *
 * @author awelton3
 */
public class ProvidersEndpointTest
{

    @Test
    public void testGetProvidersForSymptoms()
    {
        List<String> symptoms = Arrays.asList("Deep Wound", "Choking", "Toothache (ache)", "Insomnia");
        SymptomList symptomList = new SymptomList()
                .withSymptoms(symptoms);
        String symptomListJson = JsonUtils.getGsonInstance().toJson(symptomList);

        ProvidersEndpoint providersEndpoint = new ProvidersEndpoint();
        Response providersResponse = providersEndpoint.getProvidersForSymptoms(symptomListJson);
        assertNotNull(providersResponse);
        assertEquals(200, providersResponse.getStatus());

        String providerListPayload = providersResponse.getEntity().toString();
        ProviderList providerList = JsonUtils.getGsonInstance().fromJson(providerListPayload, ProviderList.class);
        assertNotNull(providerList);
        assertNotNull(providerList.getProviders());
        assertEquals(3, providerList.getProviders().size());
        assertEquals("Emergency Room", providerList.getProviders().get(0));

        System.out.println(JsonUtils.getPrettyGsonInstance().toJson(providerList));
    }

}
