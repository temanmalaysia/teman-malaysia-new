import { useState } from 'react';

/**
 * Custom hook for managing booking form state and navigation
 * Shared across all booking service pages (health, dialysis, customActivities, homePackage)
 * 
 * @param {number} totalSteps - Total number of steps in the booking flow (default: 3)
 * @returns {object} - State values, setters, and action handlers
 */
export const useBookingForm = (totalSteps = 3) => {
  // Core booking state
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPackage, setSelectedPackage] = useState("");
  const [selectedHours, setSelectedHours] = useState("");
  const [formData, setFormData] = useState({});
  
  // Add-on state (used by dialysis, can be ignored by other services)
  const [addonSelected, setAddonSelected] = useState(false);
  const [addonHours, setAddonHours] = useState("");

  // Navigation handlers
  const handleContinue = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      // Scroll to top of form
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      // Scroll to top of form
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goToStep = (step) => {
    if (step >= 1 && step <= totalSteps) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Reset form to initial state
  const resetForm = () => {
    setCurrentStep(1);
    setSelectedPackage("");
    setSelectedHours("");
    setFormData({});
    setAddonSelected(false);
    setAddonHours("");
  };

  // Update specific form field
  const updateFormField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Check if can proceed to next step (basic validation)
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedPackage !== "";
      case 2:
        // Add your form validation logic here
        return Object.keys(formData).length > 0;
      default:
        return true;
    }
  };

  return {
    // State
    currentStep,
    selectedPackage,
    selectedHours,
    formData,
    addonSelected,
    addonHours,
    
    // Setters
    setCurrentStep,
    setSelectedPackage,
    setSelectedHours,
    setFormData,
    setAddonSelected,
    setAddonHours,
    
    // Actions
    handleContinue,
    handleBack,
    goToStep,
    resetForm,
    updateFormField,
    canProceed,
  };
};

export default useBookingForm;