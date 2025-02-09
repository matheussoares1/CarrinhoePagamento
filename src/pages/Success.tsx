
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePayment } from "@/contexts/PaymentContext";
import PaymentLayout from "@/components/PaymentLayout";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const Success = () => {
  const navigate = useNavigate();
  const { customerInfo, totalAmount, orderId } = usePayment();

  useEffect(() => {
    if (!orderId) {
      navigate("/");
    }
  }, [orderId, navigate]);

  return (
    <PaymentLayout title="Payment Successful!" showBack={false}>
      <div className="max-w-md mx-auto text-center space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-success/20 p-3">
            <div className="rounded-full bg-success/40 p-2">
              <CheckCircle className="w-12 h-12 text-success" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-success font-medium">Thank you for your payment!</p>
          <p className="text-sm text-muted-foreground">
            Your transaction has been completed successfully.
          </p>
        </div>

        <div className="bg-accent rounded-lg p-6 space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Order ID</p>
            <p className="font-medium">{orderId}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Amount Paid</p>
            <p className="font-medium">${totalAmount.toFixed(2)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{customerInfo.email}</p>
          </div>
        </div>

        <Button
          onClick={() => navigate("/")}
          className="w-full bg-primary hover:bg-primary-hover text-white"
        >
          Start New Payment
        </Button>
      </div>
    </PaymentLayout>
  );
};

export default Success;
