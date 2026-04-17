import { BrowserRouter, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import ProtectedRoute from "../components/auth/ProtectedRoute";
import LoginPage from "../pages/auth/LoginPage";
import SignUpPage from "../pages/auth/SignUpPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import NotificationsPage from "../pages/notifications/NotificationsPage";
import MainLayout from "../layouts/MainLayout";
import Layout from "../components/layout/Layout";
=======
import Layout from "../components/layout/Layout";
import UserLayout from "../layouts/UserLayout";
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";
import Features from "../pages/public/Features";
import Dashboard from "../pages/user/Dashboard";
>>>>>>> origin/dev

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
<<<<<<< HEAD
        {/* Authentication pages with Layout wrapper */}
        <Route path="/login" element={
          <Layout>
            <LoginPage />
          </Layout>
        } />
        <Route path="/signup" element={
          <Layout>
            <SignUpPage />
          </Layout>
        } />
        <Route path="/forgot-password" element={
          <Layout>
            <ForgotPasswordPage />
          </Layout>
        } />
        
        {/* Protected routes with MainLayout */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute>
              <MainLayout>
                <h1>Home</h1>
              </MainLayout>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/notifications" 
          element={
            <ProtectedRoute>
              <MainLayout>
                <NotificationsPage />
              </MainLayout>
            </ProtectedRoute>
          } 
        />
=======
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/features" element={<Features />} />
        </Route>

        <Route element={<UserLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
>>>>>>> origin/dev
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;