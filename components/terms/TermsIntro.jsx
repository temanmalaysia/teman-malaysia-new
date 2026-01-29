import Link from 'next/link';

export default function TermsIntro() {
  return (
    <div className="terms-content">
      <p>
        The Terms of Use stated herein (collectively, the &quot;Terms of Use&quot; or this 
        &quot;Agreement&quot;) constitute a legal agreement between you and TEMAN MY VENTURES 
        PLT (Company No.:LLP0025510-LGN) with its registered address at Level 1 & 2, 
        Tower 3, Avenue 7 Horizon 2 Bangsar South City, Bangsar South, 59200 Kuala 
        Lumpur (the &quot;Company&quot;).
      </p>

      <p>
        In order to use the Service, you must agree to the Terms of Use that are set 
        out below and the Company&apos;s operational policy as set out on the &quot;Frequently 
        Asked Questions&quot; page. By using the online platform (the &quot;Website&quot;), mobile 
        application supplied to you by the Company (the &quot;Application&quot;), and downloading, 
        installing, or using any associated software or communication channels supplied 
        by the Company (the &quot;Software&quot;) which overall purpose is to:
      </p>

      <ol>
        <li>
          enable persons seeking caring companion services to be matched with 
          independent third party care companion freelancer (care companion freelancer 
          also referred to as &quot;Temanion&quot; in the &quot;Frequently Asked Questions&quot; page)
        </li>
        <li>
          facilitate the collection and release of payments between persons seeking 
          the care companion services and the Temanion;
        </li>
        <li>
          facilitate the contact between persons seeking the Care Companion services 
          and the Temanion; and
        </li>
        <li>
          any other ancillary or related services (collectively the &quot;Service&quot;), you 
          hereby expressly acknowledge and agree to be bound by the Terms of Use, and 
          any future amendments and additions to the Terms of Use as published from 
          time to time at{' '}
          <Link href="https://www.temanmalaysia.com" target="_blank" rel="noopener noreferrer">
            https://www.temanmalaysia.com
          </Link>{' '}
          or through the Application.
        </li>
      </ol>

      <p>
        The Company reserves the right to modify, vary and change the Terms of Use or 
        its policies relating to the Service at any time as it deems fit. Such 
        modifications, variations, and or changes to the Terms of Use or its policies 
        relating to the Service shall be effective upon the posting of an updated 
        version at{' '}
        <Link href="https://www.temanmalaysia.com" target="_blank" rel="noopener noreferrer">
          https://www.temanmalaysia.com
        </Link>
        . You agree that it shall be your responsibility to review the Terms of Use 
        regularly and the continued use of the Service after any such changes, whether 
        or not reviewed by you, shall constitute your consent and acceptance to such 
        changes.
      </p>

      <p>
        The Company is a technology company that does not provide elderly care services 
        and the Company is not itself an elderly care companion service provider. The 
        Company acts solely as an online platform for you to connect with the Temanion 
        for the purposes of seeking the Care Companion services. It is up to the 
        Temanion to offer their services to you and it is up to you to accept such 
        services. The service of the Company is to match you with such Temanion, but 
        does not nor is it intended to provide elderly care services or any act that 
        can be construed in any way as an act of an elderly care provider. The Company 
        is not responsible nor liable for the acts and/or omissions of any Temanion 
        and/or any of the care companion services provided to you.
      </p>
    </div>
  );
};
