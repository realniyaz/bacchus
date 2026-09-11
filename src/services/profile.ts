import axios from "axios";
import {
  UserProfile,
  UserProfileUpdate,
  PasswordChangePayload,
} from "@/types/admin/profile";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://bacchus-crm-backend.onrender.com/api/v1";

const getAuthHeaders = () => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("bacchus_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const profileApi = {
  getMe: async (): Promise<UserProfile> => {
    const res = await apiClient.get<UserProfile>("/profile/me", {
      headers: getAuthHeaders(),
    });
    return res.data;
  },

  updateMe: async (payload: UserProfileUpdate): Promise<UserProfile> => {
    const cleanedPayload: UserProfileUpdate = {};
    if (payload.name !== undefined) cleanedPayload.name = payload.name.trim();
    if (payload.territory !== undefined) {
      cleanedPayload.territory = payload.territory.trim() || undefined;
    }

    const res = await apiClient.patch<UserProfile>(
      "/profile/me",
      cleanedPayload,
      {
        headers: getAuthHeaders(),
      }
    );
    return res.data;
  },

  changePassword: async (
    payload: PasswordChangePayload
  ): Promise<{ message: string }> => {
    const res = await apiClient.post<{ message: string }>(
      "/profile/me/change-password",
      payload,
      {
        headers: getAuthHeaders(),
      }
    );
    return res.data;
  },
};