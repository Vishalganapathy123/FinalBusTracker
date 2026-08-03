package repository;

import java.util.ArrayList;
import java.util.List;

import static com.mongodb.client.model.Filters.eq;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import config.MongoDBConfig;
import model.Bus;

public class BusRepository {

    private MongoCollection<Bus> collection;

    public BusRepository() {

        MongoDatabase database = MongoDBConfig.getDatabase();
        collection = database.getCollection("Bus", Bus.class);
    }

    // Add Bus
    public void addBus(Bus bus) {
        collection.insertOne(bus);
    }

    // Get All Buses
    public List<Bus> getAllBuses() {

        List<Bus> busList = new ArrayList<>();

        collection.find().into(busList);

        return busList;
    }

    // Get Bus By Id
    public Bus getBusById(String busId) {

        return collection.find(eq("busId", busId)).first();

    }

    // Update Bus
    public void updateBus(Bus bus) {

        collection.replaceOne(eq("busId", bus.getBusId()), bus);

    }

    // Delete Bus
    public void deleteBus(String busId) {

        collection.deleteOne(eq("busId", busId));

    }

}