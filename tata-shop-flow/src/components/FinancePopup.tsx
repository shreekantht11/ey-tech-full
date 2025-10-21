import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, CheckCircle, AlertCircle, Download } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface FinancePopupProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
}

type EligibilityStatus = 'idle' | 'checking' | 'approved' | 'documents' | 'rejected';

const FinancePopup = ({ isOpen, onClose, amount }: FinancePopupProps) => {
  const [loanAmount, setLoanAmount] = useState(amount.toString());
  const [tenure, setTenure] = useState('12');
  const [eligibilityStatus, setEligibilityStatus] = useState<EligibilityStatus>('idle');
  const interestRate = 12; // 12% annual interest
  const { customer } = useAuth();
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [sanctionId, setSanctionId] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const calculateEMI = () => {
    const P = parseFloat(loanAmount);
    const r = interestRate / 12 / 100;
    const n = parseInt(tenure);
    const emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    return Math.round(emi);
  };

  const handleCheckEligibility = async () => {
    setEligibilityStatus('checking');
    try {
      const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:8000';
      // require logged-in user
      if (!customer) {
        toast({ title: 'Not logged in', description: 'Please login to continue', variant: 'destructive' });
        setEligibilityStatus('idle');
        return;
      }

      // Ensure a session exists (start-session) and get credit score
      if (!sessionId) {
        const sRes = await fetch(`${apiBase}/api/loanflow/start-session`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: customer.phone, requestedAmount: parseFloat(loanAmount), tenure: parseInt(tenure) }),
        });
        const sData = await sRes.json();
        if (!sRes.ok || !sData.success) {
          toast({ title: 'Session Error', description: sData.error || 'Failed to start session', variant: 'destructive' });
          setEligibilityStatus('idle');
          return;
        }
        setSessionId(sData.sessionId);
      }

      const res = await fetch(`${apiBase}/api/loanflow/checkout-finance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, phone: customer.phone, totalAmount: parseFloat(loanAmount), tenure: parseInt(tenure), products: [] }),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        // If backend specifically indicates amount > max limit, treat as immediate rejection
        if (data.reason && data.reason.includes('exceeds our maximum limit')) {
          setEligibilityStatus('rejected');
          toast({ title: 'Rejected', description: data.reason, variant: 'destructive' });
          return;
        }

        if (data.requiresSalarySlip) {
          setEligibilityStatus('documents');
          toast({ title: 'Documents required', description: 'Please upload salary slip for verification' });
        } else {
          setEligibilityStatus('rejected');
          toast({ title: 'Application under review', description: data.reason || 'We will contact you' , variant: 'destructive'});
        }
      } else {
        setEligibilityStatus('approved');
        // capture sanction info if backend returned it
        if (data.sanctionId) setSanctionId(data.sanctionId);
        if (data.downloadUrl) setDownloadUrl(data.downloadUrl);
        toast({ title: 'Approved', description: 'Your loan is approved. Download sanction letter.' });
      }
    } catch (err) {
      console.error('Finance error', err);
      setEligibilityStatus('rejected');
      toast({ title: 'Error', description: 'Failed to check eligibility', variant: 'destructive' });
    }
  };

  const handleFileUpload = async (file: File, salaryValue: number) => {
    if (!sessionId || !customer) {
      toast({ title: 'Session missing', description: 'Please start eligibility check first', variant: 'destructive' });
      return;
    }
    setUploading(true);
    try {
      const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:8000';
      const form = new FormData();
      form.append('file', file);
      form.append('sessionId', sessionId);
      form.append('salary', String(salaryValue));

      const res = await fetch(`${apiBase}/api/upload-salary`, {
        method: 'POST',
        body: form,
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        toast({ title: 'Upload failed', description: data.error || 'Unable to upload file', variant: 'destructive' });
      } else {
        toast({ title: 'Uploaded', description: 'Salary slip uploaded. Re-checking eligibility...' });
        // re-run eligibility with salary provided
        setTimeout(() => {
          // trigger check again with monthlySalary via session flow by calling checkout-finance with salary (backend will use session)
          handleCheckEligibility();
        }, 800);
      }
    } catch (err) {
      console.error('Upload error', err);
      toast({ title: 'Upload error', description: 'Network or server error', variant: 'destructive' });
    } finally {
      setUploading(false);
    }
  };

  const emi = calculateEMI();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calculator className="h-5 w-5 text-primary" />
            <span>Tata Capital Financing</span>
          </DialogTitle>
          <DialogDescription>
            Get instant financing approval for your purchase
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Loan Amount */}
          <div>
            <Label htmlFor="amount">Loan Amount</Label>
            <Input
              id="amount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Tenure */}
          <div>
            <Label htmlFor="tenure">Tenure (Months)</Label>
            <Select value={tenure} onValueChange={setTenure}>
              <SelectTrigger className="mt-1">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="6">6 Months</SelectItem>
                <SelectItem value="12">12 Months</SelectItem>
                <SelectItem value="18">18 Months</SelectItem>
                <SelectItem value="24">24 Months</SelectItem>
                <SelectItem value="36">36 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* EMI Preview */}
          <div className="bg-muted rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Monthly EMI</span>
              <span className="text-2xl font-bold text-primary">₹{emi.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Interest Rate</span>
              <span className="font-medium">{interestRate}% p.a.</span>
            </div>
          </div>

          {/* Eligibility Status */}
          <AnimatePresence mode="wait">
            {eligibilityStatus === 'checking' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-center"
              >
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                <p className="text-sm font-medium">Checking eligibility...</p>
              </motion.div>
            )}

            {eligibilityStatus === 'approved' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4"
              >
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-green-900 dark:text-green-100 mb-1">
                      Instantly Approved!
                    </h4>
                    <p className="text-sm text-green-700 dark:text-green-300 mb-3">
                      Your loan of ₹{parseFloat(loanAmount).toLocaleString()} has been approved.
                    </p>
                    <Button className="w-full" variant="default" onClick={async () => {
                      try {
                        const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:8000';
                        const url = downloadUrl || (sanctionId ? `${apiBase}/api/sanction/${sanctionId}/download` : null);
                        if (url) {
                          // Instead of opening a new tab (which caused the login page to open),
                          // simply inform the user that the sanction letter is ready and show a success toast.
                          toast({ title: 'Sanction letter ready', description: 'Your sanction letter is ready. Check your downloads or profile documents.', });
                          // Optionally: trigger a background fetch to warm the download endpoint (no navigation)
                          try {
                            fetch(url, { method: 'GET', credentials: 'include' }).catch(() => {});
                          } catch (e) {
                            // silent
                          }
                        } else {
                          toast({ title: 'Not available', description: 'Sanction letter is not available yet.', variant: 'destructive' });
                        }
                      } catch (err) {
                        console.error('Download error', err);
                        toast({ title: 'Download failed', description: 'Could not start download', variant: 'destructive' });
                      }
                    }}>
                      <Download className="mr-2 h-4 w-4" />
                      Download Sanction Letter
                    </Button>
                  </div>
                </div>
              </motion.div>
            )}

            {eligibilityStatus === 'documents' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4"
              >
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
                      Documents Required
                    </h4>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                      Please submit your salary slip for verification.
                    </p>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium">Monthly Salary (₹)</label>
                      <input id="salary-input" type="number" className="w-full p-2 rounded-md border" />
                      <input id="salary-file" type="file" accept="application/pdf,image/*" className="w-full" />
                      <Button
                        className="w-full mt-2"
                        variant="secondary"
                        onClick={() => {
                          const input = document.getElementById('salary-file') as HTMLInputElement | null;
                          const salaryInput = document.getElementById('salary-input') as HTMLInputElement | null;
                          if (!input || !input.files || input.files.length === 0) {
                            toast({ title: 'No file', description: 'Please select a file to upload', variant: 'destructive' });
                            return;
                          }
                          const file = input.files[0];
                          const salaryValue = salaryInput ? Number(salaryInput.value) : 0;
                          if (!salaryValue || isNaN(salaryValue)) {
                            toast({ title: 'Salary missing', description: 'Please enter your monthly salary', variant: 'destructive' });
                            return;
                          }
                          handleFileUpload(file, salaryValue);
                        }}
                      >
                        {uploading ? 'Uploading...' : 'Upload Documents'}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {eligibilityStatus === 'rejected' && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4"
              >
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-red-900 dark:text-red-100 mb-1">
                      Under Review
                    </h4>
                    <p className="text-sm text-red-700 dark:text-red-300">
                      We'll review your application and contact you within 24 hours.
                    </p>
                    <div className="mt-3">
                      <Button className="w-full mb-2" variant="outline" onClick={() => {
                        // open contact chat or mailto
                        const mailto = 'mailto:contact@tatacapital.com?subject=Loan%20Inquiry';
                        window.open(mailto, '_blank');
                      }}>
                        Contact Tata Capital
                      </Button>
                      <Button className="w-full" variant="ghost" onClick={() => onClose()}>
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action Button */}
          {eligibilityStatus === 'idle' && (
            <Button
              className="w-full"
              size="lg"
              onClick={handleCheckEligibility}
            >
              Check Eligibility
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FinancePopup;
