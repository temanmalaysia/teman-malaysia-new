import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import apiClient from "@/api/apiClient";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", text: "" });
    if (!email.trim()) {
      setStatus({ type: "error", text: "Email is required." });
      return;
    }
    setLoading(true);
    try {
      const res = await apiClient.auth.forgotPassword(email.trim());
      const msg = res?.data?.message || res?.data?.msg || res?.data?.error || "If the email exists, reset instructions have been sent.";
      setStatus({ type: res.ok ? "success" : "error", text: msg });
    } catch {
      setStatus({ type: "error", text: "Unable to submit request." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <section className="auth-page">
        <div className="container auth-page__container">
          <h1 className="auth-page__title">Forgot Password</h1>
          <p className="auth-page__subtitle">Enter your email to receive reset instructions.</p>
          <form onSubmit={handleSubmit} noValidate>
            <div className="user-profile__form-group">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="user-profile__input"
                placeholder="you@example.com"
                required
              />
            </div>
            {status.text && (
              <div className={status.type === "success" ? "user-profile__alert user-profile__alert--success" : "user-profile__alert user-profile__alert--error"}>
                <span>{status.text}</span>
              </div>
            )}
            <button type="submit" className="user-profile__btn user-profile__btn--primary" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </div>
      </section>
    </MainLayout>
  );
}
