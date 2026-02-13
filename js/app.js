const rides = document.querySelectorAll(".ride");
const bookBtn = document.getElementById("bookRideBtn");
const rideList = document.getElementById("rideList");

let selectedRide = "Bike";

// Load rides on page load
document.addEventListener("DOMContentLoaded", loadRides);

// Ride type selection
rides.forEach(ride => {
  ride.addEventListener("click", () => {
    rides.forEach(r => r.classList.remove("active"));
    ride.classList.add("active");
    selectedRide = ride.dataset.type;
  });
});

// Book ride
bookBtn.addEventListener("click", () => {
  const pickup = document.getElementById("pickup").value;
  const drop = document.getElementById("drop").value;

  if (!pickup || !drop) {
    alert("Please fill all fields");
    return;
  }

  const ride = {
    id: Date.now(),
    pickup,
    drop,
    type: selectedRide,
    status: "Booked"
  };

  const ridesData = getRides();
  ridesData.push(ride);
  localStorage.setItem("rides", JSON.stringify(ridesData));

  document.getElementById("pickup").value = "";
  document.getElementById("drop").value = "";

  loadRides();
});

// Get rides
function getRides() {
  return JSON.parse(localStorage.getItem("rides")) || [];
}

// Load rides
function loadRides() {
  rideList.innerHTML = "";
  const ridesData = getRides();

  ridesData.forEach(ride => {
    const div = document.createElement("div");
    div.className = "ride-card";
    div.innerHTML = `
      <strong>${ride.type}</strong><br>
      ${ride.pickup} → ${ride.drop}<br>
      Status: ${ride.status}<br>
      <button class="delete-btn" onclick="deleteRide(${ride.id})">Cancel</button>
    `;
    rideList.appendChild(div);
  });
}

// Delete ride
function deleteRide(id) {
  let ridesData = getRides();
  ridesData = ridesData.filter(r => r.id !== id);
  localStorage.setItem("rides", JSON.stringify(ridesData));
  loadRides();
}
