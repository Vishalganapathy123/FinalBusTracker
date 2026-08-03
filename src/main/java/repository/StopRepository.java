package repository;

import java.util.ArrayList;
import java.util.List;

import static com.mongodb.client.model.Filters.eq;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import config.MongoDBConfig;
import model.Stop;

public class StopRepository {

    private MongoCollection<Stop> collection;

    public StopRepository() {

        MongoDatabase database = MongoDBConfig.getDatabase();
        collection = database.getCollection("Stop", Stop.class);

    }

    // Add Stop
    public void addStop(Stop stop) {

        collection.insertOne(stop);

    }

    // Get All Stops
    public List<Stop> getAllStops() {

        List<Stop> stopList = new ArrayList<>();

        collection.find().into(stopList);

        return stopList;

    }

    // Get Stop By Id
    public Stop getStopById(String stopId) {

        return collection.find(eq("stopId", stopId)).first();

    }

    // Update Stop
    public void updateStop(Stop stop) {

        collection.replaceOne(eq("stopId", stop.getStopId()), stop);

    }

    // Delete Stop
    public void deleteStop(String stopId) {

        collection.deleteOne(eq("stopId", stopId));

    }

}