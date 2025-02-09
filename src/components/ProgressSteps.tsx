
import { Check, User, ShoppingCart, QrCode, CheckCircle } from "lucide-react";
import { usePayment } from "@/contexts/PaymentContext";

const ProgressSteps = () => {
  const { step } = usePayment();

  const steps = [
    { icon: User, label: "Customer Info" },
    { icon: ShoppingCart, label: "Cart" },
    { icon: QrCode, label: "Payment" },
    { icon: CheckCircle, label: "Confirmation" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto mb-8">
      <div className="flex justify-between items-center">
        {steps.map((s, i) => {
          const StepIcon = s.icon;
          const isCompleted = step > i + 1;
          const isCurrent = step === i + 1;

          return (
            <div key={i} className="flex flex-col items-center w-1/4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted
                    ? "bg-success text-white"
                    : isCurrent
                    ? "bg-primary text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <StepIcon className="w-5 h-5" />
                )}
              </div>
              <span
                className={`mt-2 text-sm ${
                  isCurrent ? "text-primary font-medium" : "text-muted-foreground"
                }`}
              >
                {s.label}
              </span>
              {i < steps.length - 1 && (
                <div
                  className={`h-0.5 w-full absolute translate-x-1/2 right-1/2 mt-5 ${
                    isCompleted ? "bg-success" : "bg-muted"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressSteps;
