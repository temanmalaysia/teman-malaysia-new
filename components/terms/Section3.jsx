import { TermsArticle, TermsSubsection } from './TermsArticle';

export default function Section3() {
  return (
    <TermsArticle sectionNumber="3.0" title="Refund">
      <TermsSubsection number="3.1">
        <p>
          Any service cancellation must be submitted in writing at least seven (7) 
          days prior to the scheduled service date. In such cases, the Company will 
          refund eighty percent (80%) of the total amount paid. The remaining twenty 
          percent (20%) will be retained to cover administrative and processing costs 
          already incurred.
        </p>
      </TermsSubsection>

      <TermsSubsection number="3.2">
        <p>
          For payments made via credit card, an additional three percent (3%) will be 
          deducted from the refundable amount. This deduction reflects the 
          non-refundable processing fee imposed by our payment gateway provider.
        </p>
      </TermsSubsection>

      <TermsSubsection number="3.3">
        <p>
          Refunds will be processed within ten (10) to fourteen (14) working days 
          from the date of cancellation approval. The actual processing time may vary 
          depending on your financial institution.
        </p>
      </TermsSubsection>

      <TermsSubsection number="3.4">
        <p>
          The Company reserves the right to cancel any transaction in order to comply 
          with applicable regulations, including but not limited to those set by 
          credit card networks, financial institutions, payment processors (including 
          FPX), legal requirements, intellectual property laws, court orders, or 
          directives from law enforcement agencies.
        </p>
      </TermsSubsection>

      <TermsSubsection number="3.5">
        <p>
          Additionally, the Company may, at its sole discretion, cancel transactions 
          that are suspected to be fraudulent, unlawful, or in violation of our Terms 
          of Use, Privacy Policy, or policies on prohibited items.
        </p>
      </TermsSubsection>
    </TermsArticle>
  );
};