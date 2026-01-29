import { FaCheck } from 'react-icons/fa';

const getDefaultSteps = (theme) => [
  { step: 1, label: 'Package' },
  { step: 2, label: 'Details' },
  { step: 3, label: theme === 'health' ? 'Payment' : 'Confirm' },
];

export default function ProgressSteps({ 
  currentStep = 1, 
  theme = 'health',
  steps = null 
}) {
  const stepsData = steps || getDefaultSteps(theme);
  const getStepStatus = (step) => {
    if (step < currentStep) return 'completed';
    if (step === currentStep) return 'active';
    return '';
  };

  const classNames = [
    'progress-steps',
    theme ? `progress-steps--${theme}` : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={classNames} id="progressSteps">
      {stepsData.map((step) => (
        <div
          key={step.step}
          className={`progress-steps__step ${getStepStatus(step.step)}`}
          data-step={step.step}
        >
          <div className="progress-steps__number">
            {getStepStatus(step.step) === 'completed' ? (
              <FaCheck size={20} />
            ) : (
              step.step
            )}
          </div>
          <div className="progress-steps__label">{step.label}</div>
        </div>
      ))}
    </div>
  );
};
