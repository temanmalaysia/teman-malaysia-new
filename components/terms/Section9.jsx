import { TermsArticle, TermsSubsection } from './TermsArticle';
import Link from 'next/link';

export default function Section9() {
  return (
    <TermsArticle sectionNumber="9.0" title="Independent Interactions">
      <TermsSubsection number="9.1">
        <p>
          During use of the Service, you may enter into correspondence with, purchase 
          goods and/or services from, or participate in promotions of independent 
          providers, advertisers, or sponsors showing their goods and/or services 
          through the Service, the Website, the Software, and/or the Application. Any 
          such activity, and any terms, conditions, warranties, or representations 
          associated with such activity, is solely between you and the applicable 
          third-party.
        </p>
      </TermsSubsection>

      <TermsSubsection number="9.2">
        <p>
          The Company and its licensors shall have no liability, obligation, or 
          responsibility for any such correspondence, purchase, transaction, or 
          promotion between you and any such third-party. The Group does not endorse 
          any applications or sites on the Internet that are linked through the 
          Service, the Website, the Application, and/or the Software, and in no event, 
          shall the Company, its licensors, or the Group be responsible for any 
          content, products, services or other materials on or available from such 
          sites or independent providers. The Company provides the Service to you 
          pursuant to the Terms of Use. You recognize, however, that certain 
          independent providers of elderly care, goods, and/or services may require 
          your agreement to additional or different terms of Use prior to your use of 
          or access to such goods or services, and the Company is not a party to and 
          disclaims any and all responsibility and/or liability arising from such 
          agreements between you and the independent providers.
        </p>
      </TermsSubsection>

      <TermsSubsection number="9.3">
        <p>
          The Company may rely on independent advertising and marketing supplied 
          through the Service and other mechanisms to subsidize the Service and/or to 
          earn additional revenue. By agreeing to the Terms of Use you agree to 
          receive such advertising and marketing. If you do not want to receive such 
          advertising, you should notify us in writing or in accordance with the 
          procedure determined by the Company. The Company reserves the right to 
          charge you a higher fee for or deny you use of the Service should you choose 
          not to receive these advertising services. This higher fee, if applicable, 
          will be posted on the Company&apos;s website located at{' '}
          <Link href="https://www.temanmalaysia.com" target="_blank" rel="noopener noreferrer">
            https://www.temanmalaysia.com
          </Link>
          . You agree and allow the Company to compile and release information 
          regarding you and your use of the Service on an anonymous basis as part of a 
          customer profile or similar report or analysis. You agree that it is your 
          responsibility to take all precautions in all actions and interactions with 
          any independent elderly care provider, other independent providers, 
          advertisers, and/or sponsors you interact with through the Service and/or 
          advertising or marketing material supplied through the Service.
        </p>
      </TermsSubsection>
    </TermsArticle>
  );
};
