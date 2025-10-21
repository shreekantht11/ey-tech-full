import express from 'express';
import Customer from '../models/Customer';

const router = express.Router();

// Simple login - email as username, phone as password
router.post('/login', async (req, res) => {
  try {
    const { email, phone } = req.body;

    if (!email || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Email and phone are required',
      });
    }

    // For demo, we'll use phone to find customer
    // In production, implement proper auth with password hashing
    const customer = await Customer.findOne({ phone });

    if (!customer) {
      return res.status(401).json({
        success: false,
        error: 'Invalid credentials. Please check your phone number.',
      });
    }

    res.json({
      success: true,
      customer: {
        customerId: customer.customerId,
        name: customer.name,
        phone: customer.phone,
        email: email,
        preApprovedLimit: customer.preApprovedLimit,
        creditScore: customer.creditScore,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: 'Login failed' });
  }
});

export default router;
