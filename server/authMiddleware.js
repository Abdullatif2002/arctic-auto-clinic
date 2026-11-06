const jwt = require('jsonwebtoken')

function authenticateAdmin(req, res, next) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please log in.',
      })
    }

    const token = authHeader.split(' ')[1]

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET is not configured.')
      return res.status(500).json({
        success: false,
        message: 'Server authentication configuration error.',
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.admin = {
      id: decoded.id,
      email: decoded.email,
    }

    next()
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token. Please log in again.',
    })
  }
}

module.exports = authenticateAdmin