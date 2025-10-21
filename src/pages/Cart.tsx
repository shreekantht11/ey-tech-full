import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingCart, IndianRupee } from 'lucide-react';
import { toast } from 'sonner';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, totalAmount, itemCount } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background flex items-center justify-center">
        <div className="text-center">
          <ShoppingCart className="h-24 w-24 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Add some products to get started</p>
          <Button onClick={() => navigate('/products')}>Browse Products</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button
          variant="ghost"
          onClick={() => navigate('/products')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Continue Shopping
        </Button>

        <h1 className="text-4xl font-bold mb-8">Shopping Cart ({itemCount} items)</h1>

        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <Card key={item.productId} className="border-primary/10">
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded"
                  />

                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                    <div className="flex items-center gap-2 text-xl font-bold text-primary mb-3">
                      <IndianRupee className="h-4 w-4" />
                      {item.price.toLocaleString('en-IN')}
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 border rounded">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-semibold">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          removeFromCart(item.productId);
                          toast.success('Item removed from cart');
                        }}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-muted-foreground mb-1">Subtotal</p>
                    <div className="flex items-center gap-1 text-2xl font-bold">
                      <IndianRupee className="h-5 w-5" />
                      {(item.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-primary/20 bg-accent/5">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-semibold">Total Amount</span>
              <div className="flex items-center gap-1 text-3xl font-bold text-primary">
                <IndianRupee className="h-6 w-6" />
                {totalAmount.toLocaleString('en-IN')}
              </div>
            </div>

            <Button
              onClick={() => navigate('/checkout')}
              className="w-full text-lg py-6"
            >
              Proceed to Checkout
            </Button>

            <p className="text-center text-sm text-muted-foreground mt-4">
              Finance available through Tata Capital
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
