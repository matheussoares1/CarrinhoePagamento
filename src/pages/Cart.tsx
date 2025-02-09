
import { useNavigate } from "react-router-dom";
import { usePayment } from "@/contexts/PaymentContext";
import PaymentLayout from "@/components/PaymentLayout";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart, totalAmount } = usePayment();

  // Add some sample items if cart is empty
  if (cartItems.length === 0) {
    cartItems.push(
      {
        id: "1",
        name: "Premium Widget",
        price: 99.99,
        quantity: 1,
      },
      {
        id: "2",
        name: "Basic Gadget",
        price: 49.99,
        quantity: 1,
      }
    );
  }

  return (
    <PaymentLayout
      title="Shopping Cart"
      onBack={() => navigate("/")}
    >
      <div className="space-y-6">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-4 bg-accent rounded-lg animate-fadeIn"
          >
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-muted-foreground">
                ${item.price.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="h-8 w-8"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="h-8 w-8"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFromCart(item.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        <div className="border-t pt-6 mt-6">
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-medium">Total</span>
            <span className="text-2xl font-semibold">
              ${totalAmount.toFixed(2)}
            </span>
          </div>
          <Button
            onClick={() => navigate("/payment")}
            className="w-full bg-primary hover:bg-primary-hover text-white"
          >
            Proceed to Payment
          </Button>
        </div>
      </div>
    </PaymentLayout>
  );
};

export default Cart;
