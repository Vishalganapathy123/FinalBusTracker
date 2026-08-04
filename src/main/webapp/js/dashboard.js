// Dynamic Base URL Detection
const API = window.location.origin + "/BusTracker/api/admin";

/* ===========================
   HELPER FUNCTIONS
=========================== */

function getVal(id) {
    let el = document.getElementById(id);
    return el ? el.value : "";
}

/* ===========================
   TAB NAVIGATION
=========================== */

function showTab(tabId, evt) {
    document.querySelectorAll(".tabContent").forEach(function (tab) {
        tab.style.display = "none";
    });

    document.querySelectorAll(".tabButton").forEach(function (btn) {
        btn.classList.remove("active");
    });

    let targetTab = document.getElementById(tabId);
    if (targetTab) targetTab.style.display = "block";

    if (evt && evt.currentTarget) {
        evt.currentTarget.classList.add("active");
    }

    if (tabId === "bus") {
        loadBus();
        loadRouteDropdownForBus();
    } else if (tabId === "stop") {
        loadStop();
    } else if (tabId === "route") {
        loadRoute();
        loadStopsForRoute();
    } else if (tabId === "schedule") {
        loadSchedule();
        loadBusDropdown();
        loadRouteDropdown();
    }
}

/* ===========================
   BUS CRUD
=========================== */

function loadBus() {
    fetch(API + "/bus")
        .then(function (res) {
            if (!res.ok) throw new Error("Failed to load buses");
            return res.json();
        })
        .then(function (data) {
            let body = document.getElementById("busTableBody");
            if (!body) return;
            body.innerHTML = "";

            data.forEach(function (bus) {
                let rId = bus.routeId ? bus.routeId : '';
                body.innerHTML += 
                '<tr>' +
                    '<td>' + bus.busId + '</td>' +
                    '<td>' + bus.busNumber + '</td>' +
                    '<td>' + bus.busName + '</td>' +
                    '<td>' + bus.busType + '</td>' +
                    '<td>' + rId + '</td>' +
                    '<td>' +
                        '<button class="btnUpdate" onclick="editBus(\'' + bus.busId + '\', \'' + bus.busNumber + '\', \'' + bus.busName + '\', \'' + bus.busType + '\', \'' + rId + '\')">Edit</button>' +
                    '</td>' +
                '</tr>';
            });
        })
        .catch(function (err) { console.error(err); });
}

function loadRouteDropdownForBus() {
    fetch(API + "/route")
        .then(function (res) { return res.json(); })
        .then(function (data) {
            let select = document.getElementById("routeId");
            if (!select) return;
            select.innerHTML = '<option value="">-- Select Route --</option>';
            data.forEach(function (route) {
                select.innerHTML += '<option value="' + route.routeId + '">' + route.routeName + '</option>';
            });
        })
        .catch(function (err) { console.error(err); });
}

function addBus() {
    let bus = {
        busId: getVal("busId"),
        busNumber: getVal("busNumber"),
        busName: getVal("busName"),
        busType: getVal("busType"),
        routeId: getVal("routeId")
    };

    fetch(API + "/bus", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bus)
    })
    .then(function (res) {
        if (!res.ok) throw new Error("Failed to add bus");
        alert("Bus Added Successfully");
        clearBus();
        loadBus();
    })
    .catch(function (err) { alert("Error: " + err.message); });
}

function editBus(id, number, name, type, route) {
    if (document.getElementById("busId")) document.getElementById("busId").value = id;
    if (document.getElementById("busNumber")) document.getElementById("busNumber").value = number;
    if (document.getElementById("busName")) document.getElementById("busName").value = name;
    if (document.getElementById("busType")) document.getElementById("busType").value = type;
    if (document.getElementById("routeId")) document.getElementById("routeId").value = route;
}

function updateBus() {
    let bus = {
        busId: getVal("busId"),
        busNumber: getVal("busNumber"),
        busName: getVal("busName"),
        busType: getVal("busType"),
        routeId: getVal("routeId")
    };

    fetch(API + "/bus", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bus)
    })
    .then(function (res) {
        if (!res.ok) throw new Error("Failed to update bus");
        alert("Bus Updated Successfully");
        clearBus();
        loadBus();
    })
    .catch(function (err) { alert("Error: " + err.message); });
}

function deleteBus() {
    let id = getVal("busId");
    if (!id) return alert("Please specify a Bus ID to delete.");

    fetch(API + "/bus/" + id, { method: "DELETE" })
    .then(function (res) {
        if (!res.ok) throw new Error("Failed to delete bus");
        alert("Bus Deleted Successfully");
        clearBus();
        loadBus();
    })
    .catch(function (err) { alert("Error: " + err.message); });
}

function clearBus() {
    if (document.getElementById("busId")) document.getElementById("busId").value = "";
    if (document.getElementById("busNumber")) document.getElementById("busNumber").value = "";
    if (document.getElementById("busName")) document.getElementById("busName").value = "";
    if (document.getElementById("busType")) document.getElementById("busType").selectedIndex = 0;
    if (document.getElementById("routeId")) document.getElementById("routeId").selectedIndex = 0;
}

/* ===========================
   STOP CRUD
=========================== */

function loadStop() {
    fetch(API + "/stop")
        .then(function (res) { return res.json(); })
        .then(function (data) {
            let body = document.getElementById("stopTableBody");
            if (!body) return;
            body.innerHTML = "";

            data.forEach(function (stop) {
                body.innerHTML += 
                '<tr>' +
                    '<td>' + stop.stopId + '</td>' +
                    '<td>' + stop.stopName + '</td>' +
                    '<td>' +
                        '<button class="btnUpdate" onclick="editStop(\'' + stop.stopId + '\', \'' + stop.stopName + '\')">Edit</button>' +
                    '</td>' +
                '</tr>';
            });
        })
        .catch(function (err) { console.error(err); });
}

function addStop() {
    let stop = {
        stopId: getVal("stopId"),
        stopName: getVal("stopName")
    };

    fetch(API + "/stop", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stop)
    })
    .then(function (res) {
        if (!res.ok) throw new Error("Failed to add stop");
        alert("Stop Added Successfully");
        clearStop();
        loadStop();
    })
    .catch(function (err) { alert("Error: " + err.message); });
}

function editStop(id, name) {
    if (document.getElementById("stopId")) document.getElementById("stopId").value = id;
    if (document.getElementById("stopName")) document.getElementById("stopName").value = name;
}

function updateStop() {
    let stop = {
        stopId: getVal("stopId"),
        stopName: getVal("stopName")
    };

    fetch(API + "/stop", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stop)
    })
    .then(function (res) {
        if (!res.ok) throw new Error("Failed to update stop");
        alert("Stop Updated Successfully");
        clearStop();
        loadStop();
    })
    .catch(function (err) { alert("Error: " + err.message); });
}

function deleteStop() {
    let id = getVal("stopId");
    if (!id) return alert("Please specify a Stop ID to delete.");

    fetch(API + "/stop/" + id, { method: "DELETE" })
    .then(function (res) {
        if (!res.ok) throw new Error("Failed to delete stop");
        alert("Stop Deleted Successfully");
        clearStop();
        loadStop();
    })
    .catch(function (err) { alert("Error: " + err.message); });
}

function clearStop() {
    if (document.getElementById("stopId")) document.getElementById("stopId").value = "";
    if (document.getElementById("stopName")) document.getElementById("stopName").value = "";
}

/* ===========================
   ROUTE CRUD
=========================== */

function loadRoute() {
    fetch(API + "/route")
        .then(function (res) { return res.json(); })
        .then(function (data) {
            let body = document.getElementById("routeTableBody");
            if (!body) return;
            body.innerHTML = "";

            data.forEach(function (route) {
                let stops = (route.stopIds && Array.isArray(route.stopIds)) ? route.stopIds.join(", ") : "";

                body.innerHTML += 
                '<tr>' +
                    '<td>' + route.routeId + '</td>' +
                    '<td>' + route.routeName + '</td>' +
                    '<td>' + stops + '</td>' +
                    '<td>' +
                        '<button class="btnUpdate" onclick="editRoute(\'' + route.routeId + '\', \'' + route.routeName + '\')">Edit</button>' +
                    '</td>' +
                '</tr>';
            });
        })
        .catch(function (err) { console.error(err); });
}

function loadStopsForRoute() {
    fetch(API + "/stop")
        .then(function (res) { return res.json(); })
        .then(function (data) {
            let select = document.getElementById("routeStops");
            if (!select) return;
            select.innerHTML = "";

            data.forEach(function (stop) {
                select.innerHTML += '<option value="' + stop.stopId + '">' + stop.stopName + '</option>';
            });
        })
        .catch(function (err) { console.error(err); });
}

function addRoute() {
    let selectedStops = [];
    let stopsSelect = document.getElementById("routeStops");

    if (stopsSelect && stopsSelect.selectedOptions) {
        for (let i = 0; i < stopsSelect.selectedOptions.length; i++) {
            selectedStops.push(stopsSelect.selectedOptions[i].value);
        }
    }

    let route = {
        routeId: getVal("routeInputId"),
        routeName: getVal("routeName"),
        stopIds: selectedStops
    };

    fetch(API + "/route", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(route)
    })
    .then(function (res) {
        if (!res.ok) throw new Error("Failed to add route");
        alert("Route Added Successfully");
        clearRoute();
        loadRoute();
    })
    .catch(function (err) { alert("Error: " + err.message); });
}

function editRoute(id, name) {
    if (document.getElementById("routeInputId")) document.getElementById("routeInputId").value = id;
    if (document.getElementById("routeName")) document.getElementById("routeName").value = name;
}

function updateRoute() {
    let selectedStops = [];
    let stopsSelect = document.getElementById("routeStops");

    if (stopsSelect && stopsSelect.selectedOptions) {
        for (let i = 0; i < stopsSelect.selectedOptions.length; i++) {
            selectedStops.push(stopsSelect.selectedOptions[i].value);
        }
    }

    let route = {
        routeId: getVal("routeInputId"),
        routeName: getVal("routeName"),
        stopIds: selectedStops
    };

    fetch(API + "/route", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(route)
    })
    .then(function (res) {
        if (!res.ok) throw new Error("Failed to update route");
        alert("Route Updated Successfully");
        clearRoute();
        loadRoute();
    })
    .catch(function (err) { alert("Error: " + err.message); });
}

function deleteRoute() {
    let id = getVal("routeInputId");
    if (!id) return alert("Please specify a Route ID to delete.");

    fetch(API + "/route/" + id, { method: "DELETE" })
    .then(function (res) {
        if (!res.ok) throw new Error("Failed to delete route");
        alert("Route Deleted Successfully");
        clearRoute();
        loadRoute();
    })
    .catch(function (err) { alert("Error: " + err.message); });
}

function clearRoute() {
    if (document.getElementById("routeInputId")) document.getElementById("routeInputId").value = "";
    if (document.getElementById("routeName")) document.getElementById("routeName").value = "";
    if (document.getElementById("routeStops")) document.getElementById("routeStops").selectedIndex = -1;
}

/* ===========================
   SCHEDULE CRUD
=========================== */

function loadSchedule() {
    fetch(API + "/schedule")
        .then(function (res) { return res.json(); })
        .then(function (data) {
            let body = document.getElementById("scheduleTableBody");
            if (!body) return;
            body.innerHTML = "";

            data.forEach(function (schedule) {
                let rawDays = schedule.operatingDays || schedule.day;
                let dayVal = "";

                if (Array.isArray(rawDays)) {
                    dayVal = rawDays.join(", ");
                } else if (rawDays) {
                    dayVal = rawDays;
                }

                body.innerHTML += 
                '<tr>' +
                    '<td>' + schedule.scheduleId + '</td>' +
                    '<td>' + schedule.busId + '</td>' +
                    '<td>' + schedule.routeId + '</td>' +
                    '<td>' + schedule.departureTime + '</td>' +
                    '<td>' + schedule.arrivalTime + '</td>' +
                    '<td>' + dayVal + '</td>' +
                    '<td>' +
                        '<button class="btnUpdate" onclick="editSchedule(' +
                            '\'' + schedule.scheduleId + '\', ' +
                            '\'' + schedule.busId + '\', ' +
                            '\'' + schedule.routeId + '\', ' +
                            '\'' + schedule.departureTime + '\', ' +
                            '\'' + schedule.arrivalTime + '\', ' +
                            '\'' + dayVal + '\'' +
                        ')">Edit</button>' +
                    '</td>' +
                '</tr>';
            });
        })
        .catch(function (err) { console.error(err); });
}

function loadBusDropdown() {
    fetch(API + "/bus")
        .then(function (res) { return res.json(); })
        .then(function (data) {
            let select = document.getElementById("scheduleBusId");
            if (!select) return;
            select.innerHTML = '<option value="">-- Select Bus --</option>';

            data.forEach(function (bus) {
                select.innerHTML += '<option value="' + bus.busId + '">' + bus.busNumber + ' (' + bus.busName + ')</option>';
            });
        })
        .catch(function (err) { console.error(err); });
}

function loadRouteDropdown() {
    fetch(API + "/route")
        .then(function (res) { return res.json(); })
        .then(function (data) {
            let select = document.getElementById("scheduleRouteId");
            if (!select) return;
            select.innerHTML = '<option value="">-- Select Route --</option>';

            data.forEach(function (route) {
                select.innerHTML += '<option value="' + route.routeId + '">' + route.routeName + '</option>';
            });
        })
        .catch(function (err) { console.error(err); });
}

function addSchedule() {
    let depTime = getVal("departureTime");
    let arrTime = getVal("arrivalTime");

    if (depTime.length === 5) depTime += ":00";
    if (arrTime.length === 5) arrTime += ":00";

    let daySelected = getVal("day");

    let schedule = {
        scheduleId: getVal("scheduleId"),
        busId: getVal("scheduleBusId"),
        routeId: getVal("scheduleRouteId"),
        departureTime: depTime,
        arrivalTime: arrTime,
        operatingDays: daySelected ? [daySelected] : []
    };

    fetch(API + "/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(schedule)
    })
    .then(function (res) {
        if (!res.ok) return res.text().then(function(text) { throw new Error(text || "Failed to add schedule"); });
        alert("Schedule Added Successfully");
        clearSchedule();
        loadSchedule();
    })
    .catch(function (err) { alert("Error: " + err.message); });
}

function editSchedule(id, busId, routeId, departure, arrival, day) {
    if (document.getElementById("scheduleId")) document.getElementById("scheduleId").value = id;
    if (document.getElementById("scheduleBusId")) document.getElementById("scheduleBusId").value = busId;
    if (document.getElementById("scheduleRouteId")) document.getElementById("scheduleRouteId").value = routeId;
    if (document.getElementById("departureTime")) document.getElementById("departureTime").value = departure;
    if (document.getElementById("arrivalTime")) document.getElementById("arrivalTime").value = arrival;
    if (document.getElementById("day")) document.getElementById("day").value = day;
}

function updateSchedule() {
    let depTime = getVal("departureTime");
    let arrTime = getVal("arrivalTime");

    if (depTime.length === 5) depTime += ":00";
    if (arrTime.length === 5) arrTime += ":00";

    let daySelected = getVal("day");

    let schedule = {
        scheduleId: getVal("scheduleId"),
        busId: getVal("scheduleBusId"),
        routeId: getVal("scheduleRouteId"),
        departureTime: depTime,
        arrivalTime: arrTime,
        operatingDays: daySelected ? [daySelected] : []
    };

    fetch(API + "/schedule", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(schedule)
    })
    .then(function (res) {
        if (!res.ok) return res.text().then(function(text) { throw new Error(text || "Failed to update schedule"); });
        alert("Schedule Updated Successfully");
        clearSchedule();
        loadSchedule();
    })
    .catch(function (err) { alert("Error: " + err.message); });
}

function deleteSchedule() {
    let id = getVal("scheduleId");
    if (!id) return alert("Please specify a Schedule ID to delete.");

    fetch(API + "/schedule/" + id, { method: "DELETE" })
    .then(function (res) {
        if (!res.ok) return res.text().then(function(text) { throw new Error(text || "Failed to delete schedule"); });
        alert("Schedule Deleted Successfully");
        clearSchedule();
        loadSchedule();
    })
    .catch(function (err) { alert("Error: " + err.message); });
}

function clearSchedule() {
    if (document.getElementById("scheduleId")) document.getElementById("scheduleId").value = "";
    if (document.getElementById("departureTime")) document.getElementById("departureTime").value = "";
    if (document.getElementById("arrivalTime")) document.getElementById("arrivalTime").value = "";
    if (document.getElementById("day")) document.getElementById("day").selectedIndex = 0;
}

/* ===========================
   INITIAL LOAD
=========================== */

window.onload = function () {
    loadBus();
    loadRouteDropdownForBus();
    loadStop();
    loadRoute();
    loadStopsForRoute();
    loadSchedule();
    loadBusDropdown();
    loadRouteDropdown();
};