
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

function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/bookings')

        if (!response.ok) {
          throw new Error('Failed to fetch bookings.')
        }

        const data = await response.json()
        setBookings(data.bookings)
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Something went wrong.',
        )
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [])

  const totalBookings = bookings.length

  const pendingBookings = bookings.filter(
    (booking) => booking.status === 'pending',
  ).length

  const approvedBookings = bookings.filter(
    (booking) => booking.status === 'approved',
  ).length

  const rejectedBookings = bookings.filter(
    (booking) => booking.status === 'rejected',
  ).length

  const stats = [
    {
      title: 'Total Bookings',
      value: totalBookings,
      icon: '📋',
      color: 'bg-blue-50 text-blue-600',
    },
    {
      title: 'Pending',
      value: pendingBookings,
      icon: '⏳',
      color: 'bg-orange-50 text-orange-600',
    },
    {
      title: 'Approved',
      value: approvedBookings,
      icon: '✓',
      color: 'bg-green-50 text-green-600',
    },
    {
      title: 'Rejected',
      value: rejectedBookings,
      icon: '✕',
      color: 'bg-red-50 text-red-600',
    },
  ]

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
  }

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
            className="flex items-center gap-3 rounded-lg bg-[#e66b3c] px-4 py-3 text-sm font-semibold"
          >
            <span>▦</span>
            Dashboard
          </a>

          <a
            href="/admin/bookings"
            className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-300 transition hover:bg-white/10"
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
              OVERVIEW
            </p>
            <h2 className="mt-2 font-['Manrope'] text-3xl font-extrabold">
              Dashboard
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Welcome to Arctic Auto Clinic management panel.
            </p>
          </div>

          <a
            href="/"
            className="rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm font-semibold transition hover:bg-gray-50"
          >
            ← Back to Website
          </a>
        </header>

        {/* Statistics */}
        <section className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <article
              key={stat.title}
              className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <span className={`grid h-11 w-11 place-items-center rounded-xl text-xl ${stat.color}`}>
                  {stat.icon}
                </span>
              </div>

              <h3 className="mt-5 text-3xl font-extrabold">
                {stat.value}
              </h3>
            </article>
          ))}
        </section>

        {/* Booking Table */}
        <section
          id="bookings"
          className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-6 py-5">
            <div>
              <h3 className="text-lg font-bold">
                Recent Bookings
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Customer service requests
              </p>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold transition hover:bg-gray-50"
            >
              ↻ Refresh
            </button>
          </div>

          {loading ? (
            <div className="p-12 text-center text-gray-500">
              Loading bookings...
            </div>
          ) : error ? (
            <div className="p-12 text-center text-red-600">
              {error}
            </div>
          ) : bookings.length === 0 ? (
            <div className="p-12 text-center text-gray-500">
              No bookings found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-6 py-4">ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Vehicle</th>
                    <th className="px-6 py-4">Service</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {bookings.map((booking) => (
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
                        <p className="mt-1 text-xs text-gray-500">
                          {booking.phone}
                        </p>
                      </td>

                      <td className="px-6 py-5 font-medium">
                        {booking.registration}
                      </td>

                      <td className="px-6 py-5">
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="mt-8 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Arctic Auto Clinic. Admin Dashboard.
        </footer>

      </main>
    </div>
  )
}

export default AdminDashboard
