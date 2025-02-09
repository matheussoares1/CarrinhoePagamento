
import { ArrowLeft } from "lucide-react";
import ProgressSteps from "./ProgressSteps";
import { usePayment } from "@/contexts/PaymentContext";

interface PaymentLayoutProps {
  children: React.ReactNode;
  showBack?: boolean;
  onBack?: () => void;
  title: string;
}

const PaymentLayout = ({
  children,
  showBack = true,
  onBack,
  title,
}: PaymentLayoutProps) => {
  const { step } = usePayment();

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {showBack && step < 4 && (
          <button
            onClick={onBack}
            className="flex items-center text-medium-gray hover:text-charcoal transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </button>
        )}
        <ProgressSteps />
        <div className="card">
          <h1 className="text-2xl font-semibold text-center mb-8">{title}</h1>
          {children}
        </div>
      </div>
    </div>
  );
};

export default PaymentLayout;
