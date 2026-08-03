package repository;

import java.util.ArrayList;
import java.util.List;

import static com.mongodb.client.model.Filters.eq;

import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import config.MongoDBConfig;
import model.Schedule;

public class ScheduleRepository {

    private MongoCollection<Schedule> collection;

    public ScheduleRepository() {

        MongoDatabase database = MongoDBConfig.getDatabase();
        collection = database.getCollection("Schedule", Schedule.class);

    }

    // Add Schedule
    public void addSchedule(Schedule schedule) {

        collection.insertOne(schedule);

    }

    // Get All Schedules
    public List<Schedule> getAllSchedules() {

        List<Schedule> scheduleList = new ArrayList<>();

        collection.find().into(scheduleList);

        return scheduleList;

    }

    // Get Schedule By Id
    public Schedule getScheduleById(String scheduleId) {

        return collection.find(eq("scheduleId", scheduleId)).first();

    }

    // Update Schedule
    public void updateSchedule(Schedule schedule) {

        collection.replaceOne(eq("scheduleId", schedule.getScheduleId()), schedule);

    }

    // Delete Schedule
    public void deleteSchedule(String scheduleId) {

        collection.deleteOne(eq("scheduleId", scheduleId));

    }

}