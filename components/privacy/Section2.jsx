import { PrivacyArticle, PrivacySubsection } from './PrivacyArticle';

export default function Section2() {
  return (
    <PrivacyArticle sectionNumber="2.0" title="How Do We Use Your Personal Information?">
      <PrivacySubsection number="2.1 Use of Order Information">
        <p>
          We use the Order Information that we collect generally to fulfill any orders 
          placed through the Site (including processing your payment information, 
          arranging for services, and providing you with invoices and/or order 
          confirmations). Additionally, we use this Order Information to:
        </p>
        <ul>
          <li>Communicate with you;</li>
          <li>Screen our orders for potential risk or fraud; and</li>
          <li>
            When in line with the preferences you have shared with us, provide you 
            with information or advertising relating to our products or services.
          </li>
        </ul>
      </PrivacySubsection>

      <PrivacySubsection number="2.2 Use of Device Information">
        <p>
          We use the Device Information that we collect to help us screen for potential 
          risk and fraud (in particular, your IP address), and more generally to improve 
          and optimize our Site (for example, by generating analytics about how our 
          customers browse and interact with the Site, and to assess the success of our 
          marketing and advertising campaigns).
        </p>
        <p>
          We also use the Device Information that we collect to help us to do advertising 
          and retargeting marketing campaign.
        </p>
      </PrivacySubsection>
    </PrivacyArticle>
  );
};