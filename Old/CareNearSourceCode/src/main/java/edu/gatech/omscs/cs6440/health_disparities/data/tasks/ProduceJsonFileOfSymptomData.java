package edu.gatech.omscs.cs6440.health_disparities.data.tasks;

import edu.gatech.omscs.cs6440.health_disparities.data.model.SymptomProviderMap;
import edu.gatech.omscs.cs6440.health_disparities.data.model.SymptomProviderMapping;
import edu.gatech.omscs.cs6440.health_disparities.util.JsonUtils;
import org.apache.commons.io.FileUtils;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;
import java.util.*;

/**
 * Class to process the symptom data (in CSV format) into a JSON file.
 *
 * @author awelton3
 */
public class ProduceJsonFileOfSymptomData
{

    private static final String CSV_FILE_PATH = "data/SymptomResourceMap.csv";
    private static final int SKIP_LINES = 2;
    private static final String OUTPUT_FILE_PATH = "data/SymptomProviderMap.json";

    private static final Map<String, String> PROVIDER_SUBSTITUTIONS;

    static
    {
        Map<String, String> substitutions = new HashMap<>();
        substitutions.put("ER", "Emergency Room");
        PROVIDER_SUBSTITUTIONS = Collections.unmodifiableMap(substitutions);
    }

    /**
     * Get the symptom-provider mapping from the CSV line
     *
     * @param csvLine the CSV line
     * @return the symptom-provider mapping
     */
    private static SymptomProviderMapping getSymptomProviderMappingFromCsvLine(String csvLine)
    {
        if (csvLine == null || !csvLine.contains(","))
        {
            return null;
        }
        String[] parts = csvLine.split(",");
        if (parts.length != 2)
        {
            return null;
        }

        String provider = parts[ 1 ].trim();
        if (PROVIDER_SUBSTITUTIONS.containsKey(provider))
        {
            provider = PROVIDER_SUBSTITUTIONS.get(provider);
        }

        return new SymptomProviderMapping()
                .withSymptom(parts[ 0 ].trim())
                .withProvider(provider);
    }

    /**
     * Convert the symptom CSV to a JSON file.
     */
    private static void convertSymptomCsvToJsonFile()
    {
        try
        {
            List<String> fileLines = FileUtils.readLines(new File(CSV_FILE_PATH), Charset.forName("UTF-8"));
            List<SymptomProviderMapping> providerMappingList = new ArrayList<>();
            for (int i = SKIP_LINES; i < fileLines.size(); i++)
            {
                if (!fileLines.get(i).isEmpty())
                {
                    SymptomProviderMapping symptomProviderMapping = getSymptomProviderMappingFromCsvLine(fileLines.get(i));
                    if (symptomProviderMapping != null)
                    {
                        providerMappingList.add(symptomProviderMapping);
                    }
                }
            }
            SymptomProviderMap providerMap = new SymptomProviderMap()
                    .withSymptomProviderMappings(providerMappingList);
            FileUtils.writeStringToFile(new File(OUTPUT_FILE_PATH), JsonUtils.getGsonInstance().toJson(providerMap), Charset.forName("UTF-8"));
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
    }

    /**
     * Run the script
     *
     * @param args ignored
     */
    public static void main(String... args)
    {
        convertSymptomCsvToJsonFile();
    }

}
