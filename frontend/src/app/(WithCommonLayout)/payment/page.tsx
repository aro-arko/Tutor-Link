import PaymentVerify from "@/components/modules/payment/PaymentVerify";
import { Suspense } from "react";

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
