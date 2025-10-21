import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { CreditCard, CheckCircle, Package, TruckIcon } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import FinancePopup from '@/components/FinancePopup';
import { toast } from '@/hooks/use-toast';

type CheckoutStep = 'details' | 'payment' | 'confirmation';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const [step, setStep] = useState<CheckoutStep>('details');
  const [paymentMethod, setPaymentMethod] = useState('finance');
  const [isFinancePopupOpen, setIsFinancePopupOpen] = useState(false);

  const subtotal = getCartTotal();
  const shipping = subtotal > 50000 ? 0 : 500;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  if (cart.length === 0 && step !== 'confirmation') {
    navigate('/cart');
    return null;
  }

  const handlePayNow = () => {
    // Simulate payment processing
    setTimeout(() => {
      setStep('confirmation');
      clearCart();
      toast({
        title: "Payment Successful!",
        description: "Your order has been placed successfully.",
      });
    }, 1500);
  };

  const handleFinanceOption = () => {
    setIsFinancePopupOpen(true);
  };

  const steps = [
    { id: 'details', label: 'Details', icon: Package },
    { id: 'payment', label: 'Payment', icon: CreditCard },
    { id: 'confirmation', label: 'Confirmation', icon: CheckCircle },
  ];

  const currentStepIndex = steps.findIndex(s => s.id === step);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            {/* Progress Line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -z-10">
              <motion.div
                className="h-full gradient-primary"
                initial={{ width: '0%' }}
                animate={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>

            {steps.map((s, index) => {
              const Icon = s.icon;
              const isActive = index <= currentStepIndex;
              const isCurrent = s.id === step;

              return (
                <div key={s.id} className="flex flex-col items-center">
                  <motion.div
                    initial={false}
                    animate={{
                      scale: isCurrent ? 1.1 : 1,
                      backgroundColor: isActive ? 'hsl(var(--primary))' : 'hsl(var(--muted))',
                    }}
                    className="w-10 h-10 rounded-full flex items-center justify-center mb-2 shadow-medium"
                  >
                    <Icon className={`h-5 w-5 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                  </motion.div>
                  <span className={`text-sm font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === 'details' && (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card className="shadow-medium">
                    <CardHeader>
                      <CardTitle>Delivery Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" placeholder="John" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" placeholder="Doe" className="mt-1" />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="john@example.com" className="mt-1" />
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="+91 98765 43210" className="mt-1" />
                      </div>

                      <div>
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" placeholder="Street address" className="mt-1" />
                      </div>

                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input id="city" placeholder="Mumbai" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="state">State</Label>
                          <Input id="state" placeholder="Maharashtra" className="mt-1" />
                        </div>
                        <div>
                          <Label htmlFor="pincode">PIN Code</Label>
                          <Input id="pincode" placeholder="400001" className="mt-1" />
                        </div>
                      </div>

                      <Button
                        size="lg"
                        className="w-full"
                        onClick={() => setStep('payment')}
                      >
                        Continue to Payment
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {step === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <Card className="shadow-medium">
                    <CardHeader>
                      <CardTitle>Payment Method</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                        <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-smooth cursor-pointer">
                          <RadioGroupItem value="finance" id="finance" />
                          <Label htmlFor="finance" className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold">Finance via Tata Capital</p>
                                <p className="text-sm text-muted-foreground">
                                  Get instant approval with flexible EMI options
                                </p>
                              </div>
                              <CreditCard className="h-6 w-6 text-primary" />
                            </div>
                          </Label>
                        </div>

                        <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-smooth cursor-pointer">
                          <RadioGroupItem value="card" id="card" />
                          <Label htmlFor="card" className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-semibold">Credit/Debit Card</p>
                                <p className="text-sm text-muted-foreground">
                                  Pay securely with your card
                                </p>
                              </div>
                              <CreditCard className="h-6 w-6 text-muted-foreground" />
                            </div>
                          </Label>
                        </div>
                      </RadioGroup>

                      <div className="flex gap-3">
                        <Button
                          variant="outline"
                          size="lg"
                          className="flex-1"
                          onClick={() => setStep('details')}
                        >
                          Back
                        </Button>

                        {paymentMethod === 'finance' ? (
                          <Button
                            size="lg"
                            className="flex-1"
                            onClick={handleFinanceOption}
                          >
                            Proceed with Tata Capital
                          </Button>
                        ) : (
                          <Button
                            size="lg"
                            className="flex-1"
                            onClick={handlePayNow}
                          >
                            Pay Now
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {step === 'confirmation' && (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                >
                  <Card className="shadow-strong">
                    <CardContent className="pt-12 pb-12 text-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring' }}
                        className="gradient-primary rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6"
                      >
                        <CheckCircle className="h-12 w-12 text-primary-foreground" />
                      </motion.div>

                      <h2 className="text-3xl font-bold mb-4">Order Confirmed!</h2>
                      <p className="text-muted-foreground mb-2">
                        Your order has been placed successfully
                      </p>
                      <p className="text-sm text-muted-foreground mb-8">
                        Order ID: #TCS{Math.random().toString(36).substr(2, 9).toUpperCase()}
                      </p>

                      <div className="bg-muted rounded-lg p-6 mb-8 text-left">
                        <div className="flex items-center space-x-3 mb-4">
                          <TruckIcon className="h-6 w-6 text-primary" />
                          <div>
                            <p className="font-semibold">Estimated Delivery</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                          variant="outline"
                          size="lg"
                          className="flex-1"
                          onClick={() => navigate('/products')}
                        >
                          Continue Shopping
                        </Button>
                        <Button
                          size="lg"
                          className="flex-1"
                          onClick={() => navigate('/')}
                        >
                          Back to Home
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          {step !== 'confirmation' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <Card className="shadow-medium sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="font-medium">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax</span>
                      <span>₹{tax.toLocaleString()}</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold text-primary">
                      ₹{total.toLocaleString()}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>

      <FinancePopup
        isOpen={isFinancePopupOpen}
        onClose={() => setIsFinancePopupOpen(false)}
        amount={total}
      />
    </div>
  );
};

export default CheckoutPage;
