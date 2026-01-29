import BlogGrid from "@/components/blog/BlogGrid";
import BlogHero from "@/components/blog/BlogHero";
import StatsHighlight from "@/components/blog/StatsHighlight";
import MainLayout from "@/components/layout/MainLayout";
import Head from "next/head";
import { useState } from "react";

export default function Blog() {
    const [language, setLanguage] = useState('en');

    return (
        <MainLayout>
            <Head>
                <title>Elderly Care Malaysia Blog - Penjagaan Warga Emas</title>
            </Head>
            <section className="home">
                <BlogHero onLanguageChange={setLanguage} />
                <div className="container">
                    <StatsHighlight language={language} />
                    <BlogGrid language={language} />
                </div>
            </section>
        </MainLayout>
    )
};
