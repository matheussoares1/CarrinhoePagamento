
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePayment } from "@/contexts/PaymentContext";
import PaymentLayout from "@/components/PaymentLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CustomerInfo = () => {
  const navigate = useNavigate();
  const { customerInfo, setCustomerInfo } = usePayment();
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    cpf: "",
  });

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      cpf: "",
    };

    if (!customerInfo.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!customerInfo.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!customerInfo.cpf.trim()) {
      newErrors.cpf = "CPF is required";
    } else if (!/^\d{11}$/.test(customerInfo.cpf.replace(/\D/g, ""))) {
      newErrors.cpf = "Invalid CPF format";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      navigate("/cart");
    }
  };

  return (
    <PaymentLayout title="Customer Information" showBack={false}>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
        <div className="space-y-2">
          <label className="text-sm font-medium">Full Name</label>
          <Input
            value={customerInfo.name}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, name: e.target.value })
            }
            placeholder="John Doe"
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <Input
            type="email"
            value={customerInfo.email}
            onChange={(e) =>
              setCustomerInfo({ ...customerInfo, email: e.target.value })
            }
            placeholder="john@example.com"
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">CPF</label>
          <Input
            value={customerInfo.cpf}
            onChange={(e) =>
              setCustomerInfo({
                ...customerInfo,
                cpf: e.target.value.replace(/\D/g, ""),
              })
            }
            placeholder="123.456.789-00"
            maxLength={11}
            className={errors.cpf ? "border-red-500" : ""}
          />
          {errors.cpf && <p className="text-red-500 text-sm">{errors.cpf}</p>}
        </div>

        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary-hover text-white"
        >
          Continue to Cart
        </Button>
      </form>
    </PaymentLayout>
  );
};

export default CustomerInfo;
