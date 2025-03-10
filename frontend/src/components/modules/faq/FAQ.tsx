"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    category: "Tutoring",
    questions: [
      {
        q: "How do I find a tutor?",
        a: "You can search for tutors using filters like subject, rating, and availability.",
      },
      {
        q: "Can I message a tutor before booking?",
        a: "Yes! You can contact tutors to discuss your learning needs before booking a session.",
      },
    ],
  },
  {
    category: "Payments",
    questions: [
      {
        q: "How are payments processed?",
        a: "Payments are securely handled through our integrated payment gateway using Stripe.",
      },
      {
        q: "Can I get a refund if I cancel a session?",
        a: "Yes, refunds depend on the tutor’s cancellation policy. Check before booking.",
      },
    ],
  },
  {
    category: "Account Management",
    questions: [
      {
        q: "How do I reset my password?",
        a: "Go to the login page and click 'Forgot Password' to reset your credentials.",
      },
      {
        q: "Can I delete my account?",
        a: "Yes, you can delete your account from the settings page under 'Account Preferences'.",
      },
    ],
  },
];

const FAQ = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Section Title */}
      <h1 className="text-4xl font-bold text-gray-900 text-center mb-12">
        Frequently Asked Questions
      </h1>

      {/* FAQ Sections */}
      {faqs.map((section, sectionIdx) => (
        <div key={sectionIdx} className="mb-8">
          {/* Category Title */}
          <h2 className="text-2xl font-semibold text-red-600 mb-4">
            {section.category}
          </h2>

          {/* Accordion */}
          <Accordion
            type="single"
            collapsible
            className="space-y-0 border border-gray-200 rounded-lg"
          >
            {section.questions.map((faq, idx) => (
              <AccordionItem
                key={idx}
                value={`faq-${sectionIdx}-${idx}`}
                className={`
                  border-b border-gray-200 last:border-b-0 
                  ${idx === 0 ? "rounded-t-lg" : ""} 
                  ${idx === section.questions.length - 1 ? "rounded-b-lg" : ""}
                `}
              >
                <AccordionTrigger className="text-lg font-medium px-6 py-4">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 px-6 pb-4">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
};

export default FAQ;
