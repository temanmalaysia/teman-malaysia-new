/**
 * BookingDetails Component (Unified)
 * Step 2 of the booking form - collects user and service details
 * 
 * @param {string} theme - Theme variant: 'health' | 'dialysis' | 'customActivities' | 'homePackage'
 * @param {string} title - Section title
 * @param {object} formData - Form data object
 * @param {function} onFormChange - Callback when form data changes
 * @param {function} onContinue - Callback when continue button is clicked
 * @param {function} onBack - Callback when back button is clicked
 * @param {array} sections - Array of form sections to display
 * @param {string} selectedPackage - Selected package value (for dialysis session count)
 * @param {string} selectedHours - Selected hours value (for dialysis session count)
 */

import MultiDatePicker from './MultiDatePicker';
import CareRecipientSelector from './CareRecipientSelector';
import { FaCar, FaHeartbeat, FaUser, FaCalendarAlt, FaBookMedical, FaPlusSquare, FaStar, FaHome, FaExclamationTriangle, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import {FaListCheck, FaLocationDot, FaUserGroup} from 'react-icons/fa6';
import dayjs from 'dayjs';

export default function BookingDetails({
  theme = 'health',
  title = 'Booking Details',
  formData,
  onFormChange,
  onContinue,
  onBack,
  sections = [],
  showValidityWarning = false,
  selectedPackage = '',
  selectedHours = '',
}) {
  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === 'checkbox' ? checked : value;

    if (type === 'date') {
      const advanceNames = new Set(['appointment_dates', 'service_start_date']);
      if (advanceNames.has(name)) {
        const minDate = dayjs().startOf('day').add(5, 'day');
        const parsed = dayjs(newValue);
        if (parsed.isValid()) {
          newValue = parsed.isBefore(minDate) ? minDate.format('YYYY-MM-DD') : parsed.format('YYYY-MM-DD');
        } else {
          newValue = '';
        }
      }

      if (name === 'service_end_date') {
        const start = formData.service_start_date ? dayjs(formData.service_start_date) : dayjs().startOf('day').add(5, 'day');
        const max = start.add(90, 'day');
        const parsed = dayjs(newValue);
        if (parsed.isValid()) {
          if (parsed.isBefore(start)) newValue = start.format('YYYY-MM-DD');
          else if (parsed.isAfter(max)) newValue = max.format('YYYY-MM-DD');
          else newValue = parsed.format('YYYY-MM-DD');
        } else {
          newValue = '';
        }
      }
    }

    onFormChange({
      ...formData,
      [name]: newValue,
    });
  };

  // Handle checkbox array change (for multiple selections like care services)
  const handleCheckboxArrayChange = (name, value, checked) => {
    const currentValues = formData[name] || [];
    if (checked) {
      onFormChange({
        ...formData,
        [name]: [...currentValues, value],
      });
    } else {
      onFormChange({
        ...formData,
        [name]: currentValues.filter((v) => v !== value),
      });
    }
  };

  // Calculate max sessions for dialysis based on package selection
  const getDialysisSessionInfo = () => {
    // Multi-session package: 3 x 2 hour sessions = 6 hours total, 3 treatment sessions
    if (selectedPackage === '3sessions') {
      return { 
        maxSessions: 3, 
        totalHours: 6, 
        hoursText: 'Package includes 6 hours total - you can select up to 3 treatment sessions' 
      };
    }
    
    // Hourly package: selected hours, 1 treatment session
    if (selectedPackage === 'hourly') {
      const hours = selectedHours || '2';
      return { 
        maxSessions: 1, 
        totalHours: parseInt(hours), 
        hoursText: `Based on ${hours} hours selected - you can select up to 1 treatment sessions` 
      };
    }
    
    // Default fallback (should not happen if props are passed correctly)
    return { 
      maxSessions: 1, 
      totalHours: 2, 
      hoursText: 'Based on 2 hours selected - you can select up to 1 treatment sessions' 
    };
  };

  // Calculate max sessions for custom activities based on hours selected
  // Each 2-hour block = 1 session
  const getActivitySessionInfo = () => {
    const hours = parseInt(selectedHours) || 2;
    const maxSessions = Math.ceil(hours / 2);
    return {
      maxSessions,
      totalHours: hours,
      hoursText: `Based on ${hours} hours selected - you can select up to ${maxSessions} sessions`
    };
  };

  // Count selected activity dates
  const getSelectedActivityDatesCount = () => {
    const dates = formData.activity_dates;
    if (!dates) return 0;
    if (Array.isArray(dates)) return dates.length;
    return 0;
  };

  // Count selected home care dates
  const getSelectedCareDatesCount = () => {
    const dates = formData.care_dates;
    if (!dates) return 0;
    if (Array.isArray(dates)) return dates.length;
    return 0;
  };

  // Count selected treatment dates
  const getSelectedDatesCount = () => {
    const dates = formData.treatment_dates;
    if (!dates) return 0;
    if (Array.isArray(dates)) return dates.length;
    return 0;
  };

  // Validate required fields before continuing
  const handleContinue = () => {
    // Find all required fields from sections
    const requiredFields = [];
    sections.forEach((section) => {
      // Skip care recipient section fields (they're handled by CareRecipientSelector)
      if (section.isCareRecipient) return;
      
      section.fields.forEach((field) => {
        if (field.required) {
          requiredFields.push({ name: field.name, label: field.label });
        }
      });
    });

    // Check if all required fields are filled
    for (const field of requiredFields) {
      const value = formData[field.name];
      if (!value || (typeof value === 'string' && !value.trim())) {
        alert(`Please fill in the ${field.label} field.`);
        const element = document.getElementById(field.name);
        if (element) {
          element.focus();
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
    }

    const minAdvanceDays = 5;
    const boundary = new Date();
    boundary.setDate(boundary.getDate() + minAdvanceDays);
    boundary.setHours(0, 0, 0, 0);
    for (const section of sections) {
      for (const field of section.fields) {
        if (field.type === 'date') {
          const val = formData[field.name];
          if (val) {
            const chosen = new Date(val);
            chosen.setHours(0, 0, 0, 0);
            if (chosen < boundary) {
              const y = boundary.getFullYear();
              const m = String(boundary.getMonth() + 1).padStart(2, '0');
              const d = String(boundary.getDate()).padStart(2, '0');
              alert(`Bookings must be at least ${minAdvanceDays} days in advance. Please select a date on or after ${y}-${m}-${d}.`);
              const element = document.getElementById(field.name);
              if (element) {
                element.focus();
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
              return;
            }
          }
        }
      }
    }

    onContinue();
  };

  // Build class names
  const classNames = [
    'booking-details',
    theme ? `booking-details--${theme}` : '',
  ].filter(Boolean).join(' ');

  // Render field based on type
  const renderField = (field, overrideProps = {}) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'number':
      case 'date':
      case 'time':
        {
          const minAdvanceDays = 5;
          let minStr = undefined;
          if (field.type === 'date') {
            minStr = dayjs().add(minAdvanceDays, 'day').format('YYYY-MM-DD');
          }
          return (
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              className={`booking-details__input ${field.readOnly ? 'booking-details__input--readonly' : ''}`}
              placeholder={field.placeholder || ''}
              value={formData[field.name] || ''}
              onChange={handleChange}
              required={field.required}
              min={overrideProps.min || field.min || minStr}
              max={overrideProps.max || field.max}
              readOnly={field.readOnly}
            />
          );
        }

      case 'select':
        return (
          <select
            id={field.name}
            name={field.name}
            className="booking-details__select"
            value={formData[field.name] || ''}
            onChange={handleChange}
            required={field.required}
          >
            <option value="">{field.placeholder || 'Select an option'}</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            id={field.name}
            name={field.name}
            className="booking-details__textarea"
            placeholder={field.placeholder || ''}
            value={formData[field.name] || ''}
            onChange={handleChange}
            required={field.required}
            rows={field.rows || 4}
          />
        );

      case 'radio':
        return (
          <div className="booking-details__radio-group">
            {field.options?.map((option) => (
              <label key={option.value} className="booking-details__radio-option">
                <input
                  type="radio"
                  name={field.name}
                  value={option.value}
                  checked={formData[field.name] === option.value}
                  onChange={handleChange}
                  required={field.required}
                />
                <div className="booking-details__radio-content">
                  <strong>{option.label}</strong>
                  {option.description && <p>{option.description}</p>}
                </div>
              </label>
            ))}
          </div>
        );

      case 'checkbox-group':
        return (
          <div className="booking-details__checkbox-group">
            {field.options?.map((option) => (
              <label key={option.value} className="booking-details__checkbox-option">
                <input
                  type="checkbox"
                  name={field.name}
                  value={option.value}
                  checked={(formData[field.name] || []).includes(option.value)}
                  onChange={(e) =>
                    handleCheckboxArrayChange(field.name, option.value, e.target.checked)
                  }
                />
                <span className="booking-details__checkbox-custom"></span>
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox-cards':
        return (
          <div className="booking-details__checkbox-cards">
            {field.options?.map((option) => (
              <label key={option.value} className="booking-details__checkbox-card">
                <input
                  type="checkbox"
                  name={field.name}
                  value={option.value}
                  checked={(formData[field.name] || []).includes(option.value)}
                  onChange={(e) =>
                    handleCheckboxArrayChange(field.name, option.value, e.target.checked)
                  }
                />
                <span className="booking-details__checkbox-card-box"></span>
                <span className="booking-details__checkbox-card-text">{option.label}</span>
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  // Section icons
  const sectionIcons = {
    user: (<FaUser size={20} />),
    heart: (<FaHeartbeat size={20} />),
    calendar: (<FaCalendarAlt size={20} />),
    location: (<FaLocationDot size={20} />),
    car: (<FaCar size={20} />),
    medical: (<FaBookMedical size={20} />),
    additional: (<FaPlusSquare size={20} />),
    star: (<FaStar size={20} />),
    home: (<FaHome size={20} />),
    companion: (<FaUserGroup size={20} />),
    list: (<FaListCheck size={20} />),
  };

  return (
    <div className={classNames}>
      {/* Section Title */}
      <h2 className="booking-details__title">{title}</h2>

      {/* Form Sections */}
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="booking-details__section">
          <h3 className="booking-details__section-title">
            {sectionIcons[section.icon] || sectionIcons.clipboard}
            {section.title}
          </h3>

          {/* Section Description */}
          {section.description && (
            <p className="booking-details__section-description">{section.description}</p>
          )}

          {/* Care Recipient Section - Use CareRecipientSelector */}
          {section.isCareRecipient ? (
            <CareRecipientSelector
              formData={formData}
              onFormChange={onFormChange}
              theme={theme}
            />
          ) : section.isDialysisSchedule ? (
            <>
              {/* First field - Select Dialysis Treatment Dates with MultiDatePicker */}
              <div className="booking-details__grid booking-details__grid--single">
                <div className="booking-details__field booking-details__field--full">
                  <label htmlFor={section.fields[0].name} className="booking-details__label">
                    {section.fields[0].label} {section.fields[0].required && '*'}
                  </label>
                  <MultiDatePicker
                    name={section.fields[0].name}
                    placeholder={section.fields[0].placeholder}
                    selectedDates={formData.treatment_dates || []}
                    onChange={(dates) => onFormChange({ ...formData, treatment_dates: dates })}
                    maxDates={getDialysisSessionInfo().maxSessions}
                    minDaysAdvance={5}
                  />
                  {section.fields[0].help && <small className="booking-details__help">{section.fields[0].help}</small>}
                </div>
              </div>

              {/* Dialysis Info - after date selection */}
              <div className="booking-details__dialysis-info">
                <p className="booking-details__dialysis-info-text">
                  If you&apos;re unsure of the remaining dates, you may plan or book them later with our representative.
                </p>
                <p className="booking-details__dialysis-selected">
                  Selected dates: {getSelectedDatesCount()}/{getDialysisSessionInfo().maxSessions} sessions
                </p>
                <p className="booking-details__dialysis-hint">
                  {getDialysisSessionInfo().hoursText}
                </p>
              </div>

              {/* Remaining fields - Treatment Start Time and Typical Session Duration */}
              <div className="booking-details__grid">
                {section.fields.slice(1).map((field, fieldIndex) => (
                  <div
                    key={fieldIndex}
                    className={`booking-details__field ${field.fullWidth ? 'booking-details__field--full' : ''}`}
                  >
                    <label htmlFor={field.name} className="booking-details__label">
                      {field.label} {field.required && '*'}
                    </label>
                    {renderField(field)}
                    {field.help && <small className="booking-details__help">{field.help}</small>}
                  </div>
                ))}
              </div>
            </>
          ) : section.isActivitySchedule ? (
            <>
              {/* First field - Select Activity Dates with MultiDatePicker */}
              <div className="booking-details__grid booking-details__grid--single">
                <div className="booking-details__field booking-details__field--full">
                  <label htmlFor={section.fields[0].name} className="booking-details__label">
                    {section.fields[0].label} {section.fields[0].required && '*'}
                  </label>
                  <MultiDatePicker
                    name={section.fields[0].name}
                    placeholder={section.fields[0].placeholder}
                    selectedDates={formData.activity_dates || []}
                    onChange={(dates) => onFormChange({ ...formData, activity_dates: dates })}
                    maxDates={getActivitySessionInfo().maxSessions}
                    minDaysAdvance={5}
                    theme="amber"
                  />
                  {section.fields[0].help && <small className="booking-details__help">{section.fields[0].help}</small>}
                </div>
              </div>

              {/* Activity Info - after date selection */}
              <div className="booking-details__activity-info">
                <p className="booking-details__activity-info-text">
                  If you&apos;re unsure of the remaining dates, you may plan or book them later with our representative.
                </p>
                <p className="booking-details__activity-selected">
                  Selected dates: {getSelectedActivityDatesCount()}/{getActivitySessionInfo().maxSessions} sessions
                </p>
                <p className="booking-details__activity-hint">
                  {getActivitySessionInfo().hoursText}
                </p>
              </div>

              {/* 30-Day Validity Warning */}
              <div className="booking-details__validity-warning">
                <h4 className="booking-details__validity-warning-title">
                <FaExclamationTriangle size={20} />
                  Important: Validity Period
                </h4>
                <p>
                  <strong>All unused hours are only valid for 30 days after booking.</strong> Please plan your activity dates within this period to avoid forfeiture of unused hours.
                </p>
              </div>

              {/* Remaining fields - Preferred Start Time and Estimated Activity Duration */}
              <div className="booking-details__grid">
                {section.fields.slice(1).map((field, fieldIndex) => (
                  <div
                    key={fieldIndex}
                    className={`booking-details__field ${field.fullWidth ? 'booking-details__field--full' : ''}`}
                  >
                    <label htmlFor={field.name} className="booking-details__label">
                      {field.label} {field.required && '*'}
                    </label>
                    {renderField(field)}
                    {field.help && <small className="booking-details__help">{field.help}</small>}
                  </div>
                ))}
              </div>
            </>
          ) : section.isHomeSchedule ? (
            <>
              {/* First field - Select Multiple Care Dates with MultiDatePicker */}
              <div className="booking-details__grid booking-details__grid--single">
                <div className="booking-details__field booking-details__field--full">
                  <label htmlFor={section.fields[0].name} className="booking-details__label">
                    {section.fields[0].label} {section.fields[0].required && '*'}
                  </label>
                  <MultiDatePicker
                    name={section.fields[0].name}
                    placeholder={section.fields[0].placeholder}
                    selectedDates={formData.care_dates || []}
                    onChange={(dates) => {
                      // Sort dates and set service_start_date to the earliest date
                      const sortedDates = [...dates].sort();
                      const firstDate = sortedDates.length > 0 ? sortedDates[0] : '';
                      onFormChange({ 
                        ...formData, 
                        care_dates: dates,
                        service_start_date: firstDate,
                      });
                    }}
                    maxDates={20}
                    minDaysAdvance={5}
                    theme="green"
                  />
                  {section.fields[0].help && <small className="booking-details__help">{section.fields[0].help}</small>}
                </div>
              </div>

              {/* Home Care Info - after date selection */}
              <div className="booking-details__home-info">
                <p className="booking-details__home-info-text">
                  If you&apos;re unsure of the remaining dates, you may plan or book them later with our representative.
                </p>
                <p className="booking-details__home-selected">
                  Selected dates: {getSelectedCareDatesCount()}/20
                </p>
              </div>

              {/* Remaining fields - Start Time, End Time, Service Start Date, Service End Date */}
              <div className="booking-details__grid">
                {section.fields.slice(1).map((field, fieldIndex) => {
                  // Calculate min date (5 days from today) for service_start_date
                  let minDate = undefined;
                  let maxDate = undefined;
                  
                  if (field.name === 'service_start_date') {
                    minDate = dayjs().add(5, 'day').format('YYYY-MM-DD');
                  }
                  
                  // Calculate min/max date for service_end_date
                  if (field.name === 'service_end_date' && formData.service_start_date) {
                    const startDate = dayjs(formData.service_start_date);
                    minDate = startDate.format('YYYY-MM-DD');
                    maxDate = startDate.add(90, 'day').format('YYYY-MM-DD');
                  }
                  
                  return (
                    <div
                      key={fieldIndex}
                      className={`booking-details__field ${field.fullWidth ? 'booking-details__field--full' : ''}`}
                    >
                      <label htmlFor={field.name} className="booking-details__label">
                        {field.label} {field.required && '*'}
                      </label>
                      {renderField(field, { max: maxDate, min: minDate })}
                      {field.help && <small className="booking-details__help">{field.help}</small>}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            /* Normal Fields Grid */
            <div className={`booking-details__grid ${section.gridCols === 1 ? 'booking-details__grid--single' : ''}`}>
              {section.fields.map((field, fieldIndex) => (
                <div
                  key={fieldIndex}
                  className={`booking-details__field ${field.fullWidth ? 'booking-details__field--full' : ''}`}
                >
                  <label htmlFor={field.name} className="booking-details__label">
                    {field.label} {field.required && '*'}
                  </label>
                  {renderField(field)}
                  {field.help && <small className="booking-details__help">{field.help}</small>}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Actions */}
      <div className="booking-details__actions">
        <button type="button" className="btn btn--outline btn--large" onClick={onBack}>
        <FaArrowLeft size={16} />
          Previous
        </button>
        <button type="button" className="btn btn--primary btn--large" onClick={handleContinue}>
          {theme === 'health' ? 'Review & Pay' : 'Review Booking'}
          <FaArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
