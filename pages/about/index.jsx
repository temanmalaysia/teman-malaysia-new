import AboutHero from "@/components/about/AboutHero";
import AboutPurpose from "@/components/about/AboutPurpose";
import AboutVideo from "@/components/about/AboutVideo";
import Memories from "@/components/about/Memories";
import Services from "@/components/about/Services";
import Stats from "@/components/about/Stats";
import MainLayout from "@/components/layout/MainLayout";
import Head from "next/head";

export default function About() {
  return (
    <MainLayout>
      <Head>
        <title>Know More About Teman Malaysia</title>
      </Head>
      <main className="home">
        <AboutHero />
        <AboutVideo />
        <Services />
        <AboutPurpose />
        <Memories />
        <Stats />
      </main>
    </MainLayout>
  );
}
