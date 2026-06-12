// ✅ نظام userId بسيط - لا NextAuth، لا Clerk، لا sessions

export function getUserId(): string {
  if (typeof window === "undefined") return "";

  let userId = localStorage.getItem("ronaq-user-id");

  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem("ronaq-user-id", userId);
  }

  return userId;
}