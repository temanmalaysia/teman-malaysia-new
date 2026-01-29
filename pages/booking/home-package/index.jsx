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

export default function HomePackage() {
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
        <BookingHero {...BookingHeroData.homePackage} />
        <section className="booking-form-section">
        <div className="booking-form-container">
          <ProgressSteps currentStep={currentStep} theme="homePackage" />
          {currentStep === 1 && (
            <PackageSelection
              theme="homePackage"
              {...packageData.homePackage}
              selectedPackage={selectedPackage}
              onPackageChange={setSelectedPackage}
              selectedHours={selectedHours}
              onHoursChange={setSelectedHours}
              onContinue={handleContinue}
            />
          )}
          {currentStep === 2 && (
            <BookingDetails
              theme="homePackage"
              {...BookingDetailsData.homePackage}
              formData={formData}
              onFormChange={setFormData}
              onContinue={handleContinue}
              onBack={handleBack}
            />
          )}
          {currentStep === 3 && (
            <BookingSummary
              theme="homePackage"
              title={bookingSummaryData.homePackage.title}
              sections={bookingSummaryData.homePackage.sections}
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
