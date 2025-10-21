import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import Customer from '../src/models/Customer';
import Product from '../src/models/Product';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../.env') });

const seedCustomers = [
  {
    customerId: 'CUST001',
    name: 'Rajesh Kumar',
    age: 35,
    city: 'Mumbai',
    phone: '9876543210',
    gst: 'GST123456',
    currentLoan: 0,
    creditScore: 780,
    preApprovedLimit: 50000,
    salary: 45000,
  },
  {
    customerId: 'CUST002',
    name: 'Priya Sharma',
    age: 29,
    city: 'Delhi',
    phone: '9876543211',
    gst: 'GST123457',
    currentLoan: 25000,
    creditScore: 820,
    preApprovedLimit: 75000,
    salary: 60000,
  },
  {
    customerId: 'CUST003',
    name: 'Amit Patel',
    age: 42,
    city: 'Bangalore',
    phone: '9876543212',
    currentLoan: 0,
    creditScore: 650,
    preApprovedLimit: 30000,
    salary: 35000,
  },
  {
    customerId: 'CUST004',
    name: 'Sneha Reddy',
    age: 31,
    city: 'Hyderabad',
    phone: '9876543213',
    gst: 'GST123458',
    currentLoan: 15000,
    creditScore: 750,
    preApprovedLimit: 100000,
    salary: 80000,
  },
  {
    customerId: 'CUST005',
    name: 'Vikram Singh',
    age: 38,
    city: 'Pune',
    phone: '9876543214',
    currentLoan: 0,
    creditScore: 720,
    preApprovedLimit: 60000,
    salary: 50000,
  },
  {
    customerId: 'CUST006',
    name: 'Ananya Gupta',
    age: 27,
    city: 'Chennai',
    phone: '9876543215',
    currentLoan: 10000,
    creditScore: 800,
    preApprovedLimit: 90000,
    salary: 70000,
  },
  {
    customerId: 'CUST007',
    name: 'Rohan Mehta',
    age: 45,
    city: 'Ahmedabad',
    phone: '9876543216',
    gst: 'GST123459',
    currentLoan: 50000,
    creditScore: 690,
    preApprovedLimit: 40000,
    salary: 42000,
  },
  {
    customerId: 'CUST008',
    name: 'Kavita Joshi',
    age: 33,
    city: 'Kolkata',
    phone: '9876543217',
    currentLoan: 0,
    creditScore: 760,
    preApprovedLimit: 80000,
    salary: 65000,
  },
  {
    customerId: 'CUST009',
    name: 'Arjun Nair',
    age: 40,
    city: 'Kochi',
    phone: '9876543218',
    gst: 'GST123460',
    currentLoan: 30000,
    creditScore: 710,
    preApprovedLimit: 55000,
    salary: 48000,
  },
  {
    customerId: 'CUST010',
    name: 'Meera Iyer',
    age: 36,
    city: 'Jaipur',
    phone: '9876543219',
    currentLoan: 0,
    creditScore: 840,
    preApprovedLimit: 120000,
    salary: 95000,
  },
];

const seedProducts = [
  {
    productId: 'PROD001',
    name: 'iPhone 15 Pro Max',
    price: 134900,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500',
    description: 'Latest iPhone with A17 Pro chip, titanium design, and advanced camera system',
    category: 'Smartphones',
    stock: 25,
    features: ['A17 Pro chip', '256GB Storage', '48MP Camera', '5G'],
  },
  {
    productId: 'PROD002',
    name: 'Samsung Galaxy S24 Ultra',
    price: 129999,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=500',
    description: 'Premium Android flagship with S Pen and incredible camera',
    category: 'Smartphones',
    stock: 30,
    features: ['Snapdragon 8 Gen 3', '512GB Storage', '200MP Camera', 'S Pen'],
  },
  {
    productId: 'PROD003',
    name: 'MacBook Pro 14" M3',
    price: 199900,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
    description: 'Professional laptop with M3 chip for ultimate performance',
    category: 'Laptops',
    stock: 15,
    features: ['M3 Pro chip', '16GB RAM', '512GB SSD', 'Liquid Retina XDR'],
  },
  {
    productId: 'PROD004',
    name: 'Dell XPS 15',
    price: 164990,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=500',
    description: 'Premium Windows laptop with stunning InfinityEdge display',
    category: 'Laptops',
    stock: 20,
    features: ['Intel i9', '32GB RAM', '1TB SSD', '15.6" 4K OLED'],
  },
  {
    productId: 'PROD005',
    name: 'Sony A7 IV Camera',
    price: 249990,
    image: 'https://images.unsplash.com/photo-1606980707186-2e8d03b1bf4a?w=500',
    description: 'Full-frame mirrorless camera for professionals',
    category: 'Cameras',
    stock: 10,
    features: ['33MP Sensor', '4K 60fps', 'AI Autofocus', '5-axis Stabilization'],
  },
  {
    productId: 'PROD006',
    name: 'Canon EOS R6 Mark II',
    price: 269990,
    image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500',
    description: 'Professional mirrorless camera with advanced features',
    category: 'Cameras',
    stock: 8,
    features: ['24.2MP Sensor', '6K RAW Video', 'Dual Pixel AF', 'Weather Sealed'],
  },
  {
    productId: 'PROD007',
    name: 'iPad Pro 12.9" M2',
    price: 109900,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500',
    description: 'Ultimate tablet with M2 chip and stunning display',
    category: 'Tablets',
    stock: 22,
    features: ['M2 chip', '256GB Storage', '12.9" Liquid Retina XDR', 'Apple Pencil support'],
  },
  {
    productId: 'PROD008',
    name: 'AirPods Pro (2nd Gen)',
    price: 26900,
    image: 'https://images.unsplash.com/photo-1606841837239-c5a1a4a07af7?w=500',
    description: 'Premium wireless earbuds with active noise cancellation',
    category: 'Audio',
    stock: 50,
    features: ['Active Noise Cancellation', 'Adaptive Audio', 'USB-C', '6hr battery'],
  },
];

async function seed() {
  try {
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      console.error('❌ MONGODB_URI is not defined in .env file');
      process.exit(1);
    }

    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await Customer.deleteMany({});
    await Product.deleteMany({});

    // Insert seed data
    console.log('🌱 Seeding customer data...');
    await Customer.insertMany(seedCustomers);
    
    console.log('🌱 Seeding product data...');
    await Product.insertMany(seedProducts);

    console.log(`✅ Successfully seeded ${seedCustomers.length} customers`);
    console.log(`✅ Successfully seeded ${seedProducts.length} products`);
    console.log('\n📊 Customer Summary:');
    console.log('━'.repeat(80));
    
    seedCustomers.forEach(customer => {
      console.log(`${customer.name.padEnd(20)} | Phone: ${customer.phone} | Score: ${customer.creditScore} | Limit: ₹${customer.preApprovedLimit.toLocaleString('en-IN')}`);
    });
    
    console.log('━'.repeat(80));
    console.log('\n✨ Database seeding completed successfully!');
    console.log('\n💡 Test Scenarios:');
    console.log('  Flow A (Instant Approve): Use phone 9876543210 (Pre-approved: ₹50,000)');
    console.log('  Flow B (Salary Required): Use phone 9876543211 (Pre-approved: ₹75,000)');
    console.log('  Flow C (Rejection): Use phone 9876543212 (Credit Score: 650)\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
}

seed();
