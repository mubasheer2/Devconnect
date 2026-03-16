import { Loader2 } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

const PageLoader = () => {
  const { theme } = useThemeStore();

  return (
    <div
      className="min-h-screen flex items-center justify-center 
      bg-[radial-gradient(circle_at_top,#0f172a,#020617)]"
      data-theme={theme}
    >
      <div className="relative flex flex-col items-center">

        {/* glow circle */}
        <div className="absolute w-40 h-40 rounded-full 
          bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-blue-500/30 
          blur-3xl animate-pulse" />

        {/* loader ring */}
        <div className="relative w-20 h-20 rounded-full 
          border-2 border-white/10 
          flex items-center justify-center
          backdrop-blur-xl">

          <Loader2 className="animate-spin size-10 text-indigo-400" />
        </div>

        {/* text */}
        <p className="mt-6 text-white/60 text-sm tracking-wide">
          Loading DevConnect...
        </p>
      </div>
    </div>
  );
};

export default PageLoader;
