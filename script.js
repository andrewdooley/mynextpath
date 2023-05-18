let station = "grove_street";

const dropdown = document.getElementById("myDropdown");
dropdown.addEventListener("change", function () {
  station = dropdown.value;
  const routeContainer = document.getElementById("route");
  const timesContainer = document.getElementById("time");
  routeContainer.innerHTML = "";
  timesContainer.innerHTML = "";

  fetchData();
});

function timeLeft(nextTrainTime) {
  const now = new Date();
  const futureDate = new Date(nextTrainTime);
  const diffMs = futureDate - now;
  const diffMins = Math.round(diffMs / 60000);
  return diffMins;
}

async function fetchData() {
  const url = `https://path.api.razza.dev/v1/stations/${station}/realtime`;

  const response = await fetch(url, { mode: "cors" });
  const data = await response.json();

  const routes = data.upcomingTrains.map((train) => {
    return train.headsign;
  });

  const times = data.upcomingTrains.map((train) => {
    const mins = timeLeft(train.projectedArrival);
    return mins;
  });

  const routeContainer = document.getElementById("route");

  routes.forEach((route) => {
    const routeDiv = document.createElement("p");
    routeDiv.setAttribute("id", "routeDiv");
    const p = document.createElement("p");
    const e = document.createElement("img");
    e.setAttribute("src", "images/train.png");
    e.setAttribute("id", "trainpic");
    p.innerHTML = route;
    routeDiv.appendChild(e);
    routeDiv.appendChild(p);
    routeContainer.appendChild(routeDiv);
  });

  const timesContainer = document.getElementById("time");
  times.forEach((time) => {
    const p = document.createElement("p");
    p.setAttribute("id", "timediv");
    p.innerHTML = time + " mins";
    timesContainer.appendChild(p);
  });
}

// newark
// harrison
// journal_square
// grove_street
// exchange_place
// world_trade_center
// newport
// hoboken
// christopher_street
// ninth_street
// fourteenth_street
// twenty_third_street
// thirty_third_street
