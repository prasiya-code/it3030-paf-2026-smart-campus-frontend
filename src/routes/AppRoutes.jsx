import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";
import UserLayout from "../layouts/UserLayout";
import Home from "../pages/public/Home";
import About from "../pages/public/About";
import Contact from "../pages/public/Contact";
import Features from "../pages/public/Features";
import Dashboard from "../pages/user/Dashboard";
import Tickets from "../pages/user/Tickets";
import CreateTicket from "../pages/user/CreateTicket";
import TicketDetails from "../pages/user/TicketDetails";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/features" element={<Features />} />
        </Route>

        <Route element={<UserLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/tickets/create" element={<CreateTicket />} />
          <Route path="/tickets/:id" element={<TicketDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;