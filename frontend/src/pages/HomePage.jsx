return (
  <div className="min-h-screen overflow-x-hidden bg-[#070b14] text-white px-4 sm:px-6 lg:px-12 py-4 sm:py-6 space-y-16 sm:space-y-24">

    {/* ================= MOBILE HERO ================= */}

    <section className="lg:hidden relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0b1220] via-[#070b14] to-[#020617] p-5">

      {/* glow */}
      <div className="absolute -top-10 -left-10 w-[140px] h-[140px] bg-cyan-500/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[140px] h-[140px] bg-purple-500/20 blur-3xl" />

      <div className="relative z-10">

        <div className="text-cyan-400 text-[10px] tracking-[0.3em] font-semibold mb-3">
          DEVCONNECT
        </div>

        <h1 className="text-3xl font-bold leading-tight mb-4">
          The Social Platform for{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            Developers
          </span>
        </h1>

        <p className="text-sm text-gray-400 leading-7 mb-6">
          Practice with AI, collaborate in realtime, compete in coding games
          and connect with developers worldwide.
        </p>

        <div className="flex gap-3">

          <a
            href="#services"
            className="flex-1 text-center py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 font-medium"
          >
            Explore
          </a>

          <Link
            to="/code-editor/"
            className="flex-1 text-center py-3 rounded-xl border border-purple-500"
          >
            Start
          </Link>
        </div>
      </div>
    </section>

    {/* ================= HERO DESKTOP ================= */}

    <section className="hidden lg:block relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#0b1220] via-[#070b14] to-[#020617] px-14 py-12">

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

        <p className="text-gray-400 text-lg mb-8 max-w-2xl">
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