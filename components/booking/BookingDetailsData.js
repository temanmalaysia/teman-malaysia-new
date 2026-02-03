// ===========================================
// BOOKING DETAILS FORM CONFIGURATIONS
// For all 4 booking services
// ===========================================

// Common field options
const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
];

const languageOptions = [
  { value: "english", label: "English" },
  { value: "bahasa", label: "Bahasa Malaysia" },
  { value: "mandarin", label: "Mandarin" },
  { value: "tamil", label: "Tamil" },
  { value: "other", label: "Other" },
];

const mobilityOptions = [
  { value: "none", label: "None" },
  { value: "wheelchair", label: "Wheelchair assistance" },
  { value: "walker", label: "Walker/walking aid support" },
  { value: "full-assistance", label: "Full mobility assistance required" },
  { value: "other", label: "Other" },
];

const howHeardOptions = [
  { value: "google", label: "Google Search" },
  { value: "facebook", label: "Facebook" },
  { value: "instagram", label: "Instagram" },
  { value: "friend-family", label: "Friend/Family Referral" },
  { value: "hospital", label: "Hospital/Clinic Referral" },
  { value: "other", label: "Other" },
];

// ===========================================
// HEALTH APPOINTMENTS SECTIONS
// ===========================================

export const healthDetailsSections = [
  {
    title: "Contact Information",
    icon: "user",
    fields: [
      {
        name: "full_name",
        label: "Full Name",
        type: "text",
        placeholder: "Enter your full name",
        required: true,
      },
      {
        name: "ic_number",
        label: "IC Number",
        type: "text",
        placeholder: "123456-12-1234",
        required: false,
      },
      {
        name: "relationship",
        label: "Relationship to Care Recipient",
        type: "select",
        options: [
          { value: "self", label: "Self" },
          { value: "spouse", label: "Spouse" },
          { value: "parent", label: "Parent" },
          { value: "child", label: "Child" },
          { value: "sibling", label: "Sibling" },
          { value: "relative", label: "Other Relative" },
          { value: "friend", label: "Friend" },
          { value: "caregiver", label: "Professional Caregiver" },
          { value: "other", label: "Other" },
        ],
        placeholder: "Select relationship",
        required: false,
      },
      {
        name: "phone",
        label: "Phone Number",
        type: "tel",
        placeholder: "+60 11-234 5678",
        required: true,
      },
      {
        name: "email",
        label: "Email Address",
        type: "email",
        placeholder: "your.email@example.com",
        required: true,
        help: "Use company email if claiming staff benefit",
      },
      {
        name: "employer_name",
        label: "Employer Name",
        type: "text",
        placeholder: "Your company name",
        required: false,
        help: "For Staff Benefit claims only",
      },
      {
        name: "staff_id",
        label: "Staff ID",
        type: "text",
        placeholder: "Your employee ID",
        required: false,
        help: "For Staff Benefit claims only",
        fullWidth: false,
      },
      {
        name: "emergency_contact",
        label: "Emergency Contact Person",
        type: "text",
        placeholder: "Name and phone number of emergency contact",
        required: true,
        fullWidth: true,
      },
    ],
  },
  {
    title: "Care Recipient Information",
    icon: "heart",
    description: "If the care recipient is different from the contact person above",
    isCareRecipient: true, // Flag to use CareRecipientSelector component
    fields: [], // Fields handled by CareRecipientSelector
  },
  {
    title: "Appointment Details",
    icon: "calendar",
    fields: [
      {
        name: "appointment_dates",
        label: "Select Appointment Date",
        type: "date",
        required: true,
        fullWidth: true,
        help: "Select a specific date; bookings must be made at least 5 days in advance",
      },
      {
        name: "appointment_type",
        label: "Type of Medical Appointment",
        type: "select",
        options: [
          { value: "general-checkup", label: "General Health Checkup" },
          { value: "specialist", label: "Specialist Consultation" },
          { value: "diagnostic", label: "Diagnostic Tests/Screening" },
          { value: "treatment", label: "Medical Treatment" },
          { value: "therapy", label: "Physical/Occupational Therapy" },
          { value: "dental", label: "Dental Appointment" },
          { value: "eye-care", label: "Eye Care/Optometry" },
          { value: "mental-health", label: "Mental Health/Counseling" },
          { value: "vaccination", label: "Vaccination" },
          { value: "other", label: "Other" },
        ],
        placeholder: "Select appointment type",
        required: true,
      },
      {
        name: "doctor_name",
        label: "Doctor/Specialist Name",
        type: "text",
        placeholder: "Dr. Name (if known)",
        required: false,
      },
      {
        name: "appointment_time",
        label: "Preferred Appointment Time",
        type: "time",
        required: true,
      },
      {
        name: "appointment_duration",
        label: "Expected Appointment Duration",
        type: "select",
        options: [
          { value: "1", label: "1 hour" },
          { value: "2", label: "2 hours" },
          { value: "3", label: "3 hours" },
          { value: "4", label: "4 hours" },
          { value: "5", label: "5+ hours" },
        ],
        placeholder: "Select expected duration",
        required: false,
      },
    ],
  },
  {
    title: "Location Details",
    icon: "location",
    fields: [
      {
        name: "facility_address",
        label: "Medical Facility Address",
        type: "textarea",
        placeholder: "Complete address of the medical facility",
        required: true,
        fullWidth: true,
        rows: 3,
      },
      {
        name: "pickup_address",
        label: "Pickup Address",
        type: "textarea",
        placeholder: "Address where our Temanion should meet you",
        required: true,
        fullWidth: true,
        rows: 3,
      },
      {
        name: "pickup_time",
        label: "Preferred Pickup Time",
        type: "time",
        required: true,
        help: "We recommend 30 - 60 minutes before appointment time, allowing for travel distance and traffic",
      },
      {
        name: "return_address",
        label: "Return Address",
        type: "text",
        placeholder: "If different from pickup address",
        required: false,
      },
    ],
  },
  {
    title: "Transportation for Activities",
    icon: "car",
    gridCols: 1,
    fields: [
      {
        name: "transportation_mode",
        label: "Transportation Mode",
        type: "radio",
        options: [
          {
            value: "client-provided",
            label: "I will provide transportation",
            description: "No charges",
          },
          {
            value: "temanion-arranged",
            label: "Temanion will arrange transportation",
            description: "Transportation fee of RM0.80/KM applies",
          },
          {
            value: "ehailing",
            label: "E-Hailing Service (Grab/Taxi)",
            description: "Exact fare charged applies",
          },
        ],
        required: true,
        fullWidth: true,
      },
      {
        name: "transportation_notes",
        label: "Transportation Notes",
        type: "textarea",
        placeholder:
          "Any specific transportation preferences, accessibility needs, or special instructions...",
        required: false,
        fullWidth: true,
        rows: 3,
      },
    ],
  },
  {
    title: "Medical & Care Information",
    icon: "medical",
    fields: [
      {
        name: "medical_conditions",
        label: "Medical Conditions",
        type: "textarea",
        placeholder:
          "Please list any medical conditions, disabilities, or health concerns that our companion should be aware of...",
        required: true,
        fullWidth: true,
        rows: 3,
      },
      {
        name: "medications",
        label: "Current Medications",
        type: "textarea",
        placeholder: "List current medications and any reminders needed...",
        required: false,
        fullWidth: true,
        rows: 3,
      },
      {
        name: "mobility_assistance",
        label: "Mobility Assistance Needed",
        type: "select",
        options: mobilityOptions,
        placeholder: "Select mobility assistance",
        required: true,
        fullWidth: true,
      },
      {
        name: "special_requirements",
        label: "Special Requirements",
        type: "textarea",
        placeholder:
          "Any specific assistance needed, allergies, dietary restrictions, or other important information...",
        required: true,
        fullWidth: true,
        rows: 3,
      },
    ],
  },
  {
    title: "Additional Information",
    icon: "additional",
    description: "Companion Preferences",
    fields: [
      {
        name: "preferred_gender",
        label: "Preferred Gender",
        type: "select",
        options: [
          { value: "no-preference", label: "No preference" },
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ],
        placeholder: "No preference",
        required: false,
      },
      {
        name: "language_preference",
        label: "Language Preference",
        type: "select",
        options: [
          { value: "english", label: "English" },
          { value: "bahasa", label: "Bahasa Malaysia" },
          { value: "mandarin", label: "Mandarin" },
          { value: "tamil", label: "Tamil" },
          { value: "cantonese", label: "Cantonese" },
          { value: "other", label: "Other" },
        ],
        placeholder: "English",
        required: false,
      },
      {
        name: "additional_notes",
        label: "Additional Notes",
        type: "textarea",
        placeholder:
          "Any other information, special requests, or concerns you'd like us to know about...",
        required: false,
        fullWidth: true,
        rows: 3,
      },
      {
        name: "how_heard",
        label: "How did you hear about us?",
        type: "select",
        options: howHeardOptions,
        placeholder: "Please select an option",
        required: true,
        fullWidth: true,
      },
    ],
  },
];

// ===========================================
// DIALYSIS SECTIONS
// ===========================================

export const dialysisDetailsSections = [
  {
    title: "Contact Information",
    icon: "user",
    fields: [
      {
        name: "full_name",
        label: "Full Name",
        type: "text",
        placeholder: "Enter your full name",
        required: true,
      },
      {
        name: "ic_number",
        label: "IC Number",
        type: "text",
        placeholder: "123456-12-1234",
        required: false,
      },
      {
        name: "relationship",
        label: "Relationship to Care Recipient",
        type: "select",
        options: [
          { value: "self", label: "Self" },
          { value: "spouse", label: "Spouse" },
          { value: "parent", label: "Parent" },
          { value: "child", label: "Child" },
          { value: "sibling", label: "Sibling" },
          { value: "relative", label: "Other Relative" },
          { value: "friend", label: "Friend" },
          { value: "caregiver", label: "Professional Caregiver" },
          { value: "other", label: "Other" },
        ],
        placeholder: "Select relationship",
        required: false,
      },
      {
        name: "phone",
        label: "Phone Number",
        type: "tel",
        placeholder: "+60 11-234 5678",
        required: true,
      },
      {
        name: "email",
        label: "Email Address",
        type: "email",
        placeholder: "your.email@example.com",
        required: true,
        help: "Use company email if claiming staff benefit",
      },
      {
        name: "employer_name",
        label: "Employer Name",
        type: "text",
        placeholder: "Your company name",
        required: false,
        help: "For those claiming for Staff Benefit only",
      },
      {
        name: "staff_id",
        label: "Staff ID",
        type: "text",
        placeholder: "Your employee ID",
        required: false,
        help: "For those claiming for Staff Benefit only",
        fullWidth: false,
      },
      {
        name: "emergency_contact",
        label: "Emergency Contact Person",
        type: "text",
        placeholder: "Name and phone number of emergency contact",
        required: true,
        fullWidth: true,
      },
    ],
  },
  {
    title: "Care Recipient Information",
    icon: "heart",
    description: "If the care recipient is different from the contact person above",
    isCareRecipient: true, // Flag to use CareRecipientSelector component
    fields: [], // Fields handled by CareRecipientSelector
  },
  {
    title: "Dialysis Treatment Schedule",
    icon: "calendar",
    isDialysisSchedule: true,
    fields: [
      {
        name: "treatment_dates",
        label: "Select Dialysis Treatment Dates",
        type: "text",
        placeholder: "Select treatment dates",
        required: true,
        fullWidth: true,
        help: "Select specific dates; bookings must be made at least 5 days in advance",
      },
      {
        name: "treatment_start_time",
        label: "Treatment Start Time",
        type: "time",
        required: true,
        help: "Recommended: 30-45 minutes before dialysis appointment",
      },
      {
        name: "session_duration",
        label: "Typical Session Duration",
        type: "select",
        options: [
          { value: "2", label: "2 hours (minimum)" },
          { value: "3", label: "3 hours" },
          { value: "4", label: "4 hours" },
          { value: "5", label: "5 hours" },
          { value: "6", label: "6+ hours" },
        ],
        placeholder: "Select duration",
        required: false,
        help: "This helps us plan the service duration",
      },
    ],
  },
  {
    title: "Location Details",
    icon: "location",
    fields: [
      {
        name: "center_address",
        label: "Dialysis Center Address",
        type: "textarea",
        placeholder: "Complete address of the dialysis center",
        required: true,
        fullWidth: true,
        rows: 3,
      },
      {
        name: "pickup_address",
        label: "Pickup Address",
        type: "textarea",
        placeholder: "Address where our Temanion should meet you",
        required: true,
        fullWidth: true,
        rows: 3,
      },
      {
        name: "pickup_time",
        label: "Preferred Pickup Time",
        type: "time",
        required: true,
        help: "We recommend 30 - 45 minutes before treatment time",
      },
      {
        name: "return_address",
        label: "Return Address",
        type: "text",
        placeholder: "If different from pickup address",
        required: false,
      },
    ],
  },
  {
    title: "Transportation for Activities",
    icon: "car",
    gridCols: 1,
    fields: [
      {
        name: "transportation_mode",
        label: "Transportation Mode",
        type: "radio",
        options: [
          {
            value: "client-provided",
            label: "I will provide transportation",
            description: "No charges",
          },
          {
            value: "temanion-arranged",
            label: "Temanion will arrange transportation",
            description: "Transportation fee of RM0.80/KM applies",
          },
          {
            value: "ehailing",
            label: "E-Hailing Service (Grab/Taxi)",
            description: "Exact fare charged applies",
          },
        ],
        required: true,
        fullWidth: true,
      },
      {
        name: "transportation_notes",
        label: "Transportation Notes",
        type: "textarea",
        placeholder:
          "Any specific transportation preferences, accessibility needs, or special instructions...",
        required: false,
        fullWidth: true,
        rows: 3,
      },
    ],
  },
  {
    title: "Medical & Care Information",
    icon: "medical",
    fields: [
      {
        name: "medical_conditions",
        label: "Related Medical Conditions",
        type: "textarea",
        placeholder:
          "Please list diabetes, hypertension, heart conditions, or other health concerns related to dialysis...",
        required: true,
        fullWidth: true,
        rows: 3,
      },
      {
        name: "medications",
        label: "Current Medications",
        type: "textarea",
        placeholder: "List any medications currently being taken",
        required: false,
        fullWidth: true,
        rows: 3,
      },
      {
        name: "restrictions",
        label: "Dietary Restrictions",
        type: "textarea",
        placeholder:
          "Fluid restrictions, potassium limits, phosphorus restrictions, etc...",
        required: true,
        fullWidth: true,
        rows: 3,
      },
      {
        name: "mobility_assistance",
        label: "Mobility Assistance Needed",
        type: "select",
        options: mobilityOptions,
        placeholder: "Select mobility assistance",
        required: true,
        fullWidth: true,
      },
      {
        name: "special_requirements",
        label: "Special Requirements or Instructions",
        type: "textarea",
        placeholder: "Any other special requirements or care instructions",
        required: false,
        fullWidth: true,
        rows: 3,
      },
    ],
  },
  {
    title: "Companion Preferences",
    icon: "companion",
    fields: [
      {
        name: "preferred_gender",
        label: "Preferred Gender",
        type: "select",
        options: [
          { value: "no-preference", label: "No preference" },
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ],
        placeholder: "No preference",
        required: false,
      },
      {
        name: "language_preference",
        label: "Language Preference",
        type: "select",
        options: [
          { value: "english", label: "English" },
          { value: "bahasa", label: "Bahasa Malaysia" },
          { value: "mandarin", label: "Mandarin" },
          { value: "tamil", label: "Tamil" },
          { value: "cantonese", label: "Cantonese" },
          { value: "other", label: "Other" },
        ],
        placeholder: "English",
        required: false,
      },
    ],
  },
  {
    title: "Additional Information",
    icon: "additional",
    fields: [
      {
        name: "regular_schedule",
        label: "Regular Treatment Schedule",
        type: "textarea",
        placeholder:
          "Please describe your regular dialysis schedule (e.g., Monday, Wednesday, Friday at 8:00 AM)...",
        required: false,
        fullWidth: true,
        rows: 3,
      },
      {
        name: "additional_notes",
        label: "Additional Notes",
        type: "textarea",
        placeholder:
          "Any other information, concerns, or special requests related to your dialysis treatment support...",
        required: false,
        fullWidth: true,
        rows: 3,
      },
      {
        name: "how_heard",
        label: "How did you hear about us?",
        type: "select",
        options: howHeardOptions,
        placeholder: "Please select an option",
        required: true,
        fullWidth: true,
      },
    ],
  },
];

// ===========================================
// CUSTOM ACTIVITIES SECTIONS
// ===========================================

export const customActivitiesDetailsSections = [
  {
    title: "Contact Information",
    icon: "user",
    fields: [
      {
        name: "full_name",
        label: "Full Name",
        type: "text",
        placeholder: "Enter your full name",
        required: true,
      },
      {
        name: "ic_number",
        label: "IC Number",
        type: "text",
        placeholder: "123456-12-1234",
        required: false,
      },
      {
        name: "relationship",
        label: "Relationship to Care Recipient",
        type: "select",
        options: [
          { value: "self", label: "Self" },
          { value: "spouse", label: "Spouse" },
          { value: "parent", label: "Parent" },
          { value: "child", label: "Child" },
          { value: "sibling", label: "Sibling" },
          { value: "relative", label: "Other Relative" },
          { value: "friend", label: "Friend" },
          { value: "caregiver", label: "Professional Caregiver" },
          { value: "other", label: "Other" },
        ],
        placeholder: "Select relationship",
        required: false,
      },
      {
        name: "phone",
        label: "Phone Number",
        type: "tel",
        placeholder: "+60 11-234 5678",
        required: true,
      },
      {
        name: "email",
        label: "Email Address",
        type: "email",
        placeholder: "your.email@example.com",
        required: true,
        help: "Use company email if claiming staff benefit",
      },
      {
        name: "employer_name",
        label: "Employer Name",
        type: "text",
        placeholder: "Your company name",
        required: false,
        help: "For Staff Benefit claims only",
      },
      {
        name: "staff_id",
        label: "Staff ID",
        type: "text",
        placeholder: "Your employee ID",
        required: false,
        help: "For Staff Benefit claims only",
        fullWidth: false,
      },
      {
        name: "emergency_contact",
        label: "Emergency Contact Person",
        type: "text",
        placeholder: "Name and phone number of emergency contact",
        required: true,
        fullWidth: true,
      },
    ],
  },
  {
    title: "Care Recipient Information",
    icon: "heart",
    description: "If the care recipient is different from the contact person above",
    isCareRecipient: true, // Flag to use CareRecipientSelector component
    fields: [], // Fields handled by CareRecipientSelector
  },
  {
    title: "Activity Preferences & Interests",
    icon: "star",
    gridCols: 1,
    fields: [
      {
        name: "activities_list",
        label: "Activities You'd Like to Do:",
        type: "textarea",
        placeholder:
          "Please describe the activities, locations, and any specific requirements. For example: Shopping at mall, visit to park, recreational activities, social outings, etc...",
        required: true,
        fullWidth: true,
        rows: 4,
      },
      {
        name: "activity_pace",
        label: "Preferred Activity Pace",
        type: "select",
        options: [
          { value: "relax", label: "Relaxed & leisurely" },
          { value: "moderate", label: "Moderate pace" },
          { value: "active", label: "Active & energetic" },
          { value: "flexible", label: "Flexible, adapt as needed" },
        ],
        placeholder: "Select pace preference",
        required: false,
      },
    ],
  },
  {
    title: "Activity Scheduling",
    icon: "calendar",
    isActivitySchedule: true,
    fields: [
      {
        name: "activity_dates",
        label: "Select Activity Dates",
        type: "text",
        placeholder: "Select activity dates",
        required: true,
        fullWidth: true,
        help: "Select specific dates; bookings must be made at least 5 days in advance",
      },
      {
        name: "activity_start_time",
        label: "Preferred Start Time",
        type: "time",
        required: true,
        help: "Same start time will apply to all selected dates",
      },
      {
        name: "activity_duration",
        label: "Estimated Activity Duration",
        type: "select",
        options: [
          { value: "less-than-2", label: "Less than 2 hours" },
          { value: "more-than-2", label: "More than 2 hours" },
          { value: "not-sure", label: "Not sure" },
        ],
        placeholder: "Select duration",
        required: false,
        help: "For recurring activities, the same session pattern will repeat",
      },
    ],
  },
  {
    title: "Activity Location & Meeting Point",
    icon: "location",
    fields: [
      {
        name: "pickup_address",
        label: "Meeting/Pickup Address",
        type: "textarea",
        placeholder: "Address where our Temanion should meet you",
        required: true,
        fullWidth: true,
        rows: 3,
      },
      {
        name: "activity_location",
        label: "Activity Locations",
        type: "textarea",
        placeholder:
          "List the places you'd like to visit (malls, parks, restaurants, etc.)",
        required: true,
        fullWidth: true,
        rows: 3,
      },
      {
        name: "area_postcode",
        label: "Area Postcode",
        type: "text",
        placeholder: "e.g. 50200",
        required: false,
      },
      {
        name: "area_city",
        label: "City/Area",
        type: "text",
        placeholder: "e.g. Kuala Lumpur",
        required: false,
      },
    ],
  },
  {
    title: "Transportation for Activities",
    icon: "car",
    gridCols: 1,
    fields: [
      {
        name: "transportation_mode",
        label: "Transportation Mode",
        type: "radio",
        options: [
          {
            value: "client-provided",
            label: "I will provide transportation",
            description: "No charges",
          },
          {
            value: "temanion-arranged",
            label: "Temanion will arrange transportation",
            description: "Transportation fee of RM0.80/KM applies",
          },
          {
            value: "ehailing",
            label: "E-Hailing Service (Grab/Taxi)",
            description: "Exact fare charged applies",
          },
        ],
        required: true,
        fullWidth: true,
      },
      {
        name: "transportation_notes",
        label: "Transportation Notes",
        type: "textarea",
        placeholder:
          "Any specific transportation preferences, accessibility needs, or special instructions...",
        required: false,
        fullWidth: true,
        rows: 3,
      },
    ],
  },
  {
    title: "Health & Mobility Information",
    icon: "medical",
    fields: [
      {
        name: "medical_conditions",
        label: "Health Conditions or Limitations",
        type: "textarea",
        placeholder:
          "Any health conditions, mobility limitations, or medical concerns that might affect activities...",
        required: false,
        fullWidth: true,
        rows: 2,
      },
      {
        name: "mobility_assistance",
        label: "Mobility Assistance Needed",
        type: "select",
        options: mobilityOptions,
        placeholder: "Select mobility assistance",
        required: false,
        fullWidth: true,
      },
      {
        name: "restrictions",
        label: "Dietary Restrictions or Allergies",
        type: "textarea",
        placeholder:
          "Food allergies, dietary restrictions, or preferences for dining activities...",
        required: false,
        fullWidth: true,
        rows: 2,
      },
      {
        name: "emergency_procedures",
        label: "Emergency Procedures or Medical Information",
        type: "textarea",
        placeholder:
          "Any emergency procedures, medications carried, or important medical information the companion should know...",
        required: false,
        fullWidth: true,
        rows: 2,
      },
    ],
  },
  {
    title: "Companion Preferences",
    icon: "companion",
    fields: [
      {
        name: "preferred_gender",
        label: "Preferred Gender",
        type: "select",
        options: [
          { value: "no-preference", label: "No preference" },
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ],
        placeholder: "No preference",
        required: false,
      },
      {
        name: "language_preference",
        label: "Language Preference",
        type: "select",
        options: [
          { value: "english", label: "English" },
          { value: "bahasa", label: "Bahasa Malaysia" },
          { value: "mandarin", label: "Mandarin" },
          { value: "tamil", label: "Tamil" },
          { value: "cantonese", label: "Cantonese" },
          { value: "other", label: "Other" },
        ],
        placeholder: "English",
        required: false,
      },
    ],
  },
  {
    title: "Additional Information",
    icon: "additional",
    fields: [
      {
        name: "activity_goals",
        label: "Activity Goals & Expectations",
        type: "textarea",
        placeholder:
          "What do you hope to achieve from these activities? (e.g., social interaction, exercise, enjoyment, exploration, etc.)",
        required: false,
        fullWidth: true,
        rows: 2,
      },
      {
        name: "experience",
        label: "Previous Activity Experience",
        type: "textarea",
        placeholder:
          "Tell us about activities you've enjoyed before or would like to try again...",
        required: false,
        fullWidth: true,
        rows: 2,
      },
      {
        name: "additional_notes",
        label: "Additional Notes & Special Requests",
        type: "textarea",
        placeholder:
          "Any other information, preferences, concerns, or special requests that would help us provide the best experience...",
        required: false,
        fullWidth: true,
        rows: 2,
      },
      {
        name: "how_heard",
        label: "How did you hear about us?",
        type: "select",
        options: howHeardOptions,
        placeholder: "Please select an option",
        required: true,
        fullWidth: true,
      },
    ],
  },
];

// ===========================================
// HOME PACKAGE SECTIONS
// ===========================================

const careServicesOptions = [
  { value: "meal-preparation", label: "Meal preparation & feeding assistance" },
  { value: "physiotherapy", label: "Light physiotherapy & exercises" },
  { value: "personal-care", label: "Personal care & hygiene assistance" },
  { value: "companionship", label: "Companionship & emotional support" },
  { value: "mind-wellness", label: "Mind wellness activities" },
  { value: "outdoor-activities", label: "Outdoor exercise & activities" },
  { value: "bathing-assistance", label: "Bathing & diaper changing" },
];

export const homePackageDetailsSections = [
  {
    title: "Contact Information",
    icon: "user",
    fields: [
      {
        name: "full_name",
        label: "Full Name",
        type: "text",
        placeholder: "Enter your full name",
        required: true,
      },
      {
        name: "ic_number",
        label: "IC Number",
        type: "text",
        placeholder: "123456-12-1234",
        required: false,
      },
      {
        name: "relationship",
        label: "Relationship to Care Recipient",
        type: "select",
        options: [
          { value: "self", label: "Self" },
          { value: "spouse", label: "Spouse" },
          { value: "parent", label: "Parent" },
          { value: "child", label: "Child" },
          { value: "sibling", label: "Sibling" },
          { value: "relative", label: "Other Relative" },
          { value: "friend", label: "Friend" },
          { value: "caregiver", label: "Professional Caregiver" },
          { value: "other", label: "Other" },
        ],
        placeholder: "Select relationship",
        required: false,
      },
      {
        name: "phone",
        label: "Phone Number",
        type: "tel",
        placeholder: "+60 11-234 5678",
        required: true,
      },
      {
        name: "email",
        label: "Email Address",
        type: "email",
        placeholder: "your.email@example.com",
        required: true,
        help: "Use company email if claiming staff benefit",
      },
      {
        name: "employer_name",
        label: "Employer Name",
        type: "text",
        placeholder: "Your company name",
        required: false,
        help: "For those claiming for Staff Benefit only",
      },
      {
        name: "staff_id",
        label: "Staff ID",
        type: "text",
        placeholder: "Your employee ID",
        required: false,
        help: "For those claiming for Staff Benefit only",
        fullWidth: false,
      },
      {
        name: "emergency_contact",
        label: "Emergency Contact Person",
        type: "text",
        placeholder: "Name and phone number of emergency contact",
        required: true,
        fullWidth: true,
      },
    ],
  },
  {
    title: "Care Recipient Information",
    icon: "heart",
    description: "If the care recipient is different from the contact person above",
    isCareRecipient: true, // Flag to use CareRecipientSelector component
    fields: [], // Fields handled by CareRecipientSelector
  },
  {
    title: "Home Address",
    icon: "home",
    fields: [
      {
        name: "home_address",
        label: "Complete Home Address",
        type: "textarea",
        placeholder:
          "Please provide complete address including unit number, building name, street, postcode, city, and state",
        required: true,
        fullWidth: true,
        rows: 2,
      },
      {
        name: "area_postcode",
        label: "Area Postcode",
        type: "text",
        placeholder: "e.g. 50200",
        required: true,
      },
      {
        name: "area_city",
        label: "City/Area",
        type: "text",
        placeholder: "e.g. Kuala Lumpur",
        required: true,
      },
      {
        name: "home_access_info",
        label: "Home Access Information",
        type: "textarea",
        placeholder:
          "Special access instructions, elevator, stairs, gate codes, etc.",
        required: false,
        fullWidth: true,
        rows: 3,
      },
    ],
  },
  {
    title: "Transportation for Activities",
    icon: "car",
    gridCols: 1,
    fields: [
      {
        name: "transportation_mode",
        label: "Transportation Mode",
        type: "radio",
        options: [
          {
            value: "client-provided",
            label: "I will provide transportation",
            description: "No charges",
          },
          {
            value: "temanion-arranged",
            label: "Temanion will arrange transportation",
            description: "Transportation fee of RM0.80/KM applies",
          },
          {
            value: "ehailing",
            label: "E-Hailing Service (Grab/Taxi)",
            description: "Exact fare charged applies",
          },
        ],
        required: true,
        fullWidth: true,
      },
      {
        name: "transportation_notes",
        label: "Transportation Notes",
        type: "textarea",
        placeholder:
          "Any specific transportation preferences, accessibility needs, or special instructions...",
        required: false,
        fullWidth: true,
        rows: 3,
      },
    ],
  },
  {
    title: "Care Schedule Preferences",
    icon: "calendar",
    isHomeSchedule: true, // Special flag for home package schedule (always 20 sessions)
    fields: [
      {
        name: "care_dates",
        label: "Select Multiple Care Dates",
        type: "text",
        placeholder: "Select up to 20 dates",
        required: true,
        fullWidth: true,
        help: "Select specific dates; bookings must be made at least 5 days in advance",
      },
      {
        name: "start_time",
        label: "Start Time",
        type: "time",
        required: true,
      },
      {
        name: "end_time",
        label: "End Time",
        type: "time",
        required: true,
      },
      {
        name: "service_start_date",
        label: "Service Start Date",
        type: "date",
        required: true,
        help: "Suggested from first care date selected. Must be at least 5 days from today.",
      },
      {
        name: "service_end_date",
        label: "Service End Date",
        type: "date",
        required: true,
        help: "Maximum 90 days from Service Start Date",
      },
    ],
  },
  {
    title: "Required Care Services",
    icon: "list",
    gridCols: 1,
    fields: [
      {
        name: "care_services",
        label: "Select all services needed:",
        type: "checkbox-cards",
        options: careServicesOptions,
        required: true,
        fullWidth: true,
      },
    ],
  },
  {
    title: "Medical & Health Information",
    icon: "medical",
    fields: [
      {
        name: "medical_conditions",
        label: "Medical Conditions & Diagnoses",
        type: "textarea",
        placeholder:
          "Please list any medical conditions, chronic illnesses, disabilities, or health concerns...",
        required: true,
        fullWidth: true,
        rows: 2,
      },
      {
        name: "medications",
        label: "Current Medications",
        type: "textarea",
        placeholder: "List all medications, dosages, and administration times...",
        required: false,
        fullWidth: true,
        rows: 2,
      },
      {
        name: "restrictions",
        label: "Allergies & Dietary Restrictions",
        type: "textarea",
        placeholder:
          "Food allergies, medication allergies, dietary restrictions, etc...",
        required: true,
        fullWidth: true,
        rows: 2,
      },
     {
        name: "mobility_assistance",
        label: "Mobility Assistance Needed",
        type: "select",
        options: mobilityOptions,
        placeholder: "Select mobility assistance",
        required: true,
        fullWidth: true,
      },
      {
        name: "cognitive_status",
        label: "Cognitive Status",
        type: "select",
        options: [
          { value: "alert", label: "Alert & fully oriented" },
          { value: "mild", label: "Mild confusion or memory issues" },
          { value: "mid_dementia", label: "Moderate dementia/cognitive impairment" },
          { value: "high_dementia", label: "Severe dementia/cognitive impairment" },
        ],
        placeholder: "Select cognitive status",
        required: true,
        fullWidth: true,
      },
      {
        name: "special_requirements",
        label: "Special Requirements",
        type: "textarea",
        placeholder: "Any specific care procedures, behavioral considerations, equipment needed, or other important information...",
        required: false,
        fullWidth: true,
        rows: 2,
      },
    ],
  },
  {
    title: "Companion Preferences",
    icon: "companion",
    fields: [
      {
        name: "preferred_gender",
        label: "Preferred Companion Gender",
        type: "select",
        options: [
          { value: "no-preference", label: "No preference" },
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
        ],
        placeholder: "Select preference",
        required: false,
      },
      {
        name: "preferred_language",
        label: "Preferred Companion Language",
        type: "select",
        options: languageOptions,
        placeholder: "Select language",
        required: false,
      },
    ],
  },
   {
    title: "Additional Information",
    icon: "additional",
    fields: [
      {
        name: "current_routine",
        label: "Current Daily Routine",
        type: "textarea",
        placeholder:
          "Please describe the typical daily routine, meal times, activity preferences, sleep schedule, etc...",
        required: false,
        fullWidth: true,
        rows: 2,
      },
      {
        name: "family_involvement",
        label: "Family Member Involvement",
        type: "textarea",
        placeholder:
          "Will family members be present during care? Who should the Temanion coordinate with?",
        required: false,
        fullWidth: true,
        rows: 2,
      },
      {
        name: "additional_notes",
        label: "Additional Notes & Requests",
        type: "textarea",
        placeholder:
          "Any other information, concerns, or special requests that would help us provide the best care...",
        required: false,
        fullWidth: true,
        rows: 2,
      },
      {
        name: "how_heard",
        label: "How did you hear about us?",
        type: "select",
        options: howHeardOptions,
        placeholder: "Please select an option",
        required: true,
        fullWidth: true,
      },
    ],
  },
];

// ===========================================
// EXPORT ALL CONFIGURATIONS
// ===========================================

export const BookingDetailsData = {
  health: {
    title: "Booking Details",
    sections: healthDetailsSections,
    showValidityWarning: false,
  },
  dialysis: {
    title: "Booking Details",
    sections: dialysisDetailsSections,
    showValidityWarning: false,
  },
  customActivities: {
    title: "Activity Details & Information",
    sections: customActivitiesDetailsSections,
    showValidityWarning: true,
  },
  homePackage: {
    title: "Care Details & Information",
    sections: homePackageDetailsSections,
    showValidityWarning: false,
  },
};

export default BookingDetailsData;
