// ===========================================
// PACKAGE DATA FOR ALL BOOKING SERVICES
// Based on original HTML files
// ===========================================

// ===========================================
// HEALTH APPOINTMENTS
// ===========================================

export const healthPackages = [
  {
    id: "health-hourly",
    value: "hourly",
    title: "Hourly Rate",
    price: "RM35/hour",
    priceNote: "",
    description:
      "Choose the number of hours for service, as needed. Minimum 2 hours booking",
    hasHoursSelection: true,
  },
  {
    id: "health-4hours",
    value: "4hours",
    title: "4 Hours",
    price: "RM132",
    priceNote: "(RM33/hour)",
    description: "Suitable for shorter appointment sessions.",
    hasHoursSelection: false,
  },
  {
    id: "health-6hours",
    value: "6hours",
    title: "6 Hours",
    price: "RM186",
    priceNote: "(RM31/hour)",
    description:
      "Suitable for longer appointment sessions, or short appointments with extended activities (eg: meals, errands, etc.)",
    hasHoursSelection: false,
  },
];

export const healthHoursOptions = [
  { value: "2", label: "2 hours - RM70" },
  { value: "3", label: "3 hours - RM105" },
  { value: "4", label: "4 hours - RM140" },
  { value: "5", label: "5 hours - RM175" },
  { value: "6", label: "6 hours - RM210" },
];

export const healthAdditionalInfo = [
  "• Surcharge: RM37/hour for services on Public Holiday / Sundays / for last-minute bookings (<24 hours)",
];

// ===========================================
// DIALYSIS
// ===========================================

export const dialysisPackages = [
  {
    id: "dialysis-hourly",
    value: "hourly",
    title: "Single session: Transport Service Hourly Rate",
    price: "RM35/hour",
    priceNote: "",
    description:
      "Choose number of hours required for drop-off and pickup. Please allow travel time and pre- and post- treatment waiting time. Service does not include companionship",
    hasHoursSelection: true,
  },
  {
    id: "dialysis-3sessions",
    value: "3sessions",
    title: "Multi-session Package: 3 x 2 hour Sessions",
    price: "RM186",
    priceNote: "(RM31.00/hour)",
    description:
      "3 dialysis sessions at 2 hours service each. Service Inclusive of transportation, travel time and pre-post treatments waiting time. Service does not include companionship DURING treatment.",
    hasHoursSelection: false,
  },
];

export const dialysisHoursOptions = [
  { value: "2", label: "2 hours - RM70 (Minimum for 1 session)" },
  { value: "3", label: "3 hours - RM105" },
  { value: "4", label: "4 hours - RM140" },
  { value: "5", label: "5 hours - RM175" },
  { value: "6", label: "6 hours - RM210" },
];

export const dialysisAddonConfig = {
  title: "Add-On Companion Service (Optional)",
  cardTitle: "Comprehensive Companion Service (Hourly Rate)",
  price: "+RM30/hour",
  description:
    "Dialysis sessions do take awhile. Request the Temanion to stay with you through it, so you are not alone. Price and hours are added-on to basic transport service rate. They may assist you with:",
  hoursLabel: "Treatment Duration:",
  hoursOptions: [
    { value: "2", label: "2 hours - +RM60" },
    { value: "3", label: "3 hours - +RM90" },
    { value: "4", label: "4 hours - +RM120" },
    { value: "5", label: "5 hours - +RM150" },
    { value: "6", label: "6 hours - +RM180" },
  ],
  notes: [
    "• Physical & Emotional support",
    "• Social companionship & activities",
    "• Administrative support",
    "• Communication between family & providers",
  ],
};

export const dialysisAdditionalInfo = [
  "• Transportation fee: RM0.80/KM or e-hailing fare",
  "• Surcharge: RM37/hour for Public Holiday/Sunday/last minute booking",
];

// ===========================================
// CUSTOM ACTIVITIES
// ===========================================

export const customActivitiesPackages = [
  {
    id: "activity-hourly",
    value: "hourly",
    title: "Hourly Rate",
    price: "RM35/hour",
    priceNote: "",
    description:
      "Choose the number of hours for service, as needed. Minimum 2 hours booking",
    hasHoursSelection: true,
  },
];

export const customActivitiesHoursOptions = [
  { value: "2", label: "2 hours - RM70" },
  { value: "3", label: "3 hours - RM105" },
  { value: "4", label: "4 hours - RM140" },
  { value: "5", label: "5 hours - RM175" },
  { value: "6", label: "6 hours - RM210" },
];

export const customActivitiesAdditionalInfo = [
  "• Transportation fee: RM0.80/KM or e-hailing fare",
  "• Transport allowance: RM20/session",
  "• Surcharge: RM37/hour for Public Holiday/Sunday/last minute booking",
  "• For service longer than 6 hours, bulk purchase or customization - contact us for quote",
];

// ===========================================
// HOME PACKAGE
// ===========================================

export const homePackages = [
  {
    id: "home-package1",
    value: "package1",
    title: "Package 1: 20 × 4 hour sessions",
    price: "RM2,800",
    priceNote: "",
    description: "Suitable for short, half-day care service",
    hasHoursSelection: false,
    packageIncludes: [{ label: "4 hours/day" }, { label: "20 sessions total" }],
  },
  {
    id: "home-package2",
    value: "package2",
    title: "Package 2: 20 × 6 hour sessions",
    price: "RM3,780",
    priceNote: "",
    description: "Suitable for longer, half-day care service",
    hasHoursSelection: false,
    packageIncludes: [{ label: "6 hours/day" }, { label: "20 sessions total" }],
  },
  {
    id: "home-package3",
    value: "package3",
    title: "Package 3: 20 × 8 hour sessions",
    price: "RM4,720",
    priceNote: "",
    description: "Suitable for full-day care service",
    hasHoursSelection: false,
    packageIncludes: [{ label: "8 hours/day" }, { label: "20 sessions total" }],
  },
];

// Home Package doesn't have hourly options
export const homeHoursOptions = [];

export const homeAdditionalInfo = [
  "• Unused sessions cannot be refunded but can be rescheduled",
];

// ===========================================
// EXPORT ALL PACKAGE DATA
// ===========================================

export const packageData = {
  health: {
    title: "Choose Your Package",
    packages: healthPackages,
    hoursOptions: healthHoursOptions,
    additionalInfo: healthAdditionalInfo,
    addonConfig: null,
  },
  dialysis: {
    title: "Choose Your Package",
    packages: dialysisPackages,
    hoursOptions: dialysisHoursOptions,
    additionalInfo: dialysisAdditionalInfo,
    addonConfig: dialysisAddonConfig,
  },
  customActivities: {
    title: "Choose Your Package",
    packages: customActivitiesPackages,
    hoursOptions: customActivitiesHoursOptions,
    additionalInfo: customActivitiesAdditionalInfo,
    addonConfig: null,
  },
  homePackage: {
    title: "Choose Your Package",
    packages: homePackages,
    hoursOptions: homeHoursOptions,
    additionalInfo: homeAdditionalInfo,
    addonConfig: null,
  },
};

export default packageData;
