package edu.gatech.omscs.cs6440.health_disparities.rest;

import edu.gatech.omscs.cs6440.health_disparities.data.SymptomProviderLookups;
import edu.gatech.omscs.cs6440.health_disparities.data.model.SymptomList;
import edu.gatech.omscs.cs6440.health_disparities.util.JsonUtils;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * REST endpoint for symptoms data
 *
 * @author awelton3
 */
@Path ("/symptoms")
public class SymptomsEndpoint
{

    /**
     * List the available symptoms that provider data exists for
     *
     * @return the list of symptoms
     */
    @GET
    @Produces (MediaType.APPLICATION_JSON)
    public Response listSymptoms()
    {
        SymptomList symptomList = new SymptomList()
                .withSymptoms(SymptomProviderLookups.getAllSymptoms());
        return Response.ok()
                .entity(JsonUtils.getGsonInstance().toJson(symptomList))
                .build();
    }

}
