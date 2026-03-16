import { Link, useLocation } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAuthUser from "../hooks/useAuthUser";
import useLogout from "../hooks/useLogout";
import { Bell, LogOut, ShipWheel } from "lucide-react";
import { getFriendRequests } from "../lib/api";

const Navbar = () => {

  // ✅ Auth user
  const { authUser } = useAuthUser();

  // ✅ Logout mutation
  const { logoutMutation } = useLogout();

  // ✅ Current location
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  // ✅ Fetch notifications every 5 seconds
  const { data: notifications } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
    refetchInterval: 5000,
  });

  // ✅ Safe counts
  const incomingCount = notifications?.incomingReqs?.length || 0;
  const acceptedCount = notifications?.acceptedReqs?.length || 0;
  const totalCount = incomingCount + acceptedCount;

  return (
    <header
      className="sticky top-0 z-40 backdrop-blur-xl border-b border-white/10 
      bg-[linear-gradient(180deg,rgba(10,10,20,0.9),rgba(10,10,20,0.6))]"
    >
      <div className="h-16 flex items-center justify-between px-6">

        {/* LEFT — LOGO */}
        <div className="flex items-center gap-3">
          {isChatPage && (
            <Link to="/" className="flex items-center gap-2 group">

              <ShipWheel className="size-8 text-indigo-400 group-hover:text-indigo-300 transition" />

              <span className="font-semibold text-white tracking-wide">
                DevConnect
              </span>

            </Link>
          )}
        </div>

        {/* RIGHT — ACTIONS */}
        <div className="flex items-center gap-3">

          {/* 🔔 Notifications */}
          <Link
            to="/notifications"
            className="relative p-2 rounded-xl border border-white/10 
            bg-white/5 hover:bg-white/10 transition"
          >

            <Bell className="size-5 text-white/80" />

            {/* ✅ Notification Badge */}
            {totalCount > 0 && (
              <span
                className="absolute -top-1 -right-1 
                bg-red-500 text-white text-xs font-semibold
                rounded-full min-w-[18px] h-[18px]
                flex items-center justify-center
                animate-pulse"
              >
                {totalCount}
              </span>
            )}

          </Link>

          {/* 👤 Avatar */}
          <div className="relative">

            <img
              src={
                authUser?.profilePic ||
                `https://api.dicebear.com/7.x/initials/svg?seed=${authUser?.fullName}`
              }
              className="w-9 h-9 rounded-full border border-white/20 
              bg-white/10 backdrop-blur object-cover"
              alt="User"
            />

            <span
              className="absolute inset-0 rounded-full 
              shadow-[0_0_10px_rgba(99,102,241,0.6)] pointer-events-none"
            />

          </div>

          {/* 🚪 Logout */}
          <button
            onClick={logoutMutation}
            className="p-2 rounded-xl border border-white/10 
            bg-white/5 hover:bg-red-500/20 hover:border-red-400/40 
            transition"
          >

            <LogOut className="size-5 text-white/80" />

          </button>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
