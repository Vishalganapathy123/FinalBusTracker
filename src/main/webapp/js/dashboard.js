
const API = `${window.location.origin}/BusTracker/api/admin`;
 
/* ===========================

   HELPER FUNCTIONS

=========================== */
 
const getVal = (id) => {

  const el = document.getElementById(id);

  return el ? el.value.trim() : "";

};
 
const setVal = (id, val) => {

  const el = document.getElementById(id);

  if (el) el.value = val ?? "";

};
 
/* Generic Helper to Populate Dropdowns */

const populateDropdown = (elementId, items, valueKey, labelKey, defaultText) => {

  const select = document.getElementById(elementId);

  if (!select) return;
 
  const options = items

    .map((item) => `<option value="${item[valueKey]}">${typeof labelKey === "function" ? labelKey(item) : item[labelKey]}</option>`)

    .join("");
 
  select.innerHTML = `<option value="">${defaultText}</option>${options}`;

};
 
/* ===========================

   TAB NAVIGATION

=========================== */
 
function showTab(tabId, evt) {

  document.querySelectorAll(".tabContent").forEach((tab) => {

    tab.style.display = "none";

  });
 
  document.querySelectorAll(".tabButton").forEach((btn) => {

    btn.classList.remove("active");

  });
 
  const targetTab = document.getElementById(tabId);

  if (targetTab) targetTab.style.display = "block";
 
  if (evt?.currentTarget) {

    evt.currentTarget.classList.add("active");

  }
 
  // Lazy load data based on selected tab

  switch (tabId) {

    case "bus":

      loadBus();

      loadRouteDropdownForBus();

      break;

    case "stop":

      loadStop();

      break;

    case "route":

      loadRoute();

      loadStopsForRoute();

      break;

    case "schedule":

      loadSchedule();

      loadBusDropdown();

      loadRouteDropdown();

      break;

  }

}
 
/* ===========================

   BUS CRUD

=========================== */
 
async function loadBus() {

  try {

    const res = await fetch(`${API}/bus`);

    if (!res.ok) throw new Error("Failed to load buses");

    const data = await res.json();
 
    const body = document.getElementById("busTableBody");

    if (!body) return;
 
    body.innerHTML = data

      .map((bus) => {

        const rId = bus.routeId || "";

        return `
<tr>
<td>${bus.busId}</td>
<td>${bus.busNumber}</td>
<td>${bus.busName}</td>
<td>${bus.busType}</td>
<td>${rId}</td>
<td>
<button class="btnUpdate" onclick="editBus('${bus.busId}', '${bus.busNumber}', '${bus.busName}', '${bus.busType}', '${rId}')">Edit</button>
</td>
</tr>

        `;

      })

      .join("");

  } catch (err) {

    console.error(err);

  }

}
 
async function loadRouteDropdownForBus() {

  try {

    const res = await fetch(`${API}/route`);

    const data = await res.json();

    populateDropdown("routeId", data, "routeId", "routeName", "-- Select Route --");

  } catch (err) {

    console.error(err);

  }

}
 
async function addBus() {

  const bus = {

    busId: getVal("busId"),

    busNumber: getVal("busNumber"),

    busName: getVal("busName"),

    busType: getVal("busType"),

    routeId: getVal("routeId")

  };
 
  try {

    const res = await fetch(`${API}/bus`, {

      method: "POST",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(bus)

    });

    if (!res.ok) throw new Error("Failed to add bus");

    alert("Bus Added Successfully");

    clearBus();

    loadBus();

  } catch (err) {

    alert(`Error: ${err.message}`);

  }

}
 
function editBus(id, number, name, type, route) {

  setVal("busId", id);

  setVal("busNumber", number);

  setVal("busName", name);

  setVal("busType", type);

  setVal("routeId", route);

}
 
async function updateBus() {

  const bus = {

    busId: getVal("busId"),

    busNumber: getVal("busNumber"),

    busName: getVal("busName"),

    busType: getVal("busType"),

    routeId: getVal("routeId")

  };
 
  try {

    const res = await fetch(`${API}/bus`, {

      method: "PUT",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(bus)

    });

    if (!res.ok) throw new Error("Failed to update bus");
 
    alert("Bus Updated Successfully");

    clearBus();

    loadBus();

  } catch (err) {

    alert(`Error: ${err.message}`);

  }

}
 
async function deleteBus() {

  const id = getVal("busId");

  if (!id) return alert("Please specify a Bus ID to delete.");
 
  try {

    const res = await fetch(`${API}/bus/${id}`, { method: "DELETE" });

    if (!res.ok) throw new Error("Failed to delete bus");
 
    alert("Bus Deleted Successfully");

    clearBus();

    loadBus();

  } catch (err) {

    alert(`Error: ${err.message}`);

  }

}
 
function clearBus() {

  setVal("busId", "");

  setVal("busNumber", "");

  setVal("busName", "");

  const busType = document.getElementById("busType");

  if (busType) busType.selectedIndex = 0;
 
  const routeId = document.getElementById("routeId");

  if (routeId) routeId.selectedIndex = 0;

}
 
/* ===========================

   STOP CRUD

=========================== */
 
async function loadStop() {

  try {

    const res = await fetch(`${API}/stop`);

    const data = await res.json();
 
    const body = document.getElementById("stopTableBody");

    if (!body) return;
 
    body.innerHTML = data

      .map(

        (stop) => `
<tr>
<td>${stop.stopId}</td>
<td>${stop.stopName}</td>
<td>
<button class="btnUpdate" onclick="editStop('${stop.stopId}', '${stop.stopName}')">Edit</button>
</td>
</tr>

      `

      )

      .join("");

  } catch (err) {

    console.error(err);

  }

}
 
async function addStop() {

  const stop = {

    stopId: getVal("stopId"),

    stopName: getVal("stopName")

  };
 
  try {

    const res = await fetch(`${API}/stop`, {

      method: "POST",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(stop)

    });

    if (!res.ok) throw new Error("Failed to add stop");
 
    alert("Stop Added Successfully");

    clearStop();

    loadStop();

  } catch (err) {

    alert(`Error: ${err.message}`);

  }

}
 
function editStop(id, name) {

  setVal("stopId", id);

  setVal("stopName", name);

}
 
async function updateStop() {

  const stop = {

    stopId: getVal("stopId"),

    stopName: getVal("stopName")

  };
 
  try {

    const res = await fetch(`${API}/stop`, {

      method: "PUT",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(stop)

    });

    if (!res.ok) throw new Error("Failed to update stop");
 
    alert("Stop Updated Successfully");

    clearStop();

    loadStop();

  } catch (err) {

    alert(`Error: ${err.message}`);

  }

}
 
async function deleteStop() {

  const id = getVal("stopId");

  if (!id) return alert("Please specify a Stop ID to delete.");
 
  try {

    const res = await fetch(`${API}/stop/${id}`, { method: "DELETE" });

    if (!res.ok) throw new Error("Failed to delete stop");
 
    alert("Stop Deleted Successfully");

    clearStop();

    loadStop();

  } catch (err) {

    alert(`Error: ${err.message}`);

  }

}
 
function clearStop() {

  setVal("stopId", "");

  setVal("stopName", "");

}
 
/* ===========================

   ROUTE CRUD

=========================== */
 
async function loadRoute() {

  try {

    const res = await fetch(`${API}/route`);

    const data = await res.json();
 
    const body = document.getElementById("routeTableBody");

    if (!body) return;
 
    body.innerHTML = data

      .map((route) => {

        const stops = Array.isArray(route.stopIds) ? route.stopIds.join(", ") : "";

        return `
<tr>
<td>${route.routeId}</td>
<td>${route.routeName}</td>
<td>${stops}</td>
<td>
<button class="btnUpdate" onclick="editRoute('${route.routeId}', '${route.routeName}')">Edit</button>
</td>
</tr>

        `;

      })

      .join("");

  } catch (err) {

    console.error(err);

  }

}
 
async function loadStopsForRoute() {

  try {

    const res = await fetch(`${API}/stop`);

    const data = await res.json();
 
    const select = document.getElementById("routeStops");

    if (!select) return;
 
    select.innerHTML = data

      .map((stop) => `<option value="${stop.stopId}">${stop.stopName}</option>`)

      .join("");

  } catch (err) {

    console.error(err);

  }

}
 
const getSelectedStops = () => {

  const stopsSelect = document.getElementById("routeStops");

  if (!stopsSelect) return [];

  return Array.from(stopsSelect.selectedOptions).map((opt) => opt.value);

};
 
async function addRoute() {

  const route = {

    routeId: getVal("routeInputId"),

    routeName: getVal("routeName"),

    stopIds: getSelectedStops()

  };
 
  try {

    const res = await fetch(`${API}/route`, {

      method: "POST",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(route)

    });

    if (!res.ok) throw new Error("Failed to add route");
 
    alert("Route Added Successfully");

    clearRoute();

    loadRoute();

  } catch (err) {

    alert(`Error: ${err.message}`);

  }

}
 
function editRoute(id, name) {

  setVal("routeInputId", id);

  setVal("routeName", name);

}
 
async function updateRoute() {

  const route = {

    routeId: getVal("routeInputId"),

    routeName: getVal("routeName"),

    stopIds: getSelectedStops()

  };
 
  try {

    const res = await fetch(`${API}/route`, {

      method: "PUT",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(route)

    });

    if (!res.ok) throw new Error("Failed to update route");
 
    alert("Route Updated Successfully");

    clearRoute();

    loadRoute();

  } catch (err) {

    alert(`Error: ${err.message}`);

  }

}
 
async function deleteRoute() {

  const id = getVal("routeInputId");

  if (!id) return alert("Please specify a Route ID to delete.");
 
  try {

    const res = await fetch(`${API}/route/${id}`, { method: "DELETE" });

    if (!res.ok) throw new Error("Failed to delete route");
 
    alert("Route Deleted Successfully");

    clearRoute();

    loadRoute();

  } catch (err) {

    alert(`Error: ${err.message}`);

  }

}
 
function clearRoute() {

  setVal("routeInputId", "");

  setVal("routeName", "");

  const stopsSelect = document.getElementById("routeStops");

  if (stopsSelect) stopsSelect.selectedIndex = -1;

}
 
/* ===========================

   SCHEDULE CRUD

=========================== */
 
async function loadSchedule() {

  try {

    const res = await fetch(`${API}/schedule`);

    const data = await res.json();
 
    const body = document.getElementById("scheduleTableBody");

    if (!body) return;
 
    body.innerHTML = data

      .map((schedule) => {

        const rawDays = schedule.operatingDays || schedule.day;

        const dayVal = Array.isArray(rawDays) ? rawDays.join(", ") : rawDays || "";
 
        return `
<tr>
<td>${schedule.scheduleId}</td>
<td>${schedule.busId}</td>
<td>${schedule.routeId}</td>
<td>${schedule.departureTime}</td>
<td>${schedule.arrivalTime}</td>
<td>${dayVal}</td>
<td>
<button class="btnUpdate" onclick="editSchedule('${schedule.scheduleId}', '${schedule.busId}', '${schedule.routeId}', '${schedule.departureTime}', '${schedule.arrivalTime}', '${dayVal}')">Edit</button>
</td>
</tr>

        `;

      })

      .join("");

  } catch (err) {

    console.error(err);

  }

}
 
async function loadBusDropdown() {

  try {

    const res = await fetch(`${API}/bus`);

    const data = await res.json();

    populateDropdown("scheduleBusId", data, "busId", (b) => `${b.busNumber} (${b.busName})`, "-- Select Bus --");

  } catch (err) {

    console.error(err);

  }

}
 
async function loadRouteDropdown() {

  try {

    const res = await fetch(`${API}/route`);

    const data = await res.json();

    populateDropdown("scheduleRouteId", data, "routeId", "routeName", "-- Select Route --");

  } catch (err) {

    console.error(err);

  }

}
 
const formatTime = (timeStr) => (timeStr.length === 5 ? `${timeStr}:00` : timeStr);
 
async function addSchedule() {

  const daySelected = getVal("day");
 
  const schedule = {

    scheduleId: getVal("scheduleId"),

    busId: getVal("scheduleBusId"),

    routeId: getVal("scheduleRouteId"),

    departureTime: formatTime(getVal("departureTime")),

    arrivalTime: formatTime(getVal("arrivalTime")),

    operatingDays: daySelected ? [daySelected] : []

  };
 
  try {

    const res = await fetch(`${API}/schedule`, {

      method: "POST",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(schedule)

    });
 
    if (!res.ok) {

      const errorText = await res.text();

      throw new Error(errorText || "Failed to add schedule");

    }
 
    alert("Schedule Added Successfully");

    clearSchedule();

    loadSchedule();

  } catch (err) {

    alert(`Error: ${err.message}`);

  }

}
 
function editSchedule(id, busId, routeId, departure, arrival, day) {

  setVal("scheduleId", id);

  setVal("scheduleBusId", busId);

  setVal("scheduleRouteId", routeId);

  setVal("departureTime", departure);

  setVal("arrivalTime", arrival);

  setVal("day", day);

}
 
async function updateSchedule() {

  const daySelected = getVal("day");
 
  const schedule = {

    scheduleId: getVal("scheduleId"),

    busId: getVal("scheduleBusId"),

    routeId: getVal("scheduleRouteId"),

    departureTime: formatTime(getVal("departureTime")),

    arrivalTime: formatTime(getVal("arrivalTime")),

    operatingDays: daySelected ? [daySelected] : []

  };
 
  try {

    const res = await fetch(`${API}/schedule`, {

      method: "PUT",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(schedule)

    });
 
    if (!res.ok) {

      const errorText = await res.text();

      throw new Error(errorText || "Failed to update schedule");

    }
 
    alert("Schedule Updated Successfully");

    clearSchedule();

    loadSchedule();

  } catch (err) {

    alert(`Error: ${err.message}`);

  }

}
 
async function deleteSchedule() {

  const id = getVal("scheduleId");

  if (!id) return alert("Please specify a Schedule ID to delete.");
 
  try {

    const res = await fetch(`${API}/schedule/${id}`, { method: "DELETE" });
 
    if (!res.ok) {

      const errorText = await res.text();

      throw new Error(errorText || "Failed to delete schedule");

    }
 
    alert("Schedule Deleted Successfully");

    clearSchedule();

    loadSchedule();

  } catch (err) {

    alert(`Error: ${err.message}`);

  }

}
 
function clearSchedule() {

  setVal("scheduleId", "");

  setVal("departureTime", "");

  setVal("arrivalTime", "");
 
  const day = document.getElementById("day");

  if (day) day.selectedIndex = 0;

}
 
/* ===========================

   INITIAL LOAD

=========================== */
 
window.addEventListener("DOMContentLoaded", () => {

  loadBus();

  loadRouteDropdownForBus();

  loadStop();

  loadRoute();

  loadStopsForRoute();

  loadSchedule();

  loadBusDropdown();

  loadRouteDropdown();

});
 
