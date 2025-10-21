import express from 'express';
import Product from '../models/Product';

const router = express.Router();

// Get all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({ stock: { $gt: 0 } });
    res.json({ success: true, products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch products' });
  }
});

// Get single product
router.get('/products/:productId', async (req, res) => {
  try {
    const product = await Product.findOne({ productId: req.params.productId });
    if (!product) {
      return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({ success: true, product });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch product' });
  }
});

export default router;
