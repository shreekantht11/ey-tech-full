import express from 'express';
import Order from '../models/Order';
import Customer from '../models/Customer';
import Session from '../models/Session';
import { runUnderwriting } from '../agents/underwritingAgent';
import { generateSanction } from '../agents/sanctionAgent';

const router = express.Router();

// Checkout with financing
router.post('/loanflow/checkout-finance', async (req, res) => {
  try {
    const { phone, totalAmount, tenure, products } = req.body;

    // Find customer
    const customer = await Customer.findOne({ phone });
    if (!customer) {
      return res.status(404).json({
        success: false,
        error: 'Customer not found. Please verify your KYC first.',
      });
    }

    // Use provided sessionId if frontend started a session earlier, otherwise create one
    let sessionId = req.body.sessionId as string | undefined;
    if (!sessionId) {
      sessionId = `checkout_${Date.now()}`;
      await Session.create({ sessionId, customerId: customer.customerId, requestedAmount: totalAmount, tenure: tenure || 12 });
    } else {
      // update session request details if present
      await Session.findOneAndUpdate({ sessionId }, { requestedAmount: totalAmount, tenure: tenure || 12 });
    }
    console.log('[orders] checkout-finance called', { sessionId, phone, totalAmount, tenure });

    // Run underwriting with error handling
    let underwritingResult;
    try {
      underwritingResult = await runUnderwriting(
        sessionId,
        customer.customerId,
        totalAmount,
        tenure || 12
      );
    } catch (err) {
      console.error('[orders] underwriting error', err);
      return res.status(500).json({ success: false, error: 'Underwriting failed' });
    }

    if (!underwritingResult.approved) {
      return res.json({
        success: false,
        approved: false,
        reason: underwritingResult.reason,
        requiresSalarySlip: underwritingResult.requiresSalarySlip,
      });
    }

    // Generate sanction letter
    const sanctionResult = await generateSanction(
      sessionId,
      customer.customerId,
      underwritingResult.sanctionDetails!.amount,
      underwritingResult.sanctionDetails!.tenure,
      underwritingResult.sanctionDetails!.interestRate,
      underwritingResult.sanctionDetails!.emi
    );

    // Create order
    const orderId = `ORD${Date.now()}`;
    const order = new Order({
      orderId,
      customerId: customer.customerId,
      products,
      totalAmount,
      financingDetails: {
        loanAmount: underwritingResult.sanctionDetails!.amount,
        tenure: underwritingResult.sanctionDetails!.tenure,
        interestRate: underwritingResult.sanctionDetails!.interestRate,
        emi: underwritingResult.sanctionDetails!.emi,
        sanctionId: sanctionResult.sanctionId,
      },
      status: 'approved',
    });

    await order.save();

    res.json({
      success: true,
      approved: true,
      orderId,
      sanctionId: sanctionResult.sanctionId,
      downloadUrl: sanctionResult.downloadUrl,
      financingDetails: underwritingResult.sanctionDetails,
    });
  } catch (error) {
    console.error('Checkout finance error:', error);
    res.status(500).json({ success: false, error: 'Failed to process financing' });
  }
});

// Start a loan session (used by frontend chat popup) - returns sessionId and credit score
router.post('/loanflow/start-session', async (req, res) => {
  try {
    const { phone, requestedAmount, tenure } = req.body;
    if (!phone) return res.status(400).json({ error: 'phone is required' });

    const customer = await Customer.findOne({ phone });
    if (!customer) return res.status(404).json({ error: 'Customer not found' });

    const sessionId = `checkout_${Date.now()}`;
    await Session.create({ sessionId, customerId: customer.customerId, requestedAmount: requestedAmount || 0, tenure: tenure || 12 });

    // Provide a mock credit score (use stored or random fallback)
    const creditScore = customer.creditScore || Math.floor(600 + Math.random() * 300); // 600-899

    res.json({ success: true, sessionId, creditScore, preApprovedLimit: customer.preApprovedLimit });
  } catch (error) {
    console.error('Start session error:', error);
    res.status(500).json({ error: 'Failed to start session' });
  }
});

// Create order
router.post('/orders', async (req, res) => {
  try {
    const { customerId, products, totalAmount, financingDetails } = req.body;

    const orderId = `ORD${Date.now()}`;
    const order = new Order({
      orderId,
      customerId,
      products,
      totalAmount,
      financingDetails,
      status: financingDetails ? 'approved' : 'pending',
    });

    await order.save();
    res.json({ success: true, order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, error: 'Failed to create order' });
  }
});

// Get all orders (admin)
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch orders' });
  }
});

// Get orders by customer
router.get('/orders/:customerId', async (req, res) => {
  try {
    const orders = await Order.find({ customerId: req.params.customerId })
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching customer orders:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch orders' });
  }
});

export default router;
