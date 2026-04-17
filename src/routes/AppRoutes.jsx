import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";
import UserLayout from "../layouts/UserLayout";

import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";
import Features from "../pages/public/Features";

import Dashboard from "../pages/user/Dashboard";
import Tickets from "../pages/user/Tickets";
<<<<<<< HEAD
import ResourceListPage from "../pages/resources/ResourceListPage";
=======
import ProfilePage from "../pages/user/ProfilePage";

>>>>>>> feature/inupama-notifications-auth

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/features" element={<Features />} />
        </Route>

        {/* User Layout */}
        <Route element={<UserLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resources" element={<ResourceListPage />} />
          <Route path="/tickets" element={<Tickets />} />
<<<<<<< HEAD
=======
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
>>>>>>> feature/inupama-notifications-auth
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;