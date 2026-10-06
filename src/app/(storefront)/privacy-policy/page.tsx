import type { Metadata } from 'next';
import BackButton from '@/components/storefront/BackButton';

export const metadata: Metadata = {
  title: 'Privacy Policy — AMAL PERFUME',
  description: 'Privacy Policy governing the collection, usage, and protection of personal information at AMAL PERFUME.',
};

export default function PrivacyPolicyPage() {
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
              Privacy Policy
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
            This Privacy Policy describes how <strong>AMAL PERFUME</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) collects, uses, protects, and discloses your information when you access or make a purchase from our website.
          </p>

          <p>
            By accessing our website and availing of our services, you consent to the collection, storage, and processing of your personal information in accordance with this Privacy Policy.
          </p>

          <p className="font-medium text-stone-900 pt-2">
            Our privacy practices and policies are subject to the following terms:
          </p>

          <ul className="space-y-4 list-disc pl-5 marker:text-stone-400">
            <li>
              We collect personal information provided by you during registration, order checkout, or communication with our concierge, including your name, shipping address, billing address, phone number, and email address.
            </li>
            <li>
              All financial transactions and payment processing (including credit/debit cards, UPI, and net banking) are handled through certified, secure third-party payment gateways. We do not capture or store your complete debit/credit card numbers or CVV on our servers.
            </li>
            <li>
              The information collected is used solely for order processing, dispatching shipments via courier partners, providing tracking information, customer service inquiries, and communicating essential updates regarding your account.
            </li>
            <li>
              We do not sell, trade, or rent your personal information to third parties for marketing purposes. Your information is shared only with verified service providers (such as logistics carriers, payment gateways, and technical infrastructure providers) strictly necessary to fulfill your orders.
            </li>
            <li>
              We employ standard administrative, physical, and technical safeguards, including Secure Sockets Layer (SSL) encryption, to protect against unauthorized access, loss, or alteration of personal data.
            </li>
            <li>
              Our website may utilize cookies and similar analytics tools to preserve session state, remember items added to your bag, and understand general user traffic trends to optimize website performance.
            </li>
            <li>
              Our website may contain links to external third-party websites or payment portals. We are not responsible for the privacy practices, terms, or content of those third-party services.
            </li>
            <li>
              You have the right to request access to, correction of, or deletion of your personal account details by contacting our customer support team.
            </li>
            <li>
              We reserve the right to modify or update this Privacy Policy at any time without prior individual notice. Changes take effect immediately upon posting on this website.
            </li>
            <li>
              For any questions, clarifications, or privacy-related requests, please contact us at <strong>concierge@amalperfume.com</strong>.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
