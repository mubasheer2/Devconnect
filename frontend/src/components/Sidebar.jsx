import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import {
  BellIcon,
  HomeIcon,
  MessageSquareIcon,
  ShipWheelIcon,
  UsersIcon,
} from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => {
    if (path === "/chat") return currentPath.startsWith("/chat");
    return currentPath === path;
  };

  const navItems = [
    { icon: HomeIcon, path: "/", label: "Home" },
    { icon: MessageSquareIcon, path: "/chat", label: "Chat" },
    { icon: UsersIcon, path: "/friends", label: "Friends" },
    { icon: BellIcon, path: "/notifications", label: "Notifications" },
  ];

  return (
    <aside
      className="h-screen w-24 flex flex-col items-center 
      bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),#020617)]
      border-r border-white/10 backdrop-blur-xl
      py-8 gap-6"
    >
      {/* LOGO */}
      <Link
        to="/"
        className="flex items-center justify-center w-14 h-14 rounded-2xl
        bg-gradient-to-br from-indigo-500/20 to-purple-500/20
        border border-white/10
        shadow-[0_0_25px_rgba(99,102,241,0.35)]"
      >
        <ShipWheelIcon className="size-7 text-indigo-300" />
      </Link>

      {/* NAV */}
      <nav className="flex flex-col gap-5 mt-6">
        {navItems.map(({ icon: Icon, path, label }) => {
          const active = isActive(path);

          return (
            <Link
              key={path}
              to={path}
              title={label}
              className={`relative flex items-center justify-center 
              w-14 h-14 rounded-2xl transition-all duration-300
              ${
                active
                  ? "bg-gradient-to-br from-indigo-500/30 to-purple-500/30 text-white shadow-[0_0_25px_rgba(99,102,241,0.6)]"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              {/* active glow ring */}
              {active && (
                <div
                  className="absolute inset-0 rounded-2xl
                  bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500
                  opacity-40 blur"
                />
              )}

              <Icon className="size-6 relative z-10" />
            </Link>
          );
        })}
      </nav>

      {/* USER */}
      <div className="mt-auto">
        <div
          className="w-12 h-12 rounded-full overflow-hidden
          ring-2 ring-indigo-500/60
          shadow-[0_0_20px_rgba(99,102,241,0.5)]"
        >
          <img src={authUser?.profilePic} alt="user" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
