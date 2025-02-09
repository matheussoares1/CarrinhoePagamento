
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePayment } from "@/contexts/PaymentContext";
import PaymentLayout from "@/components/PaymentLayout";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { totalAmount, setPixCode, setOrderId } = usePayment();

  // Simulate generating a PIX code
  useEffect(() => {
    const generatePixCode = () => {
      const mockPixCode = "00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426655440000";
      setPixCode(mockPixCode);
      setOrderId(Math.random().toString(36).substring(7));
    };
    generatePixCode();
  }, [setPixCode, setOrderId]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText("00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426655440000");
    toast({
      title: "PIX code copied!",
      description: "You can now paste it in your banking app.",
    });
  };

  return (
    <PaymentLayout
      title="PIX Payment"
      onBack={() => navigate("/cart")}
    >
      <div className="max-w-md mx-auto text-center space-y-8">
        <div className="bg-accent p-6 rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">Amount to pay</p>
          <p className="text-3xl font-semibold">${totalAmount.toFixed(2)}</p>
        </div>

        <div className="space-y-4">
          <div className="bg-white border-2 border-dashed border-muted p-4 rounded-lg">
            {/* Replace with actual QR code generation */}
            <div className="w-48 h-48 mx-auto bg-muted animate-pulse rounded-lg" />
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Or copy PIX code</p>
            <div className="flex items-center space-x-2">
              <code className="flex-1 bg-accent p-3 rounded text-sm break-all">
                00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426655440000
              </code>
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopyCode}
                className="flex-shrink-0"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <Button
            onClick={() => navigate("/success")}
            className="w-full bg-primary hover:bg-primary-hover text-white"
          >
            Simulate Payment Success
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            For demo purposes, click the button above to simulate a successful payment
          </p>
        </div>
      </div>
    </PaymentLayout>
  );
};

export default Payment;
