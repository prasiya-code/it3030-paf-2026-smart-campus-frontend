import { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { getAllResources } from "../../api/resourceApi";
import { createBooking, getAllBookings } from "../../api/bookingApi";

function BookingCreatePage() {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const today = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

  // tomorrow is not used currently

  const BUSINESS_START = "08:00";
  const BUSINESS_END = "20:00";
  const MIN_DURATION_MINUTES = 30;
  const MAX_DURATION_MINUTES = 240;

  const [form, setForm] = useState({
    resourceId: "",
    bookingDate: "",
    startTime: "",
    endTime: "",
    purpose: "",
    expectedAttendees: "",
    specialRequirements: "",
  });

  const [resources, setResources] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [loadingResources, setLoadingResources] = useState(true);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [availabilityMessage, setAvailabilityMessage] = useState("");
  const [isFullyBooked, setIsFullyBooked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmChecked, setConfirmChecked] = useState(false);

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    fetchResources();
  }, []);

  useEffect(() => {
    if (form.resourceId && form.bookingDate) {
      fetchAvailability();
    } else {
      setBookedSlots([]);
      setAvailabilityMessage("");
      setIsFullyBooked(false);
    }
  }, [form.resourceId, form.bookingDate]);

  // Re-check availability in real-time when the selected times change or bookedSlots change
  useEffect(() => {
    if (!form.resourceId || !form.bookingDate) return;

    if (form.startTime && form.endTime) {
      const conflict = isTimeSlotBooked(form.startTime, form.endTime);
      if (conflict) {
        setAvailabilityMessage("Time slot already booked");
        setIsFullyBooked(true);
      } else {
        setAvailabilityMessage("Selected time slot is available");
        setIsFullyBooked(false);
      }
    }
  }, [form.startTime, form.endTime, bookedSlots, form.resourceId, form.bookingDate]);

  const normalizeDate = (dateValue) => {
    if (!dateValue) return "";

    if (typeof dateValue === "string" && dateValue.length >= 10) {
      return dateValue.slice(0, 10);
    }

    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return "";

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const fetchResources = async () => {
    try {
      setLoadingResources(true);
      const res = await getAllResources();
      console.log("RESOURCES:", res);
      setResources(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error("Failed to load resources:", err);
      setAvailabilityMessage("Could not load resources. Please refresh.");
    } finally {
      setLoadingResources(false);
    }
  };

  const fetchAvailability = async () => {
    if (!form.resourceId || !form.bookingDate) return;

    try {
      setLoadingAvailability(true);

      // Fetch bookings filtered by resourceId from backend
      const bookings = await getAllBookings({
        resourceId: Number(form.resourceId),
      });

      const bookingsArray = Array.isArray(bookings) ? bookings : [];
      
      console.log(`[AVAILABILITY] Fetched ${bookingsArray.length} bookings for resource ${form.resourceId}`);

      // Debug: Log all bookings to see what we're working with
      console.log(`[AVAILABILITY DEBUG] Form date: ${form.bookingDate}, resourceId: ${form.resourceId}`);
      bookingsArray.forEach((b, idx) => {
        console.log(`[AVAILABILITY DEBUG] Booking ${idx}:`, {
          id: b.id,
          bookingDate: b.bookingDate,
          resourceId: b.resourceId,
          'resource?.id': b.resource?.id,
          status: b.status,
          startTime: b.startTime,
          endTime: b.endTime,
        });
      });

      // Filter by date and active status (APPROVED or PENDING)
      const bookingsForDateAndResource = bookingsArray.filter((b) => {
        const bookingDate = normalizeDate(b.bookingDate);
        // Try both resourceId directly and nested in resource object
        const bookingResourceId = b.resourceId || b.resource?.id;
        const sameDate = bookingDate === form.bookingDate;
        const sameResource = String(bookingResourceId) === String(form.resourceId);
        // Handle both uppercase and lowercase status
        const statusUpper = String(b.status).toUpperCase();
        const activeStatus = statusUpper === "APPROVED" || statusUpper === "PENDING";
        
        console.log(`[AVAILABILITY DEBUG] Checking booking ${b.id}: date='${bookingDate}' vs '${form.bookingDate}' (${sameDate}), resource='${bookingResourceId}' vs '${form.resourceId}' (${sameResource}), status='${statusUpper}' (${activeStatus})`);
        
        if (sameDate && sameResource && activeStatus) {
          console.log(`[AVAILABILITY] MATCHED booking: ${b.startTime}-${b.endTime} (status: ${b.status})`);
          return true;
        }
        return false;
      });

      const slots = bookingsForDateAndResource.map((b) => ({
        startTime: b.startTime,
        endTime: b.endTime,
        status: b.status,
      }));

      setBookedSlots(slots);

      if (slots.length === 0) {
        setAvailabilityMessage("Resource is available for this date.");
        setIsFullyBooked(false);
      } else {
        setAvailabilityMessage(
          `${slots.length} time slot(s) already booked for this date.`
        );
        setIsFullyBooked(false);
      }
    } catch (err) {
      console.error("Failed to load availability:", err);
      setAvailabilityMessage("Could not check availability.");
      setBookedSlots([]);
      setIsFullyBooked(false);
    } finally {
      setLoadingAvailability(false);
    }
  };

  const isTimeSlotBooked = (startTime, endTime) => {
    if (!startTime || !endTime) return false;

    console.log(`[CONFLICT CHECK] Checking: ${startTime}-${endTime} against ${bookedSlots.length} booked slots`);
    
    return bookedSlots.some((slot) => {
      // Check for overlap: two intervals overlap if neither ends before the other starts
      const noOverlap = endTime <= slot.startTime || startTime >= slot.endTime;
      const hasOverlap = !noOverlap;
      
      if (hasOverlap) {
        console.log(`[CONFLICT CHECK] CONFLICT with booked slot: ${slot.startTime}-${slot.endTime}`);
      }
      
      return hasOverlap;
    });
  };

  // Helper: get resource capacity safely
  const getResourceCapacity = (resourceId) => {
    if (!resourceId) return null;
    const r = resources.find((res) => String(res.id) === String(resourceId));
    if (!r) return null;
    return r.capacity || r.maxCapacity || r.capacityLimit || r.seats || null;
  };

  // Helper: add minutes to HH:MM string
  const addMinutes = (timeStr, mins) => {
    if (!timeStr) return timeStr;
    const [h, m] = timeStr.split(":").map(Number);
    const dt = new Date();
    dt.setHours(h);
    dt.setMinutes(m + mins);
    const hh = String(dt.getHours()).padStart(2, "0");
    const mm = String(dt.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  };

  // Compute minimum allowed start time (for today disallow past times)
  const getMinStartTime = () => {
    if (form.bookingDate === today) {
      const now = new Date();
      // round up one minute to avoid immediate past
      now.setMinutes(now.getMinutes() + 1);
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const current = `${hh}:${mm}`;
      return current > BUSINESS_START ? current : BUSINESS_START;
    }
    return BUSINESS_START;
  };

  const calculateDurationMinutes = (startTime, endTime) => {
    if (!startTime || !endTime) return 0;

    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);

    const startTotalMins = startH * 60 + startM;
    const endTotalMins = endH * 60 + endM;

    return endTotalMins - startTotalMins;
  };

  const formatDuration = (minutes) => {
    if (minutes <= 0) return "0m";
    if (minutes < 60) return `${minutes}m`;

    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const isOutsideBusinessHours = (timeValue) => {
    if (!timeValue) return false;
    return timeValue < BUSINESS_START || timeValue > BUSINESS_END;
  };

  const isPastTime = (dateValue, timeValue) => {
    if (!dateValue || !timeValue) return false;
    if (dateValue !== today) return false;

    const now = new Date();
    const currentTimeStr =
        String(now.getHours()).padStart(2, "0") +
        ":" +
        String(now.getMinutes()).padStart(2, "0");

    return timeValue < currentTimeStr;
  };

  const validateField = (name, value, updatedForm) => {
    switch (name) {
      case "resourceId":
        if (!String(value).trim()) return "Resource is required";
        return "";

      case "bookingDate":
        if (!value) return "Booking date is required";
        if (value < today) return "Booking date cannot be in the past";
        return "";

      case "startTime":
        if (!value) return "Start time is required";
        if (isOutsideBusinessHours(value)) {
          return "Allowed booking time is 08:00 AM to 08:00 PM";
        }
        if (isPastTime(updatedForm.bookingDate, value)) {
          return "Cannot select a past time for today";
        }
        if (updatedForm.endTime && value >= updatedForm.endTime) {
          return "Start time must be earlier than end time";
        }
        if (updatedForm.endTime) {
          const duration = calculateDurationMinutes(value, updatedForm.endTime);
          if (duration > 0) {
            if (duration < MIN_DURATION_MINUTES) {
              return "Booking must be at least 30 minutes";
            }
            if (duration > MAX_DURATION_MINUTES) {
              return "Booking cannot exceed 4 hours";
            }
          }
        }
        if (updatedForm.endTime && isTimeSlotBooked(value, updatedForm.endTime)) {
          return "This time slot is already booked";
        }
        return "";

      case "endTime":
        if (!value) return "End time is required";
        if (isOutsideBusinessHours(value)) {
          return "Allowed booking time is 08:00 AM to 08:00 PM";
        }
        if (updatedForm.startTime && value <= updatedForm.startTime) {
          return "End time must be later than start time";
        }
        if (updatedForm.startTime) {
          const duration = calculateDurationMinutes(updatedForm.startTime, value);
          if (duration > 0) {
            if (duration < MIN_DURATION_MINUTES) {
              return "Booking must be at least 30 minutes";
            }
            if (duration > MAX_DURATION_MINUTES) {
              return "Booking cannot exceed 4 hours";
            }
          }
        }
        if (
            updatedForm.startTime &&
            isTimeSlotBooked(updatedForm.startTime, value)
        ) {
          return "This time slot is already booked";
        }
        return "";

      case "purpose":
        if (!value.trim()) return "Purpose is required";
        if (value.trim().length < 3) {
          return "Purpose must be at least 3 characters";
        }
        return "";

      case "expectedAttendees": {
        if (value === "") return "Expected attendees is required";
        if (!/^\d+$/.test(String(value))) {
          return "Expected attendees must be a positive whole number";
        }
        if (Number(value) <= 0) {
          return "Expected attendees must be greater than 0";
        }
        if (Number(value) > 1000) {
          return "Expected attendees is too large";
        }
        // Validate against resource capacity if available
        const cap = getResourceCapacity(updatedForm.resourceId);
        if (cap !== null && Number(value) > Number(cap)) {
          return "Number of attendees exceeds resource capacity";
        }
        return "";
      }

      case "specialRequirements":
        // optional field - no strict validation
        return "";

      default:
        return "";
    }
  };

  const validateAll = (updatedForm = form) => {
    const newErrors = {
      resourceId: validateField("resourceId", updatedForm.resourceId, updatedForm),
      bookingDate: validateField("bookingDate", updatedForm.bookingDate, updatedForm),
      startTime: validateField("startTime", updatedForm.startTime, updatedForm),
      endTime: validateField("endTime", updatedForm.endTime, updatedForm),
      purpose: validateField("purpose", updatedForm.purpose, updatedForm),
      expectedAttendees: validateField(
          "expectedAttendees",
          updatedForm.expectedAttendees,
          updatedForm
      ),
      specialRequirements: validateField("specialRequirements", updatedForm.specialRequirements, updatedForm),
    };

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let cleanedValue = value;

    if (name === "expectedAttendees") {
      cleanedValue = value.replace(/\D/g, "");
    }

    const updatedForm = {
      ...form,
      [name]: cleanedValue,
    };

    setForm(updatedForm);

    const newErrors = {
      ...errors,
      [name]: validateField(name, cleanedValue, updatedForm),
    };

    if (name === "startTime" || name === "endTime") {
      newErrors.startTime = validateField(
          "startTime",
          updatedForm.startTime,
          updatedForm
      );
      newErrors.endTime = validateField(
          "endTime",
          updatedForm.endTime,
          updatedForm
      );
    }

    if (name === "bookingDate") {
      newErrors.bookingDate = validateField(
          "bookingDate",
          updatedForm.bookingDate,
          updatedForm
      );
    }

    setErrors(newErrors);
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, form[name], form),
    }));
  };

  const handleSubmit = async () => {
    const allTouched = {
      resourceId: true,
      bookingDate: true,
      startTime: true,
      endTime: true,
      purpose: true,
      expectedAttendees: true,
      specialRequirements: true,
    };

    setTouched(allTouched);

    const isValid = validateAll();
    if (!isValid) return;
    if (!confirmChecked) {
      alert("Please confirm that the information entered is correct before submitting.");
      return;
    }

    try {
      setIsSubmitting(true);
      // Get the actual logged-in user's ID
      const userId = user?.id || user?.userId || user?.sub;

          // Helper to ensure time is in HH:mm:ss format for backend LocalTime
      const formatTimeForBackend = (timeStr) => {
        if (!timeStr) return timeStr;
        // If already has seconds, return as-is
        if (timeStr.length === 8 && timeStr.includes(':')) return timeStr;
        // Convert HH:mm to HH:mm:ss
        if (timeStr.length === 5 && timeStr.includes(':')) return `${timeStr}:00`;
        return timeStr;
      };

      const payload = {
        resourceId: Number(form.resourceId),
        userId: userId ? Number(userId) : undefined,
        userEmail: user?.email,
        firstName: user?.firstName,
        lastName: user?.lastName,
        bookingDate: form.bookingDate,
        startTime: formatTimeForBackend(form.startTime),
        endTime: formatTimeForBackend(form.endTime),
        purpose: form.purpose.trim(),
        expectedAttendees: Number(form.expectedAttendees),
        specialRequirements: form.specialRequirements?.trim() || null,
      };

      console.log("[BOOKING] Sending payload:", payload);
      console.log("[BOOKING] Current booked slots:", bookedSlots);
      console.log("[BOOKING] isTimeSlotBooked result:", isTimeSlotBooked(form.startTime, form.endTime));

      const response = await createBooking(payload);

      const bookingCode = response?.bookingCode || response?.data?.bookingCode || "";
      alert("Booking created successfully. Booking Code: " + bookingCode);

      // Navigate to My Bookings to see the newly created booking
      navigate("/my-bookings");

      setForm({
        resourceId: "",
        bookingDate: "",
        startTime: "",
        endTime: "",
        purpose: "",
        expectedAttendees: "",
        specialRequirements: "",
      });

      setErrors({});
      setTouched({});
      setBookedSlots([]);
      setAvailabilityMessage("");
      setIsFullyBooked(false);
      setIsSubmitting(false);
    } catch (err) {
      console.error("[BOOKING] Detailed Error:", {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });

      const status = err.response?.status;
      const message = err.response?.data?.message;
      
      let errorMsg;
      if (status === 403) {
        errorMsg = "Authentication error (403): Unable to create booking. Please log out and log in again.";
      } else if (status === 401) {
        errorMsg = "Session expired. Please log in again.";
      } else {
        errorMsg = message || "Booking failed. Please try again";
      }

      alert(errorMsg);
      setIsSubmitting(false);
    }
  };

  const hasErrors = Object.values(errors).some((error) => error);
  const hasEmptyRequiredFields =
      !String(form.resourceId).trim() ||
      !form.bookingDate ||
      !form.startTime ||
      !form.endTime ||
      !form.purpose.trim() ||
      !form.expectedAttendees;

  const isSubmitDisabled = hasErrors || hasEmptyRequiredFields || isFullyBooked || !confirmChecked;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">Create Booking</h1>
          <p className="text-slate-600 text-lg">
            Fill in the details below to request a new smart campus booking
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Form Header */}
          <div className="px-6 py-4 bg-slate-50/50 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600">📅</span>
              </div>
              <h2 className="text-lg font-semibold text-slate-900">Booking Details</h2>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Resource */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Resource <span className="text-red-500">*</span>
                </label>
                {loadingResources ? (
                  <div className="w-full px-4 py-2.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-500 text-sm">
                    <span className="flex items-center gap-2">
                      <span className="animate-spin h-4 w-4 border-2 border-slate-300 border-t-blue-600 rounded-full"></span>
                      Loading resources...
                    </span>
                  </div>
                ) : (
                  <select
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
                    name="resourceId"
                    value={form.resourceId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="">Select a resource</option>
                    {resources.map((res) => (
                      <option key={res.id} value={res.id}>
                        {res.name} ({res.type})
                      </option>
                    ))}
                  </select>
                )}
                <div className="text-xs text-red-600 min-h-[1.25rem]">
                  {touched.resourceId && errors.resourceId ? errors.resourceId : ""}
                </div>
              </div>

              {/* Booking Date */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Booking Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  name="bookingDate"
                  min={today}
                  value={form.bookingDate}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="text-xs text-red-600 min-h-[1.25rem]">
                  {touched.bookingDate && errors.bookingDate ? errors.bookingDate : ""}
                </div>
              </div>

              {/* Availability Info */}
              {form.resourceId && form.bookingDate && (
                <div className="md:col-span-2">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-blue-600">📊</span>
                      <span className="font-semibold text-blue-900">Availability</span>
                      {loadingAvailability && (
                        <span className="animate-spin h-4 w-4 border-2 border-blue-300 border-t-blue-600 rounded-full ml-2"></span>
                      )}
                    </div>
                    <p className="text-sm text-blue-800">{availabilityMessage}</p>
                    {bookedSlots.length > 0 && (
                      <div className="mt-3">
                        <p className="text-xs font-semibold text-blue-700 mb-2">Booked Time Slots:</p>
                        <div className="flex flex-wrap gap-2">
                          {bookedSlots.map((slot, idx) => (
                            <span key={idx} className="inline-flex items-center px-3 py-1 bg-white text-blue-700 text-xs font-medium rounded-full border border-blue-200 shadow-sm">
                              {slot.startTime} - {slot.endTime}
                              <span className="ml-1.5 px-1.5 py-0.5 bg-blue-100 text-blue-800 text-[10px] rounded-full">
                                {slot.status}
                              </span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Purpose */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Purpose <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  name="purpose"
                  placeholder="e.g., Team Meeting, Class, Workshop"
                  value={form.purpose}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="text-xs text-red-600 min-h-[1.25rem]">
                  {touched.purpose && errors.purpose ? errors.purpose : ""}
                </div>
              </div>

              {/* Expected Attendees */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Expected Attendees <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  name="expectedAttendees"
                  placeholder="Enter number of attendees"
                  min="1"
                  step="1"
                  value={form.expectedAttendees}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={(e) => {
                    if (["e", "E", "+", "-"].includes(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Capacity: <span className="font-medium text-slate-700">{getResourceCapacity(form.resourceId) ?? "-"}</span>
                  </span>
                  <span className="text-xs text-slate-500">
                    Entered: <span className="font-medium text-slate-700">{form.expectedAttendees || "-"}</span>
                  </span>
                </div>
                <div className="text-xs text-red-600 min-h-[1.25rem]">
                  {touched.expectedAttendees && errors.expectedAttendees ? errors.expectedAttendees : ""}
                </div>
              </div>

              {/* Time Selection */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Start Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  name="startTime"
                  min={getMinStartTime()}
                  max={BUSINESS_END}
                  value={form.startTime}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <p className="text-xs text-slate-500">Business hours: 08:00 - 20:00</p>
                <div className="text-xs text-red-600 min-h-[1.25rem]">
                  {touched.startTime && errors.startTime ? errors.startTime : ""}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  End Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  name="endTime"
                  min={form.startTime ? addMinutes(form.startTime, MIN_DURATION_MINUTES) : BUSINESS_START}
                  max={BUSINESS_END}
                  value={form.endTime}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-500">Business hours: 08:00 - 20:00</p>
                  {form.startTime && form.endTime && (
                    <span className="text-xs font-semibold text-blue-600">
                      Duration: {formatDuration(calculateDurationMinutes(form.startTime, form.endTime))}
                    </span>
                  )}
                </div>
                <div className="text-xs text-red-600 min-h-[1.25rem]">
                  {touched.endTime && errors.endTime ? errors.endTime : ""}
                </div>
              </div>

              {/* Special Requirements */}
              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-medium text-slate-700">
                  Special Requirements <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  name="specialRequirements"
                  placeholder="e.g., Projector, Whiteboard, Lab equipment, Accessibility needs"
                  value={form.specialRequirements}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                <div className="text-xs text-red-600 min-h-[1.25rem]">
                  {touched.specialRequirements && errors.specialRequirements ? errors.specialRequirements : ""}
                </div>
              </div>
            </div>

            {/* Info Note */}
            <div className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <span className="text-amber-500 text-lg">ℹ️</span>
                <div>
                  <p className="text-sm text-amber-800 font-medium">Important Note</p>
                  <p className="text-sm text-amber-700 mt-1">
                    All bookings are submitted as <strong>PENDING</strong> and will be reviewed by an administrator.
                    You will be notified once your booking is approved or rejected.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Booking Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between py-2 border-b border-slate-200">
                <span className="text-slate-600">Resource:</span>
                <span className="font-semibold text-slate-900">
                  {resources.find(r => String(r.id) === String(form.resourceId))?.name || '-'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-200">
                <span className="text-slate-600">Date:</span>
                <span className="font-semibold text-slate-900">{form.bookingDate || '-'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-200">
                <span className="text-slate-600">Time:</span>
                <span className="font-semibold text-slate-900">
                  {form.startTime || '-'} — {form.endTime || '-'}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-200">
                <span className="text-slate-600">Attendees:</span>
                <span className="font-semibold text-slate-900">
                  {form.expectedAttendees || '-'} / {getResourceCapacity(form.resourceId) ?? '-'} capacity
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-200 sm:col-span-2">
                <span className="text-slate-600">Purpose:</span>
                <span className="font-semibold text-slate-900 text-right">{form.purpose || '-'}</span>
              </div>
              {form.specialRequirements && (
                <div className="flex justify-between py-2 border-b border-slate-200 sm:col-span-2">
                  <span className="text-slate-600">Special Requirements:</span>
                  <span className="font-semibold text-slate-900 text-right">{form.specialRequirements}</span>
                </div>
              )}
            </div>

            {/* Confirmation Checkbox */}
            <div className="mt-4 pt-4 border-t border-slate-200">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={confirmChecked}
                  onChange={(e) => setConfirmChecked(e.target.checked)}
                  className="mt-0.5 h-5 w-5 text-blue-600 focus:ring-blue-500 border-slate-300 rounded cursor-pointer"
                />
                <span className="text-sm text-slate-700">
                  I confirm that the information above is accurate and I agree to the booking terms and conditions.
                </span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex flex-wrap gap-3 justify-end">
            <button
              onClick={() => {
                setForm({ resourceId: "", bookingDate: "", startTime: "", endTime: "", purpose: "", expectedAttendees: "", specialRequirements: "" });
                setErrors({});
                setTouched({});
                setBookedSlots([]);
                setAvailabilityMessage("");
                setIsFullyBooked(false);
                setConfirmChecked(false);
              }}
              className="px-6 py-2.5 bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all"
            >
              Clear Form
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitDisabled || isSubmitting}
              className={`px-8 py-2.5 rounded-lg font-medium transition-all ${
                isSubmitDisabled
                  ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md hover:shadow-lg"
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                  Creating...
                </span>
              ) : (
                "Create Booking"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookingCreatePage;
