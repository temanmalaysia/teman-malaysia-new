import { PrivacyArticle } from './PrivacyArticle';
import Link from 'next/link';

export default function Section3() {
  return (
    <PrivacyArticle sectionNumber="3.0" title="Sharing Your Personal Information">
      <p>
        We share your Personal Information with third parties to help us use your 
        Personal Information, as described above. For example, we use WordPress to 
        power our Site–you can read more about how WordPress uses your Personal 
        Information here:{' '}
        <Link href="https://wordpress.org/about/privacy/" target="_blank" rel="noopener noreferrer">
          https://wordpress.org/about/privacy/
        </Link>.
      </p>

      <p>
        We also use Google Analytics to help us understand how our customers use the 
        Site–you can read more about how Google uses your Personal Information here:{' '}
        <Link href="https://www.google.com/intl/en/policies/privacy/" target="_blank" rel="noopener noreferrer">
          https://www.google.com/intl/en/policies/privacy/
        </Link>. You can also opt-out of Google Analytics here:{' '}
        <Link href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
          https://tools.google.com/dlpage/gaoptout
        </Link>.
      </p>

      <p>
        Finally, we may also share your Personal Information to comply with applicable 
        laws and regulations, to respond to a subpoena, search warrant, or other lawful 
        requests for information we receive, or to otherwise protect our rights.
      </p>
    </PrivacyArticle>
  );
};
