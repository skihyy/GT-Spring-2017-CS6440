package edu.gatech.omscs.cs6440.health_disparities.rest;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.HashSet;
import java.util.Set;

/**
 * REST application class for the Health Disparities App
 *
 * @author awelton3
 */
@ApplicationPath ("/api/v1")
public class RestApplication extends Application
{

    /**
     * Get the set of REST resource classes
     *
     * @return the set of classes
     */
    @Override
    public Set<Class<?>> getClasses()
    {
        Set<Class<?>> classes = new HashSet<>();

        classes.add(SymptomsEndpoint.class);
        classes.add(ProvidersEndpoint.class);
        classes.add(MapsEndpoint.class);

        return classes;
    }

}
