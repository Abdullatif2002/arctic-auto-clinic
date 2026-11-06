require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { Pool } = require('pg')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authenticateAdmin = require('./authMiddleware')

const app = express()
const PORT = 5000

app.use(
  cors({
    origin: 'http://localhost:5173',
  }),
)

app.use(express.json())

// Validate JWT secret
if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET is missing from .env')
  process.exit(1)
}

// PostgreSQL connection
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
})

// Check database connection
pool.connect()
  .then((client) => {
    console.log('PostgreSQL database connected successfully!')
    client.release()
  })
  .catch((error) => {
    console.error('Database connection error:', error.message)
  })

// Home route
app.get('/', (req, res) => {
  res.send('Arctic Auto Clinic backend is running!')
})

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Arctic Auto Clinic API is working!',
  })
})

// Admin login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required.',
      })
    }

    const normalizedEmail = email.trim().toLowerCase()

    const result = await pool.query(
      'SELECT id, name, email, password_hash FROM admins WHERE email = $1',
      [normalizedEmail]
    )

    if (result.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      })
    }

    const admin = result.rows[0]

    const passwordMatch = await bcrypt.compare(
      password,
      admin.password_hash
    )

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.',
      })
    }

    const token = jwt.sign(
      {
        id: admin.id,
        email: admin.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '2h',
      }
    )

    return res.json({
      success: true,
      message: 'Login successful!',
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
      },
    })
  } catch (error) {
    console.error('Admin login error:', error.message)

    return res.status(500).json({
      success: false,
      message: 'Unable to log in. Please try again.',
    })
  }
})

// Create a new booking (Public API)
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
    } = req.body

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
      })
    }

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
    `

    const values = [
      customerName,
      email,
      phone,
      registration,
      service,
      date,
      message || null,
    ]

    const result = await pool.query(query, values)

    console.log('New booking saved:', result.rows[0])

    return res.status(201).json({
      success: true,
      message: 'Booking request saved successfully!',
      booking: result.rows[0],
    })
  } catch (error) {
    console.error('Booking error:', error.message)

    return res.status(500).json({
      success: false,
      message: 'Unable to save booking. Please try again.',
    })
  }
})

// Get all bookings (Protected API)
app.get('/api/bookings', authenticateAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM bookings ORDER BY created_at DESC',
    )

    res.json({
      success: true,
      bookings: result.rows,
    })
  } catch (error) {
    console.error('Fetch bookings error:', error.message)

    res.status(500).json({
      success: false,
      message: 'Unable to retrieve bookings.',
    })
  }
})

// Update booking status (Protected API)
app.patch(
  '/api/bookings/:id/status',
  authenticateAdmin,
  async (req, res) => {
    try {
      const { id } = req.params
      const { status } = req.body

      if (!Number.isInteger(Number(id)) || Number(id) <= 0) {
        return res.status(400).json({
          success: false,
          message: 'Invalid booking ID.',
        })
      }

      const allowedStatuses = ['pending', 'approved', 'rejected']

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: 'Invalid booking status.',
        })
      }

      const result = await pool.query(
        `UPDATE bookings
         SET status = $1
         WHERE id = $2
         RETURNING *`,
        [status, Number(id)]
      )

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'Booking not found.',
        })
      }

      console.log(`Booking #${id} status updated to ${status}`)

      return res.json({
        success: true,
        message: `Booking status updated to ${status}.`,
        booking: result.rows[0],
      })
    } catch (error) {
      console.error('Update booking status error:', error.message)

      return res.status(500).json({
        success: false,
        message: 'Unable to update booking status.',
      })
    }
  }
)

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
