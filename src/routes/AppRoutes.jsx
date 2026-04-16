import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/auth/ProtectedRoute";
import LoginPage from "../pages/auth/LoginPage";
import SignUpPage from "../pages/auth/SignUpPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import NotificationsPage from "../pages/notifications/NotificationsPage";
import MainLayout from "../layouts/MainLayout";
import Layout from "../components/layout/Layout";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;