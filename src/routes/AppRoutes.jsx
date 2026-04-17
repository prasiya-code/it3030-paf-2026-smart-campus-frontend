import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import LoginPage from "../pages/auth/LoginPage";
import SignUpPage from "../pages/auth/SignUpPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import NotificationsPage from "../pages/notifications/NotificationsPage";
import Layout from "../components/layout/Layout";
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";
import Features from "../pages/public/Features";
import Dashboard from "../pages/user/Dashboard";
import Tickets from "../pages/user/Tickets";
import ProfilePage from "../pages/user/ProfilePage";
import ResourceListPage from "../pages/resources/ResourceListPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminNotificationsPage from "../pages/admin/AdminNotificationsPage";
import AdminProfilePage from "../pages/admin/AdminProfilePage";
import UserManagementPage from "../pages/admin/UserManagementPage";
import BookingDashboardPage from "../pages/bookings/BookingDashboardPage";
import BookingCreatePage from "../pages/bookings/BookingCreatePage";
import MyBookingsPage from "../pages/bookings/MyBookingsPage";
import BookingListPage from "../pages/bookings/BookingListPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/features" element={<Features />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/resources" element={<ResourceListPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route path="/booking-dashboard" element={<BookingDashboardPage />} />
          <Route path="/create-booking" element={<BookingCreatePage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
        </Route>

        <Route
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/users" element={<UserManagementPage />} />
          <Route path="/admin/notifications" element={<AdminNotificationsPage />} />
          <Route path="/admin/profile" element={<AdminProfilePage />} />
          <Route path="/admin/bookings" element={<BookingListPage />} />
          <Route path="/admin/manage-bookings" element={<BookingListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;