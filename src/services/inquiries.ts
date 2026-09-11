import axios from "axios";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://bacchus-crm-backend.onrender.com/api/v1";

const getAuthHeaders = () => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("bacchus_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const publicClient = axios.create({
  baseURL: API_BASE,
  timeout: 12000,
  headers: { "Content-Type": "application/json" },
});

export interface ContactFormPayload {
  name: string;
  email: string;
  phone?: string;
  category: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  reference_code: string;
  message: string;
  received_at: string;
}

export const inquiriesApi = {
  submitContact: async (payload: ContactFormPayload): Promise<ContactResponse> => {
    const res = await publicClient.post<ContactResponse>("/inquiries/contact", {
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
      phone: payload.phone?.trim() || undefined,
      category: payload.category || "General Corporate Inquiries",
      message: payload.message.trim(),
    });
    return res.data;
  },

  deleteInquiry: async (leadId: string): Promise<void> => {
    await axios.delete(`${API_BASE}/leads/${leadId}`, {
      headers: getAuthHeaders(),
    });
  },
};