import axios from "axios";
import {
  UserProfile,
  UserProfileUpdate,
  PasswordChangePayload,
} from "@/types/admin/profile";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

const getHeaders = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("bacchus_token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const profileApi = {
  getMe: async (): Promise<UserProfile> => {
    const res = await axios.get(`${API_BASE}/profile/me`, {
      headers: getHeaders(),
    });
    return res.data;
  },

  updateMe: async (payload: UserProfileUpdate): Promise<UserProfile> => {
    const res = await axios.patch(`${API_BASE}/profile/me`, payload, {
      headers: getHeaders(),
    });
    return res.data;
  },

  changePassword: async (payload: PasswordChangePayload): Promise<{ message: string }> => {
    const res = await axios.post(`${API_BASE}/profile/me/change-password`, payload, {
      headers: getHeaders(),
    });
    return res.data;
  },
};