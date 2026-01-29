import { PrivacyArticle } from './PrivacyArticle';

export default function Section10() {
  return (
    <PrivacyArticle sectionNumber="10.0" title="Contact Us">
      <p>
        For more information about our privacy practices, if you have questions, or if 
        you would like to make a complaint, please contact us by e-mail at{' '}
        <strong>temanmalaysia@gmail.com</strong> or by mail using the details provided 
        below:
      </p>

      <div className="company-info">
        <p>
          <strong>TEMAN MY VENTURES PLT</strong><br />
          Level 1 & 2, Tower 3, Avenue 7 Horizon 2<br />
          Bangsar South City, Bangsar South<br />
          59200 Kuala Lumpur, Malaysia
        </p>
      </div>
    </PrivacyArticle>
  );
};