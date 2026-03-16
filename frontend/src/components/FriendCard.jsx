import { useNavigate } from "react-router-dom";

const FriendCard = ({ friend }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/chat/${friend._id}`, { state: { forceReload: Date.now() } });
  };

  return (
    <div onClick={handleClick} className="relative group cursor-pointer">
      {/* Glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-neon-blue/20 via-neon-purple/20 to-neon-blue/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-500" />

      {/* Card */}
      <div className="relative glass-card rounded-2xl p-5 flex flex-col gap-4 border border-border/50 backdrop-blur-xl transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/40">

        {/* USER */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple blur-md opacity-70" />
            <img
              src={friend.profilePic}
              alt={friend.fullName}
              className="relative size-14 rounded-full object-cover border border-white/10"
            />
          </div>

          <div className="flex flex-col">
            <h3 className="font-semibold text-base leading-tight">
              {friend.fullName}
            </h3>
            <span className="text-xs text-secondary-content">
              UID: {friend.uid || friend._id?.slice(-6)}
            </span>
          </div>
        </div>

        {/* DEV INFO */}
        <div className="flex flex-wrap gap-2">
          {friend.domain && (
            <Pill label="Domain" value={friend.domain} />
          )}
          {friend.primaryTech && (
            <Pill label="Tech" value={friend.primaryTech} />
          )}
        </div>

        {/* BUTTON */}
        <div className="mt-1 w-full text-sm font-medium text-center rounded-lg py-2.5 bg-gradient-to-r from-neon-blue to-neon-purple hover:opacity-90 transition">
          Message
        </div>
      </div>
    </div>
  );
};

export default FriendCard;

function Pill({ label, value }) {
  return (
    <span className="px-2.5 py-1 rounded-full text-xs bg-white/5 border border-white/10">
      {label}: {value}
    </span>
  );
}