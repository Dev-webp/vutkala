import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";
import Jobs from "../pages/Jobs/Jobs";
import Services from "../pages/ServiceHome/Services"
import Hire from "../pages/Hire/Hire";

import Register from "../pages/login/Register";
import Login from "../pages/login/Login";
import ForgotPassword from "../pages/login/ForgotPassword";
import ResetPassword from "../pages/login/ResetPassword";
import VerifyOTP from "../pages/login/VerifyOTP";

import Industries from "../pages/Industries/Industries"



function AppRoutes() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/about" element={<About />} />

      <Route path="/contact" element={<Contact />} />

      <Route path="/jobs" element={<Jobs />} />

      <Route path="/services" element={<Services />} />

      <Route path="/hire" element={<Hire />} />

      <Route path="/industry" element={<Industries/>} />

      {/* Authentication */}

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/forgot"
        element={<ForgotPassword />}
      />

      <Route
        path="/reset-password"
        element={<ResetPassword />}
      />

      <Route
        path="/verify-otp"
        element={<VerifyOTP />}
      />

    </Routes>
  );
}

export default AppRoutes;