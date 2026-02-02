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
          <div className="container">
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
                  onSubmit={async (payload) => {
                    try {
                      const result = await apiClient.booking.submit(
                        payload,
                        "homePackage",
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
