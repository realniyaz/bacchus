import axios from "axios";

// 1. Production API Gateway fallback matching live Render deployment
const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://bacchus-crm-backend.onrender.com/api/v1";

// 2. Safe client-side token helper
const getAuthHeaders = () => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("bacchus_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// 3. Dedicated Axios client with 10s timeout
const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

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

export interface ConversionRecord {
  id: string;
  lead_id: string;
  customer_id: string;
  deal_value: number;
  commercial_model: "DISTRIBUTION" | "PRIVATE_LABEL" | "STATE_OWNERSHIP";
  converted_at: string;
  customer?: any;
}

export interface LeadActivityRecord {
  id: string;
  lead_id: string;
  user_id: string;
  type: string;
  meta_data?: Record<string, any>;
  created_at: string;
}

export const crmApi = {
  // Conversions
  convertLead: async (payload: ConvertLeadPayload): Promise<ConversionRecord> => {
    const res = await apiClient.post<ConversionRecord>("/conversions", payload, {
      headers: getAuthHeaders(),
    });
    return res.data;
  },

  listConversions: async (): Promise<ConversionRecord[]> => {
    const res = await apiClient.get<ConversionRecord[]>("/conversions", {
      headers: getAuthHeaders(),
    });
    return Array.isArray(res.data) ? res.data : [];
  },

  // Activities / Lead Timeline
  getLeadTimeline: async (leadId: string): Promise<LeadActivityRecord[]> => {
    const res = await apiClient.get<LeadActivityRecord[]>(
      `/activities/lead/${leadId}`,
      {
        headers: getAuthHeaders(),
      }
    );
    return Array.isArray(res.data) ? res.data : [];
  },

  logActivity: async (payload: ActivityPayload): Promise<LeadActivityRecord> => {
    const res = await apiClient.post<LeadActivityRecord>("/activities", payload, {
      headers: getAuthHeaders(),
    });
    return res.data;
  },

  // Follow-Ups
  scheduleFollowUp: async (payload: FollowUpPayload): Promise<any> => {
    const res = await apiClient.post("/follow-ups", payload, {
      headers: getAuthHeaders(),
    });
    return res.data;
  },

  updateFollowUpStatus: async (
    followUpId: string,
    status: "COMPLETED" | "CANCELLED" | "PENDING"
  ): Promise<any> => {
    const res = await apiClient.patch(
      `/follow-ups/${followUpId}`,
      { status },
      { headers: getAuthHeaders() }
    );
    return res.data;
  },
};