import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Home, MessageSquare, Users } from "lucide-react";
import { Link, useLocation } from "react-router";

const Layout = ({ children, showSidebar = false }) => {
  return (
    <div className="min-h-screen flex flex-col text-white 
      bg-[radial-gradient(circle_at_20%_20%,#1a1f3a,transparent_40%),
          radial-gradient(circle_at_80%_0%,#2a1f5c,transparent_40%),
          #0b0f1a]">

      <div className="flex flex-1 overflow-hidden">
        {showSidebar && (
          <div className="hidden md:block">
            <Sidebar />
          </div>
        )}

        <div className="flex-1 flex flex-col min-w-0">
          <Navbar />

          <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-24 md:pb-6">
            {children}
          </main>
        </div>
      </div>

      {showSidebar && <BottomNavbar />}
    </div>
  );
};

const BottomNavbar = () => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: MessageSquare, label: "Chat", path: "/chat" },
    { icon: Users, label: "Friends", path: "/friends" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      {/* glass background */}
      <div className="mx-3 mb-3 rounded-2xl backdrop-blur-xl
        bg-white/5 border border-white/10 shadow-[0_0_25px_rgba(139,92,246,0.25)]">

        <div className="flex justify-around items-center h-16">
          {navItems.map(({ icon: Icon, label, path }) => {
            const active = isActive(path);

            return (
              <Link
                key={path}
                to={path}
                className="flex flex-col items-center justify-center w-full h-full relative"
              >
                {/* glow */}
                {active && (
                  <div className="absolute inset-0 rounded-xl 
                    bg-gradient-to-tr from-purple-500/20 to-blue-500/20 blur-xl" />
                )}

                <Icon
                  className={`relative z-10 size-6 transition ${
                    active
                      ? "text-purple-400 drop-shadow-[0_0_6px_rgba(168,85,247,0.8)]"
                      : "text-white/60"
                  }`}
                />

                <span
                  className={`text-[10px] mt-1 relative z-10 ${
                    active ? "text-purple-300" : "text-white/50"
                  }`}
                >
                  {label}
                </span>

                {/* neon line */}
                {active && (
                  <div className="absolute -bottom-1 w-6 h-[2px] rounded-full 
                    bg-gradient-to-r from-purple-400 to-blue-400 
                    shadow-[0_0_8px_rgba(168,85,247,0.9)]" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Layout;
