import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserFriends,
  getRecommendedUsers,
  sendFriendRequest,
  unfriendUser,
} from "../lib/api";

import { UserPlus, UserMinus, Search } from "lucide-react";

const FriendPage = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");

  const { data: friends = [] } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: strangers = [] } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: getRecommendedUsers,
  });

  const sendMutation = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => queryClient.invalidateQueries(["friends"]),
  });

  const unfriendMutation = useMutation({
    mutationFn: unfriendUser,
    onSuccess: () => queryClient.invalidateQueries(["friends"]),
  });

  // ---------- FILTER + SORT ----------
  const filterAndSort = (list) => {
    if (!search.trim()) return list;

    const s = search.toLowerCase();

    return [...list]
      .filter((u) =>
        u.fullName.toLowerCase().includes(s)
      )
      .sort((a, b) => {
        const aStarts = a.fullName.toLowerCase().startsWith(s);
        const bStarts = b.fullName.toLowerCase().startsWith(s);
        return bStarts - aStarts;
      });
  };

  const filteredFriends = filterAndSort(friends);
  const filteredStrangers = filterAndSort(strangers);

  const UserRow = ({ user, isFriend }) => (
    <div className="flex items-center justify-between p-3 rounded-lg bg-base-200">
      <div className="flex items-center gap-3">
        <img
          src={user.profilePic}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-semibold">{user.fullName}</p>
          <p className="text-xs opacity-60">{user._id}</p>
        </div>
      </div>

      {isFriend ? (
        <button
          className="btn btn-error btn-sm"
          onClick={() => unfriendMutation.mutate(user._id)}
        >
          <UserMinus size={16} />
          Unfriend
        </button>
      ) : (
        <button
          className="btn btn-primary btn-sm"
          onClick={() => sendMutation.mutate(user._id)}
        >
          <UserPlus size={16} />
          Add
        </button>
      )}
    </div>
  );

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">

      {/* SEARCH */}
      <div className="relative">
        <Search className="absolute left-3 top-3 opacity-60" size={18} />
        <input
          type="text"
          placeholder="Search friends or people..."
          className="input input-bordered w-full pl-10"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* FRIENDS */}
      <div className="space-y-2">
        <h2 className="font-bold text-lg">Friends</h2>

        {filteredFriends.length === 0 && (
          <p className="text-sm opacity-60">No friends found</p>
        )}

        {filteredFriends.map((u) => (
          <UserRow key={u._id} user={u} isFriend />
        ))}
      </div>

      {/* STRANGERS */}
      <div className="space-y-2">
        <h2 className="font-bold text-lg">People</h2>

        {filteredStrangers.length === 0 && (
          <p className="text-sm opacity-60">No users found</p>
        )}

        {filteredStrangers.map((u) => (
          <UserRow key={u._id} user={u} />
        ))}
      </div>
    </div>
  );
};

export default FriendPage;