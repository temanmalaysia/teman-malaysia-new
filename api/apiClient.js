// Google Apps Script URLs (deployed web apps that write to Google Sheets)
const GOOGLE_SCRIPT_URLS = {
  health: 'https://script.google.com/macros/s/AKfycbyCgUTeADPGkAdUOI7Je2-ZGnrbqtuRJwQC27aoJ0-ZfxVMUveenhuJHRNr7jLUScXF8g/exec',
  dialysis: 'https://script.google.com/macros/s/AKfycbx3ezy1ci9BOGYljJ_94B4UDl1RipSO0iWDwy7CwLSfIC84ItNim8VohBRO1pEi4r1A/exec',
  customActivities: 'https://script.google.com/macros/s/AKfycbyTY3PpwILUVeqyoLDVnjmTbA2MYtgNxAiAgecyo8cV9Ftg723b9PilFgNHxWuLGpTe/exec',
  homePackage: 'https://script.google.com/macros/s/AKfycbyvuJ84qdac6nJYS03ZOwFT3N8zAyS9IrTYV0G5IGW2s-bwfYoSOlj-W79N4s-WgStn_Q/exec',
};

// Formspree URLs for email notifications
const FORMSPREE_URLS = {
  health: 'https://formspree.io/f/xnnzgblw',
  dialysis: 'https://formspree.io/f/xzzvjavz',
  customActivities: 'https://formspree.io/f/xblkzawz',
  homePackage: 'https://formspree.io/f/mzzvjaqp',
};

const PAYMENT_URL = 'https://www.billplz.com/deposit4Teman';

/**
 * Generate booking reference number
 * Format: TM + last 6 digits of timestamp (e.g., TM125139)
 */
function generateRefNumber() {
  return 'TM' + Date.now().toString().slice(-6);
}

/**
 * Format service type for display
 */
function formatServiceType(type) {
  const serviceNames = {
    health: 'Health Appointments',
    dialysis: 'Dialysis Companionship',
    customActivities: 'Custom Activities',
    homePackage: 'Home Care Package',
  };
  return serviceNames[type] || type || 'Unknown';
}

/**
 * Convert form data object to URLSearchParams
 */
function toURLParams(data) {
  const params = new URLSearchParams();
  
  for (const [key, value] of Object.entries(data)) {
    if (value === null || value === undefined) {
      params.append(key, '');
    } else if (Array.isArray(value)) {
      // Handle arrays (treatment_dates, care_services, etc.)
      params.append(key, value.join(', '));
    } else if (typeof value === 'object') {
      params.append(key, JSON.stringify(value));
    } else {
      params.append(key, String(value));
    }
  }
  
  return params;
}

const apiClient = {
  booking: {
    /**
     * Submit booking to Google Sheets via Apps Script + Formspree for email
     * @param {Object} formData - Form data from booking form
     * @param {string} serviceType - 'health' | 'dialysis' | 'customActivities' | 'homePackage'
     * @param {Object} options - Additional options
     * @param {boolean} options.sendEmail - Whether to send email via Formspree (default: true)
     * @param {boolean} options.redirectToPayment - Whether to redirect to payment (default: false)
     * @param {number} options.redirectDelay - Delay before redirect in ms (default: 1500)
     * @returns {Promise<{ok: boolean, refNumber: string, serviceType: string}>}
     */
    submit: async (formData, serviceType = 'health', options = {}) => {
      const { 
        sendEmail = true, 
        redirectToPayment = false,
        redirectDelay = 1500,
      } = options;
      
      // Validate serviceType
      const validTypes = ['health', 'dialysis', 'customActivities', 'homePackage'];
      if (!validTypes.includes(serviceType)) {
        console.warn(`Invalid serviceType "${serviceType}", defaulting to "health"`);
        serviceType = 'health';
      }
      
      const refNumber = generateRefNumber();
      
      // Get service-specific URLs
      const googleScriptUrl = GOOGLE_SCRIPT_URLS[serviceType];
      const formspreeUrl = FORMSPREE_URLS[serviceType];
      
      /**
       * Normalize field names to match Google Apps Script expected field names
       */
      const normalizeFieldNames = (data, type) => {
        const d = { ...data };
        
        // Map preferred_gender to companion_gender (what Google Apps Script expects)
        if (d.preferred_gender) {
          d.companion_gender = d.preferred_gender;
        }
        
        // Map language fields to companion_language (what Google Apps Script expects)
        // Check all possible field names for language preference
        const langValue = d.preferred_language || d.language_preference || d.patient_language || '';
        if (langValue) {
          d.companion_language = langValue;
        }
        
        // Also handle employer mapping
        if (d.employer_name && !d.employer) {
          d.employer = d.employer_name;
        }

        // Dialysis-specific field mappings
        if (type === 'dialysis') {
          // Map treatment_dates to "multi_dates" (what Google Apps Script expects)
          const dateList = Array.isArray(d.treatment_dates)
            ? d.treatment_dates.join(', ')
            : (d.treatment_dates || '');
          if (dateList) {
            d.multi_dates = dateList;
          }
          
          // Map treatment_start_time to "preferred_start_time" (what Google Apps Script expects)
          const startTime = d.treatment_start_time || '';
          if (startTime) {
            d.preferred_start_time = startTime;
          }

          // Map other dialysis fields to match Google Apps Script
          if (d.typical_session_duration && !d.session_duration) {
            d.session_duration = d.typical_session_duration;
          }
          if (d.facility_address && !d.center_address) {
            d.center_address = d.facility_address;
          }
          if (d.restrictions && !d.dietary_restrictions) {
            d.dietary_restrictions = d.restrictions;
          }
          if (d.regular_schedule && !d.treatment_schedule) {
            d.treatment_schedule = d.regular_schedule;
          }
        }

        // Custom Activities field mappings
        if (type === 'customActivities') {
          const activityDates = Array.isArray(d.activity_dates)
            ? d.activity_dates.join(', ')
            : (d.activity_dates || '');
          if (activityDates) {
            d['Activity Dates'] = activityDates;
            // Also ensure activity_dates is a string for the Google Apps Script
            d.activity_dates = activityDates;
          }

          if (!d.planned_activities && d.activities_list) {
            d.planned_activities = d.activities_list;
          }
          if (!d.activities_list && d.planned_activities) {
            d.activities_list = d.planned_activities;
          }

          const activitiesValue = d.planned_activities || d.activities_list || '';
          if (activitiesValue) {
            d['Activities'] = activitiesValue;
          }

          // ====================================================
          // FIX: Map patient_* fields to participant_* fields
          // CareRecipientSelector stores data as patient_* but
          // the Google Apps Script expects participant_*
          // ====================================================
          if (d.patient_name && !d.participant_name) {
            d.participant_name = d.patient_name;
          }
          if (d.patient_age && !d.participant_age) {
            d.participant_age = d.patient_age;
          }
          if (d.patient_gender && !d.participant_gender) {
            d.participant_gender = d.patient_gender;
          }
          if (d.patient_language && !d.participant_language) {
            d.participant_language = d.patient_language;
          }
          if (d.patient_weight && !d.participant_weight) {
            d.participant_weight = d.patient_weight;
          }
          if (d.patient_height && !d.participant_height) {
            d.participant_height = d.patient_height;
          }

          // ====================================================
          // FIX: Map activity time fields
          // Form may use start_time or activity_start_time but
          // Google Apps Script expects activity_time
          // ====================================================
          if (!d.activity_time) {
            d.activity_time = d.start_time || d.activity_start_time || d.preferred_start_time || '';
          }

          // ====================================================
          // FIX: Map meeting/location fields
          // Form may use pickup_address or meeting_point but
          // Google Apps Script expects meeting_address
          // ====================================================
          if (!d.meeting_address) {
            d.meeting_address = d.pickup_address || d.meeting_point || '';
          }

          // Map activity_location (singular) to activity_locations (plural)
          if (d.activity_location && !d.activity_locations) {
            d.activity_locations = d.activity_location;
          }

          // ====================================================
          // FIX: Map health/medical fields
          // ====================================================
          if (d.restrictions && !d.dietary_restrictions) {
            d.dietary_restrictions = d.restrictions;
          }
          if (d.medical_conditions && !d.health_conditions) {
            d.health_conditions = d.medical_conditions;
          }

          // ====================================================
          // FIX: Map duration field
          // Google Apps Script expects 'duration'
          // ====================================================
          if (!d.duration && d.activity_duration) {
            d.duration = d.activity_duration;
          }

          // ====================================================
          // FIX: Map previous_experience (singular) →
          //      previous_experiences (plural, what Google Apps Script expects)
          // ====================================================
          if (d.previous_experience && !d.previous_experiences) {
            d.previous_experiences = d.previous_experience;
          }
          if (d.experience && !d.previous_experiences) {
            d.previous_experiences = d.experience;
          }

          // ====================================================
          // FIX: Map postal_code / zip_code → postcode
          //      (Google Apps Script expects "postcode")
          // ====================================================
          if (!d.postcode) {
            d.postcode = d.area_postcode || d.postal_code || d.zip_code || d.post_code || '';
          }

          // ====================================================
          // FIX: Map city_name / area / town → city
          //      (Google Apps Script expects "city")
          // ====================================================
          if (!d.city) {
            d.city = d.area_city || d.city_name || d.area || d.town || '';
          }
        }

        // Home Package field mappings
        if (type === 'homePackage') {
          // Map care_dates if needed
          const careDates = Array.isArray(d.care_dates)
            ? d.care_dates.join(', ')
            : (d.care_dates || '');
          if (careDates) {
            d['Care Dates'] = careDates;
          }
          
          // Map care_services if needed
          const careServices = Array.isArray(d.care_services)
            ? d.care_services.join(', ')
            : (d.care_services || '');
          if (careServices) {
            d['Care Services'] = careServices;
          }
        }

        return d;
      };

      const normalizedData = normalizeFieldNames(formData, serviceType);

      // Prepare data with metadata
      const enrichedData = {
        booking_reference: refNumber,
        service_type: formatServiceType(serviceType),
        ...normalizedData,
        submitted_at: new Date().toLocaleString('en-MY', { timeZone: 'Asia/Kuala_Lumpur' }),
      };

      const params = toURLParams(enrichedData);

      try {
        // 1. Submit to Google Sheets via Apps Script
        const sheetsResponse = await fetch(googleScriptUrl, {
          method: 'POST',
          body: params,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        const sheetsData = await sheetsResponse.json();

        if (sheetsData.status !== 'success') {
          throw new Error('Google Sheets submission failed: ' + (sheetsData.message || 'Unknown error'));
        }

        // 2. Send email notification via Formspree (optional)
        let emailSent = false;
        if (sendEmail) {
          try {
            const formDataObj = new FormData();
            for (const [key, value] of Object.entries(enrichedData)) {
              if (Array.isArray(value)) {
                formDataObj.append(key, value.join(', '));
              } else {
                formDataObj.append(key, String(value ?? ''));
              }
            }

            const emailResponse = await fetch(formspreeUrl, {
              method: 'POST',
              body: formDataObj,
              headers: {
                Accept: 'application/json',
              },
            });

            emailSent = emailResponse.ok;
            if (!emailSent) {
              console.warn('Formspree email notification failed, but booking was saved.');
            }
          } catch (emailError) {
            console.warn('Email notification error:', emailError);
          }
        }

        // 3. Redirect to payment (optional)
        if (redirectToPayment) {
          setTimeout(() => {
            window.location.href = PAYMENT_URL;
          }, redirectDelay);
        }

        return { 
          ok: true, 
          refNumber, 
          serviceType: formatServiceType(serviceType),
          emailSent,
        };

      } catch (error) {
        console.error('Booking submission error:', error);
        
        // Still redirect to payment even on error (matches original HTML behavior)
        if (redirectToPayment) {
          setTimeout(() => {
            window.location.href = PAYMENT_URL;
          }, 1000);
        }
        
        throw error;
      }
    },

    /**
     * Get payment URL
     */
    getPaymentUrl: () => PAYMENT_URL,

    /**
     * Redirect to payment page
     */
    redirectToPayment: (delay = 0) => {
      setTimeout(() => {
        window.location.href = PAYMENT_URL;
      }, delay);
    },
    
    /**
     * Open payment page in new tab
     */
    openPaymentInNewTab: () => {
      window.open(PAYMENT_URL, '_blank');
    },
  },
};

export default apiClient;