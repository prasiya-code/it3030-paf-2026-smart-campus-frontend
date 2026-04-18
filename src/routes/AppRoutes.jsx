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
import CreateTicket from "../pages/user/CreateTicket";
import TicketDetails from "../pages/user/TicketDetails";
import ProfilePage from "../pages/user/ProfilePage";
import ResourceListPage from "../pages/resources/ResourceListPage";
import ResourceCreatePage from "../pages/resources/ResourceCreatePage";
import ResourceEditPage from "../pages/resources/ResourceEditPage";
import AdminDashboardPage from "../pages/admin/AdminDashboardPage";
import AdminResourceListPage from "../pages/admin/AdminResourceListPage";
import AdminNotificationsPage from "../pages/admin/AdminNotificationsPage";
import AdminProfilePage from "../pages/admin/AdminProfilePage";
import UserManagementPage from "../pages/admin/UserManagementPage";
import AdminTickets from "../pages/admin/AdminTickets";
import AdminTicketDetails from "../pages/admin/AdminTicketDetails";

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
          <Route path="/tickets/create" element={<CreateTicket />} />
          <Route path="/tickets/:id" element={<TicketDetails />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/resources" element={<ResourceListPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
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
          <Route path="/admin/tickets" element={<AdminTickets />} />
          <Route path="/admin/tickets/:id" element={<AdminTicketDetails />} />
          <Route path="/admin/resources" element={<AdminResourceListPage />} />
          <Route path="/admin/resources/create" element={<ResourceCreatePage />} />
          <Route path="/admin/resources/edit/:id" element={<ResourceEditPage />} />
          <Route path="/admin/notifications" element={<AdminNotificationsPage />} />
          <Route path="/admin/profile" element={<AdminProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;