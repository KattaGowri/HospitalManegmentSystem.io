const express = require('express');
const app = express();

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));

// Mock data
const appointments = [
    { patient: 'John Doe', time: '10:00 AM', reason: 'Routine Check-up' },
];
const patients = [
    { name: 'Jane Smith', age: 45, condition: 'Hypertension', id: 123 },
];

// Doctor Dashboard Route
app.get('/doctor-dashboard', (req, res) => {
    const appointmentsHtml = appointments
        .map(app => `<li>${app.patient} at ${app.time} - ${app.reason}</li>`)
        .join('');
    const patientsHtml = patients
        .map(p => `<li>${p.name}, Age: ${p.age}, Condition: ${p.condition}</li>`)
        .join('');
    res.send(`
        <html>
            <body>
                <h1>Welcome, Dr. Paul Angie Cho</h1>
                <h2>Today's Appointments</h2>
                <ul>${appointmentsHtml}</ul>
                <h2>Patient Records</h2>
                <ul>${patientsHtml}</ul>
                <form action="/schedule" method="POST">
                    <h3>Update Schedule</h3>
                    <label>Date: <input type="date" name="date" required></label>
                    <br>
                    <label>Availability: <input type="text" name="availability" required></label>
                    <br>
                    <button type="submit">Update</button>
                </form>
            </body>
        </html>
    `);
});

// Schedule Update Route
app.post('/schedule', (req, res) => {
    const { date, availability } = req.body;
    if (!date || !availability) {
        return res.status(400).send('Date and availability are required.');
    }
    console.log(`Updated schedule for ${date}: ${availability}`);
    res.redirect('/doctor-dashboard');
});

// Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
