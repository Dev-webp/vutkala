import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar/Navbar";
import Footer from "./Footer";

function PublicLayout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default PublicLayout;