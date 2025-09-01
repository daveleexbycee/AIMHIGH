
import { Header } from "@/components/header";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <ShieldCheck className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-3xl font-bold font-headline">Privacy Policy</h1>
          </div>
          <div className="space-y-8 text-muted-foreground">
            <p>
              This Privacy Policy describes how AimHigh Furniture Company ("we," "us," or "our") collects, uses, and discloses your personal information when you visit or make a purchase from our website.
            </p>

            <section>
              <h2 className="text-2xl font-semibold font-headline mb-4 text-foreground">1. Information We Collect</h2>
              <p className="mb-4">
                When you visit the Site, we collect certain information about your device, your interaction with the Site, and information necessary to process your purchases. This includes:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <span className="font-semibold text-foreground">Device Information:</span> Web browser type, IP address, time zone, and some of the cookies that are installed on your device.
                </li>
                <li>
                  <span className="font-semibold text-foreground">Order Information:</span> Name, billing address, shipping address, payment information (including credit card numbers), email address, and phone number.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold font-headline mb-4 text-foreground">2. How We Use Your Information</h2>
              <p className="mb-4">
                We use the information we collect to provide our services to you, including:
              </p>
               <ul className="space-y-2 list-disc pl-5">
                  <li>
                    <span className="font-semibold text-foreground">Fulfilling Orders:</span> To process your payment, arrange for shipping, and provide you with invoices and order confirmations.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Communication:</span> To communicate with you about your orders, products, services, and promotional offers.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Improving Our Services:</span> To analyze how customers interact with our Site and to improve the customer experience.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Fraud Prevention:</span> To screen for potential risk or fraud.
                  </li>
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-semibold font-headline mb-4 text-foreground">3. Sharing Your Information</h2>
              <p className="mb-4">
                We share your personal information with third parties to help us provide our services and fulfill our contracts with you. For example:
              </p>
               <ul className="space-y-2 list-disc pl-5">
                  <li>
                    We may use third-party services to power our online store.
                  </li>
                  <li>
                    We may share your information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
                  </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold font-headline mb-4 text-foreground">4. Your Rights</h2>
              <p>
                If you are a resident of certain regions, you have the right to access the personal information we hold about you and to ask that your personal information be corrected, updated, or erased. If you would like to exercise this right, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold font-headline mb-4 text-foreground">5. Cookies</h2>
              <p className="mb-4">
                 We use cookies to enhance your browsing experience, remember your preferences, and track your activity on our Site.
              </p>
              <ul className="space-y-2 list-disc pl-5">
                  <li>
                    <span className="font-semibold text-foreground">Types of Cookies:</span> We use session cookies and persistent cookies.
                  </li>
                  <li>
                    <span className="font-semibold text-foreground">Managing Cookies:</span> You can control and manage cookies through your web browser settings.
                  </li>
              </ul>
            </section>
            
             <section>
              <h2 className="text-2xl font-semibold font-headline mb-4 text-foreground">6. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time to reflect changes to our practices or for other operational, legal, or regulatory reasons.
              </p>
            </section>
            
             <section>
              <h2 className="text-2xl font-semibold font-headline mb-4 text-foreground">7. Contact Us</h2>
              <p>
                For more information about our privacy practices, or if you have questions, please contact us by email.
              </p>
            </section>

          </div>
        </div>
      </main>
    </>
  );
}
