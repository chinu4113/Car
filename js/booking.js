// js/booking.js - Handles booking form submission and validation.

// Note: This uses app.notify defined in js/main.js

// js/booking.js - Handles booking form submission and validation.

// Note: This uses app.notify defined in js/main.js

app.handleBooking = function(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');

    // Simple Form Validation
    const carMake = form.querySelector('#car-make').value;
    const carModel = form.querySelector('#car-model').value;
    const date = form.querySelector('#preferred-date').value;
    const time = form.querySelector('#preferred-time').value;

    if (!carMake || !carModel || !date || !time) {
        app.notify('Please fill in vehicle details, date, and time.', 'error');
        return;
    }

    btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Confirming...';
    btn.disabled = true;

    // --- MOCK BOOKING SUBMISSION ---
    setTimeout(() => {
        const selectedService = form.querySelector('input[name="service"]:checked').value;
        
        // Data structure for submission (MOCK)
        const bookingData = {
            userId: app.state.user.id || 'guest',
            car: `${carMake} ${carModel}`,
            service: selectedService,
            date: date,
            time: time,
            phone: form.querySelector('#contact-phone').value,
            timestamp: new Date().toISOString()
        };

        console.log("Booking Submitted:", bookingData); // Log data instead of API call
        
        app.notify('Booking request confirmed! We will contact you soon.', 'success');
        form.reset();
        
        btn.innerHTML = 'Confirm Request';
        btn.disabled = false;
        
        if (app.state.isLoggedIn) {
            window.location.href = 'dashboard.html';
        }

    }, 1800);
};