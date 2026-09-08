export type LeadTier = "HOT" | "WARM" | "COLD";

export type LeadStatus =
  | "NEW"
  | "ASSIGNED"
  | "CONTACTED"
  | "NEGOTIATION"
  | "CONVERTED"
  | "LOST";

export type CommercialModel =
  | "DISTRIBUTION"
  | "PRIVATE_LABEL"
  | "STATE_OWNERSHIP";

export interface Lead {
  id: string;
  lead_code: string;
  company_name: string;
  contact_name: string;
  email: string;
  phone: string | null;
  country: string;
  state: string | null;
  commercial_model: CommercialModel;
  volume_estimate: string | null;
  score: number;
  tier: LeadTier;
  status: LeadStatus;
  loss_reason: string | null;
  assigned_to_id: string | null;
  created_at: string;
  updated_at: string;
}

export interface LeadCreatePayload {
  company_name: string;
  contact_name: string;
  email: string;
  phone?: string;
  country: string;
  state?: string;
  commercial_model: CommercialModel;
  volume_estimate?: string;
}

export interface LeadUpdatePayload {
  company_name?: string;
  contact_name?: string;
  email?: string;
  phone?: string;
  country?: string;
  state?: string;
  commercial_model?: CommercialModel;
  volume_estimate?: string;
  status?: LeadStatus;
  loss_reason?: string;
}