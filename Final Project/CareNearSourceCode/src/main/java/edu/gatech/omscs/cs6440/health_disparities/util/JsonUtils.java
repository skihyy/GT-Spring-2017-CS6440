package edu.gatech.omscs.cs6440.health_disparities.util;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * JSON processing utility class.
 *
 * @author awelton3
 */
public class JsonUtils {

    private static Gson gsonInstance = null;
    private static Gson prettyGsonInstance = null;

    /**
     * Get the singleton Gson instance
     * @return the singleton Gson instance
     */
    public static synchronized Gson getGsonInstance() {
        if (gsonInstance == null) {
            gsonInstance = new GsonBuilder().create();
        }
        return gsonInstance;
    }

    /**
     * Get the singleton pretty Gson instance
     * @return the singleton pretty Gson instance
     */
    public static synchronized Gson getPrettyGsonInstance() {
        if (prettyGsonInstance == null) {
            prettyGsonInstance = new GsonBuilder().setPrettyPrinting().create();
        }
        return prettyGsonInstance;
    }

}
