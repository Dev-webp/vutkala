import React from "react";

import "../../styles/admin/AdminHeader.css";

export default function AdminHeader() {
  return (
    <header className="admin-header">

      <div className="admin-header-left">

        <div>

          <span className="admin-header-label">
            ADMINISTRATION
          </span>

          <h1>
            Vutkala Global Technologies
          </h1>

        </div>

      </div>


      <div className="admin-header-right">

        {/* Notification */}
        <button
          type="button"
          className="admin-header-icon-button"
          title="Notifications"
        >
          🔔

          <span className="admin-notification-dot" />

        </button>


        {/* Admin profile */}
        <button
          type="button"
          className="admin-profile-button"
        >

          <div className="admin-profile-avatar">
            A
          </div>

          <div className="admin-profile-info">

            <strong>
              Vutkala Admin
            </strong>

            <span>
              Administrator
            </span>

          </div>

          <span className="admin-profile-arrow">
            ▾
          </span>

        </button>

      </div>

    </header>
  );
}