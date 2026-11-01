
import { useEffect, useState } from 'react'

interface Booking {
  id: number
  customer_name: string
  email: string
  phone: string
  registration: string
  service: string
  preferred_date: string
  message: string | null
  status: string
  created_at: string
}

function AdminBookings() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionError, setActionError] = useState('')
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [updating, setUpdating] = useState(false)

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [serviceFilter, setServiceFilter] = useState('all')

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      setLoading(true)
      setError('')

      const response = await fetch('http://localhost:5000/api/bookings')

      if (!response.ok) {
        throw new Error('Failed to fetch bookings.')
      }

      const data = await response.json()
      setBookings(data.bookings)
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong.',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  // Update booking status
  const updateBookingStatus = async (
    bookingId: number,
    newStatus: 'approved' | 'rejected',
  ) => {
    try {
      setUpdating(true)
      setActionError('')

      const response = await fetch(
        `http://localhost:5000/api/bookings/${bookingId}/status`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }),
        },
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Unable to update booking.')
      }

      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking.id === bookingId ? data.booking : booking,
        ),
      )

      setSelectedBooking(data.booking)
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : 'Something went wrong.',
      )
    } finally {
      setUpdating(false)
    }
  }

  // Search and filter bookings
  const filteredBookings = bookings.filter((booking) => {
    const search = searchTerm.toLowerCase().trim()

    const matchesSearch =
      booking.customer_name.toLowerCase().includes(search) ||
      booking.email.toLowerCase().includes(search) ||
      booking.registration.toLowerCase().includes(search)

    const matchesStatus =
      statusFilter === 'all' || booking.status === statusFilter

    const matchesService =
      serviceFilter === 'all' || booking.service === serviceFilter

    return matchesSearch && matchesStatus && matchesService
  })

  // Format date
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

  // Status badge styling
  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700'
      case 'rejected':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-orange-100 text-orange-700'
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f7fa] text-[#172b35] md:flex">

      {/* Sidebar */}
      <aside className="flex w-full flex-col bg-[#172b35] text-white md:min-h-screen md:w-[250px] md:shrink-0">

        <div className="border-b border-white/10 px-7 py-7">
          <h1 className="font-['Manrope'] text-2xl font-extrabold">
            Arctic<span className="text-[#e66b3c]">Auto</span>
          </h1>
          <p className="mt-1 text-xs text-gray-400">
            Management System
          </p>
        </div>

        <nav className="flex gap-2 p-4 md:flex-1 md:flex-col">
          <a
            href="/admin"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-300 transition hover:bg-white/10"
          >
            <span>▦</span>
            Dashboard
          </a>

          <a
            href="/admin/bookings"
            className="flex items-center gap-3 rounded-lg bg-[#e66b3c] px-4 py-3 text-sm font-semibold"
          >
            <span>📋</span>
            Bookings
          </a>

          <a
            href="/"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-300 transition hover:bg-white/10"
          >
            <span>🌐</span>
            Visit Website
          </a>
        </nav>

        <div className="hidden border-t border-white/10 p-5 text-xs text-gray-400 md:block">
          Arctic Auto Clinic
          <p className="mt-1">Admin Panel</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="min-w-0 flex-1 px-5 py-8 md:px-9">

        {/* Header */}
        <header className="mb-9 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#e66b3c]">
              MANAGEMENT
            </p>
            <h2 className="mt-2 font-['Manrope'] text-3xl font-extrabold">
              Bookings
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Manage all customer service requests.
            </p>
          </div>

          <a
            href="/admin"
            className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-semibold transition hover:bg-gray-50"
          >
            ← Dashboard
          </a>
        </header>

        {/* Booking Table */}
        <section className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm">

          {/* Section Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-6 py-5">
            <div>
              <h3 className="text-lg font-bold">All Bookings</h3>
              <p className="mt-1 text-sm text-gray-500">
                Showing {filteredBookings.length} of {bookings.length} bookings
              </p>
            </div>

            <button
              onClick={fetchBookings}
              disabled={loading}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold transition hover:bg-gray-50 disabled:opacity-50"
            >
              ↻ {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>

          {/* Search and Filters */}
          <div className="grid gap-4 border-b border-gray-100 bg-white px-6 py-5 md:grid-cols-3">

            {/* Search */}
            <div>
              <label
                htmlFor="booking-search"
                className="mb-2 block text-sm font-semibold text-gray-600"
              >
                Search Bookings
              </label>

              <input
                id="booking-search"
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search name, email or registration..."
                className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-[#e66b3c] focus:ring-2 focus:ring-orange-100"
              />
            </div>

            {/* Status Filter */}
            <div>
              <label
                htmlFor="status-filter"
                className="mb-2 block text-sm font-semibold text-gray-600"
              >
                Filter by Status
              </label>

              <select
                id="status-filter"
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#e66b3c] focus:ring-2 focus:ring-orange-100"
              >
                <option value="all">All Bookings</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            {/* Service Filter */}
            <div>
              <label
                htmlFor="service-filter"
                className="mb-2 block text-sm font-semibold text-gray-600"
              >
                Filter by Service
              </label>

              <select
                id="service-filter"
                value={serviceFilter}
                onChange={(event) => setServiceFilter(event.target.value)}
                className="w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#e66b3c] focus:ring-2 focus:ring-orange-100"
              >
                <option value="all">All Services</option>
                <option value="tire-change">Tire Change</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>

            {/* Clear Filters */}
            <div className="md:col-span-3">
              <button
                onClick={() => {
                  setSearchTerm('')
                  setStatusFilter('all')
                  setServiceFilter('all')
                }}
                className="text-sm font-semibold text-[#e66b3c] transition hover:text-[#c94f25]"
              >
                Clear Search & Filters
              </button>
            </div>
          </div>

          {/* Table Content */}
          {loading ? (
            <div className="p-12 text-center text-gray-500">
              Loading bookings...
            </div>
          ) : error ? (
            <div className="p-12 text-center text-red-600">
              {error}
            </div>
          ) : filteredBookings.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              No matching bookings found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px] text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Vehicle</th>
                    <th className="px-6 py-4">Service</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredBookings.map((booking) => (
                    <tr
                      key={booking.id}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-6 py-5 font-semibold">
                        #{booking.id}
                      </td>

                      <td className="px-6 py-5">
                        <p className="font-semibold">
                          {booking.customer_name}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {booking.email}
                        </p>
                      </td>

                      <td className="px-6 py-5 font-medium">
                        {booking.registration}
                      </td>

                      <td className="px-6 py-5 capitalize">
                        {booking.service.replaceAll('-', ' ')}
                      </td>

                      <td className="px-6 py-5 whitespace-nowrap">
                        {formatDate(booking.preferred_date)}
                      </td>

                      <td className="px-6 py-5">
                        <span className={`rounded-full px-3 py-1.5 text-xs font-bold capitalize ${getStatusStyle(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>

                      <td className="px-6 py-5">
                        <button
                          onClick={() => {
                            setSelectedBooking(booking)
                            setActionError('')
                          }}
                          className="whitespace-nowrap rounded-lg bg-[#172b35] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#e66b3c]"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Booking Details Modal */}
        {selectedBooking && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={() => !updating && setSelectedBooking(null)}
          >
            <div
              className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white shadow-xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                <div>
                  <h3 className="text-xl font-bold">Booking Details</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Booking #{selectedBooking.id}
                  </p>
                </div>

                <button
                  onClick={() => setSelectedBooking(null)}
                  disabled={updating}
                  className="rounded-lg px-3 py-2 text-xl text-gray-500 transition hover:bg-gray-100 hover:text-red-600 disabled:opacity-50"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6 p-6">

                {/* Customer Information */}
                <div>
                  <h4 className="mb-3 font-bold text-[#e66b3c]">
                    Customer Information
                  </h4>

                  <div className="grid gap-4 rounded-lg bg-gray-50 p-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-gray-500">Full Name</p>
                      <p className="mt-1 font-semibold">
                        {selectedBooking.customer_name}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="mt-1 break-all font-semibold">
                        {selectedBooking.email}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="mt-1 font-semibold">
                        {selectedBooking.phone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Vehicle Information */}
                <div>
                  <h4 className="mb-3 font-bold text-[#e66b3c]">
                    Vehicle & Service Information
                  </h4>

                  <div className="grid gap-4 rounded-lg bg-gray-50 p-4 sm:grid-cols-2">
                    <div>
                      <p className="text-xs text-gray-500">Registration Number</p>
                      <p className="mt-1 font-semibold">
                        {selectedBooking.registration}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Requested Service</p>
                      <p className="mt-1 font-semibold capitalize">
                        {selectedBooking.service.replaceAll('-', ' ')}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Preferred Date</p>
                      <p className="mt-1 font-semibold">
                        {formatDate(selectedBooking.preferred_date)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Current Status</p>
                      <span className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-bold capitalize ${getStatusStyle(selectedBooking.status)}`}>
                        {selectedBooking.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Customer Message */}
                <div>
                  <h4 className="mb-3 font-bold text-[#e66b3c]">
                    Customer Message
                  </h4>

                  <div className="rounded-lg bg-gray-50 p-4 text-sm leading-6 text-gray-700">
                    {selectedBooking.message || 'No additional message provided.'}
                  </div>
                </div>

                <div className="text-xs text-gray-400">
                  Booking submitted: {formatDate(selectedBooking.created_at)}
                </div>

                {/* Error Message */}
                {actionError && (
                  <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                    {actionError}
                  </p>
                )}

                {/* Manage Booking */}
                <div className="border-t border-gray-100 pt-5">
                  <h4 className="mb-3 font-bold">Manage Booking</h4>

                  {selectedBooking.status === 'pending' ? (
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() =>
                          updateBookingStatus(selectedBooking.id, 'approved')
                        }
                        disabled={updating}
                        className="rounded-lg bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {updating ? 'Updating...' : '✓ Approve Booking'}
                      </button>

                      <button
                        onClick={() =>
                          updateBookingStatus(selectedBooking.id, 'rejected')
                        }
                        disabled={updating}
                        className="rounded-lg bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {updating ? 'Updating...' : '✕ Reject Booking'}
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      This booking has already been {selectedBooking.status}.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex justify-end border-t border-gray-100 px-6 py-4">
                <button
                  onClick={() => setSelectedBooking(null)}
                  disabled={updating}
                  className="rounded-lg bg-[#172b35] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#e66b3c] disabled:opacity-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-8 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Arctic Auto Clinic. Admin Panel.
        </footer>
      </main>
    </div>
  )
}

export default AdminBookings
