import React from "react";
import { Outlet } from "react-router-dom";

import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminHeader from "../../components/admin/AdminHeader";

import "../../styles/admin/AdminLayout.css";

export default function AdminLayout() {
  return (
    <div className="admin-layout">

      <AdminSidebar />

      <div className="admin-main">

        <AdminHeader />

        <main className="admin-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}