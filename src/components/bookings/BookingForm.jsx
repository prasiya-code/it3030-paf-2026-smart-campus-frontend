import React, { useState, useEffect, useMemo } from "react";
import { getAllResources } from "../../api/resourceApi";

/**
 * BookingForm Component
 * Reusable form for creating bookings with Tailwind
 * 
 * @param {Object} props
 * @param {Function} props.onSubmit - Submit handler (receives form data)
 * @param {Function} props.onCancel - Cancel handler
 * @param {boolean} props.isSubmitting - Whether form is submitting
 */
function BookingForm({ onSubmit, onCancel, isSubmitting = false }) {
  const today = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }, []);

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
  });

  const [resources, setResources] = useState([]);
  const [loadingResources, setLoadingResources] = useState(true);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Fetch resources on mount
  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      setLoadingResources(true);
      const res = await getAllResources();
      setResources(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error("[BOOKING_FORM] Failed to load resources:", err);
    } finally {
      setLoadingResources(false);
    }
  };

  const getResourceCapacity = (resourceId) => {
    if (!resourceId) return null;
    const r = resources.find((res) => String(res.id) === String(resourceId));
    if (!r) return null;
    return r.capacity || r.maxCapacity || r.capacityLimit || r.seats || null;
  };

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

  const getMinStartTime = () => {
    if (form.bookingDate === today) {
      const now = new Date();
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
        const cap = getResourceCapacity(updatedForm.resourceId);
        if (cap !== null && Number(value) > Number(cap)) {
          return "Number of attendees exceeds resource capacity";
        }
        return "";
      }

      default:
        return "";
    }
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
      newErrors.startTime = validateField("startTime", updatedForm.startTime, updatedForm);
      newErrors.endTime = validateField("endTime", updatedForm.endTime, updatedForm);
    }

    setErrors(newErrors);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, form[name], form),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mark all fields as touched
    const allTouched = {
      resourceId: true,
      bookingDate: true,
      startTime: true,
      endTime: true,
      purpose: true,
      expectedAttendees: true,
    };
    setTouched(allTouched);

    // Validate all fields
    const newErrors = {
      resourceId: validateField("resourceId", form.resourceId, form),
      bookingDate: validateField("bookingDate", form.bookingDate, form),
      startTime: validateField("startTime", form.startTime, form),
      endTime: validateField("endTime", form.endTime, form),
      purpose: validateField("purpose", form.purpose, form),
      expectedAttendees: validateField("expectedAttendees", form.expectedAttendees, form),
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((error) => error !== "");
    if (hasErrors) return;

    // Submit the form
    const payload = {
      resourceId: Number(form.resourceId),
      bookingDate: form.bookingDate,
      startTime: form.startTime,
      endTime: form.endTime,
      purpose: form.purpose.trim(),
      expectedAttendees: Number(form.expectedAttendees),
    };

    onSubmit(payload);
  };

  const handleReset = () => {
    setForm({
      resourceId: "",
      bookingDate: "",
      startTime: "",
      endTime: "",
      purpose: "",
      expectedAttendees: "",
    });
    setErrors({});
    setTouched({});
  };

  const hasErrors = Object.values(errors).some((error) => error !== "");
  const hasEmptyFields =
    !form.resourceId ||
    !form.bookingDate ||
    !form.startTime ||
    !form.endTime ||
    !form.purpose.trim() ||
    !form.expectedAttendees;

  const isDisabled = hasErrors || hasEmptyFields || isSubmitting;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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

        {/* Start Time */}
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

        {/* End Time */}
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
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center pt-6 border-t border-slate-200">
        <button
          type="submit"
          disabled={isDisabled}
          className={`px-8 py-2.5 rounded-lg font-medium transition-all ${
            isDisabled
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
        <button
          type="button"
          onClick={handleReset}
          className="px-6 py-2.5 bg-white text-slate-700 border border-slate-300 rounded-lg font-medium hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all"
        >
          Clear
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2.5 bg-slate-100 text-slate-700 rounded-lg font-medium hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-all"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default BookingForm;
