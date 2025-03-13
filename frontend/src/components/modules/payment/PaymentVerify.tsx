/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { verifyPayment } from "@/services/BookingService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle, XCircle } from "lucide-react";

const PaymentVerify = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      if (!orderId) return;
      try {
        const response = await verifyPayment(orderId);
        if (response.success) {
          setPaymentDetails(response.data);
        } else {
          setError("Failed to verify payment.");
        }
      } catch (err) {
        setError("An error occurred while verifying payment.");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentStatus();
  }, [orderId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin h-10 w-10 text-red-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center min-h-screen">
        <XCircle className="h-12 w-12 text-red-600 mb-2" />
        <p className="text-lg text-gray-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen p-4">
      <Card className="max-w-lg w-full shadow-lg border">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-semibold">
            Payment Receipt
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold">Transaction ID:</span>
            <span className="text-gray-700">
              {paymentDetails.transaction.id}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Payment Method:</span>
            <span className="text-gray-700">
              {paymentDetails.transaction.method}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Date & Time:</span>
            <span className="text-gray-700">
              {paymentDetails.transaction.date_time}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Bank Status:</span>
            <span
              className={`font-bold ${
                paymentDetails.transaction.bank_status === "Success"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {paymentDetails.transaction.bank_status}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Status:</span>
            <span
              className={`font-bold ${
                paymentDetails.status === "Paid"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {paymentDetails.status}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Amount Paid:</span>
            <span className="text-gray-700">${paymentDetails.price}</span>
          </div>
          <div className="flex justify-center mt-4">
            {paymentDetails.transaction.bank_status === "Success" ? (
              <CheckCircle className="h-12 w-12 text-green-600" />
            ) : (
              <XCircle className="h-12 w-12 text-red-600" />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentVerify;
