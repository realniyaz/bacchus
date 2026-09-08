import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

const getHeaders = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("bacchus_token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export interface ConvertLeadPayload {
  lead_id: string;
  deal_value: number;
  commercial_model: "DISTRIBUTION" | "PRIVATE_LABEL" | "STATE_OWNERSHIP";
  tax_identifier?: string;
}

export interface ActivityPayload {
  lead_id: string;
  type: "NOTE" | "CALL" | "EMAIL" | "MEETING" | "STATUS_CHANGE" | "ASSIGNMENT";
  meta_data?: Record<string, any>;
}

export interface FollowUpPayload {
  lead_id: string;
  scheduled_at: string;
  type: "CALL" | "EMAIL" | "TASTING_MEETING";
  notes?: string;
}

export const crmApi = {
  // Conversions
  convertLead: async (payload: ConvertLeadPayload) => {
    const res = await axios.post(`${API_BASE}/conversions`, payload, {
      headers: getHeaders(),
    });
    return res.data;
  },

  listConversions: async () => {
    const res = await axios.get(`${API_BASE}/conversions`, {
      headers: getHeaders(),
    });
    return res.data;
  },

  // Activities / Lead Timeline
  getLeadTimeline: async (leadId: string) => {
    const res = await axios.get(`${API_BASE}/activities/lead/${leadId}`, {
      headers: getHeaders(),
    });
    return res.data;
  },

  logActivity: async (payload: ActivityPayload) => {
    const res = await axios.post(`${API_BASE}/activities`, payload, {
      headers: getHeaders(),
    });
    return res.data;
  },

  // Follow-Ups
  scheduleFollowUp: async (payload: FollowUpPayload) => {
    const res = await axios.post(`${API_BASE}/follow-ups`, payload, {
      headers: getHeaders(),
    });
    return res.data;
  },

  updateFollowUpStatus: async (followUpId: string, status: "COMPLETED" | "CANCELLED" | "PENDING") => {
    const res = await axios.patch(
      `${API_BASE}/follow-ups/${followUpId}`,
      { status },
      { headers: getHeaders() }
    );
    return res.data;
  },
};