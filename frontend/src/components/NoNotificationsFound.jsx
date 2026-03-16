import { Bell } from "lucide-react";

function NoNotificationsFound() {
  return (
    <div className="w-full flex items-center justify-center py-16">
      
      <div className="relative max-w-md w-full text-center rounded-3xl 
        border border-white/10 
        bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.15),rgba(10,10,20,0.9))]
        backdrop-blur-xl p-10">

        {/* glow border */}
        <div className="absolute -inset-[1px] rounded-3xl 
          bg-gradient-to-r from-indigo-500/40 via-purple-500/40 to-blue-500/40 
          blur opacity-40" />

        <div className="relative z-10 flex flex-col items-center">

          {/* icon */}
          <div className="w-20 h-20 rounded-2xl 
            bg-gradient-to-br from-indigo-500/20 to-purple-500/20 
            border border-white/10 flex items-center justify-center mb-6
            shadow-[0_0_30px_rgba(99,102,241,0.35)]">

            <Bell className="size-10 text-indigo-300" />
          </div>

          <h3 className="text-xl font-semibold text-white mb-2">
            No notifications yet
          </h3>

          <p className="text-white/60 leading-relaxed max-w-sm">
            Friend requests and updates will appear here when you receive them.
          </p>

        </div>
      </div>
    </div>
  );
}

export default NoNotificationsFound;
