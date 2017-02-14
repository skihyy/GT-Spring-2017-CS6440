package edu.gatech.omscs.cs6440.health_disparities.rest;

import edu.gatech.omscs.cs6440.health_disparities.data.SymptomProviderLookups;
import edu.gatech.omscs.cs6440.health_disparities.data.model.ProviderList;
import edu.gatech.omscs.cs6440.health_disparities.data.model.SymptomList;
import edu.gatech.omscs.cs6440.health_disparities.util.JsonUtils;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * REST endpoint for providers data
 *
 * @author awelton3
 */
@Path("/providers")
public class ProvidersEndpoint {

    /**
     * Get the prioritized list of providers for the list of symptoms
     * @param body the body
     * @return the prioritized list of providers for the list of symptoms
     */
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProvidersForSymptoms(String body) {
        if (body == null || body.isEmpty()) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        SymptomList submittedSymptoms = JsonUtils.getGsonInstance().fromJson(body, SymptomList.class);
        if (submittedSymptoms == null) {
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        ProviderList providerList = new ProviderList()
                .withProviders(SymptomProviderLookups.getProvidersForSymptoms(submittedSymptoms.getSymptoms()));
        return Response.ok()
                .entity(JsonUtils.getGsonInstance().toJson(providerList))
                .build();
    }

}
