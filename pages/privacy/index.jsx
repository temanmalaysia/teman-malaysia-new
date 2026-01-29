import MainLayout from "@/components/layout/MainLayout";
import Link from 'next/link';
import Section1 from "@/components/privacy/Section1";
import Section2 from "@/components/privacy/Section2";
import Section3 from "@/components/privacy/Section3";
import Section4 from "@/components/privacy/Section4";
import Section5 from "@/components/privacy/Section5";
import Section6 from "@/components/privacy/Section6";
import Section7 from "@/components/privacy/Section7";
import Section8 from "@/components/privacy/Section8";
import Section9 from "@/components/privacy/Section9";
import Section10 from "@/components/privacy/Section10";
import Head from "next/head";

export default function Privacy({ lastUpdated = "9 March 2021" }) {
  return (
    <MainLayout>
      <Head>
        <title>Privacy Policy - Teman Malaysia</title>
      </Head>
      <section className="privacy-section">
        <div className="container">
          {/* Privacy Header */}
          <div className="privacy-header">
            <h1 className="privacy-header__title">Privacy Policy</h1>
            <div className="privacy-header__date">
              Last Updated: {lastUpdated}
            </div>
          </div>

          {/* Company Info */}
          <div className="company-info">
            <p>
              <strong>TEMAN MY VENTURES PLT</strong>
              <br />
              Company No.: LLP0025510-LGN
              <br />
              Registered Address: Level 1 & 2, Tower 3, Avenue 7 Horizon 2
              Bangsar South City, Bangsar South, 59200 Kuala Lumpur
            </p>
          </div>

          {/* Intro */}
          <div className="privacy-content">
            <p>
              This Privacy Policy describes how your personal information is
              collected, used, and shared when you visit or make a purchase from{" "}
              <Link
                href="https://www.temanmalaysia.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://www.temanmalaysia.com
              </Link>{" "}
              (the &quot;Site&quot;).
            </p>
          </div>

          <Section1 />
          <Section2 />
          <Section3 />
          <Section4 />
          <Section5 />
          <Section6 />
          <Section7 />
          <Section8 />
          <Section9 />
          <Section10 />

          {/* Signature */}
          <div className="privacy-signature">
            <p>
              <strong>{lastUpdated}</strong>
            </p>
            <p>
              <strong>TEMAN MY VENTURES PLT</strong>
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
