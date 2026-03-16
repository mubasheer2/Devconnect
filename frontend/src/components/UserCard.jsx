import { Link } from "react-router";
import { MessageSquare, UserPlus, Check } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendFriendRequest } from "../lib/api";
import toast from "react-hot-toast";

export const UserCard = ({ user, type = "friend" }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (userId) => sendFriendRequest(userId),
    onSuccess: () => {
      toast.success("Friend request sent");
      queryClient.invalidateQueries({ queryKey: ["recommendedUsers"] });
      queryClient.invalidateQueries({ queryKey: ["outgoingRequests"] });
    },
  });

  const handleAdd = () => {
    if (type === "stranger" && !isSuccess) mutate(user._id);
  };

  const uid = user._id.slice(-6).toUpperCase();

  return (
    <div
      className="
      relative rounded-2xl p-4 flex flex-col gap-3
      bg-gradient-to-br from-white/60 to-white/30
      dark:from-white/5 dark:to-white/0
      backdrop-blur-xl
      border border-black/5 dark:border-white/10
      hover:border-primary/40
      transition-all duration-300
      hover:shadow-[0_10px_30px_rgba(99,102,241,0.25)]
      group
    "
    >
      {/* top */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src={user.profilePic || "/avatar.png"}
            alt={user.fullName}
            className="
              w-12 h-12 rounded-full object-cover
              ring-2 ring-white/60 dark:ring-white/10
              group-hover:ring-primary/50
              transition
            "
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate text-sm">
            {user.fullName}
          </h3>

          {/* UID */}
          <div className="mt-1 text-[11px] font-mono tracking-wider text-primary/80">
            #{uid}
          </div>
        </div>
      </div>

      {/* action */}
      <div className="mt-2">
        {type === "friend" && (
          <Link
            to={`/chat/${user._id}`}
            className="
              w-full h-9 rounded-lg
              flex items-center justify-center gap-2
              text-xs font-medium
              border border-primary/30
              hover:bg-primary/10
              text-primary
              transition
            "
          >
            <MessageSquare className="size-4" />
            Message
          </Link>
        )}

        {type === "stranger" && (
          <>
            {isSuccess ? (
              <div className="w-full h-9 rounded-lg flex items-center justify-center gap-2 text-xs font-medium bg-primary/10 text-primary border border-primary/30">
                <Check className="size-4" />
                Request Sent
              </div>
            ) : (
              <button
                onClick={handleAdd}
                disabled={isPending}
                className="
                  w-full h-9 rounded-lg
                  flex items-center justify-center gap-2
                  text-xs font-medium
                  bg-gradient-to-r from-indigo-500 to-purple-500
                  text-white
                  hover:brightness-110
                  active:scale-95
                  transition
                "
              >
                {isPending ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <UserPlus className="size-4" />
                )}
                Add Friend
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};
