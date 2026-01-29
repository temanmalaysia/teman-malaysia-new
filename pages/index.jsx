import About from "@/components/homepage/About";
import Hero from "@/components/homepage/Hero";
import News from "@/components/homepage/News";
import Promise from "@/components/homepage/Promise";
import Testimony from "@/components/homepage/Testimony";
import MainLayout from "@/components/layout/MainLayout";
import Head from "next/head";

export default function Home() {
  return (
    <MainLayout>
      <Head>
        <title>Teman Malaysia - Care Companion For Your Loved Ones</title>
      </Head>
      <main className="home">
        <Hero />
        <About />
        <Promise />
        <News />
        <Testimony />
      </main>
    </MainLayout>
  );
}
