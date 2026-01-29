import CareersCoreValues from "@/components/careers/CareersCoreValue";
import CareersHero from "@/components/careers/CareersHero";
import CareersMission from "@/components/careers/CareersMission";
import CareersReadyToJoin from "@/components/careers/CareersReadyToJoin";
import CareersWhatWeOffer from "@/components/careers/CareersWhatWeOffer";
import CareersWhyJoin from "@/components/careers/CareersWhyJoin";
import CareersWorkCulture from "@/components/careers/CareersWorkCulture";
import MainLayout from "@/components/layout/MainLayout";
import Head from "next/head";

export default function Careers() {
    return (
        <MainLayout>
            <Head>
                <title>Careers - Teman Malaysia</title>
            </Head>
            <section className="home">
                <CareersHero/>
                <CareersMission/>
                <CareersWhyJoin/>
                <CareersWhatWeOffer/>
                <CareersWorkCulture/>
                <CareersCoreValues />
                <CareersReadyToJoin />
            </section>
        </MainLayout>
    )
};
