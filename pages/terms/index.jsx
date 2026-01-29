import MainLayout from "@/components/layout/MainLayout";
import Section1 from "@/components/terms/Section1";
import Section10 from "@/components/terms/Section10";
import Section11 from "@/components/terms/Section11";
import Section12 from "@/components/terms/Section12";
import Section13 from "@/components/terms/Section13";
import Section14 from "@/components/terms/Section14";
import Section15 from "@/components/terms/Section15";
import Section16 from "@/components/terms/Section16";
import Section2 from "@/components/terms/Section2";
import Section3 from "@/components/terms/Section3";
import Section4 from "@/components/terms/Section4";
import Section5 from "@/components/terms/Section5";
import Section6 from "@/components/terms/Section6";
import Section7 from "@/components/terms/Section7";
import Section8 from "@/components/terms/Section8";
import Section9 from "@/components/terms/Section9";
import TermsIntro from "@/components/terms/TermsIntro";
import Head from "next/head";

export default function Terms() {
  return (
    <MainLayout>
      <Head>
        <title>Terms of Use - Teman Malaysia</title>
      </Head>
      <section className="terms-section">
        <div className="container">
          {/* Terms Header */}
          <div className="terms-header">
            <h1 className="terms-header__title">Term of Use</h1>
            <div className="terms-header__date">
              Last Updated: 2 January 2025
            </div>
          </div>

          {/* Important Notice */}
          <div className="important-notice">
            <p>
              <strong>IMPORTANT</strong> – By using the Service (as defined
              below), you are deemed to have read, understood, accepted, and
              agreed with the Terms of Use and the representations made by
              yourself below. If you do not agree or do not wish to continue
              using the Service, please do not continue using the Website,
              Application, Software, or Service (as defined below).
            </p>
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

          <TermsIntro />
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
          <Section11 />
          <Section12 />
          <Section13 />
          <Section14 />
          <Section15 />
          <Section16 />

          {/* Signature */}
          <div className="terms-signature">
            <p>
              <strong>2 January 2025</strong>
            </p>
            <p>
              <strong>Teman My Ventures PLT</strong>
            </p>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
