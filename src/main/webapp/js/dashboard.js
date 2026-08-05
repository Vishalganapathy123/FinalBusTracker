[3:58 PM] Madhumitha M
var API = window.location.origin + "/BusTracker/api/admin";
 
/* ===========================
   HELPER FUNCTIONS
=========================== */
 
function getVal(id) {
  var el = document.getElementById(id);
  return el ? el.value.trim() : "";
}
 
function setVal(id, val) {
  var el = document.getElementById(id);
  if (el) el.value = (val !== null && val !== undefined) ? val : "";
}
 
// Sanitizes text to safely insert inside HTML string templates
function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
 
/* Generic Helper to Populate Dropdowns */
function populateDropdown(elementId, items, valueKey, labelKey, defaultText) {
  var select = document.getElementById(elementId);
  if (!select) return;
 
  var options = items
    .map(function(item) {
      var val = escapeHtml(item[valueKey]);
      var lblText = (typeof labelKey === "function") ? labelKey(item) : item[labelKey];
      var lbl = escapeHtml(lblText);
      return '<option value="' + val + '">' + lbl + '</option>';
    })
    .join("");
 
  select.innerHTML = '<option value="">' + escapeHtml(defaultText) + '</option>' + options;
}
 
/* ===========================
   TAB NAVIGATION
=========================== */
 
function showTab(tabId, evt) {
  var tabs = document.querySelectorAll(".tabContent");
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].style.display = "none";
  }
 
  var btns = document.querySelectorAll(".tabButton");
  for (var j = 0; j < btns.length; j++) {
    btns[j].classList.remove("active");
  }
 
  var targetTab = document.getElementById(tabId);
  if (targetTab) targetTab.style.display = "block";
 
  if (evt && evt.currentTarget) {
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
 
function loadBus() {
  fetch(API + "/bus")
    .then(function(res) {
      if (!res.ok) throw new Error("Failed to load buses");
      return res.json();
    })
    .then(function(data) {
      var body = document.getElementById("busTableBody");
      if (!body) return;
 
      body.innerHTML = data
        .map(function(bus) {
          var rId = bus.routeId || "";
          return (
            "<tr>" +
            "<td>" + escapeHtml(bus.busId) + "</td>" +
            "<td>" + escapeHtml(bus.busNumber) + "</td>" +
            "<td>" + escapeHtml(bus.busName) + "</td>" +
            "<td>" + escapeHtml(bus.busType) + "</td>" +
            "<td>" + escapeHtml(rId) + "</td>" +
            "<td>" +
            '<button class="btnUpdate" ' +
            'data-id="' + escapeHtml(bus.busId) + '" ' +
            'data-number="' + escapeHtml(bus.busNumber) + '" ' +
            'data-name="' + escapeHtml(bus.busName) + '" ' +
            'data-type="' + escapeHtml(bus.busType) + '" ' +
            'data-route="' + escapeHtml(rId) + '" ' +
            'onclick="handleEditBus(this)">Edit</button>' +
            "</td>" +
            "</tr>"
          );
        })
        .join("");
    })
    .catch(function(err) {
      console.error(err);
    });
}
 
function handleEditBus(btn) {
  var d = btn.dataset;
  editBus(d.id, d.number, d.name, d.type, d.route);
}
 
function editBus(id, number, name, type, route) {
  setVal("busId", id);
  setVal("busNumber", number);
  setVal("busName", name);
  setVal("busType", type);
  setVal("routeId", route);
}
 
function loadRouteDropdownForBus() {
  fetch(API + "/route")
    .then(function(res) { return res.json(); })
    .then(function(data) {
      populateDropdown("routeId", data, "routeId", "routeName", "-- Select Route --");
    })
    .catch(function(err) {
      console.error(err);
    });
}
 
function addBus() {
  var bus = {
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
    .then(function(res) {
      if (!res.ok) throw new Error("Failed to add bus");
      alert("Bus Added Successfully");
      clearBus();
      loadBus();
    })
    .catch(function(err) {
      alert("Error: " + err.message);
    });
}
 
function updateBus() {
  var bus = {
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
    .then(function(res) {
      if (!res.ok) throw new Error("Failed to update bus");
      alert("Bus Updated Successfully");
      clearBus();
      loadBus();
    })
    .catch(function(err) {
      alert("Error: " + err.message);
    });
}
 
function deleteBus() {
  var id = getVal("busId");
  if (!id) return alert("Please specify a Bus ID to delete.");
 
  fetch(API + "/bus/" + id, { method: "DELETE" })
    .then(function(res) {
      if (!res.ok) throw new Error("Failed to delete bus");
      alert("Bus Deleted Successfully");
      clearBus();
      loadBus();
    })
    .catch(function(err) {
      alert("Error: " + err.message);
    });
}
 
function clearBus() {
  setVal("busId", "");
  setVal("busNumber", "");
  setVal("busName", "");
 
  var busType = document.getElementById("busType");
  if (busType) busType.selectedIndex = 0;
 
  var routeId = document.getElementById("routeId");
  if (routeId) routeId.selectedIndex = 0;
}
 
/* ===========================
   STOP CRUD
=========================== */
 
function loadStop() {
  fetch(API + "/stop")
    .then(function(res) { return res.json(); })
    .then(function(data) {
      var body = document.getElementById("stopTableBody");
      if (!body) return;
 
      body.innerHTML = data
        .map(function(stop) {
          return (
            "<tr>" +
            "<td>" + escapeHtml(stop.stopId) + "</td>" +
            "<td>" + escapeHtml(stop.stopName) + "</td>" +
            "<td>" +
            '<button class="btnUpdate" ' +
            'data-id="' + escapeHtml(stop.stopId) + '" ' +
            'data-name="' + escapeHtml(stop.stopName) + '" ' +
            'onclick="editStop(this.dataset.id, this.dataset.name)">Edit</button>' +
            "</td>" +
            "</tr>"
          );
        })
        .join("");
    })
    .catch(function(err) {
      console.error(err);
    });
}
 
function addStop() {
  var stop = {
    stopId: getVal("stopId"),
    stopName: getVal("stopName")
  };
 
  fetch(API + "/stop", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stop)
  })
    .then(function(res) {
      if (!res.ok) throw new Error("Failed to add stop");
      alert("Stop Added Successfully");
      clearStop();
      loadStop();
    })
    .catch(function(err) {
      alert("Error: " + err.message);
    });
}
 
function editStop(id, name) {
  setVal("stopId", id);
  setVal("stopName", name);
}
 
function updateStop() {
  var stop = {
    stopId: getVal("stopId"),
    stopName: getVal("stopName")
  };
 
  fetch(API + "/stop", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(stop)
  })
    .then(function(res) {
      if (!res.ok) throw new Error("Failed to update stop");
      alert("Stop Updated Successfully");
      clearStop();
      loadStop();
    })
    .catch(function(err) {
      alert("Error: " + err.message);
    });
}
[3:58 PM] Madhumitha M
function deleteStop() {
  var id = getVal("stopId");
  if (!id) return alert("Please specify a Stop ID to delete.");
 
  fetch(API + "/stop/" + id, { method: "DELETE" })
    .then(function(res) {
      if (!res.ok) throw new Error("Failed to delete stop");
      alert("Stop Deleted Successfully");
      clearStop();
      loadStop();
    })
    .catch(function(err) {
      alert("Error: " + err.message);
    });
}
 
function clearStop() {
  setVal("stopId", "");
  setVal("stopName", "");
}
 
/* ===========================
   ROUTE CRUD
=========================== */
 
function loadRoute() {
  fetch(API + "/route")
    .then(function(res) {
      if (!res.ok) throw new Error("Failed to load routes");
      return res.json();
    })
    .then(function(data) {
      var body = document.getElementById("routeTableBody");
      if (!body) return;
 
      body.innerHTML = data
        .map(function(route) {
          var stops = "";
          if (route.routeStops) {
            stops = route.routeStops
              .sort(function(a, b) { return a.stopOrder - b.stopOrder; })
              .map(function(s) {
                return escapeHtml(s.stopName) + " (" + s.distanceFromPrevious + " km)";
              })
              .join(" ➜ ");
          }
 
          return (
            "<tr>" +
            "<td>" + escapeHtml(route.routeId) + "</td>" +
            "<td>" + escapeHtml(route.routeName) + "</td>" +
            "<td>" + route.distance + "</td>" +
            "<td>" + stops + "</td>" +
            "<td>" +
            '<button class="btnUpdate" ' +
            'data-id="' + escapeHtml(route.routeId) + '" ' +
            'onclick="editRoute(this.dataset.id)">Edit</button>' +
            "</td>" +
            "</tr>"
          );
        })
        .join("");
    })
    .catch(function(err) {
      console.error(err);
    });
}
 
function loadStopsForRoute() {
  fetch(API + "/stop")
    .then(function(res) { return res.json(); })
    .then(function(data) {
      var tbody = document.getElementById("routeStopsBody");
      if (!tbody) return;
 
      tbody.innerHTML = data
        .map(function(stop, index) {
          return (
            "<tr>" +
            '<td><input type="checkbox" value="' + escapeHtml(stop.stopId) + '" data-name="' + escapeHtml(stop.stopName) + '"></td>' +
            "<td>" + escapeHtml(stop.stopName) + "</td>" +
            '<td><input type="number" class="stopOrder" value="' + (index + 1) + '" min="1"></td>' +
            '<td><input type="number" class="distancePrev" value="' + (index === 0 ? 0 : "") + '" min="0"></td>' +
            "</tr>"
          );
        })
        .join("");
    })
    .catch(function(err) {
      console.error(err);
    });
}
 
function getRouteStops() {
  var rows = document.querySelectorAll("#routeStopsBody tr");
  var routeStops = [];
 
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var checkBox = row.querySelector("input[type='checkbox']");
    if (checkBox && checkBox.checked) {
      var orderEl = row.querySelector(".stopOrder");
      var distEl = row.querySelector(".distancePrev");
 
      routeStops.push({
        stopId: checkBox.value,
        stopName: checkBox.dataset.name,
        stopOrder: parseInt(orderEl ? orderEl.value : 0, 10),
        distanceFromPrevious: parseFloat(distEl ? (distEl.value || 0) : 0)
      });
    }
  }
 
  return routeStops;
}
 
function addRoute() {
  var route = {
    routeId: getVal("routeInputId"),
    routeName: getVal("routeName"),
    distance: parseFloat(getVal("distance")) || 0,
    routeStops: getRouteStops()
  };
 
  fetch(API + "/route", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(route)
  })
    .then(function(res) {
      if (!res.ok) throw new Error("Failed to add route");
      alert("Route Added Successfully");
      clearRoute();
      loadRoute();
    })
    .catch(function(err) {
      alert(err.message);
    });
}
 
function editRoute(routeId) {
  fetch(API + "/route/" + routeId)
    .then(function(res) {
      if (!res.ok) throw new Error("Route not found");
      return res.json();
    })
    .then(function(route) {
      setVal("routeInputId", route.routeId);
      setVal("routeName", route.routeName);
      setVal("distance", route.distance);
 
      var rows = document.querySelectorAll("#routeStopsBody tr");
      for (var i = 0; i < rows.length; i++) {
        var row = rows[i];
        var chk = row.querySelector("input[type='checkbox']");
        if (chk) chk.checked = false;
        var order = row.querySelector(".stopOrder");
        if (order) order.value = "";
        var dist = row.querySelector(".distancePrev");
        if (dist) dist.value = "";
      }
 
      if (route.routeStops) {
        route.routeStops.forEach(function(stop) {
          for (var j = 0; j < rows.length; j++) {
            var r = rows[j];
            var c = r.querySelector("input[type='checkbox']");
            if (c && c.value === stop.stopId) {
              c.checked = true;
              var o = r.querySelector(".stopOrder");
              if (o) o.value = stop.stopOrder;
              var d = r.querySelector(".distancePrev");
              if (d) d.value = stop.distanceFromPrevious;
            }
          }
        });
      }
    })
    .catch(function(err) {
      alert(err.message);
    });
}
 
function updateRoute() {
  var route = {
    routeId: getVal("routeInputId"),
    routeName: getVal("routeName"),
    distance: parseFloat(getVal("distance")) || 0,
    routeStops: getRouteStops()
  };
 
  fetch(API + "/route", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(route)
  })
    .then(function(res) {
      if (!res.ok) throw new Error("Failed to update route");
      alert("Route Updated Successfully");
      clearRoute();
      loadRoute();
    })
    .catch(function(err) {
      alert(err.message);
    });
}
 
function deleteRoute() {
  var id = getVal("routeInputId");
  if (!id) return alert("Please specify a Route ID to delete.");
 
  fetch(API + "/route/" + id, { method: "DELETE" })
    .then(function(res) {
      if (!res.ok) throw new Error("Failed to delete route");
      alert("Route Deleted Successfully");
      clearRoute();
      loadRoute();
    })
    .catch(function(err) {
      alert("Error: " + err.message);
    });
}
 
function clearRoute() {
  setVal("routeInputId", "");
  setVal("routeName", "");
  setVal("distance", "");
 
  var rows = document.querySelectorAll("#routeStopsBody tr");
  for (var i = 0; i < rows.length; i++) {
    var row = rows[i];
    var chk = row.querySelector("input[type='checkbox']");
    if (chk) chk.checked = false;
    var order = row.querySelector(".stopOrder");
    if (order) order.value = "";
    var dist = row.querySelector(".distancePrev");
    if (dist) dist.value = "";
  }
}
 [3:58 PM] Madhumitha M
 
/* ===========================
   SCHEDULE CRUD
=========================== */
 
function loadSchedule() {
  fetch(API + "/schedule")
    .then(function(res) { return res.json(); })
    .then(function(data) {
      var body = document.getElementById("scheduleTableBody");
      if (!body) return;
 
      body.innerHTML = data
        .map(function(schedule) {
          var rawDays = schedule.operatingDays || schedule.day;
          var dayVal = Array.isArray(rawDays) ? rawDays.join(", ") : (rawDays || "");
 
          return (
            "<tr>" +
            "<td>" + escapeHtml(schedule.scheduleId) + "</td>" +
            "<td>" + escapeHtml(schedule.busId) + "</td>" +
            "<td>" + escapeHtml(schedule.routeId) + "</td>" +
            "<td>" + escapeHtml(schedule.departureTime) + "</td>" +
            "<td>" + escapeHtml(schedule.arrivalTime) + "</td>" +
            "<td>" + escapeHtml(dayVal) + "</td>" +
            "<td>" +
            '<button class="btnUpdate" ' +
            'data-id="' + escapeHtml(schedule.scheduleId) + '" ' +
            'data-bus="' + escapeHtml(schedule.busId) + '" ' +
            'data-route="' + escapeHtml(schedule.routeId) + '" ' +
            'data-dep="' + escapeHtml(schedule.departureTime) + '" ' +
            'data-arr="' + escapeHtml(schedule.arrivalTime) + '" ' +
            'data-day="' + escapeHtml(dayVal) + '" ' +
            'onclick="handleEditSchedule(this)">Edit</button>' +
            "</td>" +
            "</tr>"
          );
        })
        .join("");
    })
    .catch(function(err) {
      console.error(err);
    });
}
 
function handleEditSchedule(btn) {
  var d = btn.dataset;
  editSchedule(d.id, d.bus, d.route, d.dep, d.arr, d.day);
}
 
function loadBusDropdown() {
  fetch(API + "/bus")
    .then(function(res) { return res.json(); })
    .then(function(data) {
      populateDropdown(
        "scheduleBusId",
        data,
        "busId",
        function(b) { return b.busNumber + " (" + b.busName + ")"; },
        "-- Select Bus --"
      );
    })
    .catch(function(err) {
      console.error(err);
    });
}
 
function loadRouteDropdown() {
  fetch(API + "/route")
    .then(function(res) { return res.json(); })
    .then(function(data) {
      populateDropdown("scheduleRouteId", data, "routeId", "routeName", "-- Select Route --");
    })
    .catch(function(err) {
      console.error(err);
    });
}
 
function formatTime(timeStr) {
  return (timeStr && timeStr.length === 5) ? timeStr + ":00" : (timeStr || "");
}
 
function addSchedule() {
  var daySelected = getVal("day");
 
  var schedule = {
    scheduleId: getVal("scheduleId"),
    busId: getVal("scheduleBusId"),
    routeId: getVal("scheduleRouteId"),
    departureTime: formatTime(getVal("departureTime")),
    arrivalTime: formatTime(getVal("arrivalTime")),
    operatingDays: daySelected ? [daySelected] : []
  };
 
  fetch(API + "/schedule", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(schedule)
  })
    .then(function(res) {
      if (!res.ok) {
        return res.text().then(function(text) {
          throw new Error(text || "Failed to add schedule");
        });
      }
      alert("Schedule Added Successfully");
      clearSchedule();
      loadSchedule();
    })
    .catch(function(err) {
      alert("Error: " + err.message);
    });
}
 
function editSchedule(id, busId, routeId, departure, arrival, day) {
  setVal("scheduleId", id);
  setVal("scheduleBusId", busId);
  setVal("scheduleRouteId", routeId);
  setVal("departureTime", departure);
  setVal("arrivalTime", arrival);
  setVal("day", day);
}
 
function updateSchedule() {
  var daySelected = getVal("day");
 
  var schedule = {
    scheduleId: getVal("scheduleId"),
    busId: getVal("scheduleBusId"),
    routeId: getVal("scheduleRouteId"),
    departureTime: formatTime(getVal("departureTime")),
    arrivalTime: formatTime(getVal("arrivalTime")),
    operatingDays: daySelected ? [daySelected] : []
  };
 
  fetch(API + "/schedule", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(schedule)
  })
    .then(function(res) {
      if (!res.ok) {
        return res.text().then(function(text) {
          throw new Error(text || "Failed to update schedule");
        });
      }
      alert("Schedule Updated Successfully");
      clearSchedule();
      loadSchedule();
    })
    .catch(function(err) {
      alert("Error: " + err.message);
    });
}
 
function deleteSchedule() {
  var id = getVal("scheduleId");
  if (!id) return alert("Please specify a Schedule ID to delete.");
 
  fetch(API + "/schedule/" + id, { method: "DELETE" })
    .then(function(res) {
      if (!res.ok) {
        return res.text().then(function(text) {
          throw new Error(text || "Failed to delete schedule");
        });
      }
      alert("Schedule Deleted Successfully");
      clearSchedule();
      loadSchedule();
    })
    .catch(function(err) {
      alert("Error: " + err.message);
    });
}
 
function clearSchedule() {
  setVal("scheduleId", "");
  setVal("departureTime", "");
  setVal("arrivalTime", "");
 
  var busSelect = document.getElementById("scheduleBusId");
  if (busSelect) busSelect.selectedIndex = 0;
 
  var routeSelect = document.getElementById("scheduleRouteId");
  if (routeSelect) routeSelect.selectedIndex = 0;
 
  var day = document.getElementById("day");
  if (day) day.selectedIndex = 0;
}
 
/* ===========================
   INITIAL LOAD
=========================== */
 
window.addEventListener("DOMContentLoaded", function() {
  loadBus();
  loadRouteDropdownForBus();
});
  
 
 
