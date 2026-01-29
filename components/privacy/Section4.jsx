import { PrivacyArticle, PrivacySubsection } from './PrivacyArticle';
import Link from 'next/link';

export default function Section4() {
  return (
    <PrivacyArticle sectionNumber="4.0" title="Behavioural Advertising">
      <p>
        As described above, we use your Personal Information to provide you with 
        targeted advertisements or marketing communications we believe may be of 
        interest to you. For more information about how targeted advertising works, 
        you can visit the Network Advertising Initiative&apos;s (&quot;NAI&quot;) educational page at{' '}
        <Link 
          href="http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          http://www.networkadvertising.org/understanding-online-advertising/how-does-it-work
        </Link>.
      </p>

      <PrivacySubsection number="4.1 Opt-Out Options">
        <p>You can opt-out of targeted advertising by:</p>
        <ul className="link-list">
          <li>
            <strong>FACEBOOK</strong> –{' '}
            <Link href="https://www.facebook.com/settings/?tab=ads" target="_blank" rel="noopener noreferrer">
              https://www.facebook.com/settings/?tab=ads
            </Link>
          </li>
          <li>
            <strong>GOOGLE</strong> –{' '}
            <Link href="https://www.google.com/settings/ads/anonymous" target="_blank" rel="noopener noreferrer">
              https://www.google.com/settings/ads/anonymous
            </Link>
          </li>
          <li>
            <strong>BING</strong> –{' '}
            <Link href="https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads" target="_blank" rel="noopener noreferrer">
              https://advertise.bingads.microsoft.com/en-us/resources/policies/personalized-ads
            </Link>
          </li>
        </ul>
        <p>
          Additionally, you can opt-out of some of these services by visiting the 
          Digital Advertising Alliance&apos;s opt-out portal at:{' '}
          <Link href="http://optout.aboutads.info/" target="_blank" rel="noopener noreferrer">
            http://optout.aboutads.info/
          </Link>.
        </p>
      </PrivacySubsection>
    </PrivacyArticle>
  );
};
