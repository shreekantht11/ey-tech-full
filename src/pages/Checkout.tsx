import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { FinancePopup } from '@/components/FinancePopup';
import { IndianRupee, CreditCard, ArrowLeft } from 'lucide-react';

export default function Checkout() {
  const [showFinancePopup, setShowFinancePopup] = useState(false);
  const { items, totalAmount, clearCart } = useCart();
  const { customer } = useAuth();
  const navigate = useNavigate();

  if (items.length === 0) {
    navigate('/products');
    return null;
  }

  const handleFinanceSuccess = () => {
    clearCart();
    navigate('/products');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/cart')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Cart
        </Button>

        <h1 className="text-4xl font-bold mb-8">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Card className="border-primary/10 mb-6">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {items.map((item) => (
                  <div key={item.productId} className="flex justify-between text-sm">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-semibold">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Total</span>
                    <div className="flex items-center gap-1 text-2xl font-bold text-primary">
                      <IndianRupee className="h-5 w-5" />
                      {totalAmount.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {customer && (
              <Card className="border-primary/10">
                <CardHeader>
                  <CardTitle>Customer Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Name: </span>
                    <span className="font-semibold">{customer.name}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Phone: </span>
                    <span className="font-semibold">{customer.phone}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Pre-approved Limit: </span>
                    <span className="font-semibold text-accent">
                      ₹{customer.preApprovedLimit.toLocaleString('en-IN')}
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div>
            <Card className="border-accent/50 bg-gradient-to-br from-accent/10 to-accent/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Finance with Tata Capital</h3>
                  <p className="text-sm text-muted-foreground">
                    Get instant approval and flexible EMI options
                  </p>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>✓ Quick approval in minutes</li>
                    <li>✓ Flexible tenure options (3-24 months)</li>
                    <li>✓ Competitive interest rates</li>
                    <li>✓ No hidden charges</li>
                  </ul>
                </div>

                <Button
                  onClick={() => setShowFinancePopup(true)}
                  className="w-full text-lg py-6 bg-accent hover:bg-accent/90 text-accent-foreground"
                  size="lg"
                >
                  Finance this Purchase
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  EMI starting from ₹{Math.round(totalAmount / 12).toLocaleString('en-IN')}/month
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <FinancePopup
        isOpen={showFinancePopup}
        onClose={() => setShowFinancePopup(false)}
        totalAmount={totalAmount}
        products={items}
        onSuccess={handleFinanceSuccess}
      />
    </div>
  );
}
