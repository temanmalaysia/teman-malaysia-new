import { useEffect, useCallback, useState, useMemo } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaTimes, FaUser, FaPhone, FaCheck, FaGoogle, FaApple } from 'react-icons/fa';
import apiClient from '@/api/apiClient';

// Password validation helper
const validatePassword = (password) => {
  return {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSymbol: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };
};

export default function AuthModal({ isOpen, onClose, initialMode = 'signin', onSuccess }) {
  const [mode, setMode] = useState(initialMode);
  
  // Sign In state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Sign Up state
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  // Common state
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [apiSuccess, setApiSuccess] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Password validation
  const passwordChecks = useMemo(() => validatePassword(password), [password]);
  const isPasswordValid = Object.values(passwordChecks).every(Boolean);
  const passwordsMatch = password === confirmPassword && confirmPassword.length > 0;

  const handleEscKey = useCallback((e) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleEscKey]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Reset form and switch mode
  const switchMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    setErrors({});
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  // Ensure Sign In is the default whenever modal opens (deferred to avoid sync setState in effect)
  useEffect(() => {
    if (!isOpen) return;
    const reset = () => {
      setMode('signin');
      setErrors({});
      setApiError('');
      setApiSuccess('');
      setPassword('');
      setConfirmPassword('');
      setShowPassword(false);
      setShowConfirmPassword(false);
      setAgreeToTerms(false);
    };
    const t = setTimeout(reset, 0);
    return () => clearTimeout(t);
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setApiError('');
    setApiSuccess('');

    // Validation
    const newErrors = {};
    
    if (mode === 'signup') {
      if (!fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
      if (!isPasswordValid) newErrors.password = 'Password does not meet requirements';
      if (!passwordsMatch) newErrors.confirmPassword = 'Passwords do not match';
      if (!agreeToTerms) newErrors.terms = 'You must agree to the terms';
    }
    
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password.trim()) newErrors.password = newErrors.password || 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      if (isSignUp) {
        const result = await apiClient.auth.signup({
          fullname: fullName,
          phoneNumber,
          email,
          password,
        });
        const msg =
          (result?.data && (result.data.message || result.data.msg || result.data.error)) ||
          '';
        if (!result.ok) {
          setIsLoading(false);
          setApiError(msg || 'Sign up failed');
          return;
        }
        setIsLoading(false);
        setSuccessMessage(msg || 'Sign up successful');
        setShowSuccessModal(true);
        return;
      } else {
        const result = await apiClient.auth.login(email, password);
        const msg =
          (result?.data && (result.data.message || result.data.msg || result.data.error)) ||
          '';
        if (!result.ok || !result.token) {
          setIsLoading(false);
          setApiError(msg || 'Invalid email or password');
          return;
        }
      }
      setIsLoading(false);
      if (onSuccess) onSuccess();
      else onClose();
    } catch {
      setIsLoading(false);
      setApiError('Authentication error');
    }
  };

  if (!isOpen) return null;

  const isSignUp = mode === 'signup';

  const modalContent = (
    <div
      id="auth-modal"
      className="auth-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
    >
      <div className="auth-modal__backdrop" onClick={handleBackdropClick}>
        <div className={`auth-modal__content ${isSignUp ? 'auth-modal__content--signup' : ''}`}>
          {/* Close Button */}
          <button 
            className="auth-modal__close" 
            onClick={onClose}
            aria-label="Close modal"
            type="button"
          >
            <FaTimes />
          </button>

          {/* Header */}
          <div className="auth-modal__header">
            <h2 id="auth-modal-title" className="auth-modal__title">
              {isSignUp ? 'Create an account' : 'Welcome back'}
            </h2>
            <p className="auth-modal__subtitle">
              {isSignUp 
                ? 'Join Teman Malaysia today' 
                : 'Sign in to your Teman Malaysia account'}
            </p>
          </div>

          {/* Social Login - Only for Sign In */}
          {/* {!isSignUp && (
            <>
              <div className="auth-modal__social">
                <button type="button" className="auth-modal__social-btn auth-modal__social-btn--google">
                  <FaGoogle />
                  <span>Continue with Google</span>
                </button>
                <button type="button" className="auth-modal__social-btn auth-modal__social-btn--apple">
                  <FaApple />
                  <span>Continue with Apple</span>
                </button>
              </div>

              <div className="auth-modal__divider">
                <span>or continue with email</span>
              </div>
            </>
          )} */}

          {/* Form */}
          <form className="auth-modal__form" onSubmit={handleSubmit} noValidate>
            {apiError && <div className="auth-modal__error" aria-live="polite">{apiError}</div>}
            {!isSignUp && apiSuccess && <div className="auth-modal__success" aria-live="polite">{apiSuccess}</div>}
            {/* Sign Up Fields */}
            {isSignUp && (
              <>
                {/* Full Name */}
                <div className="auth-modal__field">
                  <label htmlFor="fullName" className="auth-modal__label">Full Name</label>
                  <div className="auth-modal__input-wrapper">
                    <span className="auth-modal__input-icon"><FaUser /></span>
                    <input
                      id="fullName"
                      type="text"
                      className={`auth-modal__input ${errors.fullName ? 'auth-modal__input--error' : ''}`}
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      autoFocus
                      autoComplete="name"
                      required
                    />
                  </div>
                  {errors.fullName && <span className="auth-modal__error">{errors.fullName}</span>}
                </div>

                {/* Phone Number */}
                <div className="auth-modal__field">
                  <label htmlFor="phoneNumber" className="auth-modal__label">Phone Number</label>
                  <div className="auth-modal__input-wrapper">
                    <span className="auth-modal__input-icon"><FaPhone /></span>
                    <input
                      id="phoneNumber"
                      type="tel"
                      className={`auth-modal__input ${errors.phoneNumber ? 'auth-modal__input--error' : ''}`}
                      placeholder="+60 12-345 6789"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      autoComplete="tel"
                      required
                    />
                  </div>
                  {errors.phoneNumber && <span className="auth-modal__error">{errors.phoneNumber}</span>}
                </div>
              </>
            )}

            {/* Email */}
            <div className="auth-modal__field">
              <label htmlFor="email" className="auth-modal__label">Email address</label>
              <div className="auth-modal__input-wrapper">
                <span className="auth-modal__input-icon"><FaEnvelope /></span>
                <input
                  id="email"
                  type="email"
                  className={`auth-modal__input ${errors.email ? 'auth-modal__input--error' : ''}`}
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoFocus={!isSignUp}
                  autoComplete="email"
                  data-testid="auth-email-input"
                  required
                />
              </div>
              {errors.email && <span className="auth-modal__error">{errors.email}</span>}
            </div>

            {/* Password */}
            <div className="auth-modal__field">
              <label htmlFor="password" className="auth-modal__label">
                {isSignUp ? 'Create Password' : 'Password'}
              </label>
              <div className="auth-modal__input-wrapper">
                <span className="auth-modal__input-icon"><FaLock /></span>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  className={`auth-modal__input auth-modal__input--password ${errors.password ? 'auth-modal__input--error' : ''}`}
                  placeholder={isSignUp ? 'Create a strong password' : 'Enter your password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                  data-testid="auth-password-input"
                  required
                />
                <button
                  type="button"
                  className="auth-modal__toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <span className="auth-modal__error">{errors.password}</span>}
            </div>

            {/* Password Requirements - Only for Sign Up */}
            {isSignUp && password.length > 0 && (
              <div className="auth-modal__password-requirements">
                <p className="auth-modal__requirements-title">Password must contain:</p>
                <ul className="auth-modal__requirements-list">
                  <li className={passwordChecks.minLength ? 'valid' : ''}>
                  <span className="auth-modal__check-icon">{passwordChecks.minLength && <FaCheck />}</span>
                    At least 8 characters
                  </li>
                  <li className={passwordChecks.hasUppercase ? 'valid' : ''}>
                  <span className="auth-modal__check-icon">{passwordChecks.hasUppercase && <FaCheck />}</span>
                    One uppercase letter
                  </li>
                  <li className={passwordChecks.hasLowercase ? 'valid' : ''}>
                  <span className="auth-modal__check-icon">{passwordChecks.hasLowercase && <FaCheck />}</span>
                    One lowercase letter
                  </li>
                  <li className={passwordChecks.hasNumber ? 'valid' : ''}>
                  <span className="auth-modal__check-icon">{passwordChecks.hasNumber && <FaCheck />}</span>
                    One number
                  </li>
                  <li className={passwordChecks.hasSymbol ? 'valid' : ''}>
                  <span className="auth-modal__check-icon">{passwordChecks.hasSymbol && <FaCheck />}</span>
                    One symbol (!@#$%^&*)
                  </li>
                </ul>
              </div>
            )}

            {/* Confirm Password - Only for Sign Up */}
            {isSignUp && (
              <div className="auth-modal__field">
                <label htmlFor="confirmPassword" className="auth-modal__label">Confirm Password</label>
                <div className="auth-modal__input-wrapper">
                  <span className="auth-modal__input-icon"><FaLock /></span>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    className={`auth-modal__input auth-modal__input--password ${errors.confirmPassword ? 'auth-modal__input--error' : ''} ${confirmPassword && (passwordsMatch ? 'auth-modal__input--success' : 'auth-modal__input--error')}`}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    autoComplete="new-password"
                    required
                  />
                  <button
                    type="button"
                    className="auth-modal__toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {confirmPassword && !passwordsMatch && (
                  <span className="auth-modal__error">Passwords do not match</span>
                )}
                {confirmPassword && passwordsMatch && (
                  <span className="auth-modal__success">Passwords match</span>
                )}
              </div>
            )}

            {/* Options Row - Sign In */}
            {!isSignUp && (
              <div className="auth-modal__options">
                <label className="auth-modal__checkbox">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="auth-modal__checkbox-custom"></span>
                  <span className="auth-modal__checkbox-label">Remember me</span>
                </label>
                <Link href="/auth/forgot-password" className="auth-modal__forgot">
                  Forgot password?
                </Link>
              </div>
            )}

            {/* Terms Checkbox - Sign Up */}
            {isSignUp && (
              <div className="auth-modal__terms">
                <label className={`auth-modal__checkbox ${errors.terms ? 'auth-modal__checkbox--error' : ''}`}>
                  <input
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                  />
                  <span className="auth-modal__checkbox-custom"></span>
                  <span className="auth-modal__checkbox-label">
                    I agree to the{' '}
                    <Link href="/terms" className="auth-modal__inline-link">Terms of Service</Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="auth-modal__inline-link">Privacy Policy</Link>
                  </span>
                </label>
                {errors.terms && <span className="auth-modal__error">{errors.terms}</span>}
              </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              className="auth-modal__submit"
              disabled={isLoading}
              data-testid="auth-submit-btn"
            >
              {isLoading ? (
                <span className="auth-modal__spinner"></span>
              ) : (
                isSignUp ? 'Create Account' : 'Sign in'
              )}
            </button>
          </form>

          {/* Switch Mode Link */}
          <p className="auth-modal__switch">
            {isSignUp ? (
              <>
                Already have an account?{' '}
                <button type="button" className="auth-modal__switch-btn" onClick={switchMode}>
                  Log in here
                </button>
              </>
            ) : (
              <>
                Don&apos;t have an account?{' '}
                <button type="button" className="auth-modal__switch-btn" onClick={switchMode}>
                  Create one now
                </button>
              </>
            )}
          </p>

          {/* Footer Links */}
          <div className="auth-modal__footer">
            <Link href="/privacy">Privacy Policy</Link>
            <span className="auth-modal__footer-dot">•</span>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </div>
  );

  const successModalContent = (
    <div
      id="auth-success-modal"
      className="auth-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-success-title"
    >
      <div className="auth-modal__backdrop">
        <div className="auth-modal__content">
          <button 
            className="auth-modal__close" 
            onClick={() => {
              setShowSuccessModal(false);
              if (onSuccess) onSuccess();
              else onClose();
            }}
            aria-label="Close modal"
            type="button"
          >
            <FaTimes />
          </button>
          <div className="auth-modal__header">
            <h2 id="auth-success-title" className="auth-modal__title">Sign Up Successful</h2>
            <p className="auth-modal__subtitle">{successMessage}</p>
          </div>
          <div className="auth-modal__form">
            <button
              type="button"
              className="auth-modal__submit"
              onClick={() => {
                setShowSuccessModal(false);
                if (onSuccess) onSuccess();
                else onClose();
              }}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (typeof window === 'undefined') return null;
  return createPortal(showSuccessModal ? successModalContent : modalContent, document.body);
}
