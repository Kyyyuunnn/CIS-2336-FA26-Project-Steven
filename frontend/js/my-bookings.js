// my-bookings.js
//
// Renders the list of bookings on my-bookings.html and lets the
// user cancel a booking. Use rooms.js as your reference.

async function renderBookings() {
    const container = document.getElementById("bookings-list");

    // TODO:
    // 1. Call getBookings() from api.js
    const bookings = await getBookings();

    // 2. If there are no bookings, show a friendly message
    if (bookings.length === 0) {
        container.innerHTML = "<p>You currently have no bookings.</p>";
        return;
    }
    // 3. Otherwise, build one .booking-item div per booking, each with:
    //    - room name / id, club name, date, start-end time, purpose
    //    - a "Cancel" button with a data-id attribute set to the booking id
    else {
        let html = "";

        for (const booking of bookings) {
            const room = await getRoomById(booking.roomId);

            html += '<div class="booking-item">';
            html += `<p>Room: ${room ? room.name : "Unknown Room"} (ID: ${booking.roomId})</p>`;
            html += `<p>Club: ${booking.clubName}</p>`;
            html += `<p>Date: ${booking.date}</p>`;
            html += `<p>Time: ${booking.startTime} - ${booking.endTime}</p>`;
            html += `<p>Purpose: ${booking.purpose}</p>`;
            html += `<button class="cancel-button" data-id="${booking.id}">Cancel</button>`;
            html += '</div>';
        }

        // 4. Set container.innerHTML to the joined HTML
        container.innerHTML = html;

        // 5. Attach click listeners to each "Cancel" button that call
        //    handleCancelClick(bookingId)
        const cancelButtons = container.querySelectorAll(".cancel-button");

        for (const button of cancelButtons) {
            button.addEventListener("click", () => {
                const bookingId = button.getAttribute("data-id");
                handleCancelClick(bookingId);
            });
        }
    }
}

async function handleCancelClick(bookingId) {
  // TODO:
  // 1. Call deleteBooking(bookingId) from api.js
  await deleteBooking(bookingId);
  // 2. Re-render the bookings list (call renderBookings() again)
  await renderBookings();
}

document.addEventListener("DOMContentLoaded", renderBookings);
