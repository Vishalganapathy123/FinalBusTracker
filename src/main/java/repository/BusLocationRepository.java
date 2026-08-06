package repository;

import java.util.ArrayList;
import java.util.List;

import static com.mongodb.client.model.Filters.eq;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.ReplaceOptions;

import config.MongoDBConfig;
import model.BusLocation;

public class BusLocationRepository {

    private final MongoCollection<BusLocation> collection;

    public BusLocationRepository() {
        // Uses centralized MongoDB connection (192.168.1.171 / BusTrackerDB)
        MongoDatabase database = MongoDBConfig.getDatabase();
        
        // Ensure this collection name matches your MongoDB collection exactly
        this.collection = database.getCollection("BusLocation", BusLocation.class);
    }

    /**
     * Atomic Upsert (Save or Update).
     * Replaces existing document by busId or inserts if it doesn't exist.
     */
    public void saveOrUpdateBusLocation(BusLocation busLocation) {
        if (busLocation == null || busLocation.getBusId() == null || busLocation.getBusId().trim().isEmpty()) {
            return;
        }

        collection.replaceOne(
                eq("busId", busLocation.getBusId()),
                busLocation,
                new ReplaceOptions().upsert(true)
        );
    }

    // Add Bus Location (Delegates to saveOrUpdateBusLocation to prevent duplicate key errors)
    public void addBusLocation(BusLocation busLocation) {
        saveOrUpdateBusLocation(busLocation);
    }

    // Get All Bus Locations
    public List<BusLocation> getAllBusLocations() {
        List<BusLocation> locationList = new ArrayList<>();
        collection.find().into(locationList);
        return locationList;
    }

    // Get Bus Location By Bus Id
    public BusLocation getBusLocationByBusId(String busId) {
        if (busId == null || busId.trim().isEmpty()) {
            return null;
        }
        return collection.find(eq("busId", busId)).first();
    }

    // Update Bus Location
    public void updateBusLocation(BusLocation busLocation) {
        saveOrUpdateBusLocation(busLocation);
    }

    // Delete Bus Location
    public void deleteBusLocation(String busId) {
        if (busId == null || busId.trim().isEmpty()) {
            return;
        }
        collection.deleteOne(eq("busId", busId));
    }
}