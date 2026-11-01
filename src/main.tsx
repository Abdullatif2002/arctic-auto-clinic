import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import App from './App'
import AdminDashboard from './pages/AdminDashboard'
import AdminBookings from './pages/AdminBookings'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/bookings" element={<AdminBookings />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
