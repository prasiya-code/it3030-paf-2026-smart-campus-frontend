import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllBookings } from "../../api/bookingApi";
import StatusBadge from "../../components/bookings/StatusBadge";
import { getResourceName, getUserName, getBookingCode, getBookingDate, getStartTime, getEndTime, includesText } from "../../utils/helpers";

function BookingDashboardPage() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchCode, setSearchCode] = useState("");
    const [stats, setStats] = useState({
        TOTAL: 0,
        PENDING: 0,
        APPROVED: 0,
        REJECTED: 0,
        CANCELLED: 0
    });

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await getAllBookings();
            setBookings(data);

            const newStats = {
                TOTAL: data.length,
                PENDING: data.filter((b) => b.status === "PENDING").length,
                APPROVED: data.filter((b) => b.status === "APPROVED").length,
                REJECTED: data.filter((b) => b.status === "REJECTED").length,
                CANCELLED: data.filter((b) => b.status === "CANCELLED").length
            };
            setStats(newStats);
        } catch (err) {
            console.error("[DASHBOARD] Error fetching bookings:", err);
            setError("Failed to load dashboard data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const searchBookingByCode = async () => {
        if (!searchCode.trim()) {
            alert("Please enter a booking code");
            return;
        }

        try {
            setLoading(true);
            const data = await getAllBookings();
            const filtered = data.filter(b =>
                includesText(getBookingCode(b), searchCode)
            );
            if (filtered.length === 0) {
                alert("Booking code not found");
            } else {
                setBookings(filtered);
            }
        } catch (err) {
            console.error("[DASHBOARD] Search error:", err);
            alert("Failed to search bookings");
        } finally {
            setLoading(false);
        }
    };

    const resetSearch = () => {
        setSearchCode("");
        fetchBookings();
    };

    const statsConfig = [
        { label: "Total Bookings", value: stats.TOTAL, icon: "📊", gradient: "from-blue-500 to-blue-600", bg: "bg-blue-50" },
        { label: "Pending", value: stats.PENDING, icon: "⏳", gradient: "from-amber-500 to-yellow-500", bg: "bg-amber-50" },
        { label: "Approved", value: stats.APPROVED, icon: "✅", gradient: "from-emerald-500 to-green-500", bg: "bg-emerald-50" },
        { label: "Rejected", value: stats.REJECTED, icon: "🚫", gradient: "from-orange-500 to-red-500", bg: "bg-orange-50" },
        { label: "Cancelled", value: stats.CANCELLED, icon: "❌", gradient: "from-slate-500 to-gray-500", bg: "bg-slate-50" }
    ];

    const quickActions = [
        { path: "/create-booking", label: "Create Booking", icon: "➕", color: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white" },
        { path: "/my-bookings", label: "My Bookings", icon: "📝", color: "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50" },
        { path: "/manage-bookings", label: "Manage Bookings", icon: "⚙️", color: "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50" }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                        Smart Campus Dashboard
                    </h1>
                    <p className="text-slate-600 text-lg">
                        Overview of all booking requests and current booking statuses
                    </p>
                </div>

                {/* Error Banner */}
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                        <span className="text-red-500 text-xl">❌</span>
                        <div className="flex-1">
                            <p className="text-red-800 font-medium">{error}</p>
                            <button
                                onClick={fetchBookings}
                                className="mt-2 text-red-600 hover:text-red-800 text-sm font-medium underline"
                            >
                                Retry
                            </button>
                        </div>
                    </div>
                )}

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-3 mb-8">
                    {quickActions.map((action) => (
                        <Link key={action.path} to={action.path}>
                            <button className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all shadow-sm ${action.color}`}>
                                <span>{action.icon}</span>
                                {action.label}
                            </button>
                        </Link>
                    ))}
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
                    {statsConfig.map((stat, idx) => (
                        <div key={idx} className={`${stat.bg} rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow`}>
                            <div className="flex items-center justify-between mb-3">
                                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-sm`}>
                                    <span className="text-lg">{stat.icon}</span>
                                </div>
                            </div>
                            <p className="text-sm font-medium text-slate-600">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                        </div>
                    ))}
                </div>

                {/* Search Section */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                            <span className="text-blue-600">🔍</span>
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">Search Booking</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <input
                            type="text"
                            className="flex-1 min-w-[240px] px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                            placeholder="Enter booking code (e.g., BK-ABC123XY)"
                            value={searchCode}
                            onChange={(e) => setSearchCode(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && searchBookingByCode()}
                        />
                        <button
                            onClick={searchBookingByCode}
                            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-sm"
                        >
                            Search
                        </button>
                        {searchCode && (
                            <button
                                onClick={resetSearch}
                                className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all"
                            >
                                Clear
                            </button>
                        )}
                    </div>
                </div>

                {/* Recent Bookings */}
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-slate-900">Recent Bookings</h2>
                        <span className="text-sm text-slate-500">
                            Showing {Math.min(bookings.length, 5)} of {bookings.length}
                        </span>
                    </div>

                    <div className="p-6">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-16">
                                <div className="relative">
                                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-100 border-t-blue-600"></div>
                                </div>
                                <p className="mt-4 text-slate-600 font-medium">Loading bookings...</p>
                            </div>
                        ) : bookings.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16">
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-3xl">📋</span>
                                </div>
                                <p className="text-slate-500 font-medium">No bookings found</p>
                                <Link to="/create-booking" className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium">
                                    Create your first booking →
                                </Link>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="min-w-full">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-200">
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Code</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Resource</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">User</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Date</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Time</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Purpose</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {bookings.slice(0, 5).map((booking, index) => (
                                            <tr key={booking.id} className={`hover:bg-blue-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/30'}`}>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <span className="inline-flex items-center px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-md border border-blue-100">
                                                        {getBookingCode(booking)}
                                                    </span>
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-slate-900">
                                                    {getResourceName(booking)}
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                                            {getUserName(booking)?.charAt(0)?.toUpperCase() || '?'}
                                                        </div>
                                                        <span className="text-sm text-slate-700">{getUserName(booking)}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-700">
                                                    {getBookingDate(booking)}
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-700">
                                                    <span className="font-medium">{getStartTime(booking)}</span>
                                                    <span className="text-slate-400 mx-1">→</span>
                                                    <span className="font-medium">{getEndTime(booking)}</span>
                                                </td>
                                                <td className="px-4 py-3 text-sm text-slate-700 max-w-[200px] truncate" title={booking.purpose}>
                                                    {booking.purpose || "-"}
                                                </td>
                                                <td className="px-4 py-3 whitespace-nowrap">
                                                    <StatusBadge status={booking.status} />
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BookingDashboardPage;
