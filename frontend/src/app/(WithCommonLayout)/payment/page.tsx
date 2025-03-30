import PaymentVerify from "@/components/modules/payment/PaymentVerify";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Payment",
  description: "Payment page for TutorLink",
};

const PaymentPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <p>Loading...</p>
        </div>
      }
    >
      <PaymentVerify />
    </Suspense>
  );
};

export default PaymentPage;
