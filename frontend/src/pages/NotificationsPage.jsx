import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { clearAcceptedNotifications } from "../lib/api";
import {
  acceptFriendRequest,
  getFriendRequests,
} from "../lib/api";

import {
  BellIcon,
  ClockIcon,
  MessageSquareIcon,
  UserCheckIcon,
} from "lucide-react";

import NoNotificationsFound from "../components/NoNotificationsFound";

const NotificationsPage = () => {

  const queryClient = useQueryClient();

  // FETCH FRIEND REQUESTS
  const {
    data: friendRequests,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    staleTime: 0,
  });

  // ACCEPT FRIEND REQUEST
  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,

    onSuccess: () => {

      // refresh notifications
      queryClient.invalidateQueries({
        queryKey: ["friendRequests"],
      });

      // refresh friends list
      queryClient.invalidateQueries({
        queryKey: ["friends"],
      });

      // force refetch
      refetch();
    },
  });

  // IMPORTANT: clear / refresh badge when opening page
  useEffect(() => {
  const clear = async () => {
    try {
      await clearAcceptedNotifications();

      queryClient.invalidateQueries({
        queryKey: ["friendRequests"],
      });
    } catch (e) {
      console.error("Clear notifications failed", e);
    }
  };

  clear();
}, [queryClient]);
  // DATA
  const incomingRequests = friendRequests?.incomingReqs || [];

  const acceptedRequests = friendRequests?.acceptedReqs || [];

  return (
    <div className="p-4 sm:p-6 lg:p-8">

      <div className="container mx-auto max-w-4xl space-y-8">

        {/* PAGE TITLE */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6">
          Notifications
        </h1>

        {/* LOADING */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        )}

        {/* FRIEND REQUESTS */}
        {!isLoading && incomingRequests.length > 0 && (

          <section className="space-y-4">

            <h2 className="text-xl font-semibold flex items-center gap-2">

              <UserCheckIcon className="h-5 w-5 text-primary" />

              Friend Requests

              <span className="badge badge-primary ml-2">
                {incomingRequests.length}
              </span>

            </h2>

            <div className="space-y-3">

              {incomingRequests.map((request) => (

                <div
                  key={request._id}
                  className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow"
                >

                  <div className="card-body p-4">

                    <div className="flex items-center justify-between">

                      {/* USER INFO */}
                      <div className="flex items-center gap-3">

                        <div className="avatar w-14 h-14 rounded-full bg-base-300">

                          <img
                            src={request.sender.profilePic}
                            alt={request.sender.fullName}
                          />

                        </div>

                        <div>

                          <h3 className="font-semibold">
                            {request.sender.fullName}
                          </h3>

                          <div className="flex gap-1.5 mt-1">

                            <span className="badge badge-secondary badge-sm">
                              Native: {request.sender.nativeLanguage}
                            </span>

                            <span className="badge badge-outline badge-sm">
                              Learning: {request.sender.learningLanguage}
                            </span>

                          </div>

                        </div>

                      </div>

                      {/* ACCEPT BUTTON */}
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() =>
                          acceptRequestMutation(request._id)
                        }
                        disabled={isPending}
                      >

                        {isPending ? "Accepting..." : "Accept"}

                      </button>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </section>

        )}

        {/* ACCEPTED NOTIFICATIONS */}
        {!isLoading && acceptedRequests.length > 0 && (

          <section className="space-y-4">

            <h2 className="text-xl font-semibold flex items-center gap-2">

              <BellIcon className="h-5 w-5 text-success" />

              New Connections

            </h2>

            <div className="space-y-3">

              {acceptedRequests.map((notification) => (

                <div
                  key={notification._id}
                  className="card bg-base-200 shadow-sm"
                >

                  <div className="card-body p-4">

                    <div className="flex items-start gap-3">

                      <div className="avatar size-10 rounded-full">

                        <img
                          src={notification.recipient.profilePic}
                          alt={notification.recipient.fullName}
                        />

                      </div>

                      <div className="flex-1">

                        <h3 className="font-semibold">
                          {notification.recipient.fullName}
                        </h3>

                        <p className="text-sm my-1">
                          accepted your friend request
                        </p>

                        <p className="text-xs flex items-center opacity-70">

                          <ClockIcon className="h-3 w-3 mr-1" />

                          Recently

                        </p>

                      </div>

                      <div className="badge badge-success">

                        <MessageSquareIcon className="h-3 w-3 mr-1" />

                        New Friend

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </section>

        )}

        {/* EMPTY STATE */}
        {!isLoading &&
          incomingRequests.length === 0 &&
          acceptedRequests.length === 0 && (

            <NoNotificationsFound />

          )}

      </div>

    </div>
  );
};

export default NotificationsPage;
