import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getUserFriends,
  sendFriendRequest,
} from "../lib/api";

import { Link } from "react-router-dom";

import {
  CheckCircleIcon,
  MapPinIcon,
  UserPlusIcon,
  UsersIcon,
  CpuIcon,
  BrainIcon,
  Code2Icon,
  BoxesIcon,
  Gamepad2Icon,
  PuzzleIcon,
  RocketIcon,
} from "lucide-react";

import { motion } from "framer-motion";

import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";

/* ---------- SERVICES ---------- */

const coreServices = [
  {
    title: "AI vs Human",
    desc: "Battle AI in coding challenges",
    icon: CpuIcon,
    link: "/code-duel/",
  },
  {
    title: "AI Mock Interview",
    desc: "Practice interviews with AI",
    icon: BrainIcon,
    link: "/mock-interview/",
  },
  {
    title: "Solo Code Editor",
    desc: "Single user compiler",
    icon: Code2Icon,
    link: "/code-editor/",
  },
  {
    title: "Realtime Editor",
    desc: "Collaborative coding",
    icon: BoxesIcon,
    link: "/code-sync/",
  },
];

const games = [
  { title: "Roleplay IT", icon: Gamepad2Icon, link: "/it-roleplay/" },
  { title: "TechCross", icon: PuzzleIcon, link: "/techcross" },
  { title: "Brain Challenge", icon: BrainIcon, link: "/brain-challenge" },
  { title: "Code Quest", icon: RocketIcon, link: "/skill-quest" },
];

/* ---------- ANIMATION ---------- */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.5,
    },
  }),
};

const HomePage = () => {
  const queryClient = useQueryClient();

  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["outgoingFriendReqs"],
      });
    },
  });

  useEffect(() => {
    const ids = new Set();

    outgoingFriendReqs?.forEach((req) => {
      ids.add(req.recipient._id);
    });

    setOutgoingRequestsIds(ids);
  }, [outgoingFriendReqs]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#070b14] text-white px-4 sm:px-6 lg:px-12 py-6 sm:py-10 space-y-16 sm:space-y-24">

      {/* ================= MOBILE BANNER ================= */}

      <div className="lg:hidden">
        <div className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-r from-[#08111f] via-[#0b1220] to-[#1a1033] p-4">

          <div className="absolute -left-10 top-0 w-32 h-32 bg-cyan-500/20 blur-3xl" />
          <div className="absolute right-0 bottom-0 w-32 h-32 bg-purple-500/20 blur-3xl" />

          <div className="relative z-10 flex items-center justify-between gap-3">

            <div className="flex items-center gap-3 min-w-0">

              <div className="size-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl shadow-lg shadow-cyan-500/20">
                🚀
              </div>

              <div className="min-w-0">
                <h3 className="font-bold text-sm truncate">
                  Code. Connect. Compete.
                </h3>

                <p className="text-xs text-gray-400 truncate">
                  All-in-one platform for developers
                </p>
              </div>
            </div>

            <a
              href="#services"
              className="shrink-0 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-sm font-semibold"
            >
              Explore
            </a>
          </div>
        </div>
      </div>

      {/* ================= HERO DESKTOP ================= */}

      <section className="hidden lg:block relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0b1220] via-[#070b14] to-[#020617] p-14">

        <div className="absolute -top-40 -left-40 w-[420px] h-[420px] bg-cyan-500/30 blur-[140px]" />

        <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-purple-600/30 blur-[140px]" />

        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="relative z-10 max-w-3xl"
        >
          <div className="flex items-center gap-2 text-cyan-400 mb-4">
            <span className="text-xs tracking-[0.3em] font-semibold">
              DEVCONNECT
            </span>
          </div>

          <h1 className="text-5xl font-bold leading-tight mb-6">
            The Social Platform for{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Developers
            </span>
          </h1>

          <p className="text-gray-400 text-lg mb-8">
            Practice with AI, collaborate in realtime, compete in coding games
            and connect with developers worldwide.
          </p>

          <div className="flex gap-4">
            <a
              href="#services"
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition font-medium"
            >
              Explore Services
            </a>

            <Link
              to="/code-editor/"
              className="px-8 py-3 rounded-xl border border-purple-500 hover:bg-purple-600/20 transition"
            >
              Start Coding
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ================= SERVICES ================= */}

      <section id="services">

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12"
        >
          Developer Tools
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8">

          {coreServices.map((s, i) => {
            const Icon = s.icon;

            return (
              <motion.div
                key={s.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <Link
                  to={s.link}
                  className="group block rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-5 sm:p-7 hover:border-cyan-400/40 hover:-translate-y-2 transition"
                >
                  <div className="flex items-center justify-between mb-6">

                    <Icon className="size-8 sm:size-9 text-cyan-400 group-hover:scale-110 transition" />

                    <span className="text-[10px] px-2 py-1 rounded bg-cyan-500/10 text-cyan-300">
                      TOOL
                    </span>
                  </div>

                  <h3 className="font-semibold text-lg mb-1">
                    {s.title}
                  </h3>

                  <p className="text-sm text-gray-400">
                    {s.desc}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ================= GAMES ================= */}

      <section>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12"
        >
          Developer Games
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8">

          {games.map((g, i) => {
            const Icon = g.icon;

            return (
              <motion.div
                key={g.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <Link
                  to={g.link}
                  className="group block rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.02] p-5 sm:p-7 hover:border-purple-400/40 hover:-translate-y-2 transition"
                >
                  <div className="flex items-center justify-between mb-6">

                    <Icon className="size-8 sm:size-9 text-purple-400 group-hover:scale-110 transition" />

                    <span className="text-[10px] px-2 py-1 rounded bg-purple-500/10 text-purple-300">
                      GAME
                    </span>
                  </div>

                  <h3 className="font-semibold">
                    {g.title}
                  </h3>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ================= FRIENDS ================= */}

      <section>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

          <h2 className="text-2xl font-bold">
            Your Friends
          </h2>

          <Link
            to="/notifications"
            className="btn btn-outline btn-sm w-full sm:w-auto"
          >
            <UsersIcon className="mr-2 size-4" />
            Requests
          </Link>
        </div>

        {loadingFriends ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : friends.length === 0 ? (
          <NoFriendsFound />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {friends.map((f) => (
              <FriendCard key={f._id} friend={f} />
            ))}
          </div>
        )}
      </section>

      {/* ================= RECOMMENDED ================= */}

      <section>

        <h2 className="text-2xl font-bold mb-6">
          Meet Developers
        </h2>

        {loadingUsers ? (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">

            {recommendedUsers.map((user) => {
              const sent = outgoingRequestsIds.has(user._id);

              return (
                <div
                  key={user._id}
                  className="glass-card rounded-xl p-5 hover:shadow-neon-blue transition"
                >
                  <div className="flex items-center gap-3 mb-3">

                    <img
                      src={user.profilePic}
                      alt={user.fullName}
                      className="size-14 rounded-full object-cover"
                    />

                    <div className="min-w-0">

                      <h3 className="font-semibold truncate">
                        {user.fullName}
                      </h3>

                      {user.location && (
                        <div className="flex items-center text-xs opacity-70 truncate">
                          <MapPinIcon className="size-3 mr-1 shrink-0" />

                          <span className="truncate">
                            {user.location}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {user.bio && (
                    <p className="text-sm opacity-70 mb-3 break-words">
                      {user.bio}
                    </p>
                  )}

                  <button
                    className={`btn w-full text-sm sm:text-base ${
                      sent ? "btn-disabled" : "btn-primary"
                    }`}
                    onClick={() => sendRequestMutation(user._id)}
                    disabled={sent || isPending}
                  >
                    {sent ? (
                      <>
                        <CheckCircleIcon className="size-4 mr-2" />
                        Sent
                      </>
                    ) : (
                      <>
                        <UserPlusIcon className="size-4 mr-2" />
                        Add Friend
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage;