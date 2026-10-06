import type { Metadata } from 'next';
import BackButton from '@/components/storefront/BackButton';

export const metadata: Metadata = {
  title: 'Terms and Conditions — AMAL PERFUME',
  description: 'Terms and Conditions governing the use of the AMAL PERFUME website and purchase of goods and services.',
};

export default function TermsPage() {
  return (
    <div className="bg-[#FAF8F5] min-h-screen text-stone-800">
      {/* Header Banner */}
      <div className="py-10 md:py-14 border-b border-stone-200 bg-[#F4F0E6]">
        <div className="container-plt px-4 max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="w-full sm:w-auto flex justify-start">
            <BackButton label="Back to Store" />
          </div>
          <div className="text-center sm:text-right">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-stone-900 mb-1">
              Terms and Conditions
            </h1>
            <p className="text-stone-600 text-xs md:text-sm">
              Last Updated: October 2026
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-plt py-10 md:py-14 px-4 max-w-4xl mx-auto">
        <div className="bg-white border border-stone-200/90 rounded-2xl p-6 md:p-10 shadow-xs space-y-6 text-sm md:text-base text-stone-700 leading-relaxed font-normal">
          <p>
            These Terms and Conditions, along with privacy policy or other terms (&ldquo;Terms&rdquo;) constitute a binding agreement by and between <strong>AMAL PERFUME</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo; or &ldquo;our&rdquo;) and you (&ldquo;you&rdquo; or &ldquo;your&rdquo;) and relate to your use of our website, goods (as applicable) or services (as applicable).
          </p>

          <p>
            By using our website and availing the Services, you agree that you have read and accepted these Terms (including the Privacy Policy). We reserve the right to amend these Terms at any time and without assigning any reason. It is your responsibility to periodically review these Terms to stay informed of updates.
          </p>

          <p className="font-medium text-stone-900 pt-2">
            The use of this website or availing of our Services is subject to the following terms of use:
          </p>

          <ul className="space-y-4 list-disc pl-5 marker:text-stone-400">
            <li>
              To access and use the Services, you agree to provide true, accurate and complete information to us during and after registration, and you shall be responsible for all acts done through the use of your registered account.
            </li>
            <li>
              Neither we nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website or through the Services, for any specific purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
            </li>
            <li>
              Your use of our Services and the website is solely at your own risk and discretion. You are required to independently assess and ensure that the Services meet your requirements.
            </li>
            <li>
              The contents of the Website and the Services are proprietary to Us and you will not have any authority to claim any intellectual property rights, title, or interest in its contents. Unauthorized use of the Website or the Services may lead to action against you as per these Terms or applicable laws.
            </li>
            <li>
              You agree to pay us the charges associated with availing the Services.
            </li>
            <li>
              You agree not to use the website and/ or Services for any purpose that is unlawful, illegal or forbidden by these Terms, or Indian or local laws that might apply to you.
            </li>
            <li>
              You agree and acknowledge that website and the Services may contain links to other third party websites. On accessing these links, you will be governed by the terms of use, privacy policy and such other policies of such third party websites.
            </li>
            <li>
              You understand that upon initiating a transaction for availing the Services you are entering into a legally binding and enforceable contract with us for the Services.
            </li>
            <li>
              You shall be entitled to claim a refund of the payment made by you in case we are not able to provide the Service. The timelines for such return and refund will be according to the specific Service you have availed or within the time period provided in our policies (as applicable). In case you do not raise a refund claim within the stipulated time, this will make you ineligible for a refund.
            </li>
            <li>
              Notwithstanding anything contained in these Terms, the parties shall not be liable for any failure to perform an obligation under these Terms if performance is prevented or delayed by a force majeure event.
            </li>
            <li>
              These Terms and any dispute or claim relating to it, its subject matter or formation shall be governed by and construed in accordance with the laws of India. All disputes arising under or relating to these Terms shall be subject to the exclusive jurisdiction of the courts in Prayagraj, Uttar Pradesh.
            </li>
            <li>
              All concerns or communications relating to these Terms must be directed to us using the contact information provided on this website.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
