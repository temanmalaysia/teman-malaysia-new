import MainLayout from "@/components/layout/MainLayout";
import BookingHero from "@/components/booking/ServicesHero";
import ServicesGrid from "@/components/booking/ServicesGrid";
import QuickContact from "@/components/booking/QuickContact";
import WhyChooseUs from "@/components/booking/WhyChooseUs";
import Head from "next/head";

export default function Booking() {
    return (
        <MainLayout>
            <Head>
                <title>Book Service - Teman Malaysia</title>
            </Head>
            <main className="home">
                <BookingHero />
                <ServicesGrid />
                <QuickContact />
                <WhyChooseUs />
            </main>
        </MainLayout>
    )
};
