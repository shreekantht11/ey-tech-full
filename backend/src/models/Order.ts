import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  customerId: { type: String, required: true },
  products: [{
    productId: String,
    name: String,
    price: Number,
    quantity: Number,
  }],
  totalAmount: { type: Number, required: true },
  financingDetails: {
    loanAmount: Number,
    tenure: Number,
    interestRate: Number,
    emi: Number,
    sanctionId: String,
  },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected', 'completed'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('Order', orderSchema);
