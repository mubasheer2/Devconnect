import { axiosInstance } from "./axios";


// ================= AUTH =================

export const signup = async (signupData) => {
  const res = await axiosInstance.post("/auth/signup", signupData);
  return res.data;
};

export const login = async (loginData) => {
  const res = await axiosInstance.post("/auth/login", loginData);
  return res.data;
};

export const logout = async () => {
  const res = await axiosInstance.post("/auth/logout");
  return res.data;
};

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch {
    return null;
  }
};

export const completeOnboarding = async (userData) => {
  const res = await axiosInstance.post("/auth/onboarding", userData);
  return res.data;
};


// ================= FRIENDS =================

export const getUserFriends = async () => {
  const res = await axiosInstance.get("/users/friends");
  return res.data;
};

export const getRecommendedUsers = async () => {
  const res = await axiosInstance.get("/users");
  return res.data;
};

export const getOutgoingFriendReqs = async () => {
  const res = await axiosInstance.get("/users/outgoing-friend-requests");
  return res.data;
};

export const sendFriendRequest = async (userId) => {
  const res = await axiosInstance.post(`/users/friend-request/${userId}`);
  return res.data;
};

export const acceptFriendRequest = async (requestId) => {
  const res = await axiosInstance.put(
    `/users/friend-request/${requestId}/accept`
  );
  return res.data;
};

export const unfriendUser = async (userId) => {
  const res = await axiosInstance.delete(`/users/friends/${userId}`);
  return res.data;
};

// ================= NOTIFICATIONS =================

export const getFriendRequests = async () => {
  const res = await axiosInstance.get("/users/friend-requests");
  return res.data;
};

export const markNotificationsAsRead = async () => {
  const res = await axiosInstance.patch(
    "/users/friend-requests/mark-read"
  );
  return res.data;
};


// ================= SEARCH =================

export const searchUsers = async (text) => {
  const res = await axiosInstance.get(
    `/users/search?q=${text}`
  );
  return res.data;
};


// ================= CHAT =================

export const getStreamToken = async () => {
  const res = await axiosInstance.get("/chat/token");
  return res.data;
};
export const clearAcceptedNotifications = async () => {
  const res = await fetch("/api/users/notifications/accepted", {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Failed to clear accepted notifications");
  }

  return res.json();
};