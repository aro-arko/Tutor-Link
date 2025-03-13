/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { verifyPayment } from "@/services/BookingService";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
      <div className="flex justify-center items-center min-h-screen bg-red-50">
        <Loader2 className="animate-spin h-10 w-10 text-red-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
        <XCircle className="h-12 w-12 text-red-600 mb-4" />
        <p className="text-lg text-gray-700 mb-4">{error}</p>
        <Link href="/student/dashboard">
          <Button className="bg-red-600 hover:bg-red-700 text-white">
            Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-red-50 p-4">
      <Card className="max-w-lg w-full shadow-lg border border-red-100 bg-white">
        <CardHeader className="text-center">
          {paymentDetails.transaction.bank_status === "Success" ? (
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          ) : (
            <XCircle className="h-16 w-16 text-red-600 mx-auto mb-4" />
          )}
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Payment Receipt
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Transaction ID:</span>
            <span className="text-gray-700">
              {paymentDetails.transaction.id}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Payment Method:</span>
            <span className="text-gray-700">
              {paymentDetails.transaction.method}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Date & Time:</span>
            <span className="text-gray-700">
              {paymentDetails.transaction.date_time}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-700">Bank Status:</span>
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
            <span className="font-semibold text-gray-700">Status:</span>
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
            <span className="font-semibold text-gray-700">Amount Paid:</span>
            <span className="text-gray-700">${paymentDetails.price}</span>
          </div>
          <div className="mt-6 text-center">
            <Link href="/student/dashboard">
              <Button className="bg-red-600 hover:bg-red-700 text-white">
                Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentVerify;
