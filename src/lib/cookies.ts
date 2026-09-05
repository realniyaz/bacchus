const AGE_GATE_COOKIE = "bacchus_age_verified";
const AGE_GATE_STORAGE = "bacchus_age_verified_state";
const COOKIE_MAX_AGE_DAYS = 30;

/**
 * Reads verification state across document cookies with a fallback to localStorage.
 */
export function isAgeVerified(): boolean {
  if (typeof window === "undefined") return false;

  // 1. Check Document Cookie
  const cookies = document.cookie.split(";").map((c) => c.trim());
  const hasVerifiedCookie = cookies.some((cookie) =>
    cookie.startsWith(`${AGE_GATE_COOKIE}=true`)
  );

  if (hasVerifiedCookie) return true;

  // 2. Client Fallback: localStorage
  try {
    const localVerification = localStorage.getItem(AGE_GATE_STORAGE);
    return localVerification === "true";
  } catch {
    return false;
  }
}

/**
 * Sets persistent verification state across cookies and localStorage for 30 days.
 */
export function setAgeVerified(): void {
  if (typeof window === "undefined") return;

  const expiryDate = new Date();
  expiryDate.setTime(
    expiryDate.getTime() + COOKIE_MAX_AGE_DAYS * 24 * 60 * 60 * 1000
  );

  const isSecure = window.location.protocol === "https:";
  const cookieString = `${AGE_GATE_COOKIE}=true; path=/; expires=${expiryDate.toUTCString()}; SameSite=Lax${
    isSecure ? "; Secure" : ""
  }`;

  document.cookie = cookieString;

  try {
    localStorage.setItem(AGE_GATE_STORAGE, "true");
  } catch {
    // Graceful silent fallback if local storage is restricted
  }
}

/**
 * Clears verification state (e.g., when resetting or explicitly exiting).
 */
export function clearAgeVerification(): void {
  if (typeof window === "undefined") return;

  document.cookie = `${AGE_GATE_COOKIE}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax`;

  try {
    localStorage.removeItem(AGE_GATE_STORAGE);
  } catch {
    // Graceful fallback
  }
}