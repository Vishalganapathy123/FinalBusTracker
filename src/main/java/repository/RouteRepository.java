package repository;

import java.util.ArrayList;
import java.util.List;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.ReplaceOptions;

import config.MongoDBConfig;
import model.Route;

public class RouteRepository {

    private final MongoCollection<Route> collection;

    public RouteRepository() {
        // Uses the centralized configuration (192.168.1.171 & BusTrackerDB with POJO codec registered)
        MongoDatabase database = MongoDBConfig.getDatabase();
        this.collection = database.getCollection("routes", Route.class);
    }

    public void updateRoute(Route route) {
        if (route == null || route.getRouteId() == null) {
            return;
        }
        
        collection.replaceOne(
                Filters.eq("routeId", route.getRouteId()),
                route,
                new ReplaceOptions().upsert(true)
        );
    }

    public void addRoute(Route route) {
        updateRoute(route);
    }

    public Route getRouteById(String routeId) {
        return collection.find(Filters.eq("routeId", routeId)).first();
    }

    public List<Route> getAllRoutes() {
        return collection.find().into(new ArrayList<>());
    }

    public void deleteRoute(String routeId) {
        collection.deleteOne(Filters.eq("routeId", routeId));
    }
}