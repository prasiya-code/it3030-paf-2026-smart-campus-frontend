import { useEffect, useState } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { getAllResources } from "../../api/resourceApi";
import { getMyBookings, cancelBooking as apiCancelBooking } from "../../api/bookingApi";
import BookingTable from "../../components/bookings/BookingTable";
import { getBookingCode, includesText } from "./bookingHelpers";

function MyBookingsPage() {
  const { user, loading: authLoading, isAuthenticated } = useAuthContext();
  const [bookings, setBookings] = useState([]);
  const [displayedBookings, setDisplayedBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchCode, setSearchCode] = useState("");
  const [resources, setResources] = useState([]);
  const [filterDate, setFilterDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterResource, setFilterResource] = useState("");

  useEffect(() => {
    // Wait for auth to be ready before fetching
    if (authLoading) return;
    
    // If not authenticated, show error
    if (!isAuthenticated) {
      setError("Please log in to view your bookings.");
      setLoading(false);
      return;
    }
    
    fetchBookings();
    fetchResources();
  }, [user, authLoading, isAuthenticated]);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await getMyBookings();
      console.log("MY BOOKINGS:", data);
      
      setBookings(data || []);
    } catch (err) {
      console.error("Failed to load bookings:", err);
      setError("Failed to load bookings");
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchResources = async () => {
    try {
      const res = await getAllResources();
      setResources(Array.isArray(res) ? res : []);
    } catch (err) {
      console.warn("[MY_BOOKINGS] Could not load resources for filters:", err);
      setResources([]);
    }
  };

  const cancelBooking = async (id) => {
    try {
      const booking = bookings.find((b) => b.id === id);
      if (!booking) {
        alert("Booking not found");
        return;
      }

      // Only check ownership if we have current user data
      if (user && !isOwnBooking(booking, user)) {
        alert("You can only cancel your own bookings");
        return;
      }

      await apiCancelBooking(id);
      alert("✅ Booking cancelled");
      fetchBookings();
    } catch (err) {
      console.error("[MY_BOOKINGS] Cancel error:", err);
      alert("❌ " + (err.response?.data?.message || "Failed to cancel booking"));
    }
  };

  const searchBookingByCode = async () => {
    if (!searchCode.trim()) {
      alert("Please enter a booking code");
      return;
    }

    try {
      const source = bookings.length > 0 ? bookings : [];
      const filtered = source.filter((b) => includesText(getBookingCode(b), searchCode));
      if (filtered.length === 0) {
        alert("❌ Booking code not found");
        return;
      }
      setDisplayedBookings(filtered);
    } catch (err) {
      console.error("[MY_BOOKINGS] Search error:", err);
      alert("❌ Failed to search bookings");
    }
  };

  const resetSearch = () => {
    setSearchCode("");
    setDisplayedBookings(bookings);
  };

  const clearFilters = () => {
    setFilterDate("");
    setFilterStatus("");
    setFilterResource("");
    setDisplayedBookings(bookings);
  };

  // Helper: robustly extract an id from varied booking shapes
  const extractUserIdFromBooking = (b) => {
    if (!b) return null;
    if (b.userId !== undefined && b.userId !== null) return Number(b.userId);
    if (b.user) {
      if (b.user.id !== undefined && b.user.id !== null) return Number(b.user.id);
      if (b.user.userId !== undefined && b.user.userId !== null) return Number(b.user.userId);
    }
    if (b.createdBy !== undefined && b.createdBy !== null) return Number(b.createdBy);
    if (b.bookingOwner !== undefined && b.bookingOwner !== null) return Number(b.bookingOwner);
    if (b.ownerId !== undefined && b.ownerId !== null) return Number(b.ownerId);
    return null;
  };

  const extractIdFromUser = (u) => {
    if (!u) return null;
    if (u.id !== undefined && u.id !== null) return Number(u.id);
    if (u.userId !== undefined && u.userId !== null) return Number(u.userId);
    if (u.sub !== undefined && u.sub !== null) return Number(u.sub);
    if (u.googleSub !== undefined && u.googleSub !== null) return Number(u.googleSub);
    return null;
  };

  const isOwnBooking = (booking, currentUserObj) => {
    if (!booking) return false;
    if (!currentUserObj) return false;

    const bookingUserId = extractUserIdFromBooking(booking);
    const currentUserId = extractIdFromUser(currentUserObj);
    if (bookingUserId !== null && currentUserId !== null) {
      return bookingUserId === currentUserId;
    }

    const bookingEmail = booking.user?.email || booking.userEmail || booking.bookingOwnerEmail;
    const currentEmail = currentUserObj.email || currentUserObj.username || currentUserObj.preferred_username;
    if (bookingEmail && currentEmail) {
      return String(bookingEmail).toLowerCase() === String(currentEmail).toLowerCase();
    }

    const bookingSub = booking.user?.googleSub || booking.user?.sub || booking.googleSub || booking.sub;
    const currentSub = currentUserObj.googleSub || currentUserObj.sub;
    if (bookingSub && currentSub) return String(bookingSub) === String(currentSub);

    return false;
  };

  const renderActionsCell = (b) => {
    const status = b.status;

    if (status === "REJECTED" || status === "CANCELLED") {
      return <span className="text-gray-400 text-sm">No actions</span>;
    }

    const canCancelByStatus = status === "PENDING" || status === "APPROVED";
    const owned = isOwnBooking(b, user);

    // Show cancel if owned, or if we don't have auth context (be permissive in demo mode)
    if (canCancelByStatus && (owned || !user)) {
      return (
        <button
          onClick={() => cancelBooking(b.id)}
          className="px-3 py-1.5 text-xs font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-md hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all shadow-sm"
        >
          Cancel
        </button>
      );
    }

    return <span className="text-gray-400 text-sm">No actions</span>;
  };

  // Debug: log bookings changes
  useEffect(() => {
    console.log("[MyBookingsPage] Bookings updated:", bookings);
    console.log("[MyBookingsPage] Bookings count:", bookings.length);
  }, [bookings]);

  // Apply client-side filters (date, status, resource)
  // Note: user filtering is already done in fetchBookingsSafely via API
  useEffect(() => {
    let arr = bookings.slice();
    console.log("[MyBookingsPage] Filtering bookings:", arr.length, "items");

    if (filterDate) {
      arr = arr.filter((b) => {
        const bd = b.bookingDate ? b.bookingDate.slice(0, 10) : "";
        return bd === filterDate;
      });
    }
    if (filterStatus) {
      arr = arr.filter((b) => (b.status || "").toUpperCase() === filterStatus.toUpperCase());
    }
    if (filterResource) {
      arr = arr.filter((b) => String(b.resource?.id || b.resourceId || b.resource) === String(filterResource));
    }

    console.log("[MyBookingsPage] Filtered result:", arr.length, "items");
    setDisplayedBookings(arr);
  }, [bookings, filterDate, filterStatus, filterResource]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">My Bookings</h1>
          <p className="text-slate-600 text-lg">
            View and manage your booking requests in one place
          </p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <span className="text-red-500 text-xl">❌</span>
            <div>
              <p className="text-red-800 font-medium">{error}</p>
              <button
                onClick={() => fetchBookings()}
                className="mt-2 text-red-600 hover:text-red-800 text-sm font-medium underline"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Search & Filters Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-blue-600 text-xl">🔍</span>
            <h3 className="text-lg font-semibold text-slate-900">Search & Filter</h3>
          </div>

          <div className="flex flex-wrap gap-3 items-end">
            <div className="flex-1 min-w-[220px]">
              <label className="block text-sm font-medium text-slate-700 mb-1">Booking Code</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="e.g., BK-ABC123XY"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && searchBookingByCode()}
              />
            </div>

            <button
              onClick={searchBookingByCode}
              className="px-5 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all shadow-sm"
            >
              Search
            </button>

            {searchCode && (
              <button
                onClick={resetSearch}
                className="px-5 py-2 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all"
              >
                Clear
              </button>
            )}
          </div>

          <div className="border-t border-slate-200 my-4"></div>

          <div className="flex flex-wrap gap-3 items-end">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
              <input
                type="date"
                className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
              <select
                className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm w-[150px]"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Resource</label>
              <select
                className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm w-[180px]"
                value={filterResource}
                onChange={(e) => setFilterResource(e.target.value)}
              >
                <option value="">All Resources</option>
                {resources.map((r) => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>

            {(filterDate || filterStatus || filterResource) && (
              <button
                onClick={clearFilters}
                className="px-4 py-2 text-slate-600 hover:text-slate-800 text-sm font-medium underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50">
            <h2 className="text-lg font-semibold text-slate-900">
              Bookings ({displayedBookings.length})
            </h2>
          </div>
          <div className="p-6">
            <BookingTable
              bookings={displayedBookings}
              resources={resources}
              loading={loading}
              showActions={true}
              showAdminReason={true}
              renderCustomActions={(booking) => renderActionsCell(booking)}
              emptyMessage={error ? "Unable to load bookings" : "No bookings found matching your criteria"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyBookingsPage;
