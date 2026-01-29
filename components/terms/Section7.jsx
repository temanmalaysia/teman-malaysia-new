import { TermsArticle, TermsSubsection } from './TermsArticle';

export default function Section7() {
  return (
    <TermsArticle sectionNumber="7.0" title="Confidentiality">
      <TermsSubsection number="7.1">
        <p>
          You shall maintain in confidence all information and data relating to the 
          Company, its Services, products, business affairs, marketing, and promotion 
          plans or other operations and its associated companies which are disclosed 
          to you by or on behalf of the Company (whether orally or in writing and 
          whether before, on or after the date of this agreement) or which are 
          otherwise directly or indirectly acquired by you from the Company, or any 
          of its affiliated companies, or created in the course of this Agreement. 
          You shall not without the Company&apos;s prior written consent, disclose such 
          information to any third-party nor use it for any other purpose.
        </p>
      </TermsSubsection>

      <TermsSubsection number="7.2">
        <p>
          The above obligations of confidentiality shall not apply to the extent that 
          you can show that the relevant information:
        </p>
        <ul>
          <li>was at the time of receipt already in your possession</li>
          <li>
            is, or becomes in the future, public knowledge through no fault or 
            omission of you;
          </li>
          <li>was received from a third-party having the right to disclose it; or</li>
          <li>is required to be disclosed by law.</li>
        </ul>
      </TermsSubsection>
    </TermsArticle>
  );
};