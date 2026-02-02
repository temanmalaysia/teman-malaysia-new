import { useState } from "react";
import dayjs from "dayjs";
import {
  FaHeartbeat,
  FaCalendarCheck,
  FaLightbulb,
  FaStar,
  FaClipboardList,
  FaUser,
  FaBookMedical,
  FaInfoCircle,
  FaPlusSquare,
  FaCreditCard,
  FaPhoneAlt,
  FaUserCheck,
  FaHeart,
  FaHome,
  FaExclamationTriangle,
  FaArrowLeft,
  FaCalendar,
} from "react-icons/fa";
import { FaLocationDot, FaUserGroup } from "react-icons/fa6";
import {
  bookingSummaryData,
  packagePricing,
  careServicesLabels,
  transportationLabels,
  activityPaceLabels,
  activityDurationLabels,
  daysOfWeekLabels,
} from "./BookingSummaryData";
import SuccessModal from "../modal/SuccessModal";

// ===========================================
// ICONS
// ===========================================
const icons = {
  clipboard: <FaClipboardList size={20} />,
  user: <FaUser size={20} />,
  users: <FaUserGroup size={20} />,
  heart: <FaHeart size={20} />,
  heartbeat: <FaHeartbeat size={20} />,
  calendar: <FaCalendar size={20} />,
  "calendar-check": <FaCalendarCheck size={20} />,
  location: <FaLocationDot size={20} />,
  medical: <FaBookMedical size={20} />,
  plus: <FaPlusSquare size={20} />,
  info: <FaInfoCircle size={20} />,
  "credit-card": <FaCreditCard size={20} />,
  phone: <FaPhoneAlt size={20} />,
  "user-check": <FaUserCheck size={20} />,
  home: <FaHome size={20} />,
  star: <FaStar size={20} />,
  lightbulb: <FaLightbulb size={20} />,
  warning: <FaExclamationTriangle size={20} />,
  arrowLeft: <FaArrowLeft size={20} />,
};

// ===========================================
// BOOKING SUMMARY COMPONENT
// ===========================================
export default function BookingSummary({
  theme = "health",
  formData = {},
  selectedPackage = "",
  selectedHours = "",
  addonSelected = false,
  addonHours = "",
  onBack,
  onSubmit,
}) {
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get config for current theme
  const config = bookingSummaryData[theme];
  const pricing = packagePricing[theme];

  // ===========================================
  // COST CALCULATION
  // Based on packageData.js values
  // ===========================================
  const calculateCost = () => {
    if (!selectedPackage) return 0;

    let cost = 0;
    const hours = parseInt(selectedHours || 0);

    switch (theme) {
      case "health":
        if (selectedPackage === "hourly") {
          cost = hours * 35;
        } else if (selectedPackage === "4hours") {
          cost = 132;
        } else if (selectedPackage === "6hours") {
          cost = 186;
        }
        break;

      case "dialysis":
        if (selectedPackage === "hourly") {
          cost = hours * 35;
        } else if (selectedPackage === "3sessions") {
          cost = 186;
        }
        if (addonSelected && addonHours) {
          cost += parseInt(addonHours) * 30;
        }
        break;

      case "customActivities":
        if (selectedPackage === "hourly") {
          cost = hours * 35;
        }
        break;

      case "homePackage":
        if (selectedPackage === "package1") {
          cost = 2800;
        } else if (selectedPackage === "package2") {
          cost = 3780;
        } else if (selectedPackage === "package3") {
          cost = 4720;
        }
        break;

      default:
        break;
    }

    return cost;
  };

  // ===========================================
  // FORMAT HELPERS
  // ===========================================
  const formatText = (text, format) => {
    if (text === null || text === undefined || text === "") return null;

    switch (format) {
      case "capitalize":
        return text
          .toString()
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase());
      case "date":
        if (!text) return null;
        try {
          const d = dayjs(text);
          return d.isValid() ? d.format("DD/MM/YYYY") : text;
        } catch {
          return text;
        }
      case "dateFull":
        if (!text) return null;
        try {
          const d = dayjs(text);
          return d.isValid() ? d.format("dddd, D MMMM YYYY") : text;
        } catch {
          return text;
        }
      case "time":
        return text;
      case "hours":
        return text ? `${text} hours` : null;
      case "yesno":
        if (text === true || text === "yes" || text === "Yes") return "Yes";
        if (text === false || text === "no" || text === "No") return "No";
        return null;
      case "transportation":
        return transportationLabels[text] || text;
      case "activityPace":
        return activityPaceLabels[text] || text;
      case "activityDuration":
        return activityDurationLabels[text] || text;
      default:
        return text;
    }
  };

  const getPackageLabel = () => {
    if (!selectedPackage) return "-";

    switch (theme) {
      case "health":
        if (selectedPackage === "hourly") {
          return selectedHours
            ? `Hourly Rate - ${selectedHours} hours`
            : "Hourly Rate";
        } else if (selectedPackage === "4hours") {
          return "4 Hours";
        } else if (selectedPackage === "6hours") {
          return "6 Hours";
        }
        break;

      case "dialysis":
        if (selectedPackage === "hourly") {
          return selectedHours
            ? `Hourly Rate - ${selectedHours} hours`
            : "Hourly Rate";
        } else if (selectedPackage === "3sessions") {
          return "Multi-session Package: 3 x 2 hour Sessions";
        }
        break;

      case "customActivities":
        if (selectedPackage === "hourly") {
          return selectedHours
            ? `Hourly Rate - ${selectedHours} hours`
            : "Hourly Rate";
        }
        break;

      case "homePackage":
        if (selectedPackage === "package1") {
          return "Package 1: 20 × 4 hour sessions";
        } else if (selectedPackage === "package2") {
          return "Package 2: 20 × 6 hour sessions";
        } else if (selectedPackage === "package3") {
          return "Package 3: 20 × 8 hour sessions";
        }
        break;

      default:
        break;
    }

    return selectedPackage;
  };

  const getPackageLabelWithPrice = () => {
    if (!selectedPackage) return "-";

    const cost = calculateCost();
    const hours = parseInt(selectedHours || 0);

    switch (theme) {
      case "dialysis":
        if (selectedPackage === "hourly") {
          return hours
            ? `Single Session (${hours} hours total) - RM${cost}`
            : "Single Session";
        } else if (selectedPackage === "3sessions") {
          return `3-Session Package (6 hours total) - RM${cost}`;
        }
        break;

      default:
        return getPackageLabel();
    }

    return getPackageLabel();
  };

  const getHomePackageLabel = () => {
    if (!selectedPackage) return "-";

    switch (selectedPackage) {
      case "package1":
        return "Package 1 - 4 hours/day, 20 sessions";
      case "package2":
        return "Package 2 - 6 hours/day, 20 sessions";
      case "package3":
        return "Package 3 - 8 hours/day, 20 sessions";
      default:
        return selectedPackage;
    }
  };

  const getAddonLabel = () => {
    if (!addonSelected || !addonHours) return "None";
    const addonCost = parseInt(addonHours) * (pricing?.addon?.rate || 30);
    return `${addonHours} hours (+RM${addonCost})`;
  };

  const getCareServicesLabel = () => {
    const services = formData.care_services;
    if (!services || (Array.isArray(services) && services.length === 0))
      return "-";

    if (Array.isArray(services)) {
      return services
        .map((service) => careServicesLabels[service] || service)
        .join(", ");
    }

    return services;
  };

  const getDateListLabel = (dates) => {
    if (!dates || (Array.isArray(dates) && dates.length === 0)) return "-";
    if (Array.isArray(dates)) {
      return dates
        .map((d) => {
          try {
            const dd = dayjs(d);
            return dd.isValid() ? dd.format("DD/MM/YYYY") : d;
          } catch {
            return d;
          }
        })
        .join(", ");
    }
    return dates;
  };

  const getDaysListLabel = (days) => {
    if (!days || (Array.isArray(days) && days.length === 0)) return "-";
    if (Array.isArray(days)) {
      return days.map((d) => daysOfWeekLabels[d] || d).join(", ");
    }
    return days;
  };

  const getTimeRangeLabel = () => {
    const startTime =
      formData.care_start_time ||
      formData.schedule_start ||
      formData.start_time;
    const endTime =
      formData.care_end_time || formData.schedule_end || formData.end_time;

    if (!startTime && !endTime) return "-";
    if (startTime && endTime) return `${startTime} - ${endTime}`;
    if (startTime) return startTime;
    return "-";
  };

  // ===========================================
  // GET FIELD VALUE
  // ===========================================
  const getFieldValue = (field) => {
    const { key, type, format, default: defaultValue } = field;

    switch (type) {
      case "static":
        return config.serviceName;
      case "package":
        return getPackageLabel();
      case "packageWithPrice":
        return getPackageLabelWithPrice();
      case "homePackageLabel":
        return getHomePackageLabel();
      case "cost":
        const cost = calculateCost();
        return cost > 0 ? `RM ${cost.toLocaleString()}` : "-";
      case "addon":
        return getAddonLabel();
      case "careServices":
        return getCareServicesLabel();
      case "dateList":
        return getDateListLabel(formData[key]);
      case "daysList":
        return getDaysListLabel(formData[key]);
      case "timeRange":
        return getTimeRangeLabel();
      case "duration":
        return selectedHours ? `${selectedHours} hours` : "-";
      case "ageGender":
        const age = formData.patient_age;
        const gender = formData.patient_gender;
        if (age && gender) {
          return `${age}, ${gender}`;
        } else if (age) {
          return `Age: ${age}`;
        } else if (gender) {
          return gender;
        }
        return defaultValue || "-";
      default:
        break;
    }

    const value = formData[key];

    const altKeysMap = {
      preferred_language: [
        "language_preference",
        "companion_language",
        "patient_language",
      ],
      language_preference: [
        "preferred_language",
        "companion_language",
        "patient_language",
      ],
      companion_language: [
        "language_preference",
        "preferred_language",
        "patient_language",
      ],
      companion_gender: ["preferred_gender"],
      preferred_gender: ["companion_gender"],
      employer: ["employer_name"],
    };

    let resolvedValue = value;
    if (
      resolvedValue === null ||
      resolvedValue === undefined ||
      resolvedValue === ""
    ) {
      const alts = altKeysMap[key] || [];
      for (const alt of alts) {
        const v = formData[alt];
        if (v !== null && v !== undefined && v !== "") {
          resolvedValue = v;
          break;
        }
      }
    }

    if (
      resolvedValue === null ||
      resolvedValue === undefined ||
      resolvedValue === ""
    ) {
      return defaultValue || "-";
    }

    const formattedValue = formatText(resolvedValue, format);

    if (
      formattedValue === null ||
      formattedValue === undefined ||
      formattedValue === ""
    ) {
      return defaultValue || "-";
    }

    return formattedValue;
  };

  // ===========================================
  // FORM SUBMISSION
  // ===========================================
  const handleSubmit = async () => {
    if (!termsAgreed) {
      alert(
        "Please agree to the Terms & Conditions and Privacy Policy to continue.",
      );
      return;
    }

    setIsSubmitting(true);

    try {
      const submissionData = {
        ...formData,
        service_type: config.serviceName,
        package: getPackageLabel(),
        estimated_cost: `RM ${calculateCost().toLocaleString()}`,
      };

      // Normalize language/companion preferences
      if (
        !submissionData.preferred_language &&
        submissionData.language_preference
      ) {
        submissionData.preferred_language = submissionData.language_preference;
      }
      if (
        !submissionData.language_preference &&
        submissionData.preferred_language
      ) {
        submissionData.language_preference = submissionData.preferred_language;
      }

      if (theme === "customActivities") {
        if (
          !submissionData.companion_gender &&
          submissionData.preferred_gender
        ) {
          submissionData.companion_gender = submissionData.preferred_gender;
        }
        const langSource =
          submissionData.language_preference ||
          submissionData.preferred_language;
        if (!submissionData.companion_language && langSource) {
          submissionData.companion_language = langSource;
        }

        // Ensure activity_dates is converted to string
        if (formData.activity_dates) {
          submissionData.activity_dates = Array.isArray(formData.activity_dates)
            ? formData.activity_dates.join(", ")
            : formData.activity_dates;
        }
      }

      // Handle dialysis-specific fields
      if (theme === "dialysis") {
        if (addonSelected) {
          submissionData.companion_addon = getAddonLabel();
        }

        // Convert treatment_dates array to string
        if (formData.treatment_dates) {
          submissionData.treatment_dates = Array.isArray(
            formData.treatment_dates,
          )
            ? formData.treatment_dates.join(", ")
            : formData.treatment_dates;
        }

        // Ensure treatment_start_time is included
        if (formData.treatment_start_time) {
          submissionData.treatment_start_time = formData.treatment_start_time;
        }
      }

      // Handle homePackage-specific fields
      if (theme === "homePackage") {
        // Convert care_dates array to string
        if (formData.care_dates) {
          submissionData.care_dates = Array.isArray(formData.care_dates)
            ? formData.care_dates.join(", ")
            : formData.care_dates;
        }

        // Convert care_services array to string
        if (formData.care_services) {
          submissionData.care_services = Array.isArray(formData.care_services)
            ? formData.care_services.join(", ")
            : formData.care_services;
        }
      }

      // Debug log - remove after testing
      console.log("=== FINAL SUBMISSION DATA ===");
      console.log("treatment_dates:", submissionData.treatment_dates);
      console.log("treatment_start_time:", submissionData.treatment_start_time);
      console.log("Full submissionData:", submissionData);

      let result = null;
      if (onSubmit) {
        result = await onSubmit(submissionData);
      }

      // Use refNumber from apiClient result
      const refNumber =
        result?.refNumber || "TM" + Date.now().toString().slice(-6);
      setBookingRef(refNumber);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Submission error:", error);
      alert("There was an error submitting your booking. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  // ===========================================
  // RENDER
  // ===========================================
  return (
    <div className={`booking-summary booking-summary--${theme}`}>
      <h2 className="booking-summary__title">Booking Summary & Payment</h2>

      {/* Summary Cards */}
      <div className="booking-summary__cards">
        {config.cards.map((card) => (
          <div
            key={card.id}
            className={`booking-summary__card ${card.isMainCard ? "booking-summary__card--main" : ""}`}
          >
            <h3 className="booking-summary__card-title">
              {icons[card.icon]}
              {card.title}
            </h3>

            {card.fields.map((field, idx) => (
              <div key={idx} className="booking-summary__item">
                <span className="booking-summary__label">{field.label}</span>
                <span
                  className={`booking-summary__value ${field.key === "email" ? "booking-summary__value--raw" : ""}`}
                >
                  {getFieldValue(field)}
                </span>
              </div>
            ))}

            {card.costField && (
              <>
                <div className="booking-summary__item booking-summary__item--cost">
                  <span className="booking-summary__label">
                    {card.costField.label}
                  </span>
                  <span className="booking-summary__value booking-summary__value--cost">
                    RM {calculateCost().toLocaleString()}
                  </span>
                </div>
                {card.costField.note && (
                  <p className="booking-summary__cost-note">
                    {card.costField.note}
                  </p>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* What Happens Next Info Box */}
      <div className="booking-summary__info-box">
        <h3 className="booking-summary__info-title">
          {icons.info}
          What Happens Next?
        </h3>
        <ul className="booking-summary__info-list">
          {config.nextSteps.map((step, idx) => (
            <li key={idx}>
              {icons[step.icon]}
              {step.text}
            </li>
          ))}
        </ul>
      </div>

      {/* Tips Box (Custom Activities only) */}
      {config.tipsBox && (
        <div className="booking-summary__tips-box">
          <h3>
            {icons.lightbulb}
            {config.tipsBox.title}
          </h3>
          <ul>
            {config.tipsBox.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Warning Box (Home Package only) */}
      {config.warningBox && (
        <div className="booking-summary__warning-box">
          <h3>
            {icons.warning}
            {config.warningBox.title}
          </h3>
          <ul>
            {config.warningBox.items.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Terms Checkbox */}
      <label className="booking-summary__checkbox">
        <input
          type="checkbox"
          checked={termsAgreed}
          onChange={(e) => setTermsAgreed(e.target.checked)}
        />
        <span className="booking-summary__checkmark"></span>
        <span
          className="booking-summary__checkbox-text"
          dangerouslySetInnerHTML={{ __html: config.termsText }}
        />
      </label>

      {/* Action Buttons */}
      <div className="booking-summary__actions">
        <button type="button" className="btn btn--outline" onClick={onBack}>
          {icons.arrowLeft}
          Previous
        </button>
        <button
          type="button"
          className="btn btn--payment"
          onClick={handleSubmit}
          disabled={!termsAgreed || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Submitting...
            </>
          ) : (
            <>
              {icons["credit-card"]}
              {config.submitButtonText}
            </>
          )}
        </button>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        bookingRef={bookingRef}
        theme={theme}
        paymentUrl="https://www.billplz.com/deposit4Teman"
        autoRedirect={true}
        redirectDelay={2000}
      />
    </div>
  );
}
