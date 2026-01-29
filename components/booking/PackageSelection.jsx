/**
 * PackageSelection Component (Unified)
 * 
 * @param {string} theme - Theme variant: 'health' | 'dialysis' | 'customActivities' | 'homePackage'
 * @param {string} title - Section title
 * @param {Array} packages - Array of package options
 * @param {Array} hoursOptions - Array of hours options for hourly package
 * @param {Object} addonConfig - Configuration for add-on section (optional, used by dialysis)
 * @param {Array} additionalInfo - Array of additional info strings
 * @param {string} selectedPackage - Currently selected package value
 * @param {function} onPackageChange - Callback when package changes
 * @param {string} selectedHours - Currently selected hours value
 * @param {function} onHoursChange - Callback when hours change
 * @param {boolean} addonSelected - Whether add-on is selected
 * @param {function} onAddonChange - Callback when add-on changes
 * @param {string} addonHours - Currently selected add-on hours value
 * @param {function} onAddonHoursChange - Callback when add-on hours change
 * @param {function} onContinue - Callback when continue button is clicked
 */

import { FiCheck, FiPlusCircle, FiArrowRight } from 'react-icons/fi';

export default function PackageSelection({ 
  theme = 'health',
  title = 'Choose Your Package',
  packages = [],
  hoursOptions = [],
  addonConfig = null,
  additionalInfo = [],
  selectedPackage, 
  onPackageChange, 
  selectedHours, 
  onHoursChange,
  addonSelected = false,
  onAddonChange,
  addonHours = '',
  onAddonHoursChange,
  onContinue 
}) {

  const handlePackageChange = (value) => {
    onPackageChange(value);
    // Reset hours when switching away from hourly package
    const selectedPkg = packages.find(p => p.value === value);
    if (!selectedPkg?.hasHoursSelection) {
      onHoursChange('');
    }
  };

  const handleContinue = () => {
    // Validation
    if (!selectedPackage) {
      alert('Please select a package before continuing.');
      return;
    }

    const selectedPkg = packages.find(p => p.value === selectedPackage);
    if (selectedPkg?.hasHoursSelection && !selectedHours) {
      alert('Please select the number of hours.');
      return;
    }

    if (addonConfig && addonSelected && !addonHours) {
      alert('Please select the add-on duration.');
      return;
    }

    onContinue();
  };

  // Build class names
  const classNames = [
    'package-selection',
    theme ? `package-selection--${theme}` : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames}>
      {/* Section Title */}
      <h2 className="package-selection__title">{title}</h2>

      {/* Package Options */}
      <div className="package-selection__options">
        {packages.map((pkg) => (
          <label 
            key={pkg.id} 
            className={`package-selection__card ${selectedPackage === pkg.value ? 'selected' : ''}`}
          >
            <input
              type="radio"
              name="package"
              value={pkg.value}
              checked={selectedPackage === pkg.value}
              onChange={() => handlePackageChange(pkg.value)}
            />
            <div className="package-selection__card-content">
              <div className="package-selection__card-header">
                <span className="package-selection__card-title">{pkg.title}</span>
                <span className="package-selection__card-price">
                  {pkg.price}
                  {pkg.priceNote && <small>{pkg.priceNote}</small>}
                </span>
              </div>
              <p className="package-selection__card-description">{pkg.description}</p>
              
              {/* Package Includes (for home packages) */}
              {pkg.packageIncludes && pkg.packageIncludes.length > 0 && (
                <div className="package-selection__includes">
                  <span className="package-selection__includes-title">Package include:</span>
                  <div className="package-selection__includes-list">
                    {pkg.packageIncludes.map((item, index) => (
                      <span key={index} className="package-selection__includes-item">
                        <FiCheck size={14} />
                        {item.label}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Hours Selection (for hourly packages) */}
              {pkg.hasHoursSelection && selectedPackage === pkg.value && (
                <div className="package-selection__hours">
                  <label className="package-selection__hours-label">
                    Number of Hours: *
                  </label>
                  <select
                    value={selectedHours}
                    onChange={(e) => onHoursChange(e.target.value)}
                    className="package-selection__hours-select"
                  >
                    <option value="">Select hours</option>
                    {hoursOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                    <option value="" disabled>More than 6 hours (Contact us)</option>
                  </select>
                </div>
              )}
            </div>
          </label>
        ))}
      </div>

      {/* Add-on Section (Optional - for Dialysis) */}
      {addonConfig && (
        <div className="package-selection__addon">
          <h3 className="package-selection__addon-title">
            <FiPlusCircle size={20} />
            {addonConfig.title}
          </h3>
          
          <label className={`package-selection__card ${addonSelected ? 'selected' : ''}`}>
            <input
              type="checkbox"
              checked={addonSelected}
              onChange={(e) => onAddonChange(e.target.checked)}
            />
            <div className="package-selection__card-content">
              <div className="package-selection__card-header">
                <span className="package-selection__card-title">{addonConfig.cardTitle}</span>
                <span className="package-selection__card-price">{addonConfig.price}</span>
              </div>
              <p className="package-selection__card-description">{addonConfig.description}</p>
              
              {/* Add-on Hours Selection */}
              {addonSelected && (
                <div className="package-selection__hours">
                  <label className="package-selection__hours-label">
                    {addonConfig.hoursLabel} *
                  </label>
                  <select
                    value={addonHours}
                    onChange={(e) => onAddonHoursChange(e.target.value)}
                    className="package-selection__hours-select"
                  >
                    <option value="">Select treatment duration</option>
                    {addonConfig.hoursOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Add-on Notes */}
              {addonConfig.notes && addonConfig.notes.length > 0 && (
                <div className="package-selection__addon-notes">
                  {addonConfig.notes.map((note, index) => (
                    <small key={index}>{note}</small>
                  ))}
                </div>
              )}
            </div>
          </label>
        </div>
      )}

      {/* Additional Information */}
      {additionalInfo.length > 0 && (
        <div className="package-selection__info">
          <h4 className="package-selection__info-title">
            {theme === 'dialysis' ? 'Additional Information:' : theme === "homePackage" ? 'Package Terms & Conditions:' : 'Additional Fees & Information:'}
          </h4>
          {additionalInfo.map((info, index) => (
            <small key={index}>{info}</small>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="package-selection__actions">
        <button
          type="button"
          className="btn btn--primary btn--large"
          onClick={handleContinue}
        >
          Continue to Details
          <FiArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
