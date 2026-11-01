
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
}));

app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

// Check database connection
pool.connect()
  .then((client) => {
    console.log('PostgreSQL database connected successfully!');
    client.release();
  })
  .catch((error) => {
    console.error('Database connection error:', error.message);
  });

// Home route
app.get('/', (req, res) => {
  res.send('Arctic Auto Clinic backend is running!');
});

// Health API
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Arctic Auto Clinic API is working!',
  });
});

// Create booking
app.post('/api/bookings', async (req, res) => {
  try {
    const {
      customerName,
      email,
      phone,
      registration,
      service,
      date,
      message,
    } = req.body;

    // Validate required fields
    if (
      !customerName ||
      !email ||
      !phone ||
      !registration ||
      !service ||
      !date
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required booking details.',
      });
    }

    // Insert booking into PostgreSQL
    const query = `
      INSERT INTO bookings (
        customer_name,
        email,
        phone,
        registration,
        service,
        preferred_date,
        message
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;

    const values = [
      customerName,
      email,
      phone,
      registration,
      service,
      date,
      message || null,
    ];

    const result = await pool.query(query, values);

    console.log('New booking saved:', result.rows[0]);

    return res.status(201).json({
      success: true,
      message: 'Booking request saved successfully!',
      booking: result.rows[0],
    });

  } catch (error) {
    console.error('Booking error:', error.message);

    return res.status(500).json({
      success: false,
      message: 'Unable to save booking. Please try again.',
    });
  }
});

// Get all bookings (development/testing)
app.get('/api/bookings', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM bookings ORDER BY created_at DESC'
    );

    res.json({
      success: true,
      bookings: result.rows,
    });

  } catch (error) {
    console.error('Fetch bookings error:', error.message);

    res.status(500).json({
      success: false,
      message: 'Unable to retrieve bookings.',
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
