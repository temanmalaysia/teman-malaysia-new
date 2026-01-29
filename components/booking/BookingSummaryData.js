// ===========================================
// BOOKING SUMMARY DATA FOR ALL 4 SERVICES
// Matching Original HTML Files
// ===========================================

export const bookingSummaryData = {
  // ===========================================
  // HEALTH APPOINTMENTS
  // ===========================================
  health: {
    serviceName: 'Health Appointment Support',
    theme: 'health',
    
    // Summary cards configuration
    cards: [
      {
        id: 'service-details',
        title: 'Service Details',
        icon: 'clipboard',
        isMainCard: true, // Full width, themed background
        fields: [
          { key: 'serviceName', label: 'Service:', type: 'static' },
          { key: 'package', label: 'Package:', type: 'package' },
          { key: 'appointment_date', label: 'Appointment Dates:', format: 'date' },
          { key: 'appointment_type', label: 'Appointment Type:', format: 'capitalize' },
          { key: 'appointment_time', label: 'Appointment Time:' },
          { key: 'doctor_name', label: 'Doctor/Specialist:', default: 'Not specified' },
          { key: 'facility_name', label: 'Medical Facility:' },
          { key: 'transportation_mode', label: 'Transportation:', format: 'transportation' },
        ],
        costField: {
          label: 'Package Cost:',
          type: 'cost',
          note: '*Final cost may vary based on additional services, transportation fees and allowance',
        },
      },
      {
        id: 'contact-info',
        title: 'Contact Information',
        icon: 'user',
        fields: [
          { key: 'full_name', label: 'Name:' },
          { key: 'ic_number', label: 'IC Number:' },
          { key: 'phone', label: 'Phone:' },
          { key: 'email', label: 'Email:' },
          { key: 'relationship', label: 'Relationship:' },
          { key: 'emergency_contact', label: 'Emergency Contact:' },
          { key: 'employer', label: 'Employer:', default: 'Not specified' },
          { key: 'staff_id', label: 'Staff ID:', default: 'Not specified' },
        ],
      },
      {
        id: 'care-recipient',
        title: 'Care Recipient Details',
        icon: 'heartbeat',
        fields: [
          { key: 'patient_name', label: 'Name:', default: 'Same as contact person' },
          { key: 'patient_age', label: 'Age:', default: 'Not specified' },
          { key: 'patient_gender', label: 'Gender:', format: 'capitalize' },
          { key: 'preferred_language', label: 'Preferred Language:', default: 'English' },
          { key: 'patient_weight', label: 'Weight:', default: 'Not specified' },
          { key: 'patient_height', label: 'Height:', default: 'Not specified' },
        ],
      },
      {
        id: 'location-details',
        title: 'Location Details',
        icon: 'location',
        fields: [
          { key: 'pickup_address', label: 'Pickup Address:' },
          { key: 'pickup_time', label: 'Pickup Time:' },
          { key: 'return_address', label: 'Return Address:', default: 'Same as pickup' },
          { key: 'transportation_notes', label: 'Transportation Notes:', default: 'None specified' },
        ],
      },
      {
        id: 'medical-info',
        title: 'Medical Information',
        icon: 'medical',
        fields: [
          { key: 'medical_conditions', label: 'Medical Conditions:' },
          { key: 'current_medications', label: 'Current Medications:', default: 'None specified' },
          { key: 'mobility_status', label: 'Mobility Assistance:', format: 'capitalize', default: 'None' },
          { key: 'special_requirements', label: 'Special Requirements:' },
        ],
      },
      {
        id: 'companion-preferences',
        title: 'Companion Preferences',
        icon: 'users',
        fields: [
          { key: 'companion_gender', label: 'Preferred Gender:', format: 'capitalize', default: 'No Preference' },
          { key: 'companion_language', label: 'Language Preference:', format: 'capitalize', default: 'English' },
          { key: 'additional_notes', label: 'Additional Notes:', default: 'None' },
          { key: 'how_heard', label: 'How did you hear about us:', format: 'capitalize' },
        ],
      },
    ],

    // What Happens Next steps
    nextSteps: [
      { icon: 'credit-card', text: 'Complete your deposit payment to secure your booking' },
      { icon: 'phone', text: 'Our team will contact you within 24 hours to confirm details' },
      { icon: 'user-check', text: 'We will assign a suitable Temanion based on your requirements' },
      { icon: 'heart', text: 'Your companion will arrive at the scheduled time' },
    ],

    // Terms checkbox text
    termsText: 'I agree to the <a href="/terms">Terms & Conditions</a> and <a href="/privacy">Privacy Policy</a> *',
    
    // Submit button text
    submitButtonText: 'Pay Deposit',
  },

  // ===========================================
  // DIALYSIS TREATMENT
  // ===========================================
  dialysis: {
    serviceName: 'Dialysis Treatment Support',
    theme: 'dialysis',
    
    cards: [
      {
        id: 'service-details',
        title: 'Service Details',
        icon: 'clipboard',
        isMainCard: true,
        fields: [
          { key: 'serviceName', label: 'Service:', type: 'static' },
          { key: 'package', label: 'Package:', type: 'packageWithPrice' },
          { key: 'companionAddon', label: 'Companion Add-on:', type: 'addon' },
          { key: 'treatment_dates', label: 'Treatment Dates:', type: 'dateList' },
          { key: 'treatment_start_time', label: 'Treatment Start Time:' },
          { key: 'transportation_mode', label: 'Transportation:', format: 'transportation' },
        ],
        costField: {
          label: 'Estimated Cost:',
          type: 'cost',
          note: '*Final cost may vary based on additional services, transportation fees and allowance',
        },
      },
      {
        id: 'contact-info',
        title: 'Contact Information',
        icon: 'user',
        fields: [
          { key: 'full_name', label: 'Name:' },
          { key: 'ic_number', label: 'IC Number:' },
          { key: 'phone', label: 'Phone:' },
          { key: 'email', label: 'Email:' },
          { key: 'emergency_contact', label: 'Emergency Contact:' },
          { key: 'relationship', label: 'Relationship:' },
          { key: 'employer', label: 'Employer:' },
        ],
      },
      {
        id: 'care-recipient',
        title: 'Care Recipient Information',
        icon: 'heartbeat',
        fields: [
          { key: 'patient_name', label: 'Name:', default: 'Same as contact person' },
          { key: 'patient_age', label: 'Age:' },
          { key: 'patient_gender', label: 'Gender:' },
          { key: 'preferred_language', label: 'Preferred Language:', default: 'english' },
          { key: 'patient_weight', label: 'Weight:' },
          { key: 'patient_height', label: 'Height:' },
        ],
      },
      {
        id: 'location-details',
        title: 'Location Details',
        icon: 'location',
        fields: [
          { key: 'dialysis_center', label: 'Dialysis Center:' },
          { key: 'pickup_address', label: 'Pickup Address:' },
          { key: 'return_address', label: 'Return Address:', default: 'Same as pickup address' },
          { key: 'pickup_time', label: 'Preferred Pickup Time:' },
        ],
      },
      {
        id: 'medical-info',
        title: 'Medical & Care Information',
        icon: 'medical',
        fields: [
          { key: 'medical_conditions', label: 'Medical Conditions:' },
          { key: 'current_medications', label: 'Medications:', default: 'None specified' },
          { key: 'dietary_restrictions', label: 'Dietary Restrictions:' },
          { key: 'mobility_status', label: 'Mobility Assistance:', default: 'none' },
          { key: 'special_requirements', label: 'Special Requirements:' },
        ],
      },
      {
        id: 'companion-preferences',
        title: 'Companion Preferences',
        icon: 'users',
        fields: [
          { key: 'companion_gender', label: 'Preferred Gender:', default: 'no-preference' },
          { key: 'companion_language', label: 'Language Preference:', default: 'english' },
        ],
      },
      {
        id: 'additional-info',
        title: 'Additional Information',
        icon: 'info',
        fields: [
          { key: 'regular_schedule', label: 'Regular Treatment Schedule:', default: 'Not specified' },
          { key: 'additional_notes', label: 'Additional Notes:', default: 'None' },
          { key: 'how_heard', label: 'How did you hear about us:' },
        ],
      },
    ],

    nextSteps: [
      { icon: 'credit-card', text: 'Pay a small deposit to secure your booking' },
      { icon: 'phone', text: 'Our team will contact you within 24 hours to confirm details' },
      { icon: 'user-check', text: 'We will assign a Temanion familiar with dialysis care' },
      { icon: 'calendar-check', text: 'You will receive confirmation with your Temanion\'s details' },
      { icon: 'heartbeat', text: 'Your companion will provide support for your dialysis sessions' },
    ],

    termsText: 'I agree to the <a href="/terms">Terms & Conditions</a> and <a href="/privacy">Privacy Policy</a>',
    submitButtonText: 'Pay Deposit',
  },

  // ===========================================
  // CUSTOM ACTIVITIES
  // ===========================================
  customActivities: {
    serviceName: 'Custom Activities Companion',
    theme: 'customActivities',
    
    cards: [
      {
        id: 'service-details',
        title: 'Service Details',
        icon: 'clipboard',
        isMainCard: true,
        fields: [
          { key: 'serviceName', label: 'Service:', type: 'static' },
          { key: 'package', label: 'Package:', type: 'package' },
          { key: 'duration', label: 'Duration:', type: 'duration' },
          { key: 'activity_dates', label: 'Selected Dates:', type: 'dateList' },
          { key: 'activity_start_time', label: 'Start Time:' },
          { key: 'transportation_mode', label: 'Transportation:', format: 'transportation' },
        ],
        costField: {
          label: 'Base Service Cost:',
          type: 'cost',
          note: '*Final cost may include transportation fees (RM0.80/KM + RM20 allowance), surcharges for holidays/weekends, and personal activity expenses',
        },
      },
      {
        id: 'activities-preferences',
        title: 'Activities & Preferences',
        icon: 'star',
        fields: [
          { key: 'planned_activities', label: 'Activities:' },
          { key: 'activity_pace', label: 'Activity Pace:', default: 'Not specified' },
          { key: 'meeting_point', label: 'Meeting Point:' },
          { key: 'activity_location', label: 'Activity Locations:' },
        ],
      },
      {
        id: 'contact-info',
        title: 'Contact Information',
        icon: 'user',
        fields: [
          { key: 'full_name', label: 'Name:' },
          { key: 'ic_number', label: 'IC Number:' },
          { key: 'phone', label: 'Phone:' },
          { key: 'email', label: 'Email:' },
          { key: 'emergency_contact', label: 'Emergency Contact:' },
          { key: 'relationship', label: 'Relationship:', default: 'Not specified' },
        ],
      },
      {
        id: 'care-recipient',
        title: 'Care Recipient Details',
        icon: 'heartbeat',
        fields: [
          { key: 'patient_name', label: 'Name:', default: 'Not specified' },
          { key: 'age_gender', label: 'Age & Gender:', type: 'ageGender', default: 'Not specified' },
          { key: 'preferred_language', label: 'Language:', default: 'English' },
          { key: 'health_notes', label: 'Health Notes:', default: 'None specified' },
          { key: 'mobility_status', label: 'Mobility Assistance:', default: 'None' },
        ],
      },
      {
        id: 'companion-preferences',
        title: 'Companion Preferences',
        icon: 'users',
        fields: [
          { key: 'companion_gender', label: 'Preferred Gender:', default: 'No preference' },
          { key: 'companion_language', label: 'Language Preference:', default: 'English' },
          { key: 'activity_goals', label: 'Activity Goals:', default: 'Not specified' },
          { key: 'additional_notes', label: 'Additional Notes:', default: 'None' },
        ],
      },
    ],

    nextSteps: [
      { icon: 'credit-card', text: 'Pay the deposit to secure your booking' },
      { icon: 'phone', text: 'Our team will contact you within 24 hours to confirm details' },
      { icon: 'user-check', text: 'We will match you with a Temanion who shares your interests' },
      { icon: 'calendar-check', text: 'We will help plan the perfect itinerary for your activities' },
      { icon: 'star', text: 'Enjoy your personalized activity experience!' },
    ],

    // Activity Tips box (unique to Custom Activities)
    tipsBox: {
      title: 'Activity Tips & Reminders',
      items: [
        'Please arrive 10-15 minutes early at the meeting point',
        'Bring payment for personal expenses (meals, tickets, purchases)',
        'Check weather conditions and dress appropriately for activities',
        'Your Temanion\'s contact details will be shared before the activity',
      ],
    },

    termsText: 'I agree to the <a href="/terms">Terms & Conditions</a> and <a href="/privacy">Privacy Policy</a>. I understand that activity expenses are separate from the companion fee and that a deposit is required to secure the booking.',
    submitButtonText: 'Pay Deposit',
  },

  // ===========================================
  // HOME PACKAGE
  // ===========================================
  homePackage: {
    serviceName: 'Home Care Package',
    theme: 'homePackage',
    
    cards: [
      {
        id: 'service-details',
        title: 'Service Details',
        icon: 'clipboard',
        isMainCard: true,
        fields: [
          { key: 'serviceName', label: 'Service:', type: 'static' },
          { key: 'package', label: 'Package:', type: 'homePackageLabel' },
          { key: 'care_services', label: 'Care Services:', type: 'careServices' },
          { key: 'selected_dates', label: 'Selected Dates:', type: 'dateList' },
          { key: 'schedule', label: 'Schedule:', type: 'timeRange' },
          { key: 'care_start_date', label: 'Start Date:', format: 'dateFull' },
          { key: 'transportation_mode', label: 'Transportation:', format: 'transportation' },
        ],
        costField: {
          label: 'Package Cost:',
          type: 'cost',
        },
      },
      {
        id: 'contact-info',
        title: 'Contact Information',
        icon: 'user',
        fields: [
          { key: 'full_name', label: 'Name:' },
          { key: 'ic_number', label: 'IC Number:', default: 'Not provided' },
          { key: 'phone', label: 'Phone:' },
          { key: 'email', label: 'Email:' },
          { key: 'home_address', label: 'Home Address:' },
          { key: 'emergency_contact', label: 'Emergency Contact:' },
          { key: 'relationship', label: 'Relationship:', default: 'Not specified' },
        ],
      },
      {
        id: 'care-recipient',
        title: 'Care Recipient Details',
        icon: 'heartbeat',
        fields: [
          { key: 'patient_name', label: 'Name:' },
          { key: 'age_gender', label: 'Age & Gender:', type: 'ageGender' },
          { key: 'preferred_language', label: 'Language:', default: 'English' },
          { key: 'medical_conditions', label: 'Medical Conditions:' },
          { key: 'mobility_status', label: 'Mobility Level:', default: 'Fully mobile' },
          { key: 'allergies', label: 'Allergies:' },
        ],
      },
      {
        id: 'companion-preferences',
        title: 'Companion Preferences',
        icon: 'users',
        fields: [
          { key: 'companion_gender', label: 'Preferred Gender:', default: 'No preference' },
          { key: 'companion_language', label: 'Language Preference:', default: 'English' },
          { key: 'companion_age', label: 'Age Preference:' },
          { key: 'personality_traits', label: 'Personality Traits:' },
          { key: 'additional_notes', label: 'Additional Notes:', default: 'None' },
        ],
      },
    ],

    nextSteps: [
      { icon: 'credit-card', text: 'Pay the deposit to secure your booking' },
      { icon: 'phone', text: 'Our care coordinator will contact you within 24 hours to confirm details and provide quotation' },
      { icon: 'user-check', text: 'We will match you with a Temanion based on your needs' },
      { icon: 'home', text: 'A care assessment visit will be scheduled before service begins' },
      { icon: 'calendar-check', text: 'Your personalized home care schedule will commence as planned' },
    ],

    // Warning box (unique to Home Package)
    warningBox: {
      title: 'Important Package Information',
      items: [
        'Sessions can be rescheduled but unused sessions cannot be refunded',
      ],
    },

    termsText: 'I agree to the <a href="/terms">Terms & Conditions</a>, <a href="/privacy">Privacy Policy</a>, and package terms outlined above. I understand that a deposit is required to secure the booking.',
    submitButtonText: 'Pay Deposit & Confirm Booking',
  },
};

// ===========================================
// HELPER: Package pricing data for calculations
// Based on packageData.js
// ===========================================
export const packagePricing = {
  health: {
    hourly: { rate: 35, label: 'Hourly Rate' },
    '4hours': { price: 132, hours: 4, label: '4 Hours' },
    '6hours': { price: 186, hours: 6, label: '6 Hours' },
  },
  dialysis: {
    hourly: { rate: 35, label: 'Single session: Transport Service Hourly Rate' },
    '3sessions': { price: 186, sessions: 3, hoursPerSession: 2, label: 'Multi-session Package: 3 x 2 hour Sessions' },
    addon: { rate: 30 }, // Companion add-on rate per hour
  },
  customActivities: {
    hourly: { rate: 35, label: 'Hourly Rate' },
  },
  homePackage: {
    package1: { price: 2800, hoursPerDay: 4, sessions: 20, label: 'Package 1: 20 × 4 hour sessions' },
    package2: { price: 3780, hoursPerDay: 6, sessions: 20, label: 'Package 2: 20 × 6 hour sessions' },
    package3: { price: 4720, hoursPerDay: 8, sessions: 20, label: 'Package 3: 20 × 8 hour sessions' },
  },
};

// ===========================================
// HELPER: Care services labels for Home Package
// ===========================================
export const careServicesLabels = {
  'meal-preparation': 'Meal preparation & feeding assistance',
  'light-physiotherapy': 'Light physiotherapy & exercises',
  'personal-care': 'Personal care & hygiene assistance',
  'companionship': 'Companionship & emotional support',
  'mind-wellness': 'Mind wellness activities',
  'outdoor-exercise': 'Outdoor exercise & activities',
  'bathing-diaper': 'Bathing & diaper changing',
};

// ===========================================
// HELPER: Transportation labels
// ===========================================
export const transportationLabels = {
  'client-provided': 'I will provide transportation',
  'teman-provided': 'Temanion will arrange transportation',
  'e-hailing': 'E-Hailing Service (Grab/Taxi)',
};

// ===========================================
// HELPER: Activity pace labels
// ===========================================
export const activityPaceLabels = {
  'relax': 'Relaxed & leisurely',
  'moderate': 'Moderate pace',
  'active': 'Active & energetic',
  'flexible': 'Flexible, adapt as needed',
};

// ===========================================
// HELPER: Activity duration labels
// ===========================================
export const activityDurationLabels = {
  'less-than-2': 'Less than 2 hours',
  'more-than-2': 'More than 2 hours',
  'not-sure': 'Not sure',
};

// ===========================================
// HELPER: Days of week labels
// ===========================================
export const daysOfWeekLabels = {
  'monday': 'Monday',
  'tuesday': 'Tuesday',
  'wednesday': 'Wednesday',
  'thursday': 'Thursday',
  'friday': 'Friday',
  'saturday': 'Saturday',
  'sunday': 'Sunday',
};