import { PrivacyArticle, PrivacySubsection } from './PrivacyArticle';
import Link from 'next/link';

export default function Section1() {
  return (
    <PrivacyArticle sectionNumber="1.0" title="Personal Information We Collect">
      <p>
        When you visit the Site, we automatically collect certain information about 
        your device, including information about your web browser, IP address, time 
        zone, and some of the cookies that are installed on your device. Additionally, 
        as you browse the Site, we collect information about the individual web pages 
        or products that you view, what websites or search terms referred you to the 
        Site and information about how you interact with the Site. We refer to this 
        automatically-collected information as &quot;Device Information.&quot;
      </p>

      <PrivacySubsection number="1.1 Device Information Collection Methods">
        <p>We collect Device Information using the following technologies:</p>
        <ul>
          <li>
            <strong>&quot;Cookies&quot;</strong> are data files that are placed on your device 
            or computer and often include an anonymous unique identifier. For more 
            information about cookies, and how to disable cookies, visit{' '}
            <Link href="http://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer">
              http://www.allaboutcookies.org
            </Link>.
          </li>
          <li>
            <strong>&quot;Log files&quot;</strong> track actions occurring on the Site, and 
            collect data including your IP address, browser type, Internet service 
            provider, referring/exit pages, and date/time stamps.
          </li>
          <li>
            <strong>&quot;Web beacons,&quot; &quot;tags,&quot; and &quot;pixels&quot;</strong> are electronic files 
            used to record information about how you browse the Site.
          </li>
        </ul>
      </PrivacySubsection>

      <PrivacySubsection number="1.2 Order Information">
        <p>
          Additionally, when you make a purchase or attempt to make a purchase through 
          the Site, we collect certain information from you, including your name, 
          billing address, shipping address, payment information (including credit card 
          numbers), email address, and phone number. We refer to this information as 
          &quot;Order Information.&quot;
        </p>
        <p>
          When we talk about &quot;Personal Information&quot; in this Privacy Policy, we are 
          talking both about Device Information and Order Information.
        </p>
      </PrivacySubsection>
    </PrivacyArticle>
  );
};
