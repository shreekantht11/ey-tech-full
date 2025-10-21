import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { CheckCircle, Loader2, Download, IndianRupee } from 'lucide-react';
import { toast } from 'sonner';

interface FinancePopupProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  products: Array<{ productId: string; name: string; price: number; quantity: number }>;
  onSuccess: () => void;
}

export function FinancePopup({ isOpen, onClose, totalAmount, products, onSuccess }: FinancePopupProps) {
  const [tenure, setTenure] = useState('12');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const { customer } = useAuth();

  const handleFinance = async () => {
    if (!customer) {
      toast.error('Please login to continue');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/loanflow/checkout-finance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: customer.phone,
          totalAmount,
          tenure: parseInt(tenure),
          products,
        }),
      });

      const data = await response.json();

      if (data.success && data.approved) {
        setResult(data);
        toast.success('Loan approved! 🎉');
      } else {
        toast.error(data.reason || 'Financing not approved');
        setResult({ approved: false, reason: data.reason });
      }
    } catch (error) {
      toast.error('Failed to process financing');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (result?.approved) {
      onSuccess();
    }
    setResult(null);
    setTenure('12');
    onClose();
  };

  const handleDownload = () => {
    if (result?.downloadUrl) {
      window.open(result.downloadUrl, '_blank');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Finance with Tata Capital</DialogTitle>
          <DialogDescription>
            Get instant approval for your purchase
          </DialogDescription>
        </DialogHeader>

        {!result ? (
          <div className="space-y-6">
            <div className="bg-accent/10 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-muted-foreground">Purchase Amount</span>
                <div className="flex items-center gap-1 text-2xl font-bold text-primary">
                  <IndianRupee className="h-5 w-5" />
                  {totalAmount.toLocaleString('en-IN')}
                </div>
              </div>
              {customer && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">Your Pre-approved Limit</span>
                  <span className="font-semibold text-accent">
                    ₹{customer.preApprovedLimit.toLocaleString('en-IN')}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Select EMI Tenure</Label>
              <Select value={tenure} onValueChange={setTenure}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 Months (EMI: ₹{Math.round(totalAmount / 3).toLocaleString('en-IN')})</SelectItem>
                  <SelectItem value="6">6 Months (EMI: ₹{Math.round(totalAmount / 6).toLocaleString('en-IN')})</SelectItem>
                  <SelectItem value="12">12 Months (EMI: ₹{Math.round(totalAmount / 12).toLocaleString('en-IN')})</SelectItem>
                  <SelectItem value="18">18 Months (EMI: ₹{Math.round(totalAmount / 18).toLocaleString('en-IN')})</SelectItem>
                  <SelectItem value="24">24 Months (EMI: ₹{Math.round(totalAmount / 24).toLocaleString('en-IN')})</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleFinance}
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Apply for Financing'
              )}
            </Button>
          </div>
        ) : result.approved ? (
          <div className="text-center py-6 space-y-6">
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 text-accent" />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Loan Approved! 🎉
              </h3>
              <p className="text-muted-foreground mb-4">
                Your purchase has been financed successfully
              </p>

              <div className="bg-accent/10 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Loan Amount</span>
                  <span className="font-semibold">₹{result.financingDetails.amount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tenure</span>
                  <span className="font-semibold">{result.financingDetails.tenure} months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Interest Rate</span>
                  <span className="font-semibold">{result.financingDetails.interestRate}% p.a.</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="font-semibold">Monthly EMI</span>
                  <span className="text-lg font-bold text-primary">₹{result.financingDetails.emi.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <p className="text-xs text-muted-foreground mt-4">
                Sanction ID: {result.sanctionId}
              </p>
            </div>

            <div className="space-y-2">
              <Button onClick={handleDownload} variant="outline" className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download Sanction Letter
              </Button>
              <Button onClick={handleClose} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Continue Shopping
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <p className="text-muted-foreground">{result.reason}</p>
            <Button onClick={handleClose} variant="outline" className="w-full">
              Close
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
