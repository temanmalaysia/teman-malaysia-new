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
      
      // Prepare data with metadata
      const enrichedData = {
        booking_reference: refNumber,
        service_type: formatServiceType(serviceType),
        ...formData,
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