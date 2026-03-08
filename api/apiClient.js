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

const N8N_ENDPOINTS = {
  signup: '/api/auth/signup',
  login: '/api/auth/login',
  profile: '/api/user/profile',
  me: '/api/user/me',
  forgotPassword: '/api/auth/forgot-password',
  changePassword: '/api/auth/change-password',
  booking: 'https://n8n-0faudat1jwfn.ciluba.sumopod.my.id/webhook/booking',
};

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

function setToken(token) {
  try {
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('tm_token', token);
        localStorage.setItem('tm_signed_in', '1');
      } else {
        localStorage.removeItem('tm_token');
        localStorage.removeItem('tm_signed_in');
      }
      try {
        window.dispatchEvent(new Event('tm:auth'));
      } catch {}
    }
  } catch {}
}

function getToken() {
  try {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('tm_token') || '';
    }
  } catch {}
  return '';
}

function setUser(user) {
  try {
    if (typeof window !== 'undefined' && user) {
      const existingRaw = localStorage.getItem('tm_user');
      const existing = existingRaw ? JSON.parse(existingRaw) : {};
      const normalized = {
        uid: user.uid || user.id || existing.uid || '',
        email: user.email || user.emailAddress || existing.email || '',
        name: user.name || user.fullname || user.fullName || existing.name || '',
        phoneNumber: user.phoneNumber || user.phone || existing.phoneNumber || '',
        avatar: user.avatar || existing.avatar || '',
        icNumber: user.icNumber || existing.icNumber,
        emergencyContact: user.emergencyContact || existing.emergencyContact,
      };
      localStorage.setItem('tm_user', JSON.stringify(normalized));
      try {
        window.dispatchEvent(new Event('tm:auth'));
      } catch {}
    }
  } catch {}
}

function getUser() {
  try {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('tm_user');
      return raw ? JSON.parse(raw) : null;
    }
  } catch {}
  return null;
}

/**
 * Convert form data object to URLSearchParams
 * Keys ending with [] will have each array element appended separately
 */
function toURLParams(data) {
  const params = new URLSearchParams();
  
  for (const [key, value] of Object.entries(data)) {
    if (value === null || value === undefined) {
      params.append(key, '');
    } else if (Array.isArray(value)) {
      // For keys ending with [], append each value separately
      // so Google Apps Script e.parameter receives them correctly
      if (key.endsWith('[]')) {
        value.forEach(v => params.append(key, String(v)));
      } else {
        params.append(key, value.join(', '));
      }
    } else if (typeof value === 'object') {
      params.append(key, JSON.stringify(value));
    } else {
      params.append(key, String(value));
    }
  }
  
  return params;
}

const apiClient = {
  auth: {
    signup: async (data) => {
      const body = {
        fullname: (data.fullname || data.fullName || '').trim(),
        icNumber: (data.icNumber || '').trim(),
        phoneNumber: (data.phoneNumber || '').trim(),
        email: (data.email || '').trim().toLowerCase(),
        password: (data.password || '').trim(),
      };
      const res = await fetch(N8N_ENDPOINTS.signup, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json().catch(() => ({}));
      const token = json.token || json.accessToken || (json.data && json.data.token) || '';
      if (token) setToken(token);
      if (json.user || (json.data && json.data.user)) {
        setUser(json.user || json.data.user);
      }
      return { ok: res.ok, token, data: json };
    },
    login: async (email, password) => {
      const payload = {
        email: (email || '').trim().toLowerCase(),
        password: (password || '').trim(),
      };
      const res = await fetch(N8N_ENDPOINTS.login, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      const token = json.token || json.accessToken || (json.data && json.data.token) || '';
      if (token) setToken(token);
      if (json.user || (json.data && json.data.user)) {
        setUser(json.user || json.data.user);
      }
      return { ok: res.ok, token, data: json };
    },
    logout: () => {
      setToken('');
      try {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('tm_user');
          localStorage.removeItem('userProfile');
          localStorage.removeItem('careRecipients');
        }
      } catch {}
      try {
        window.dispatchEvent(new Event('tm:auth'));
      } catch {}
      return { ok: true };
    },
    getToken: () => getToken(),
    isLoggedIn: () => !!getToken(),
    getUser: () => getUser(),
    forgotPassword: async (email) => {
      const res = await fetch(N8N_ENDPOINTS.forgotPassword, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const json = await res.json().catch(() => ({}));
      return { ok: res.ok, data: json };
    },
    changePassword: async ({ currentPassword, newPassword }) => {
      const token = getToken();
      const res = await fetch(N8N_ENDPOINTS.changePassword, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const json = await res.json().catch(() => ({}));
      return { ok: res.ok, data: json };
    },
    me: async () => {
      const token = getToken();
      if (!token) return { ok: false, data: null };
      const res = await fetch(N8N_ENDPOINTS.me, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok) {
        const userPayload = json.user || json.data?.user || json;
        if (userPayload) setUser(userPayload);
        const recipients =
          json.careRecipients ||
          json.recipients ||
          json.data?.careRecipients ||
          json.data?.recipients ||
          json.user?.careRecipients ||
          json.user?.recipients ||
          [];
        try {
          if (Array.isArray(recipients)) {
            const normalized = recipients.map((r) => ({
              name: r.name || '',
              age: r.age ?? '',
              gender: r.gender || '',
              preferredLanguage: r.preferredLanguage || r.language || '',
              weight: r.weight ?? '',
              height: r.height ?? '',
              address: r.address || '',
              posscode:
                r.posscode ||
                r.postcode ||
                r.post_code ||
                r.zip_code ||
                r.zip ||
                '',
              city: r.city || r.area_city || r.area || '',
              accessInformation:
                r.accessInformation || r.homeAccessInfo || r.access || '',
              medicalConditions: r.medicalConditions || r.healthConditions || '',
              specialRequirements:
                r.specialRequirements || r.requirements || '',
            }));
            localStorage.setItem('careRecipients', JSON.stringify(normalized));
            window.dispatchEvent(new Event('tm:auth'));
          }
        } catch {}
        const profile = {
          fullName: userPayload?.fullname || userPayload?.name,
          icNumber: userPayload?.icNumber,
          phoneNumber: userPayload?.phoneNumber || userPayload?.phone,
          emailAddress: userPayload?.email || userPayload?.emailAddress,
          emergencyContact: userPayload?.emergencyContact,
        };
        try {
          const existing = localStorage.getItem('userProfile');
          const base = existing ? JSON.parse(existing) : {};
          const merged = { ...base };
          Object.entries(profile).forEach(([k, v]) => {
            if (v !== undefined && v !== null && String(v).trim() !== '') {
              merged[k] = v;
            }
          });
          localStorage.setItem('userProfile', JSON.stringify(merged));
          window.dispatchEvent(new Event('tm:auth'));
        } catch {}
      }
      return { ok: res.ok, data: json };
    },
    updateProfile: async ({ profile, recipients = [] }) => {
      const token = getToken();
      const body = {
        fullname: profile.fullName || '',
        icNumber: profile.icNumber || '',
        phoneNumber: profile.phoneNumber || '',
        email: profile.emailAddress || profile.email || '',
        emergencyContact: profile.emergencyContact || '',
        careRecipients: recipients.map((r) => ({
          name: r.name || '',
          age: r.age ? Number(r.age) : r.age,
          gender: r.gender || '',
          preferredLanguage: r.preferredLanguage || r.language || '',
          weight: r.weight ? Number(r.weight) : r.weight,
          height: r.height ? Number(r.height) : r.height,
          address: r.address || '',
          posscode: r.posscode || r.postcode || '',
          city: r.city || '',
          accessInformation: r.accessInformation || r.homeAccessInfo || '',
          medicalConditions: r.medicalConditions || '',
          specialRequirements: r.specialRequirements || '',
        })),
      };
      const res = await fetch(N8N_ENDPOINTS.profile, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(body),
      });
      const json = await res.json().catch(() => ({}));
      return { ok: res.ok, data: json };
    },
  },
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
       * Normalize field names to match Google Apps Script expected field names.
       * Each service's Google Script expects specific field names that may
       * differ from what the React form components use.
       */
      const normalizeFieldNames = (data, type) => {
        const d = { ...data };
        
        // =============================================
        // COMMON MAPPINGS (all services)
        // =============================================
        
        // Map preferred_gender to companion_gender
        if (d.preferred_gender) {
          d.companion_gender = d.preferred_gender;
        }
        
        // Map language fields to companion_language
        const langValue = d.preferred_language || d.language_preference || d.patient_language || '';
        if (langValue) {
          d.companion_language = langValue;
        }
        
        // Handle employer mapping
        if (d.employer_name && !d.employer) {
          d.employer = d.employer_name;
        }

        // =============================================
        // DIALYSIS MAPPINGS
        // =============================================
        if (type === 'dialysis') {
          const dateList = Array.isArray(d.treatment_dates)
            ? d.treatment_dates.join(', ')
            : (d.treatment_dates || '');
          if (dateList) {
            d.multi_dates = dateList;
          }
          
          const startTime = d.treatment_start_time || '';
          if (startTime) {
            d.preferred_start_time = startTime;
          }

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

        // =============================================
        // CUSTOM ACTIVITIES MAPPINGS
        // =============================================
        if (type === 'customActivities') {
          const activityDates = Array.isArray(d.activity_dates)
            ? d.activity_dates.join(', ')
            : (d.activity_dates || '');
          if (activityDates) {
            d['Activity Dates'] = activityDates;
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

          // patient_* → participant_*
          if (d.patient_name && !d.participant_name) d.participant_name = d.patient_name;
          if (d.patient_age && !d.participant_age) d.participant_age = d.patient_age;
          if (d.patient_gender && !d.participant_gender) d.participant_gender = d.patient_gender;
          if (d.patient_language && !d.participant_language) d.participant_language = d.patient_language;
          if (d.patient_weight && !d.participant_weight) d.participant_weight = d.patient_weight;
          if (d.patient_height && !d.participant_height) d.participant_height = d.patient_height;

          // Activity time
          if (!d.activity_time) {
            d.activity_time = d.start_time || d.activity_start_time || d.preferred_start_time || '';
          }

          // Meeting address
          if (!d.meeting_address) {
            d.meeting_address = d.pickup_address || d.meeting_point || '';
          }

          // activity_location → activity_locations
          if (d.activity_location && !d.activity_locations) {
            d.activity_locations = d.activity_location;
          }

          // Medical fields
          if (d.restrictions && !d.dietary_restrictions) d.dietary_restrictions = d.restrictions;
          if (d.medical_conditions && !d.health_conditions) d.health_conditions = d.medical_conditions;

          // Duration
          if (!d.duration && d.activity_duration) d.duration = d.activity_duration;

          // previous_experience → previous_experiences
          if (d.previous_experience && !d.previous_experiences) d.previous_experiences = d.previous_experience;
          if (d.experience && !d.previous_experiences) d.previous_experiences = d.experience;

          // Postcode
          if (!d.postcode) {
            d.postcode = d.area_postcode || d.postal_code || d.zip_code || d.post_code || '';
          }

          // City
          if (!d.city) {
            d.city = d.area_city || d.city_name || d.area || d.town || '';
          }
        }

        // =============================================
        // HOME PACKAGE MAPPINGS
        // Google Script expects specific field names
        // that differ from the form field names
        // =============================================
        if (type === 'homePackage') {
          // ---- package_cost ----
          // Script expects "package_cost", form sends "estimated_cost"
          if (!d.package_cost) {
            d.package_cost = d.estimated_cost || '';
          }

          // ---- multi_dates ----
          // Script expects "multi_dates", form sends "care_dates" (array)
          const careDates = Array.isArray(d.care_dates)
            ? d.care_dates.join(', ')
            : (d.care_dates || '');
          if (careDates && !d.multi_dates) {
            d.multi_dates = careDates;
          }
          // Also ensure care_dates is a string
          if (careDates) {
            d.care_dates = careDates;
          }

          // ---- preferred_start_time / preferred_end_time ----
          // Script expects "preferred_start_time" / "preferred_end_time"
          // Form sends "start_time" / "end_time" (or care_start_time / care_end_time)
          if (!d.preferred_start_time) {
            d.preferred_start_time =
              d.care_start_time ||
              d.schedule_start ||
              d.start_time ||
              '';
          }
          if (!d.preferred_end_time) {
            d.preferred_end_time =
              d.care_end_time ||
              d.schedule_end ||
              d.end_time ||
              '';
          }

          // ---- start_date / end_date ----
          // Script expects "start_date" / "end_date"
          // Form sends "service_start_date" / "service_end_date"
          if (!d.start_date) {
            d.start_date = d.service_start_date || '';
          }
          if (!d.end_date) {
            d.end_date = d.service_end_date || '';
          }

          // ---- mobility_level ----
          // Script expects "mobility_level", form sends "mobility_assistance"
          if (!d.mobility_level) {
            d.mobility_level =
              d.mobility_assistance ||
              d.mobility_status ||
              '';
          }

          // ---- postcode ----
          // Script expects "postcode", form may send "area_postcode"
          if (!d.postcode) {
            d.postcode =
              d.area_postcode ||
              d.postal_code ||
              '';
          }

          // ---- city ----
          // Script expects "city", form may send "area_city"
          if (!d.city) {
            d.city =
              d.area_city ||
              d.city_name ||
              '';
          }

          // ---- home_access ----
          // Form sends "home_access_info", Script expects "home_access"
          if (!d.home_access) {
            d.home_access = d.home_access_info || d.access_instructions || '';
          }

          // ---- allergies ----
          // Form sends "restrictions", Script expects "allergies"
          if (!d.allergies) {
            d.allergies = d.restrictions || d.dietary_restrictions || '';
          }

          // ---- daily_routine ----
          // Form sends "current_routine", Script expects "daily_routine"
          if (!d.daily_routine) {
            d.daily_routine = d.current_routine || '';
          }

          // ---- care_services[] ----
          // Script expects key "care_services[]" (reads via data['care_services[]'])
          // Form sends "care_services" as array or comma-separated string
          const careServicesRaw = d.care_services;
          if (careServicesRaw) {
            const careServicesStr = Array.isArray(careServicesRaw)
              ? careServicesRaw.join(', ')
              : careServicesRaw;
            d['care_services[]'] = careServicesStr;
            // Also keep care_services as string
            d.care_services = careServicesStr;
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

        try {
          const pick = (src, key, alt = []) => src[key] || alt.map((k) => src[k]).find((v) => !!v) || '';
          const payload = {};
          payload.serviceType = pick(enrichedData, 'service_type');
          payload.packageType = pick(enrichedData, 'package');
          payload.hours = pick(enrichedData, 'selected_hours', ['hours']);
          payload.estimatedCost = pick(enrichedData, 'estimated_cost', ['package_cost']);
          payload.fullname = pick(enrichedData, 'full_name');
          payload.icNumber = pick(enrichedData, 'ic_number');
          payload.phoneNumber = pick(enrichedData, 'phone');
          payload.email = pick(enrichedData, 'email');
          payload.employer = pick(enrichedData, 'employer');
          payload.staffId = pick(enrichedData, 'staff_id');
          payload.emergencyContact = pick(enrichedData, 'emergency_contact');
          payload.patientName = pick(enrichedData, 'patient_name');
          payload.patientAge = pick(enrichedData, 'patient_age');
          payload.patientGender = pick(enrichedData, 'patient_gender');
          payload.patientLanguage = pick(enrichedData, 'patient_language');
          payload.patientWeight = pick(enrichedData, 'patient_weight');
          payload.patientHeight = pick(enrichedData, 'patient_height');
          payload.appointmentDates = pick(enrichedData, 'appointment_dates', ['multi_dates', 'care_dates', 'activity_dates']);
          payload.appointmentType = pick(enrichedData, 'appointment_type');
          payload.doctorName = pick(enrichedData, 'doctor_name');
          payload.appointmentTime = pick(enrichedData, 'appointment_time', ['preferred_start_time', 'activity_time']);
          payload.estimatedDuration = pick(enrichedData, 'appointment_duration', ['session_duration', 'duration']);
          payload.facilityAddress = pick(enrichedData, 'facility_address', ['center_address']);
          payload.pickupAddress = pick(enrichedData, 'pickup_address', ['meeting_address']);
          payload.returnAddress = pick(enrichedData, 'return_address');
          payload.pickupTime = pick(enrichedData, 'pickup_time');
          payload.transportationMode = pick(enrichedData, 'transportation_mode');
          payload.transportationNotes = pick(enrichedData, 'transportation_notes');
          payload.medicalConditions = pick(enrichedData, 'medical_conditions', ['health_conditions']);
          payload.medications = pick(enrichedData, 'medications');
          payload.mobilityAssistance = pick(enrichedData, 'mobility_assistance', ['mobility_level']);
          payload.specialRequirements = pick(enrichedData, 'special_requirements');
          payload.companionGender = pick(enrichedData, 'companion_gender');
          payload.companionLanguage = pick(enrichedData, 'companion_language');
          payload.additionalNotes = pick(enrichedData, 'additional_notes');
          payload.howHeard = pick(enrichedData, 'how_heard');
          const compact = Object.fromEntries(Object.entries(payload).filter(([, v]) => v !== undefined && v !== null && v !== ''));
          await fetch(N8N_ENDPOINTS.booking, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(compact),
          }).catch(() => {});
        } catch {}

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
