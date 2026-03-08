import { useMemo, useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import apiClient from "@/api/apiClient";
import { FaEye, FaEyeSlash, FaCheck } from "react-icons/fa";

export default function ChangePassword() {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirm: "" });
  const [status, setStatus] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validatePassword = (password) => {
    return {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSymbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    };
  };
  const passwordChecks = useMemo(() => validatePassword(form.newPassword), [form.newPassword]);
  const isPasswordValid = Object.values(passwordChecks).every(Boolean);
  const passwordsMatch = useMemo(() => form.newPassword === form.confirm && form.confirm.length > 0, [form.newPassword, form.confirm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", text: "" });
    if (!form.currentPassword.trim() || !form.newPassword.trim()) {
      setStatus({ type: "error", text: "Please fill all required fields." });
      return;
    }
    if (!isPasswordValid) {
      setStatus({ type: "error", text: "Password does not meet requirements." });
      return;
    }
    if (form.newPassword !== form.confirm) {
      setStatus({ type: "error", text: "New password and confirm password do not match." });
      return;
    }
    setLoading(true);
    try {
      const res = await apiClient.auth.changePassword({
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      });
      const msg = res?.data?.message || res?.data?.msg || res?.data?.error || "Password changed.";
      if (!res.ok) {
        setStatus({ type: "error", text: msg });
      } else {
        // Attempt to verify by logging in with the new password
        let email = "";
        try {
          const acc = apiClient.auth.getUser ? apiClient.auth.getUser() : null;
          if (acc?.email) email = acc.email;
          if (!email) {
            const raw = typeof window !== "undefined" ? localStorage.getItem("userProfile") : null;
            if (raw) {
              const prof = JSON.parse(raw);
              email = prof?.emailAddress || "";
            }
          }
        } catch {}
        if (email) {
          const verify = await apiClient.auth.login(email, form.newPassword);
          if (verify.ok && verify.token) {
            setStatus({ type: "success", text: "Password changed successfully and verified." });
          } else {
            setStatus({
              type: "error",
              text: "Password change reported success, but login with the new password failed. Please try again or contact support.",
            });
          }
        } else {
          setStatus({ type: "success", text: msg });
        }
      }
    } catch {
      setStatus({ type: "error", text: "Unable to change password." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <section className="auth-page">
        <div className="container auth-page__container">
          <h1 className="auth-page__title">Change Password</h1>
          <form onSubmit={handleSubmit} noValidate>
            <div className="user-profile__form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <div className="auth-modal__input-wrapper">
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type={showCurrent ? "text" : "password"}
                  className="user-profile__input auth-modal__input--password"
                  value={form.currentPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="auth-modal__toggle-password"
                  onClick={() => setShowCurrent((v) => !v)}
                  aria-label={showCurrent ? "Hide password" : "Show password"}
                >
                  {showCurrent ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            <div className="user-profile__form-group">
              <label htmlFor="newPassword">New Password</label>
              <div className="auth-modal__input-wrapper">
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showNew ? "text" : "password"}
                  className="user-profile__input auth-modal__input--password"
                  value={form.newPassword}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="auth-modal__toggle-password"
                  onClick={() => setShowNew((v) => !v)}
                  aria-label={showNew ? "Hide password" : "Show password"}
                >
                  {showNew ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {form.newPassword.length > 0 && (
                <div className="auth-modal__password-requirements">
                  <p className="auth-modal__requirements-title">Password must contain:</p>
                  <ul className="auth-modal__requirements-list">
                    <li className={passwordChecks.minLength ? "valid" : ""}>
                      <span className="auth-modal__check-icon">{passwordChecks.minLength && <FaCheck />}</span>
                      At least 8 characters
                    </li>
                    <li className={passwordChecks.hasUppercase ? "valid" : ""}>
                      <span className="auth-modal__check-icon">{passwordChecks.hasUppercase && <FaCheck />}</span>
                      One uppercase letter
                    </li>
                    <li className={passwordChecks.hasLowercase ? "valid" : ""}>
                      <span className="auth-modal__check-icon">{passwordChecks.hasLowercase && <FaCheck />}</span>
                      One lowercase letter
                    </li>
                    <li className={passwordChecks.hasNumber ? "valid" : ""}>
                      <span className="auth-modal__check-icon">{passwordChecks.hasNumber && <FaCheck />}</span>
                      One number
                    </li>
                    <li className={passwordChecks.hasSymbol ? "valid" : ""}>
                      <span className="auth-modal__check-icon">{passwordChecks.hasSymbol && <FaCheck />}</span>
                      One symbol (!@#$%^&*)
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className="user-profile__form-group">
              <label htmlFor="confirm">Confirm New Password</label>
              <div className="auth-modal__input-wrapper">
                <input
                  id="confirm"
                  name="confirm"
                  type={showConfirm ? "text" : "password"}
                  className={`user-profile__input auth-modal__input--password ${form.confirm && (passwordsMatch ? 'auth-modal__input--success' : 'auth-modal__input--error')}`}
                  value={form.confirm}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  className="auth-modal__toggle-password"
                  onClick={() => setShowConfirm((v) => !v)}
                  aria-label={showConfirm ? "Hide password" : "Show password"}
                >
                  {showConfirm ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {form.confirm && !passwordsMatch && (
                <span className="auth-modal__error">Passwords do not match</span>
              )}
              {form.confirm && passwordsMatch && (
                <span className="auth-modal__success">Passwords match</span>
              )}
            </div>
            {status.text && (
              <div className={status.type === "success" ? "user-profile__alert user-profile__alert--success" : "user-profile__alert user-profile__alert--error"}>
                <span>{status.text}</span>
              </div>
            )}
            <button type="submit" className="user-profile__btn user-profile__btn--primary" disabled={loading}>
              {loading ? "Updating..." : "Change Password"}
            </button>
          </form>
        </div>
      </section>
    </MainLayout>
  );
}
