package repository;

import java.util.ArrayList;
import java.util.List;

import static com.mongodb.client.model.Filters.eq;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import config.MongoDBConfig;
import model.BusLocation;

public class BusLocationRepository {

    private MongoCollection<BusLocation> collection;

    public BusLocationRepository() {

        MongoDatabase database = MongoDBConfig.getDatabase();
        collection = database.getCollection("BusLocation", BusLocation.class);

    }

    // Add Bus Location
    public void addBusLocation(BusLocation busLocation) {

        collection.insertOne(busLocation);

    }

    // Get All Bus Locations
    public List<BusLocation> getAllBusLocations() {

        List<BusLocation> locationList = new ArrayList<>();

        collection.find().into(locationList);

        return locationList;

    }

    // Get Bus Location By Bus Id
    public BusLocation getBusLocationByBusId(String busId) {

        return collection.find(eq("busId", busId)).first();

    }

    // Update Bus Location
    public void updateBusLocation(BusLocation busLocation) {

        collection.replaceOne(eq("busId", busLocation.getBusId()), busLocation);

    }

    // Delete Bus Location
    public void deleteBusLocation(String busId) {

        collection.deleteOne(eq("busId", busId));

    }

}