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
      let profName = '';
      try {
        const profRaw = localStorage.getItem('userProfile');
        const prof = profRaw ? JSON.parse(profRaw) : null;
        profName = prof && prof.fullName ? String(prof.fullName).trim() : '';
      } catch {}
      const normalized = {
        uid: user.uid || user.id || existing.uid || '',
        email: user.email || user.emailAddress || existing.email || '',
        name: profName || user.name || user.fullname || user.fullName || existing.name || '',
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
            if (v === undefined || v === null || String(v).trim() === '') return;
            const current = merged[k];
            if (!current || String(current).trim() === '') {
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
        // send all common aliases so n8n workflow can persist to DB regardless of expected key
        fullname: profile.fullName || '',
        name: profile.fullName || profile.name || '',
        fullName: profile.fullName || '',
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
     * Submit booking directly to n8n webhook
     * @param {Object} formData
     * @param {'health'|'dialysis'|'customActivities'|'homePackage'} serviceType
     * @returns {Promise<{ok: boolean, refNumber: string, serviceType: string}>}
     */
    submit: async (formData, serviceType = 'health') => {
      const validTypes = ['health', 'dialysis', 'customActivities', 'homePackage'];
      if (!validTypes.includes(serviceType)) {
        serviceType = 'health';
      }
      const refNumber = generateRefNumber();

      const enriched = {
        ...formData,
        booking_reference: refNumber,
        service_type: formatServiceType(serviceType),
        submitted_at: new Date().toISOString(),
      };

      const slugForService = (keyOrLabel) => {
        const k = (keyOrLabel || '').toString().toLowerCase();
        if (k === 'health') return 'health-appointment';
        if (k === 'dialysis') return 'dialysis';
        if (k === 'customactivities') return 'custom-activities';
        if (k === 'homepackage') return 'at-home';
        if (k.includes('health')) return 'health-appointment';
        if (k.includes('dialysis')) return 'dialysis';
        if (k.includes('custom')) return 'custom-activities';
        if (k.includes('home')) return 'at-home';
        return '';
      };
      const slug = slugForService(serviceType);

      const pick = (src, key, alt = []) =>
        src[key] || alt.map((k) => src[k]).find((v) => !!v) || '';

      const payload = {
        serviceType: pick(enriched, 'service_type'),
        service_type: pick(enriched, 'service_type'),
        packageType: pick(enriched, 'package'),
        package: pick(enriched, 'package'),
        hours: pick(enriched, 'selected_hours', ['hours', 'appointment_duration', 'duration']),
        selected_hours: pick(enriched, 'selected_hours', ['hours', 'appointment_duration', 'duration']),
        estimatedCost: pick(enriched, 'estimated_cost', ['package_cost']),
        estimated_cost: pick(enriched, 'estimated_cost', ['package_cost']),
        fullname: pick(enriched, 'full_name'),
        full_name: pick(enriched, 'full_name'),
        icNumber: pick(enriched, 'ic_number'),
        ic_number: pick(enriched, 'ic_number'),
        phoneNumber: pick(enriched, 'phone'),
        phone: pick(enriched, 'phone'),
        email: pick(enriched, 'email'),
        employer: pick(enriched, 'employer'),
        staffId: pick(enriched, 'staff_id'),
        staff_id: pick(enriched, 'staff_id'),
        emergencyContact: pick(enriched, 'emergency_contact'),
        emergency_contact: pick(enriched, 'emergency_contact'),
        relationship: pick(enriched, 'relationship'),
        patientName: pick(enriched, 'patient_name'),
        patient_name: pick(enriched, 'patient_name'),
        patientAge: pick(enriched, 'patient_age'),
        patient_age: pick(enriched, 'patient_age'),
        patientGender: pick(enriched, 'patient_gender'),
        patient_gender: pick(enriched, 'patient_gender'),
        patientLanguage: pick(enriched, 'patient_language'),
        patient_language: pick(enriched, 'patient_language'),
        patientWeight: pick(enriched, 'patient_weight'),
        patient_weight: pick(enriched, 'patient_weight'),
        patientHeight: pick(enriched, 'patient_height'),
        patient_height: pick(enriched, 'patient_height'),
        appointmentDates: pick(enriched, 'appointment_dates', ['multi_dates', 'care_dates', 'activity_dates']),
        appointment_dates: pick(enriched, 'appointment_dates', ['multi_dates', 'care_dates', 'activity_dates']),
        appointmentType: pick(enriched, 'appointment_type'),
        appointment_type: pick(enriched, 'appointment_type'),
        doctorName: pick(enriched, 'doctor_name'),
        doctor_name: pick(enriched, 'doctor_name'),
        appointmentTime: pick(enriched, 'appointment_time', ['preferred_start_time', 'activity_time']),
        appointment_time: pick(enriched, 'appointment_time', ['preferred_start_time', 'activity_time']),
        estimatedDuration: pick(enriched, 'appointment_duration', ['session_duration', 'duration']),
        appointment_duration: pick(enriched, 'appointment_duration', ['session_duration', 'duration']),
        facilityAddress: pick(enriched, 'facility_address', ['center_address']),
        facility_address: pick(enriched, 'facility_address', ['center_address']),
        pickupAddress: pick(enriched, 'pickup_address', ['meeting_address']),
        pickup_address: pick(enriched, 'pickup_address', ['meeting_address']),
        returnAddress: pick(enriched, 'return_address'),
        return_address: pick(enriched, 'return_address'),
        pickupTime: pick(enriched, 'pickup_time'),
        pickup_time: pick(enriched, 'pickup_time'),
        transportationMode: pick(enriched, 'transportation_mode'),
        transportation_mode: pick(enriched, 'transportation_mode'),
        transportationNotes: pick(enriched, 'transportation_notes'),
        transportation_notes: pick(enriched, 'transportation_notes'),
        medicalConditions: pick(enriched, 'medical_conditions', ['health_conditions']),
        medical_conditions: pick(enriched, 'medical_conditions', ['health_conditions']),
        medications: pick(enriched, 'medications'),
        mobilityAssistance: pick(enriched, 'mobility_assistance', ['mobility_level']),
        mobility_assistance: pick(enriched, 'mobility_assistance', ['mobility_level']),
        specialRequirements: pick(enriched, 'special_requirements'),
        special_requirements: pick(enriched, 'special_requirements'),
        companionGender: pick(enriched, 'companion_gender', ['preferred_gender']),
        companion_gender: pick(enriched, 'companion_gender', ['preferred_gender']),
        companionLanguage: pick(enriched, 'companion_language', ['language_preference', 'preferred_language']),
        companion_language: pick(enriched, 'companion_language', ['language_preference', 'preferred_language']),
        additionalNotes: pick(enriched, 'additional_notes'),
        additional_notes: pick(enriched, 'additional_notes'),
        howHeard: pick(enriched, 'how_heard'),
        how_heard: pick(enriched, 'how_heard'),
        bookingRef: refNumber,
        booking_reference: refNumber,
        submittedAt: enriched.submitted_at,
        submitted_at: enriched.submitted_at,
        serviceKey: serviceType,
      };

      const compact = Object.fromEntries(
        Object.entries(payload).filter(([, v]) => v !== undefined && v !== null && v !== '')
      );

      // Service-specific field aliases to match Excel column names in n8n
      if (slug === 'health-appointment') {
        compact.hours = compact.hours || pick(enriched, 'appointment_duration', ['duration']);
        compact.returnAddress = compact.returnAddress || pick(enriched, 'return_address') || compact.pickupAddress || '';
        compact.return_address = compact.return_address || compact.returnAddress || '';
        compact.companionGender = compact.companionGender || pick(enriched, 'preferred_gender');
        compact.companionLanguage = compact.companionLanguage || pick(enriched, 'language_preference', ['preferred_language']);
      } else if (slug === 'dialysis') {
        // Companion add-on and hours
        const addonLabel = pick(enriched, 'companion_addon', ['companionAddon']);
        const addonHours =
          pick(enriched, 'companion_hours', ['addon_hours', 'addonHours']) ||
          ((addonLabel || '').match(/(\d+)\s*hour/i)?.[1] || '');
        if (addonLabel) compact.companionAddon = addonLabel;
        if (addonHours) compact.companionHours = addonHours;
        // Dialysis-specific scheduling and addresses
        compact.treatmentDates = compact.treatmentDates || pick(enriched, 'treatment_dates');
        compact.startTime = compact.startTime || pick(enriched, 'treatment_start_time', ['start_time']);
        compact.sessionDuration = compact.sessionDuration || pick(enriched, 'session_duration', ['typical_session_duration']);
        compact.centerAddress = compact.centerAddress || pick(enriched, 'center_address', ['facility_address']);
        compact.returnAddress = compact.returnAddress || pick(enriched, 'return_address') || compact.pickupAddress || '';
        compact.return_address = compact.return_address || compact.returnAddress || '';
        compact.treatmentSchedule = compact.treatmentSchedule || pick(enriched, 'treatment_schedule', ['regular_schedule']);
        compact.dietaryRestrictions = compact.dietaryRestrictions || pick(enriched, 'dietary_restrictions', ['restrictions']);
      } else if (slug === 'custom-activities') {
        // Participant fields
        compact.participantName = compact.participantName || pick(enriched, 'participant_name', ['patient_name']);
        compact.participantAge = compact.participantAge || pick(enriched, 'participant_age', ['patient_age']);
        compact.participantGender = compact.participantGender || pick(enriched, 'participant_gender', ['patient_gender']);
        compact.participantLanguage = compact.participantLanguage || pick(enriched, 'participant_language', ['patient_language']);
        compact.participantWeight = compact.participantWeight || pick(enriched, 'participant_weight', ['patient_weight']);
        compact.participantHeight = compact.participantHeight || pick(enriched, 'participant_height', ['patient_height']);
        // Activities and logistics
        compact.activitiesList = compact.activitiesList || pick(enriched, 'planned_activities', ['activities_list']);
        compact.activityPace = compact.activityPace || pick(enriched, 'activity_pace');
        compact.activityDates = compact.activityDates || pick(enriched, 'activity_dates');
        compact.activityTime = compact.activityTime || pick(enriched, 'activity_time');
        compact.duration = compact.duration || pick(enriched, 'duration', ['activity_duration']);
        compact.meetingAddress = compact.meetingAddress || pick(enriched, 'meeting_address', ['pickup_address', 'meeting_point']);
        compact.activityLocations = compact.activityLocations || pick(enriched, 'activity_locations', ['activity_location']);
        compact.postcode = compact.postcode || pick(enriched, 'postcode', ['area_postcode', 'postal_code']);
        compact.city = compact.city || pick(enriched, 'city', ['area_city', 'city_name']);
        // Health and restrictions
        compact.healthConditions = compact.healthConditions || pick(enriched, 'health_conditions', ['medical_conditions']);
        compact.dietaryRestrictions = compact.dietaryRestrictions || pick(enriched, 'dietary_restrictions', ['restrictions']);
        compact.emergencyProcedures = compact.emergencyProcedures || pick(enriched, 'emergency_procedures');
        // Companion prefs
        compact.companionGender = compact.companionGender || pick(enriched, 'preferred_gender', ['companion_gender']);
        compact.companionLanguage = compact.companionLanguage || pick(enriched, 'language_preference', ['preferred_language', 'companion_language']);
        // Goals and experiences
        compact.activityGoals = compact.activityGoals || pick(enriched, 'activity_goals', ['goals']);
        compact.previousExperiences = compact.previousExperiences || pick(enriched, 'previous_experiences', ['previous_experience', 'experience']);
      } else if (slug === 'at-home') {
        // Home package aliases
        compact.packageCost = compact.packageCost || pick(enriched, 'package_cost', ['estimated_cost']);
        compact.homeAddress = compact.homeAddress || pick(enriched, 'home_address');
        compact.postcode = compact.postcode || pick(enriched, 'postcode', ['area_postcode', 'postal_code']);
        compact.city = compact.city || pick(enriched, 'city', ['area_city', 'city_name']);
        compact.homeAccess = compact.homeAccess || pick(enriched, 'home_access', ['home_access_info', 'access_instructions']);
        compact.multiDates = compact.multiDates || pick(enriched, 'multi_dates', ['care_dates']);
        compact.preferredStartTime = compact.preferredStartTime || pick(enriched, 'preferred_start_time');
        compact.preferredEndTime = compact.preferredEndTime || pick(enriched, 'preferred_end_time');
        compact.startDate = compact.startDate || pick(enriched, 'start_date', ['service_start_date']);
        compact.endDate = compact.endDate || pick(enriched, 'end_date', ['service_end_date']);
        compact.careServices = compact.careServices || pick(enriched, 'care_services');
        compact.allergies = compact.allergies || pick(enriched, 'allergies');
        compact.mobilityLevel = compact.mobilityLevel || pick(enriched, 'mobility_level', ['mobility_assistance']);
        compact.cognitiveStatus = compact.cognitiveStatus || pick(enriched, 'cognitive_status', ['cognitiveStatus']);
        compact.dailyRoutine = compact.dailyRoutine || pick(enriched, 'daily_routine', ['current_routine']);
        compact.familyInvolvement = compact.familyInvolvement || pick(enriched, 'family_involvement');
      }

      const endpoint = slug ? `${N8N_ENDPOINTS.booking}/${slug}` : N8N_ENDPOINTS.booking;
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(compact),
      }).catch(() => null);

      return {
        ok: !!res && (res.ok || res.status === 200),
        refNumber,
        serviceType: formatServiceType(serviceType),
      };
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
