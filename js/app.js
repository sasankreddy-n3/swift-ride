const pickupInput = document.getElementById("pickup");
const dropInput = document.getElementById("drop");
const typeSelect = document.getElementById("type");
const bookBtn = document.getElementById("bookBtn");
const rideList = document.getElementById("rideList");

/* CREATE */
bookBtn.addEventListener("click", () => {
  const pickup = pickupInput.value.trim();
  const drop = dropInput.value.trim();
  const type = typeSelect.value;

  if (!pickup || !drop) {
    alert("Please fill all fields");
    return;
  }

  const rides = getRides();
  rides.push({ pickup, drop, type });
  saveRides(rides);

  pickupInput.value = "";
  dropInput.value = "";

  renderRides();
});

/* READ */
function renderRides() {
  const rides = getRides();
  rideList.innerHTML = "";

  if (rides.length === 0) {
    rideList.innerHTML = "<p>No rides booked yet</p>";
    return;
  }

  rides.forEach((ride, index) => {
    const div = document.createElement("div");
    div.className = "ride";
    div.innerHTML = `
      <strong>${ride.type}</strong><br>
      ${ride.pickup} → ${ride.drop}<br>
      <button onclick="deleteRide(${index})">Cancel Ride</button>
    `;
    rideList.appendChild(div);
  });
}

/* DELETE */
function deleteRide(index) {
  const rides = getRides();
  rides.splice(index, 1);
  saveRides(rides);
  renderRides();
}

/* STORAGE */
function getRides() {
  return JSON.parse(localStorage.getItem("rides")) || [];
}

function saveRides(rides) {
  localStorage.setItem("rides", JSON.stringify(rides));
}

/* SCROLL */
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
}

/* INIT */
renderRides();
