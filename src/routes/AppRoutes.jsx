import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import LoginPage from "../pages/auth/LoginPage";
import SignUpPage from "../pages/auth/SignUpPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import NotificationsPage from "../pages/notifications/NotificationsPage";
import Layout from "../components/layout/Layout";
import UserLayout from "../layouts/UserLayout";
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";
import Features from "../pages/public/Features";
import Dashboard from "../pages/user/Dashboard";
<<<<<<< HEAD
import Tickets from "../pages/user/Tickets";
=======
import ResourceListPage from "../pages/resources/ResourceListPage";
>>>>>>> feature/kawya-resource

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
<<<<<<< HEAD
          <Route path="/tickets" element={<Tickets />} />
<<<<<<< HEAD
=======
          <Route path="/resources" element={<ResourceListPage />} />
>>>>>>> feature/kawya-resource
=======
          <Route path="/notifications" element={<NotificationsPage />} />
>>>>>>> 3a2115885c9923777c200b6adac63211cb55d467
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;