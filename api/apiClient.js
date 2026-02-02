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
        
        // ============================================
        // DEBUG - Remove after testing
        // ============================================
        console.log('=== RAW DATA RECEIVED ===');
        console.log('All keys:', Object.keys(d));
        console.log('---');
        console.log('preferred_gender:', d.preferred_gender);
        console.log('preferred_language:', d.preferred_language);
        console.log('language_preference:', d.language_preference);
        console.log('patient_language:', d.patient_language);
        console.log('companion_gender (before):', d.companion_gender);
        console.log('companion_language (before):', d.companion_language);
        console.log('---');
        // ============================================
        
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
          // Map activity_dates if needed
          const activityDates = Array.isArray(d.activity_dates)
            ? d.activity_dates.join(', ')
            : (d.activity_dates || '');
          if (activityDates) {
            d['Activity Dates'] = activityDates;
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

        // ============================================
        // DEBUG - Remove after testing
        // ============================================
        console.log('=== AFTER NORMALIZATION ===');
        console.log('companion_gender (after):', d.companion_gender);
        console.log('companion_language (after):', d.companion_language);
        console.log('multi_dates:', d.multi_dates);
        console.log('preferred_start_time:', d.preferred_start_time);
        // ============================================

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

      // ============================================
      // DEBUG - Remove after testing
      // ============================================
      console.log('=== FINAL DATA BEING SENT ===');
      console.log('companion_gender:', enrichedData.companion_gender);
      console.log('companion_language:', enrichedData.companion_language);
      console.log('Full enrichedData:', enrichedData);
      // ============================================

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