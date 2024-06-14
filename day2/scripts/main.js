// Class to represent a reservation
class Reservation {
    constructor(name, date, time, guests) {
        this.name = name;
        this.date = date;
        this.time = time;
        this.guests = guests;
    }
}

// Class to manage reservations
class ReservationManager {
    constructor() {
        // Load reservations from local storage or initialize an empty array
        this.reservations = this.loadReservations();
        // Reference to the table body element
        this.tableBody = document.querySelector('#reservations-table tbody');
        // Display reservations on page load
        this.displayReservations();
    }

    // Method to add a reservation
    addReservation(reservation) {
        this.reservations.push(reservation);
        this.saveReservations();
        this.displayReservation(reservation);
    }

    displayReservations() {
        this.tableBody.innerHTML = '';
        this.reservations.forEach(reservation => this.displayReservation(reservation));
    }

    displayReservation(reservation) {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${reservation.name}</td>
            <td>${reservation.date}</td>
            <td>${reservation.time}</td>
            <td>${reservation.guests}</td>
            <td><button onclick="reservationManager.deleteReservation('${reservation.name}')">Delete</button></td>
        `;
        this.tableBody.appendChild(row);
    }

    deleteReservation(name) {
        this.reservations = this.reservations.filter(reservation => reservation.name !== name);
        this.saveReservations();
        this.displayReservations();
    }

    saveReservations() {
        localStorage.setItem('reservations', JSON.stringify(this.reservations));
    }

    loadReservations() {
        const reservations = localStorage.getItem('reservations');
        return reservations ? JSON.parse(reservations) : [];
    }
}

// Initialize the ReservationManager instance
const reservationManager = new ReservationManager();

// Event listener for form submission to add a reservation
document.getElementById('reservation-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const guests = document.getElementById('guests').value;
    const reservation = new Reservation(name, date, time, guests);
    reservationManager.addReservation(reservation);
    this.reset();
});
