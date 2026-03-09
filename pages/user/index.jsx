import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import MainLayout from "@/components/layout/MainLayout";
import {
  FaPlus,
  FaTrash,
  FaUser,
  FaUsers,
  FaCheck,
  FaExclamationCircle,
} from "react-icons/fa";
import Head from "next/head";
import apiClient from "@/api/apiClient";

const genderOptions = [
  { value: "", label: "Select gender" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

const languageOptions = [
  { value: "", label: "Select language" },
  { value: "english", label: "English" },
  { value: "malay", label: "Bahasa Melayu" },
  { value: "chinese", label: "Chinese" },
  { value: "tamil", label: "Tamil" },
];

const MAX_RECIPIENTS = 3;

const defaultProfile = {
  fullName: "",
  icNumber: "",
  phoneNumber: "",
  emailAddress: "",
  emergencyContact: "",
};

function User() {
  const [profile, setProfile] = useState(() => {
    if (typeof window === "undefined") return defaultProfile;
    try {
      const stored = localStorage.getItem("userProfile");
      const accRaw = localStorage.getItem("tm_user");
      const acc = accRaw ? JSON.parse(accRaw) : null;
      if (stored) {
        const parsed = JSON.parse(stored);
        const { address, ...rest } = parsed;
        return {
          ...defaultProfile,
          ...rest,
          fullName: rest.fullName || acc?.name || "",
          phoneNumber: rest.phoneNumber || acc?.phoneNumber || "",
          emailAddress: rest.emailAddress || acc?.email || "",
        };
      }
      return {
        ...defaultProfile,
        fullName: acc?.name || "",
        phoneNumber: acc?.phoneNumber || "",
        emailAddress: acc?.email || "",
      };
    } catch {
      return defaultProfile;
    }
  });

  const [savedProfile, setSavedProfile] = useState(() => {
    if (typeof window === "undefined") return defaultProfile;
    try {
      const stored = localStorage.getItem("userProfile");
      const accRaw = localStorage.getItem("tm_user");
      const acc = accRaw ? JSON.parse(accRaw) : null;
      if (stored) {
        const parsed = JSON.parse(stored);
        const { address, ...rest } = parsed;
        return {
          ...defaultProfile,
          ...rest,
          fullName: rest.fullName || acc?.name || "",
          phoneNumber: rest.phoneNumber || acc?.phoneNumber || "",
          emailAddress: rest.emailAddress || acc?.email || "",
        };
      }
      return {
        ...defaultProfile,
        fullName: acc?.name || "",
        phoneNumber: acc?.phoneNumber || "",
        emailAddress: acc?.email || "",
      };
    } catch {
      return defaultProfile;
    }
  });

  const [recipients, setRecipients] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("careRecipients");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [savedRecipients, setSavedRecipients] = useState(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("careRecipients");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [message, setMessage] = useState({ type: "", text: "" });
  const [expandedRecipients, setExpandedRecipients] = useState([]);

  // Refresh from account on auth changes
  useEffect(() => {
    const applyAccount = () => {
      try {
        const loggedIn = apiClient.auth.isLoggedIn
          ? apiClient.auth.isLoggedIn()
          : false;
        if (!loggedIn) {
          setProfile({ ...defaultProfile });
          setSavedProfile({ ...defaultProfile });
          setRecipients([]);
          setSavedRecipients([]);
          return;
        }
        const acc = apiClient.auth.getUser ? apiClient.auth.getUser() : null;
        let prof = null;
        try {
          const raw = localStorage.getItem("userProfile");
          prof = raw ? JSON.parse(raw) : null;
        } catch {}
        const deriveNameFromEmail = (em) => {
          if (!em || typeof em !== "string") return "";
          const local = em.split("@")[0] || "";
          return local.replace(/[._-]+/g, " ").trim();
        };
        const toTitleCase = (s) => {
          if (!s || typeof s !== "string") return s || "";
          const lower = s.toLowerCase();
          return lower.replace(/\b\w/g, (m) => m.toUpperCase());
        };
        const pick = (prevVal, ...candidates) => {
          if (prevVal && String(prevVal).trim() !== "") return prevVal;
          const found = candidates.find(
            (v) => v !== undefined && v !== null && String(v).trim() !== "",
          );
          return found ?? "";
        };
        const fallbackName =
          pick("", acc?.name, prof?.fullName) ||
          deriveNameFromEmail(acc?.email || prof?.emailAddress || "");
        setProfile((prev) => ({
          ...prev,
          fullName: toTitleCase(
            pick(prev.fullName, acc?.name, prof?.fullName, fallbackName),
          ),
          icNumber: pick(prev.icNumber, acc?.icNumber, prof?.icNumber),
          phoneNumber: pick(
            prev.phoneNumber,
            acc?.phoneNumber,
            prof?.phoneNumber,
          ),
          emailAddress: pick(prev.emailAddress, acc?.email, prof?.emailAddress),
          emergencyContact: pick(
            prev.emergencyContact,
            acc?.emergencyContact,
            prof?.emergencyContact,
          ),
        }));
        setSavedProfile((prev) => ({
          ...prev,
          fullName: toTitleCase(
            pick(prev.fullName, acc?.name, prof?.fullName, fallbackName),
          ),
          icNumber: pick(prev.icNumber, acc?.icNumber, prof?.icNumber),
          phoneNumber: pick(
            prev.phoneNumber,
            acc?.phoneNumber,
            prof?.phoneNumber,
          ),
          emailAddress: pick(prev.emailAddress, acc?.email, prof?.emailAddress),
          emergencyContact: pick(
            prev.emergencyContact,
            acc?.emergencyContact,
            prof?.emergencyContact,
          ),
        }));
        // Rehydrate care recipients from storage (populated by ME)
        try {
          const careRaw = localStorage.getItem("careRecipients");
          if (careRaw) {
            const arr = JSON.parse(careRaw);
            if (Array.isArray(arr)) {
              setRecipients(arr);
              setSavedRecipients(arr);
            }
          }
        } catch {}
      } catch {}
    };
    applyAccount();
    const token = apiClient.auth.getToken ? apiClient.auth.getToken() : "";
    if (token) {
      apiClient.auth.me().catch(() => {});
    }
    const onAuth = () => applyAccount();
    window.addEventListener("tm:auth", onAuth);
    return () => window.removeEventListener("tm:auth", onAuth);
  }, []);

  // Keep accordion expansion in sync with recipients list (defer to avoid sync setState in effect)
  useEffect(() => {
    const update = () => {
      try {
        setExpandedRecipients((prev) =>
          recipients.map((r, idx) => {
            if (typeof prev[idx] !== "undefined") return prev[idx];
            const hasName = r?.name && String(r.name).trim() !== "";
            return !hasName; // open if no name yet
          }),
        );
      } catch {
        setExpandedRecipients(recipients.map(() => false));
      }
    };
    const t = setTimeout(update, 0);
    return () => clearTimeout(t);
  }, [recipients]);

  const toggleRecipientOpen = (i) => {
    setExpandedRecipients((prev) =>
      prev.map((v, idx) => (idx === i ? !v : v)),
    );
  };

  // Check if profile is complete (all required fields filled)
  const isProfileComplete = useMemo(() => {
    return (
      savedProfile.fullName.trim() !== "" &&
      savedProfile.phoneNumber.trim() !== "" &&
      savedProfile.emailAddress.trim() !== ""
    );
  }, [savedProfile]);

  // Check if profile has been modified
  const isProfileDirty = useMemo(() => {
    return JSON.stringify(profile) !== JSON.stringify(savedProfile);
  }, [profile, savedProfile]);

  // Show save button if profile is incomplete OR has been edited
  const showSaveProfileButton = !isProfileComplete || isProfileDirty;

  // Check if recipients have been modified
  const isRecipientsDirty = useMemo(() => {
    return JSON.stringify(recipients) !== JSON.stringify(savedRecipients);
  }, [recipients, savedRecipients]);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const saveProfile = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    if (!profile.fullName.trim())
      return setMessage({ type: "error", text: "Full Name is required." });
    if (!profile.phoneNumber.trim())
      return setMessage({ type: "error", text: "Phone Number is required." });
    if (!profile.emailAddress.trim() || !validateEmail(profile.emailAddress))
      return setMessage({
        type: "error",
        text: "Enter a valid Email Address.",
      });
    try {
      const { address, ...cleanProfile } = profile;
      localStorage.setItem("userProfile", JSON.stringify(cleanProfile));
      setSavedProfile(cleanProfile);
      const token = apiClient.auth.getToken();
      if (token) {
        const res = await apiClient.auth.updateProfile({
          profile: cleanProfile,
          recipients,
        });
        if (!res.ok) {
          setMessage({
            type: "error",
            text: "Profile saved locally, but failed to sync.",
          });
          return;
        }
        try {
          await apiClient.auth.me();
        } catch {}
        // Update header user cache if name/email/phone changed
        try {
          const raw = localStorage.getItem("tm_user");
          if (raw) {
            const u = JSON.parse(raw);
            const next = {
              ...u,
              name: cleanProfile.fullName || u.name,
              email: cleanProfile.emailAddress || u.email,
              phoneNumber: cleanProfile.phoneNumber || u.phoneNumber,
            };
            localStorage.setItem("tm_user", JSON.stringify(next));
            window.dispatchEvent(new Event("tm:auth"));
          }
        } catch {}
      }
      setMessage({
        type: "success",
        text: token ? "Profile saved & synced." : "Profile saved successfully.",
      });
    } catch {
      setMessage({ type: "error", text: "Unable to save profile." });
    }
  };

  const addRecipient = () => {
    if (recipients.length >= MAX_RECIPIENTS) {
      setMessage({
        type: "error",
        text: `You can only add up to ${MAX_RECIPIENTS} care recipients.`,
      });
      return;
    }
    setRecipients((prev) => [
      ...prev,
      {
        name: "",
        age: "",
        gender: "",
        preferredLanguage: "",
        weight: "",
        height: "",
        address: "",
        posscode: "",
        city: "",
        medicalConditions: "",
        specialRequirements: "",
      },
    ]);
  };

  const updateRecipient = (index, field, value) => {
    setRecipients((prev) =>
      prev.map((r, i) => (i === index ? { ...r, [field]: value } : r)),
    );
  };

  const removeRecipient = (index) => {
    const confirmRemove = window.confirm("Remove this care recipient?");
    if (!confirmRemove) return;
    const next = recipients.filter((_, i) => i !== index);
    setRecipients(next);
    try {
      localStorage.setItem("careRecipients", JSON.stringify(next));
      setSavedRecipients(next);
    } catch {}
    const token = apiClient.auth.getToken ? apiClient.auth.getToken() : "";
    if (token) {
      apiClient.auth
        .updateProfile({
          profile: savedProfile,
          recipients: next,
        })
        .then(async (res) => {
          if (!res.ok) {
            setMessage({
              type: "error",
              text: "Removed locally but failed to sync with server.",
            });
            return;
          }
          try {
            await apiClient.auth.me();
          } catch {}
          setMessage({ type: "success", text: "Care recipient removed." });
        })
        .catch(() => {
          setMessage({
            type: "error",
            text: "Removed locally but failed to sync with server.",
          });
        });
    } else {
      setMessage({ type: "success", text: "Care recipient removed locally." });
    }
  };

  const saveRecipients = (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    try {
      localStorage.setItem("careRecipients", JSON.stringify(recipients));
      setSavedRecipients(recipients);
      const token = apiClient.auth.getToken ? apiClient.auth.getToken() : "";
      if (token) {
        apiClient.auth
          .updateProfile({
            profile: savedProfile,
            recipients,
          })
          .then(async (res) => {
            if (!res.ok) {
              setMessage({
                type: "error",
                text:
                  "Recipients saved locally, but failed to sync with server.",
              });
              return;
            }
            try {
              await apiClient.auth.me();
            } catch {}
            setMessage({
              type: "success",
              text: "Care recipients saved & synced.",
            });
          })
          .catch(() => {
            setMessage({
              type: "error",
              text: "Recipients saved locally, but failed to sync with server.",
            });
          });
      } else {
        setMessage({
          type: "success",
          text: "Care recipients saved locally.",
        });
      }
    } catch {
      setMessage({ type: "error", text: "Unable to save care recipients." });
    }
  };

  // Clear message after 5 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ type: "", text: "" }), 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <MainLayout>
      <Head>
        <title>My Profile - Teman Malaysia</title>
      </Head>
      <main className="user-profile">
        {/* Hero Section */}
        <section className="user-profile__hero">
          <div className="container">
            <div className="user-profile__hero-content">
              <span className="user-profile__tag">MY ACCOUNT</span>
              <h1 className="user-profile__hero-title">Profile Settings</h1>
              <p className="user-profile__hero-subtitle">
                Manage your personal information and care recipients
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="user-profile__content">
          <div className="container">
            {/* Message Alert */}
            {message.text && (
              <div
                className={`user-profile__alert ${message.type === "success" ? "user-profile__alert--success" : "user-profile__alert--error"}`}
              >
                {message.type === "success" ? (
                  <FaCheck />
                ) : (
                  <FaExclamationCircle />
                )}
                <span>{message.text}</span>
              </div>
            )}

            <div className="user-profile__grid">
              {/* Personal Information Card */}
              <div className="user-profile__card">
                <div className="user-profile__card-header">
                  <div className="user-profile__card-icon">
                    <FaUser />
                  </div>
                  <div>
                    <h2 className="user-profile__card-title">
                      Personal Information
                    </h2>
                    <p className="user-profile__card-subtitle">
                      Your contact and identification details
                      {isProfileComplete && !isProfileDirty && (
                        <span className="user-profile__status user-profile__status--complete">
                          <FaCheck /> Complete
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <form
                  className="user-profile__form"
                  onSubmit={saveProfile}
                  noValidate
                  data-testid="profile-form"
                >
                  <div className="user-profile__form-row">
                    <div className="user-profile__form-group">
                      <label htmlFor="fullName" className="user-profile__label">
                        Full Name{" "}
                        <span className="user-profile__required">*</span>
                      </label>
                      <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        className="user-profile__input"
                        placeholder="Enter your full name"
                        value={profile.fullName}
                        onChange={handleProfileChange}
                        required
                        data-testid="input-full-name"
                      />
                    </div>
                    <div className="user-profile__form-group">
                      <label htmlFor="icNumber" className="user-profile__label">
                        IC Number
                      </label>
                      <input
                        id="icNumber"
                        name="icNumber"
                        type="text"
                        className="user-profile__input"
                        placeholder="123456-12-1234"
                        value={profile.icNumber}
                        onChange={handleProfileChange}
                        data-testid="input-ic-number"
                      />
                    </div>
                  </div>

                  <div className="user-profile__form-row">
                    <div className="user-profile__form-group">
                      <label
                        htmlFor="phoneNumber"
                        className="user-profile__label"
                      >
                        Phone Number{" "}
                        <span className="user-profile__required">*</span>
                      </label>
                      <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="tel"
                        className="user-profile__input"
                        placeholder="+60 12-345 6789"
                        value={profile.phoneNumber}
                        onChange={handleProfileChange}
                        required
                        data-testid="input-phone-number"
                      />
                    </div>
                    <div className="user-profile__form-group">
                      <label
                        htmlFor="emailAddress"
                        className="user-profile__label"
                      >
                        Email Address{" "}
                        <span className="user-profile__required">*</span>
                      </label>
                      <input
                        id="emailAddress"
                        name="emailAddress"
                        type="email"
                        className="user-profile__input"
                        placeholder="your.email@example.com"
                        value={profile.emailAddress}
                        onChange={handleProfileChange}
                        data-testid="input-email-address"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="user-profile__form-row">
                    <div className="user-profile__form-group">
                      <label
                        htmlFor="emergencyContact"
                        className="user-profile__label"
                      >
                        Emergency Contact
                      </label>
                      <input
                        id="emergencyContact"
                        name="emergencyContact"
                        type="text"
                        className="user-profile__input"
                        placeholder="Name and phone number"
                        value={profile.emergencyContact}
                        onChange={handleProfileChange}
                        data-testid="input-emergency-contact"
                      />
                    </div>
                  </div>

                  {showSaveProfileButton && (
                    <div className="user-profile__form-actions">
                      <button
                        type="submit"
                        className="user-profile__btn user-profile__btn--primary"
                        data-testid="save-profile-btn"
                      >
                        <FaCheck />
                        <span>Save Profile</span>
                      </button>
                    </div>
                  )}
                </form>
              </div>

              {/* Care Recipients Card */}
              <div className="user-profile__card">
                <div className="user-profile__card-header">
                  <div className="user-profile__card-icon user-profile__card-icon--secondary">
                    <FaUsers />
                  </div>
                  <div>
                    <h2 className="user-profile__card-title">
                      Care Recipients
                    </h2>
                    <p className="user-profile__card-subtitle">
                      People you are booking services for
                    </p>
                  </div>
                </div>

                <div className="user-profile__recipients-intro">
                  <div className="user-profile__recipients-intro-content">
                    <p>
                      Add the details of your loved ones to make booking faster
                      and easier.
                    </p>
                    <span className="user-profile__recipients-count">
                      {recipients.length} / {MAX_RECIPIENTS} recipients added
                    </span>
                  </div>
                  <button
                    type="button"
                    className={`user-profile__btn user-profile__btn--outline ${recipients.length >= MAX_RECIPIENTS ? "user-profile__btn--disabled" : ""}`}
                    onClick={addRecipient}
                    disabled={recipients.length >= MAX_RECIPIENTS}
                    data-testid="add-recipient-btn"
                  >
                    <FaPlus />
                    <span>Add Care Recipient</span>
                  </button>
                </div>

                {recipients.length > 0 && (
                  <form
                    className="user-profile__form"
                    onSubmit={saveRecipients}
                    data-testid="recipients-form"
                  >
                    <div className="user-profile__recipients-list">
                      {recipients.map((r, index) => (
                        <div
                          key={index}
                          className="user-profile__recipient-card"
                          data-testid={`recipient-${index}`}
                        >
                          <div className="user-profile__recipient-header">
                            <button
                              type="button"
                              className="user-profile__recipient-number"
                              onClick={() => toggleRecipientOpen(index)}
                              aria-expanded={!!expandedRecipients[index]}
                            >
                              {r.name && String(r.name).trim()
                                ? String(r.name).trim()
                                : `Recipient ${index + 1}`}
                            </button>
                            <button
                              type="button"
                              className="user-profile__btn user-profile__btn--danger user-profile__btn--small"
                              onClick={() => removeRecipient(index)}
                              data-testid={`remove-recipient-${index}`}
                            >
                              <FaTrash />
                              <span>Remove</span>
                            </button>
                          </div>
                          
                          {expandedRecipients[index] && (
                          <>
                          <div className="user-profile__form-row">
                            <div className="user-profile__form-group">
                              <label className="user-profile__label">
                                Name
                              </label>
                              <input
                                type="text"
                                className="user-profile__input"
                                placeholder="Recipient's full name"
                                value={r.name}
                                onChange={(e) =>
                                  updateRecipient(index, "name", e.target.value)
                                }
                              />
                            </div>
                            <div className="user-profile__form-group">
                              <label className="user-profile__label">Age</label>
                              <input
                                type="number"
                                className="user-profile__input"
                                placeholder="Age in years"
                                value={r.age}
                                onChange={(e) =>
                                  updateRecipient(index, "age", e.target.value)
                                }
                                min="0"
                              />
                            </div>
                          </div>

                          <div className="user-profile__form-row">
                            <div className="user-profile__form-group">
                              <label className="user-profile__label">
                                Gender
                              </label>
                              <select
                                className="user-profile__select"
                                value={r.gender}
                                onChange={(e) =>
                                  updateRecipient(
                                    index,
                                    "gender",
                                    e.target.value,
                                  )
                                }
                              >
                                {genderOptions.map((opt) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="user-profile__form-group">
                              <label className="user-profile__label">
                                Preferred Language
                              </label>
                              <select
                                className="user-profile__select"
                                value={r.preferredLanguage}
                                onChange={(e) =>
                                  updateRecipient(
                                    index,
                                    "preferredLanguage",
                                    e.target.value,
                                  )
                                }
                              >
                                {languageOptions.map((opt) => (
                                  <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className="user-profile__form-row">
                            <div className="user-profile__form-group">
                              <label className="user-profile__label">
                                Weight (kg)
                              </label>
                              <input
                                type="number"
                                className="user-profile__input"
                                placeholder="Weight in kg"
                                value={r.weight}
                                onChange={(e) =>
                                  updateRecipient(
                                    index,
                                    "weight",
                                    e.target.value,
                                  )
                                }
                                min="0"
                                step="0.1"
                              />
                            </div>
                            <div className="user-profile__form-group">
                              <label className="user-profile__label">
                                Height (cm)
                              </label>
                              <input
                                type="number"
                                className="user-profile__input"
                                placeholder="Height in cm"
                                value={r.height}
                                onChange={(e) =>
                                  updateRecipient(
                                    index,
                                    "height",
                                    e.target.value,
                                  )
                                }
                                min="0"
                                step="0.1"
                              />
                            </div>
                          </div>

                          <div className="user-profile__form-row user-profile__form-row--single">
                            <div className="user-profile__form-group">
                              <label className="user-profile__label">
                                Address
                              </label>
                              <textarea
                                className="user-profile__input"
                                placeholder="Recipient's address"
                                value={r.address || ""}
                                onChange={(e) =>
                                  updateRecipient(
                                    index,
                                    "address",
                                    e.target.value,
                                  )
                                }
                                rows={3}
                                data-testid={`recipient-address-${index}`}
                              />
                            </div>
                          </div>

                          <div className="user-profile__form-row">
                            <div className="user-profile__form-group">
                              <label className="user-profile__label">
                                Postcode
                              </label>
                              <input
                                type="text"
                                className="user-profile__input"
                                placeholder="Postcode"
                                value={r.posscode}
                                onChange={(e) =>
                                  updateRecipient(
                                    index,
                                          "posscode",
                                    e.target.value,
                                  )
                                }
                                min="0"
                                step="0.1"
                              />
                            </div>
                            <div className="user-profile__form-group">
                              <label className="user-profile__label">
                                City
                              </label>
                              <input
                                type="text"
                                className="user-profile__input"
                                placeholder="Area/City"
                                value={r.city}
                                onChange={(e) =>
                                  updateRecipient(
                                    index,
                                          "city",
                                    e.target.value,
                                  )
                                }
                                min="0"
                                step="0.1"
                              />
                            </div>
                          </div>

                          <div className="user-profile__form-row">
                            <div className="user-profile__form-group">
                              <label className="user-profile__label">
                                Medical Conditions
                              </label>
                              <textarea
                                className="user-profile__input"
                                placeholder="Relevant medical conditions"
                                value={r.medicalConditions || ""}
                                onChange={(e) =>
                                  updateRecipient(
                                    index,
                                    "medicalConditions",
                                    e.target.value,
                                  )
                                }
                                rows={3}
                                data-testid={`recipient-medical-${index}`}
                              />
                            </div>
                            <div className="user-profile__form-group">
                              <label className="user-profile__label">
                                Special Requirements
                              </label>
                              <textarea
                                className="user-profile__input"
                                placeholder="Accessibility or care requirements"
                                value={r.specialRequirements || ""}
                                onChange={(e) =>
                                  updateRecipient(
                                    index,
                                    "specialRequirements",
                                    e.target.value,
                                  )
                                }
                                rows={3}
                                data-testid={`recipient-requirements-${index}`}
                              />
                            </div>
                          </div>
                          </>
                          )}
                        </div>
                      ))}
                    </div>

                    {isRecipientsDirty && (
                      <div className="user-profile__form-actions">
                        <button
                          type="submit"
                          className="user-profile__btn user-profile__btn--primary"
                          data-testid="save-recipients-btn"
                        >
                          <FaCheck />
                          <span>Save Care Recipients</span>
                        </button>
                      </div>
                    )}
                  </form>
                )}

                {recipients.length === 0 && (
                  <div className="user-profile__empty-state">
                    <FaUsers className="user-profile__empty-icon" />
                    <p>No care recipients added yet.</p>
                    <span>
                      Click the button above to add your first care recipient.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}

export default dynamic(() => Promise.resolve(User), { ssr: false });
