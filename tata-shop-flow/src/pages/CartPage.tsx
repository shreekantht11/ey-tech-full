import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const CartPage = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">
            Start shopping to add items to your cart
          </p>
          <Button asChild size="lg">
            <Link to="/products">
              Browse Products
            </Link>
          </Button>
        </motion.div>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const shipping = subtotal > 50000 ? 0 : 500;
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {cart.length} item{cart.length !== 1 ? 's' : ''} in your cart
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="shadow-soft hover:shadow-medium transition-smooth">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {/* Image */}
                        <Link
                          to={`/product/${item.id}`}
                          className="flex-shrink-0"
                        >
                          <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover hover:scale-110 transition-smooth"
                            />
                          </div>
                        </Link>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <Link to={`/product/${item.id}`}>
                            <h3 className="font-semibold text-lg mb-1 hover:text-primary transition-smooth line-clamp-1">
                              {item.name}
                            </h3>
                          </Link>
                          <p className="text-sm text-muted-foreground mb-2">
                            {item.brand}
                          </p>
                          <p className="text-lg font-bold text-primary">
                            ₹{item.price.toLocaleString()}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex flex-col items-end justify-between">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFromCart(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>

                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <p className="text-sm font-semibold">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card className="shadow-medium sticky top-24">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        <span className="text-green-600">FREE</span>
                      ) : (
                        `₹${shipping.toLocaleString()}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (GST 18%)</span>
                    <span className="font-medium">₹{tax.toLocaleString()}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    ₹{total.toLocaleString()}
                  </span>
                </div>

                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground mb-4">
                    Add ₹{(50000 - subtotal).toLocaleString()} more for free shipping
                  </p>
                )}

                <Button
                  asChild
                  size="lg"
                  className="w-full shadow-medium mb-3"
                >
                  <Link to="/checkout">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  <Link to="/products">Continue Shopping</Link>
                </Button>

                <div className="mt-6 bg-muted rounded-lg p-4">
                  <p className="text-sm font-medium mb-2">
                    💳 Finance Available
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Get instant financing approval with EMI starting from ₹
                    {Math.round(total / 12).toLocaleString()}/month
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
