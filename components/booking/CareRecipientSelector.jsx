/**
 * CareRecipientSelector Component
 * Allows users to select from saved care recipients or fill in manually
 * If user has 3 saved recipients, they can only select (no manual entry)
 */

import Link from 'next/link';
import { useState } from 'react';
import { FaUser, FaUserPlus, FaInfoCircle } from 'react-icons/fa';

const MAX_RECIPIENTS = 3;

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
];

const languageOptions = [
  { value: 'english', label: 'English' },
  { value: 'bahasa', label: 'Bahasa Malaysia' },
  { value: 'mandarin', label: 'Mandarin' },
  { value: 'tamil', label: 'Tamil' },
  { value: 'other', label: 'Other' },
];

// Helper function to get saved recipients from localStorage
const getSavedRecipients = () => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem('careRecipients');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export default function CareRecipientSelector({ 
  formData, 
  onFormChange,
  theme = 'health' 
}) {
  // Initialize state directly from localStorage (no useEffect needed)
  const [savedRecipients] = useState(getSavedRecipients);
  const [selectedRecipientIndex, setSelectedRecipientIndex] = useState('');
  
  // Determine initial mode based on saved recipients count
  const [selectionMode, setSelectionMode] = useState(() => {
    const recipients = getSavedRecipients();
    return recipients.length >= MAX_RECIPIENTS ? 'select' : 'manual';
  });

  // Check if user has reached max recipients
  const hasMaxRecipients = savedRecipients.length >= MAX_RECIPIENTS;
  const hasSavedRecipients = savedRecipients.length > 0;

  // Handle mode change
  const handleModeChange = (mode) => {
    setSelectionMode(mode);
    setSelectedRecipientIndex('');
    
    // Clear form data when switching modes
    onFormChange({
      ...formData,
      patient_name: '',
      patient_age: '',
      patient_gender: '',
      patient_language: '',
      patient_weight: '',
      patient_height: '',
    });
  };

  // Handle recipient selection from dropdown
  const handleRecipientSelect = (e) => {
    const index = e.target.value;
    setSelectedRecipientIndex(index);

    if (index === '') {
      // Clear form data
      onFormChange({
        ...formData,
        patient_name: '',
        patient_age: '',
        patient_gender: '',
        patient_language: '',
        patient_weight: '',
        patient_height: '',
      });
    } else {
      // Fill form with selected recipient data
      const recipient = savedRecipients[parseInt(index)];
      onFormChange({
        ...formData,
        patient_name: recipient.name || '',
        patient_age: recipient.age || '',
        patient_gender: recipient.gender || '',
        patient_language: recipient.preferredLanguage || '',
        patient_weight: recipient.weight || '',
        patient_height: recipient.height || '',
      });
    }
  };

  // Handle manual input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFormChange({
      ...formData,
      [name]: value,
    });
  };

  // Build theme class
  const themeClass = `care-recipient-selector--${theme}`;

  return (
    <div className={`care-recipient-selector ${themeClass}`}>
      {/* Mode Selection - Only show if user has saved recipients but not max */}
      {/* {hasSavedRecipients && !hasMaxRecipients && (
        <div className="care-recipient-selector__mode-toggle">
          <button
            type="button"
            className={`care-recipient-selector__mode-btn ${selectionMode === 'select' ? 'care-recipient-selector__mode-btn--active' : ''}`}
            onClick={() => handleModeChange('select')}
          >
            <FaUser />
            <span>Select from saved</span>
          </button>
          <button
            type="button"
            className={`care-recipient-selector__mode-btn ${selectionMode === 'manual' ? 'care-recipient-selector__mode-btn--active' : ''}`}
            onClick={() => handleModeChange('manual')}
          >
            <FaUserPlus />
            <span>Enter manually</span>
          </button>
        </div>
      )} */}

      {/* Info message when max recipients reached */}
      {hasMaxRecipients && (
        <div className="care-recipient-selector__info">
          <FaInfoCircle />
          <span>
            You have reached the maximum of {MAX_RECIPIENTS} saved care recipients. 
            Please select from your saved list below, or manage your recipients in your 
            <Link href="/user"> Profile Settings</Link>.
          </span>
        </div>
      )}

      {/* Recipient Dropdown - Show when in select mode or has max recipients */}
      {(selectionMode === 'select' || hasMaxRecipients) && hasSavedRecipients && (
        <div className="care-recipient-selector__dropdown">
          <label className="booking-details__label">
            Select Care Recipient
          </label>
          <select
            className="booking-details__select"
            value={selectedRecipientIndex}
            onChange={handleRecipientSelect}
          >
            <option value="">-- Select a care recipient --</option>
            {savedRecipients.map((recipient, index) => (
              <option key={index} value={index}>
                {recipient.name || `Recipient ${index + 1}`}
                {recipient.age ? ` (${recipient.age} years old)` : ''}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Form Fields */}
      <div className="booking-details__grid">
        {/* Care Recipient Name */}
        <div className="booking-details__field">
          <label htmlFor="patient_name" className="booking-details__label">
            Care Recipient Name
          </label>
          <input
            type="text"
            id="patient_name"
            name="patient_name"
            className={`booking-details__input ${(selectionMode === 'select' || hasMaxRecipients) ? 'booking-details__input--readonly' : ''}`}
            placeholder="Enter care recipient name"
            value={formData.patient_name || ''}
            onChange={handleChange}
            readOnly={selectionMode === 'select' || hasMaxRecipients}
          />
        </div>

        {/* Care Recipient Age */}
        <div className="booking-details__field">
          <label htmlFor="patient_age" className="booking-details__label">
            Care Recipient Age
          </label>
          <input
            type="number"
            id="patient_age"
            name="patient_age"
            className={`booking-details__input ${(selectionMode === 'select' || hasMaxRecipients) ? 'booking-details__input--readonly' : ''}`}
            placeholder="Age in years"
            value={formData.patient_age || ''}
            onChange={handleChange}
            readOnly={selectionMode === 'select' || hasMaxRecipients}
            min="0"
          />
        </div>

        {/* Care Recipient Gender */}
        <div className="booking-details__field">
          <label htmlFor="patient_gender" className="booking-details__label">
            Care Recipient Gender
          </label>
          <select
            id="patient_gender"
            name="patient_gender"
            className="booking-details__select"
            value={formData.patient_gender || ''}
            onChange={handleChange}
            disabled={selectionMode === 'select' || hasMaxRecipients}
          >
            <option value="">Select gender</option>
            {genderOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Preferred Language */}
        <div className="booking-details__field">
          <label htmlFor="patient_language" className="booking-details__label">
            Preferred Language
          </label>
          <select
            id="patient_language"
            name="patient_language"
            className="booking-details__select"
            value={formData.patient_language || ''}
            onChange={handleChange}
            disabled={selectionMode === 'select' || hasMaxRecipients}
          >
            <option value="">Select language</option>
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Care Recipient Weight */}
        <div className="booking-details__field">
          <label htmlFor="patient_weight" className="booking-details__label">
            Care Recipient Weight
          </label>
          <input
            type="number"
            id="patient_weight"
            name="patient_weight"
            className={`booking-details__input ${(selectionMode === 'select' || hasMaxRecipients) ? 'booking-details__input--readonly' : ''}`}
            placeholder="Weight in kg"
            value={formData.patient_weight || ''}
            onChange={handleChange}
            readOnly={selectionMode === 'select' || hasMaxRecipients}
            min="0"
            step="0.1"
          />
        </div>

        {/* Care Recipient Height */}
        <div className="booking-details__field">
          <label htmlFor="patient_height" className="booking-details__label">
            Care Recipient Height
          </label>
          <input
            type="number"
            id="patient_height"
            name="patient_height"
            className={`booking-details__input ${(selectionMode === 'select' || hasMaxRecipients) ? 'booking-details__input--readonly' : ''}`}
            placeholder="Height in cm"
            value={formData.patient_height || ''}
            onChange={handleChange}
            readOnly={selectionMode === 'select' || hasMaxRecipients}
            min="0"
            step="0.1"
          />
        </div>
      </div>

      {/* No saved recipients message */}
      {/* {!hasSavedRecipients && (
        <div className="care-recipient-selector__empty">
          <p>
            <strong>Tip:</strong> Save care recipients in your{' '}
            <Link href="/user">Profile Settings</Link> for faster booking next time.
          </p>
        </div>
      )} */}
    </div>
  );
}