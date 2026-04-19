import { useEffect, useState } from "react";
import { getAllBookings, approveBooking, rejectBooking } from "../../api/bookingApi";
import BookingTable from "../../components/bookings/BookingTable";
import { normalizeValue, getResourceName, getBookingCode } from "./bookingHelpers";

function BookingListPage() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [adminReason, setAdminReason] = useState("");
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [showReasonModal, setShowReasonModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await getAllBookings();
      setBookings(data || []);
    } catch (err) {
      console.error("[MANAGE_BOOKINGS] Error fetching bookings:", err);
      alert("Failed to load bookings. Backend error: " + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      console.log("[MANAGE_BOOKINGS] Approving booking:", id);
      await approveBooking(id);
      alert("✅ Booking approved");
      fetchBookings();
    } catch (err) {
      console.error("[MANAGE_BOOKINGS] Approve error:", err);
      alert("❌ Failed to approve: " + (err.response?.data?.message || err.message));
    }
  };

  const handleReject = async () => {
    if (!selectedBookingId) return;

    try {
      const reason = adminReason || "Rejected by admin";
      console.log("[MANAGE_BOOKINGS] Rejecting booking:", selectedBookingId);
      await rejectBooking(selectedBookingId, reason);
      alert("✅ Booking rejected");
      setShowReasonModal(false);
      setAdminReason("");
      setSelectedBookingId(null);
      fetchBookings();
    } catch (err) {
      console.error("[MANAGE_BOOKINGS] Reject error:", err);
      alert("❌ Failed to reject: " + (err.response?.data?.message || err.message));
    }
  };

  // SAFE FILTERING: Use helper functions to safely extract values
  const filteredBookings = bookings.filter((b) => {
    // Status filter
    const matchesStatus = filter === "ALL" ? true : b.status === filter;

    // Search filter - safely convert nested objects to strings
    const resourceName = normalizeValue(getResourceName(b));
    const bookingCodeNorm = normalizeValue(getBookingCode(b));
    const purposeNorm = normalizeValue(b.purpose || "");
    const searchNorm = normalizeValue(search);

    const matchesSearch =
        search.trim() === "" ||
        resourceName.includes(searchNorm) ||
        bookingCodeNorm.includes(searchNorm) ||
        purposeNorm.includes(searchNorm);

    // Date filter
    const matchesDate = dateFilter ? b.bookingDate === dateFilter : true;

    return matchesStatus && matchesSearch && matchesDate;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Manage Bookings</h1>
          <p className="text-slate-600 text-lg">
            Review, approve, reject, and manage all booking requests
          </p>
        </div>

        {/* Filters Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600">🔍</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900">Filters</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Status</label>
              <select
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="ALL">All Statuses</option>
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Search</label>
              <input
                type="text"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Code, resource, or purpose..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Date</label>
              <input
                type="date"
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm text-slate-600">
            Showing <strong className="text-slate-900">{filteredBookings.length}</strong> of <strong className="text-slate-900">{bookings.length}</strong> bookings
          </span>
          {(filter !== "ALL" || search || dateFilter) && (
            <button
              onClick={() => { setFilter("ALL"); setSearch(""); setDateFilter(""); }}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <BookingTable
            bookings={filteredBookings}
            loading={loading}
            showActions={true}
            showAdminReason={true}
            renderCustomActions={(booking) =>
              booking.status === "PENDING" ? (
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleApprove(booking.id)}
                    className="px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-md hover:from-emerald-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all shadow-sm"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      setSelectedBookingId(booking.id);
                      setShowReasonModal(true);
                    }}
                    className="px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-md hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all shadow-sm"
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <span className="text-slate-400 text-sm">No actions</span>
              )
            }
          />
        </div>

        {/* Rejection Reason Modal */}
        {showReasonModal && (
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowReasonModal(false)}
          >
            <div
              className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-orange-600 text-lg">⚠️</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Reject Booking</h2>
                  <p className="text-sm text-slate-500">Please provide a reason (optional)</p>
                </div>
              </div>

              <textarea
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-y text-sm"
                placeholder="Enter rejection reason..."
                value={adminReason}
                onChange={(e) => setAdminReason(e.target.value)}
                rows={4}
              />

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleReject}
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all shadow-sm"
                >
                  Reject Booking
                </button>
                <button
                  onClick={() => {
                    setShowReasonModal(false);
                    setAdminReason("");
                    setSelectedBookingId(null);
                  }}
                  className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingListPage;
