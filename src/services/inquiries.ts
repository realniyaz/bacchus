import axios from "axios";

const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://bacchus-crm-backend.onrender.com/api/v1";

const publicClient = axios.create({
  baseURL: API_BASE,
  timeout: 12000,
  headers: { "Content-Type": "application/json" },
});

export interface ContactFormPayload {
  name: string;
  email: string;
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
    const res = await publicClient.post<ContactResponse>("/inquiries/contact", payload);
    return res.data;
  },
};