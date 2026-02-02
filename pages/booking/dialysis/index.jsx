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
import apiClient from "@/api/apiClient";

export default function Dialysis() {
  const {
    currentStep,
    selectedPackage,
    selectedHours,
    formData,
    addonSelected,
    addonHours,
    setSelectedPackage,
    setSelectedHours,
    setFormData,
    setAddonSelected,
    setAddonHours,
    handleContinue,
    handleBack,
  } = useBookingForm();

  return (
    <MainLayout>
      <main className="home">
        <BookingHero {...BookingHeroData.dialysis} />
        <section className="booking-form-section">
          <div className="container">
            <div className="booking-form-container">
              <ProgressSteps currentStep={currentStep} theme="dialysis" />
              {currentStep === 1 && (
                <PackageSelection
                  theme="dialysis"
                  title="Choose Your Package"
                  packages={packageData.dialysis.packages}
                  hoursOptions={packageData.dialysis.hoursOptions}
                  additionalInfo={packageData.dialysis.additionalInfo}
                  addonConfig={packageData.dialysis.addonConfig}
                  selectedPackage={selectedPackage}
                  onPackageChange={setSelectedPackage}
                  selectedHours={selectedHours}
                  onHoursChange={setSelectedHours}
                  addonSelected={addonSelected}
                  onAddonChange={setAddonSelected}
                  addonHours={addonHours}
                  onAddonHoursChange={setAddonHours}
                  onContinue={handleContinue}
                />
              )}
              {currentStep === 2 && (
                <BookingDetails
                  theme="dialysis"
                  {...BookingDetailsData.dialysis}
                  formData={formData}
                  onFormChange={setFormData}
                  selectedPackage={selectedPackage} // Make sure this is "3sessions" when multi-session is selected
                  selectedHours={selectedHours}
                  onContinue={handleContinue}
                  onBack={handleBack}
                />
              )}
              {currentStep === 3 && (
                <BookingSummary
                  theme="dialysis"
                  title={bookingSummaryData.dialysis.title}
                  sections={bookingSummaryData.dialysis.sections}
                  formData={formData}
                  selectedPackage={selectedPackage}
                  selectedHours={selectedHours}
                  addonSelected={addonSelected}
                  addonHours={addonHours}
                  onBack={handleBack}
                  onSubmit={async (payload) => {
                    try {
                      const result = await apiClient.booking.submit(
                        payload,
                        "dialysis",
                        {
                          sendEmail: true,
                          redirectToPayment: false,
                        },
                      );
                      return result;
                    } catch (error) {
                      console.error("Booking failed:", error);
                      throw error;
                    }
                  }}
                />
              )}
            </div>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}
