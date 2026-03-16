"use client";

import React from "react";

export default function NotificationDropdown() {
  return (
    <div className="w-[380px] bg-[#111] border border-gray-800 rounded-lg shadow-lg">

      {/* HEADER */}
      <div className="flex items-center px-4 py-3 border-b border-gray-800">

        {/* LEFT SIDE */}
        <h2 className="text-white text-sm font-semibold">
          Notifications
        </h2>

        {/* RIGHT SIDE BUTTON */}
        <button
          className="ml-auto text-xs text-blue-400 hover:text-blue-300"
          onClick={() => console.log("Mark all as read")}
        >
          Mark all as read
        </button>

      </div>


      {/* FILTER SECTION */}
      <div className="flex gap-2 px-4 py-2 border-b border-gray-800">

        <button className="text-xs px-3 py-1 bg-blue-600 text-white rounded-md">
          All
        </button>

        <button className="text-xs px-3 py-1 bg-gray-800 text-gray-300 rounded-md">
          Unread
        </button>

        <button className="text-xs px-3 py-1 bg-gray-800 text-gray-300 rounded-md">
          Archive
        </button>

      </div>


      {/* EMPTY STATE */}
      <div className="px-4 py-6 text-center text-gray-400 text-sm">
        No notifications
      </div>

    </div>
  );
}
