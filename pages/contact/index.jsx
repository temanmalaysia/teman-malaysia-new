import ContactForm from "@/components/contact/ContactForm";
import ContactHero from "@/components/contact/ContactHero";
import TemanionApplication from "@/components/contact/TemanionApplication";
import MainLayout from "@/components/layout/MainLayout";
import Head from "next/head";

export default function Contact() {
    return (
        <MainLayout>
            <Head>
                <title>Contact Us - Teman Malaysia</title>
            </Head>
            <section className="home">
                <ContactHero />
                <TemanionApplication />
                <ContactForm />
            </section>
        </MainLayout>
    )
};
