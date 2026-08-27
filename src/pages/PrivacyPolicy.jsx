import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/skye/Footer";

const logoImg = (process.env.PUBLIC_URL || "") + "/images/logo.png";

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[color:var(--skye-bg)] text-[color:var(--skye-ink)] flex flex-col">
      <header className="sticky top-0 z-40 bg-[#dce4ea] border-b border-black/10 shadow-sm">
        <div className="mx-auto max-w-[1500px] px-5 sm:px-6 md:px-10 h-[60px] sm:h-[68px] flex items-center justify-between gap-3">
          <a href="https://rustomjeeozoneskye.in/" className="flex items-center gap-2">
            <img src={logoImg} alt="Rustomjee Ozone Skye" className="h-8 sm:h-10 w-auto object-contain" />
          </a>
          <a href="https://rustomjeeozoneskye.in/" className="text-[12px] font-medium tracking-[0.18em] uppercase text-[color:var(--skye-ink)] hover:text-[color:var(--skye-ochre-deep)] transition-colors">← Back</a>
        </div>
      </header>
      <main className="flex-1 mx-auto max-w-[1200px] w-full px-5 sm:px-6 md:px-10 py-12 sm:py-16 md:py-20">
        <div className="eyebrow text-[color:var(--skye-sky-3)] mb-3">Legal &amp; Policy</div>
        <h1 className="font-display text-3xl sm:text-5xl text-[color:var(--skye-ink)] tracking-tight mb-8">Privacy Policy</h1>
        <div className="font-sans text-xs sm:text-sm leading-relaxed text-[color:var(--skye-muted)] space-y-6">
          <p>Rustomjee (that is, our subsidiaries, our ultimate holding company and its subsidiaries) (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;) are committed to protecting and respecting your privacy. This privacy policy (together with our terms of use and any other documents referred to on it) sets out the basis on which any personal data we collect from you, or that you provide to us, will be processed by us. Please read the following carefully to understand our views and practices regarding your personal data and how we will treat it. By visiting <a href="https://www.rustomjee.com" target="_blank" rel="noreferrer" className="text-[color:var(--skye-ochre-deep)] underline">www.rustomjee.com</a> or any other of our websites / mobile applications to which this privacy policy applies (&quot;Sites&quot;) or otherwise providing us with information you are accepting and consenting to the practices described in this policy.</p>
          <div>
            <h2 className="font-semibold text-[color:var(--skye-ink)] mb-2 uppercase tracking-wider text-sm sm:text-base">We May Collect And Process The Following Data About You:</h2>
            <ul className="list-disc pl-5 space-y-3 mt-1">
              <li><strong>Information you give us:</strong> You may give us information about you by filling in forms on our sites, or by submitting your CV, or by corresponding with us by phone, e-mail or otherwise or, by you interacting with any of our business partners, suppliers or sub-contractors (including estate agents, sales agents and our professional advisors) engaged on our behalf. This includes information you provide when you register to use our sites, subscribe to our service, email us, arrange property viewings with us, request brochures from us, complete an enquiry form, provide your CV and when you report a problem with our sites. The information you give us may include your name, address, e-mail address, phone number and any other information relevant to your enquiry or request for information or services which we may request and you may choose to provide to us from time to time.</li>
              <li><strong>Information we collect about you:</strong> We may automatically collect: technical information, including the IP address, your login information, browser type and version, time zone setting, browser plug-in types and versions, operating system and platform; and information about your visit, including the full URL clickstream to, through and from our sites; materials you viewed or searched for; page response times, download errors, length of visits to certain pages, page interaction information, and methods used to browse away from the page and any phone number used to call our customer service number.</li>
              <li><strong>Information we receive from other sources:</strong> We may receive information about you if you use our sites or the other services we provide. In this case we will have informed you when we collected that data that it may be shared internally and combined with data collected on our sites. We also work closely with third parties (including, for example, business partners, sub-contractors in technical, payment and delivery services, advertising networks, analytics providers, search information providers, credit reference agencies) and may receive information about you from them.</li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-[color:var(--skye-ink)] mb-2 uppercase tracking-wider text-sm sm:text-base">Use Made Of The Information</h2>
            <p className="mb-2">We Use Information Held About You In The Following Ways:</p>
            <ul className="list-disc pl-5 space-y-3">
              <li><strong>Information you give to us:</strong> We will use this information: to carry out our obligations arising from any contracts entered into between you and us and to provide you with the information and services that you request from us relating to the projects, properties, ventures or opportunities detailed on our sites or otherwise notified to you; to provide you with information about other goods and services we offer that are similar to those that you have already purchased or enquired about; to provide you, or permit selected third parties to provide you, with information about opportunities, goods or services we feel may interest you. If you are an existing customer, we will only contact you by e-mail, SMS, telephone or your preferred method of contact if different, with information about opportunities, goods and services similar to those which were the subject of a previous sale or negotiations of a sale to you. If you are a new customer, and where we permit third parties to use your data, we (or they) will contact you by e-mail, SMS, telephone or your preferred method of contact if different only if you have consented to this.</li>
            </ul>
            <p className="mt-3 italic text-xs sm:text-sm text-[color:var(--skye-ink)] font-medium">Note that there is a possibility for us to call you on your phone number after the specified TRAI timings.</p>
            <ul className="list-disc pl-5 space-y-3 mt-3">
              <li><strong>Information we collect about you:</strong> We will use this information: to administer our sites and for internal operations, including troubleshooting, data analysis, testing, research, statistical and survey purposes; to improve our sites to ensure that content is presented in the most effective manner for you and for your computer; to allow you, when required, to participate in interactive features of our service; as part of our efforts to keep our sites safe and secure; to measure or understand the effectiveness of advertising we serve to you and others, and to deliver relevant advertising to you; to make suggestions and recommendations to you and other users of our sites about goods or services that may interest you or them.</li>
              <li><strong>Information we receive from other sources:</strong> We may combine this information with information you give to us and information we collect about you. This includes but is not limited to information we receive from our sales agents. We may use this information and the combined information for the purposes set out above (depending on the types of information we receive).</li>
            </ul>
          </div>
          <div>
            <h2 className="font-semibold text-[color:var(--skye-ink)] mb-2 uppercase tracking-wider text-sm sm:text-base">Disclosure Of Your Information</h2>
            <p className="mb-2">We may share your personal information with any member of our group, which means our subsidiaries, our ultimate holding company and its subsidiaries.</p>
            <p className="mb-2">We may share your information with selected third parties including, where applicable:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>i. Business partners, suppliers and sub-contractors (including, but not limited to, estate agents, sales agents and our professional advisors) for the performance of any contract or any potential contract we may enter into with them or you, or in relation to any ancillary requirements;</li>
              <li>ii. Advertisers and advertising networks that require the data to select and serve relevant adverts to you and others; and</li>
              <li>iii. Analytics and search engine providers that assist us in the improvement and optimisation of our sites.</li>
            </ol>
            <p className="mt-4 mb-2">We may disclose your personal information to third parties:</p>
            <ol className="list-decimal pl-5 space-y-2">
              <li>i. If we sell or buy any business or assets, we may disclose your personal data to the prospective seller or buyer of such business or assets;</li>
              <li>ii. If Rustomjee or substantially all of its assets are acquired by a third party, your personal data will be one of the transferred assets; and</li>
              <li>iii. If we are under a duty to disclose or share your personal data in order to comply with any legal obligation, or in order to enforce or apply our terms of use and other agreements; or to protect the rights, property, or safety of Rustomjee, our customers, or others. This includes exchanging information with other companies and organisations for the purposes of fraud protection and credit risk reduction.</li>
            </ol>
            <p className="mt-4 font-medium text-[color:var(--skye-ink)]">We may share your non sales related information such as Cookies, Email IDs, Phone number etc to external parties. But, we do not share your sales related information such as PAN Card No, Credit / Debit Card details, Preference details with the external parties.</p>
          </div>
          <div>
            <h2 className="font-semibold text-[color:var(--skye-ink)] mb-2 uppercase tracking-wider text-sm sm:text-base">Where We Store Your Personal Data</h2>
            <p>The data that we collect from you may be transferred, stored and processed by staff who work for us or for one of our suppliers or one of our group companies. Such staff maybe engaged in, among other things, the fulfilment of your order or enquiry and the provision of support services. By submitting your personal data, you agree to this transfer, storing or processing. We will take all steps reasonably necessary to ensure that your data is treated securely.</p>
            <p className="mt-3">We have put in place appropriate technical and organisational measures to guard against unauthorised or unlawful processing of personal data and accidental loss or destruction of, or damage to, personal data. Unfortunately, the transmission of information via the internet is not completely secure and we cannot guarantee the security of your data transmitted to our sites and any transmission is at your own risk.</p>
          </div>
          <div>
            <h2 className="font-semibold text-[color:var(--skye-ink)] mb-2 uppercase tracking-wider text-sm sm:text-base">Your Rights</h2>
            <p>You have the right to ask us not to process your personal data for marketing purposes.</p>
            <p className="mt-3">Our sites may contain links to and from the websites of our partner networks, advertisers and affiliates. If you follow a link, please note that these websites have their own privacy policies and that we do not accept any responsibility or liability for these policies. Please check these policies before you submit any personal data to these websites.</p>
          </div>
          <div>
            <h2 className="font-semibold text-[color:var(--skye-ink)] mb-2 uppercase tracking-wider text-sm sm:text-base">Cookies</h2>
            <p>Our sites may use cookies to distinguish you from other users of our sites. This helps us to provide you with a good experience when you browse our sites and also allows us to improve our sites. By continuing to browse our sites, you are agreeing to our use of cookies. A cookie is a small file of letters and numbers that we store on your browser or the hard drive of your computer if you agree. Cookies contain information that is transferred to your computer&apos;s hard drive.</p>
            <p className="mt-3">We use cookies that are required for the operation of our sites (they include, for example, cookies that enable you to log into the secure area of our sites); to allow us to recognise and count the number of visitors and to see how visitors move around our sites when they are using it; to recognise you when you return to our sites in order to enable us to personalise our content for you; to record your visit to our sites, the pages you have visited and the links you have followed in order to make our sites more relevant to your interests. Further information about the individual cookies we use on our sites and the purposes for which we use them can be found here. Please note that third parties may also use cookies, over which we have no control.</p>
            <p className="mt-3">You block cookies by activating the setting on your browser that allows you to refuse the setting of all or some cookies. However, if you use your browser settings to block all cookies (including essential cookies) you may not be able to access all or parts of our site.</p>
          </div>
          <div>
            <h2 className="font-semibold text-[color:var(--skye-ink)] mb-2 uppercase tracking-wider text-sm sm:text-base">Changes To Our Privacy Policy</h2>
            <p>Any changes we may make to our privacy policy will be posted on this page and, where appropriate, notified to you by e-mail. Please check back frequently to see any updates or changes to our privacy policy.</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
