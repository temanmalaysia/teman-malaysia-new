import BookingDetails from "@/components/booking/BookingDetails";
import BookingDetailsData from "@/components/booking/BookingDetailsData";
import BookingHero from "@/components/booking/BookingHero";
import BookingHeroData from "@/components/booking/BookingHeroData";
import BookingSummary from "@/components/booking/BookingSummary";
import { bookingSummaryData } from "@/components/booking/BookingSummaryData";
import packageData from "@/components/booking/PackageData";
import PackageSelection from "@/components/booking/PackageSelection";
import ProgressSteps from "@/components/booking/ProgressSteps";
import MainLayout from "@/components/layout/MainLayout";
import useBookingForm from "@/hooks/useBookingForm";

export default function CustomActivities() {
  const {
    currentStep,
    selectedPackage,
    selectedHours,
    formData,
    setSelectedPackage,
    setSelectedHours,
    setFormData,
    handleContinue,
    handleBack,
  } = useBookingForm();

  return (
    <MainLayout>
      <main className="home">
        <BookingHero {...BookingHeroData.customActivities} />
        <section className="booking-form-section">
        <div className="booking-form-container">
          <ProgressSteps currentStep={currentStep} theme="customActivities" />
          {currentStep === 1 && (
            <PackageSelection
              theme="customActivities"
              {...packageData.customActivities}
              selectedPackage={selectedPackage}
              onPackageChange={setSelectedPackage}
              selectedHours={selectedHours}
              onHoursChange={setSelectedHours}
              onContinue={handleContinue}
            />
          )}
          {currentStep === 2 && (
            <BookingDetails
              theme="customActivities"
              {...BookingDetailsData.customActivities}
              formData={formData}
              onFormChange={setFormData}
              selectedHours={selectedHours}
              onContinue={handleContinue}
              onBack={handleBack}
            />
          )}
          {currentStep === 3 && (
            <BookingSummary
              theme="customActivities"
              title={bookingSummaryData.customActivities.title}
              sections={bookingSummaryData.customActivities.sections}
              formData={formData}
              selectedPackage={selectedPackage}
              selectedHours={selectedHours}
              onBack={handleBack}
            />
          )}
        </div>
        </section>
      </main>
    </MainLayout>
  );
}
