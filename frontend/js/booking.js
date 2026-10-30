// booking.js
//
// Handles the "Book a Room" form on booking.html.
// Use rooms.js as your reference for how to fetch data and build
// HTML with template strings.

async function populateRoomSelect() {
  const select = document.getElementById("room-select");

  // TODO:
  // 1. Call getRooms() from api.js
  const rooms = await getRooms();
  // 2. For each room, create an <option value="ROOM_ID">ROOM_NAME</option>
  for (const room of rooms) {
     const option = document.createElement("option");
     option.value = room.id;
     option.textContent = room.name;
  // 3. Append the options to `select`
     select.appendChild(option);
  }
}



function handleBookingSubmit(event) {
  event.preventDefault();

  // 1. Read the form values
  const roomId = document.getElementById("room-select").value;
  const clubName = document.getElementById("club-name").value;
  const date = document.getElementById("date").value;
  const startTime = document.getElementById("start-time").value;
  const endTime = document.getElementById("end-time").value;
  const purpose = document.getElementById("purpose").value;

  // 2. Build bookingData object
  const bookingData = {
    roomId: roomId,
    clubName: clubName,
    date: date,
    startTime: startTime,
    endTime: endTime,
    purpose: purpose
  };

  // 3. Log booking object to console
  console.log(bookingData);
}



document.addEventListener("DOMContentLoaded", () => {
  populateRoomSelect();
  document
    .getElementById("booking-form")
    .addEventListener("submit", handleBookingSubmit);
});
