const API = "http://localhost:8080/BusTracker/api/admin";

/* ===========================
   TAB NAVIGATION
=========================== */

function showTab(tabId) {

    document.querySelectorAll(".tabContent").forEach(tab => {
        tab.style.display = "none";
    });

    document.querySelectorAll(".tabButton").forEach(btn => {
        btn.classList.remove("active");
    });

    document.getElementById(tabId).style.display = "block";

    event.target.classList.add("active");
}

/* ===========================
   BUS CRUD
=========================== */

window.onload = function () {

    loadBus();

};

/* Load All Buses */

function loadBus() {

    fetch(API + "/bus")

        .then(res => res.json())

        .then(data => {

            let body = document.getElementById("busTableBody");

            body.innerHTML = "";

            data.forEach(bus => {

                body.innerHTML += `
                <tr>

                    <td>${bus.busId}</td>

                    <td>${bus.busNumber}</td>

                    <td>${bus.busName}</td>

                    <td>${bus.busType}</td>

                    <td>${bus.routeId}</td>

                    <td>

                        <button onclick="editBus('${bus.busId}',
                                                  '${bus.busNumber}',
                                                  '${bus.busName}',
                                                  '${bus.busType}',
                                                  '${bus.routeId}')">

                            Edit

                        </button>

                    </td>

                </tr>`;

            });

        });

}

/* Add Bus */

function addBus() {

    let bus = {

        busId: document.getElementById("busId").value,

        busNumber: document.getElementById("busNumber").value,

        busName: document.getElementById("busName").value,

        busType: document.getElementById("busType").value,

        routeId: document.getElementById("routeId").value

    };

    fetch(API + "/bus", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(bus)

    })

    .then(() => {

        alert("Bus Added Successfully");

        clearBus();

        loadBus();

    });

}

/* Edit Bus */

function editBus(id, number, name, type, route) {

    document.getElementById("busId").value = id;

    document.getElementById("busNumber").value = number;

    document.getElementById("busName").value = name;

    document.getElementById("busType").value = type;

    document.getElementById("routeId").value = route;

}

/* Update Bus */

function updateBus() {

    let bus = {

        busId: document.getElementById("busId").value,

        busNumber: document.getElementById("busNumber").value,

        busName: document.getElementById("busName").value,

        busType: document.getElementById("busType").value,

        routeId: document.getElementById("routeId").value

    };

    fetch(API + "/bus", {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(bus)

    })

    .then(() => {

        alert("Bus Updated Successfully");

        clearBus();

        loadBus();

    });

}

/* Delete Bus */

function deleteBus() {

    let id = document.getElementById("busId").value;

    fetch(API + "/bus/" + id, {

        method: "DELETE"

    })

    .then(() => {

        alert("Bus Deleted Successfully");

        clearBus();

        loadBus();

    });

}

/* Clear Bus */

function clearBus() {

    document.getElementById("busId").value = "";

    document.getElementById("busNumber").value = "";

    document.getElementById("busName").value = "";

    document.getElementById("busType").selectedIndex = 0;

    document.getElementById("routeId").selectedIndex = 0;

}
/* ===========================
   STOP CRUD
=========================== */

/* Load All Stops */

function loadStop() {

    fetch(API + "/stop")

        .then(res => res.json())

        .then(data => {

            let body = document.getElementById("stopTableBody");

            body.innerHTML = "";

            data.forEach(stop => {

                body.innerHTML += `
                <tr>

                    <td>${stop.stopId}</td>

                    <td>${stop.stopName}</td>

                    <td>

                        <button onclick="editStop(
                            '${stop.stopId}',
                            '${stop.stopName}'
                        )">

                            Edit

                        </button>

                    </td>

                </tr>`;

            });

        });

}

/* Add Stop */

function addStop() {

    let stop = {

        stopId: document.getElementById("stopId").value,

        stopName: document.getElementById("stopName").value

    };

    fetch(API + "/stop", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(stop)

    })

    .then(() => {

        alert("Stop Added Successfully");

        clearStop();

        loadStop();

    });

}

/* Edit Stop */

function editStop(id, name) {

    document.getElementById("stopId").value = id;

    document.getElementById("stopName").value = name;

}

/* Update Stop */

function updateStop() {

    let stop = {

        stopId: document.getElementById("stopId").value,

        stopName: document.getElementById("stopName").value

    };

    fetch(API + "/stop", {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(stop)

    })

    .then(() => {

        alert("Stop Updated Successfully");

        clearStop();

        loadStop();

    });

}

/* Delete Stop */

function deleteStop() {

    let id = document.getElementById("stopId").value;

    fetch(API + "/stop/" + id, {

        method: "DELETE"

    })

    .then(() => {

        alert("Stop Deleted Successfully");

        clearStop();

        loadStop();

    });

}

/* Clear Stop */

function clearStop() {

    document.getElementById("stopId").value = "";

    document.getElementById("stopName").value = "";

}
/* ===========================
   ROUTE CRUD
=========================== */

/* Load All Routes */

function loadRoute() {

    fetch(API + "/route")
        .then(res => res.json())
        .then(data => {

            let body = document.getElementById("routeTableBody");

            body.innerHTML = "";

            data.forEach(route => {

                let stops = "";

                if (route.stopIds != null) {
                    stops = route.stopIds.join(", ");
                }

                body.innerHTML += `
                <tr>

                    <td>${route.routeId}</td>

                    <td>${route.routeName}</td>

                    <td>${stops}</td>

                    <td>

                        <button onclick="editRoute(
                            '${route.routeId}',
                            '${route.routeName}'
                        )">

                            Edit

                        </button>

                    </td>

                </tr>`;

            });

        });

}

/* Load Stops into Route */

function loadStopsForRoute() {

    fetch(API + "/stop")
        .then(res => res.json())
        .then(data => {

            let select = document.getElementById("routeStops");

            select.innerHTML = "";

            data.forEach(stop => {

                select.innerHTML +=
                `<option value="${stop.stopId}">
                    ${stop.stopName}
                </option>`;

            });

        });

}

/* Add Route */

function addRoute() {

    let selectedStops = [];

    let options = document.getElementById("routeStops").selectedOptions;

    for (let option of options) {

        selectedStops.push(option.value);

    }

    let route = {

        routeId: document.getElementById("routeId").value,

        routeName: document.getElementById("routeName").value,

        stopIds: selectedStops

    };

    fetch(API + "/route", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(route)

    })

    .then(() => {

        alert("Route Added Successfully");

        clearRoute();

        loadRoute();

    });

}

/* Edit Route */

function editRoute(id, name) {

    document.getElementById("routeId").value = id;

    document.getElementById("routeName").value = name;

}

/* Update Route */

function updateRoute() {

    let selectedStops = [];

    let options = document.getElementById("routeStops").selectedOptions;

    for (let option of options) {

        selectedStops.push(option.value);

    }

    let route = {

        routeId: document.getElementById("routeId").value,

        routeName: document.getElementById("routeName").value,

        stopIds: selectedStops

    };

    fetch(API + "/route", {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(route)

    })

    .then(() => {

        alert("Route Updated Successfully");

        clearRoute();

        loadRoute();

    });

}

/* Delete Route */

function deleteRoute() {

    let id = document.getElementById("routeId").value;

    fetch(API + "/route/" + id, {

        method: "DELETE"

    })

    .then(() => {

        alert("Route Deleted Successfully");

        clearRoute();

        loadRoute();

    });

}

/* Clear Route */

function clearRoute() {

    document.getElementById("routeId").value = "";

    document.getElementById("routeName").value = "";

    document.getElementById("routeStops").selectedIndex = -1;

}
/* ===========================
   SCHEDULE CRUD
=========================== */

/* Load All Schedules */

function loadSchedule() {

    fetch(API + "/schedule")
        .then(res => res.json())
        .then(data => {

            let body = document.getElementById("scheduleTableBody");

            body.innerHTML = "";

            data.forEach(schedule => {

                body.innerHTML += `
                <tr>

                    <td>${schedule.scheduleId}</td>

                    <td>${schedule.busId}</td>

                    <td>${schedule.routeId}</td>

                    <td>${schedule.departureTime}</td>

                    <td>${schedule.arrivalTime}</td>

                    <td>${schedule.day}</td>

                    <td>

                        <button onclick="editSchedule(
                            '${schedule.scheduleId}',
                            '${schedule.busId}',
                            '${schedule.routeId}',
                            '${schedule.departureTime}',
                            '${schedule.arrivalTime}',
                            '${schedule.day}'
                        )">

                            Edit

                        </button>

                    </td>

                </tr>`;

            });

        });

}

/* Load Bus Dropdown */

function loadBusDropdown() {

    fetch(API + "/bus")
        .then(res => res.json())
        .then(data => {

            let select = document.getElementById("scheduleBusId");

            select.innerHTML = "";

            data.forEach(bus => {

                select.innerHTML +=
                `<option value="${bus.busId}">
                    ${bus.busNumber}
                </option>`;

            });

        });

}

/* Load Route Dropdown */

function loadRouteDropdown() {

    fetch(API + "/route")
        .then(res => res.json())
        .then(data => {

            let select = document.getElementById("scheduleRouteId");

            select.innerHTML = "";

            data.forEach(route => {

                select.innerHTML +=
                `<option value="${route.routeId}">
                    ${route.routeName}
                </option>`;

            });

        });

}

/* Add Schedule */

function addSchedule() {

    let schedule = {

        scheduleId: document.getElementById("scheduleId").value,

        busId: document.getElementById("scheduleBusId").value,

        routeId: document.getElementById("scheduleRouteId").value,

        departureTime: document.getElementById("departureTime").value,

        arrivalTime: document.getElementById("arrivalTime").value,

        day: document.getElementById("day").value

    };

    fetch(API + "/schedule", {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(schedule)

    })

    .then(() => {

        alert("Schedule Added Successfully");

        clearSchedule();

        loadSchedule();

    });

}

/* Edit Schedule */

function editSchedule(id, busId, routeId, departure, arrival, day) {

    document.getElementById("scheduleId").value = id;

    document.getElementById("scheduleBusId").value = busId;

    document.getElementById("scheduleRouteId").value = routeId;

    document.getElementById("departureTime").value = departure;

    document.getElementById("arrivalTime").value = arrival;

    document.getElementById("day").value = day;

}

/* Update Schedule */

function updateSchedule() {

    let schedule = {

        scheduleId: document.getElementById("scheduleId").value,

        busId: document.getElementById("scheduleBusId").value,

        routeId: document.getElementById("scheduleRouteId").value,

        departureTime: document.getElementById("departureTime").value,

        arrivalTime: document.getElementById("arrivalTime").value,

        day: document.getElementById("day").value

    };

    fetch(API + "/schedule", {

        method: "PUT",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(schedule)

    })

    .then(() => {

        alert("Schedule Updated Successfully");

        clearSchedule();

        loadSchedule();

    });

}

/* Delete Schedule */

function deleteSchedule() {

    let id = document.getElementById("scheduleId").value;

    fetch(API + "/schedule/" + id, {

        method: "DELETE"

    })

    .then(() => {

        alert("Schedule Deleted Successfully");

        clearSchedule();

        loadSchedule();

    });

}

/* Clear Schedule */

function clearSchedule() {

    document.getElementById("scheduleId").value = "";

    document.getElementById("departureTime").value = "";

    document.getElementById("arrivalTime").value = "";

    document.getElementById("day").selectedIndex = 0;

}

/* ===========================
   INITIAL LOAD
=========================== */

window.onload = function () {

    loadBus();

    loadStop();

    loadRoute();

    loadSchedule();

    loadStopsForRoute();

    loadBusDropdown();

    loadRouteDropdown();

};