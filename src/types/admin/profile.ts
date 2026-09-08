export type RoleType =
  | "SUPER_ADMIN"
  | "SALES_DIRECTOR"
  | "TERRITORY_REP"
  | "FINANCE_OFFICER";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: RoleType;
  territory: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserProfileUpdate {
  name?: string;
  territory?: string;
}

export interface PasswordChangePayload {
  current_password: string;
  new_password: string;
}