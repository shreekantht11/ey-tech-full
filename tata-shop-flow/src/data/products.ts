import { Product } from '@/contexts/CartContext';

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    brand: "SoundMax",
    price: 12999,
    originalPrice: 16999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80",
    category: "Electronics",
    description: "Experience crystal-clear sound with active noise cancellation and 30-hour battery life.",
    rating: 4.5,
    reviews: 128,
    inStock: true,
    badge: "Bestseller",
    specifications: {
      "Battery Life": "30 hours",
      "Connectivity": "Bluetooth 5.0",
      "Weight": "250g",
      "Color": "Black"
    }
  },
  {
    id: 2,
    name: "Smart Watch Pro Series 8",
    brand: "TechLife",
    price: 24999,
    originalPrice: 34999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80",
    category: "Wearables",
    description: "Track your fitness goals with advanced health monitoring and seamless smartphone integration.",
    rating: 4.7,
    reviews: 256,
    inStock: true,
    badge: "New Arrival",
    specifications: {
      "Display": "AMOLED 1.8\"",
      "Battery": "48 hours",
      "Water Resistance": "IP68",
      "Sensors": "Heart Rate, SpO2, GPS"
    }
  },
  {
    id: 3,
    name: "4K Ultra HD Smart TV 55\"",
    brand: "VisionMax",
    price: 42999,
    originalPrice: 59999,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500&q=80",
    category: "Electronics",
    description: "Immersive 4K viewing experience with HDR support and built-in streaming apps.",
    rating: 4.6,
    reviews: 89,
    inStock: true,
    badge: "10% Off",
    specifications: {
      "Screen Size": "55 inches",
      "Resolution": "3840 x 2160",
      "Smart Features": "Android TV",
      "HDMI Ports": "4"
    }
  },
  {
    id: 4,
    name: "Professional Camera DSLR",
    brand: "PhotoPro",
    price: 58999,
    originalPrice: 74999,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80",
    category: "Photography",
    description: "Capture stunning photos with 24MP sensor and 4K video recording capabilities.",
    rating: 4.8,
    reviews: 45,
    inStock: true,
    specifications: {
      "Sensor": "24.2 MP",
      "Video": "4K @ 30fps",
      "ISO Range": "100-25600",
      "Lens Mount": "EF/EF-S"
    }
  },
  {
    id: 5,
    name: "Gaming Laptop Elite X",
    brand: "GameForce",
    price: 89999,
    originalPrice: 109999,
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=80",
    category: "Computers",
    description: "Powerful gaming performance with RTX graphics and 144Hz display.",
    rating: 4.9,
    reviews: 178,
    inStock: true,
    badge: "Top Rated",
    specifications: {
      "Processor": "Intel i7 12th Gen",
      "RAM": "16GB DDR5",
      "GPU": "RTX 4060",
      "Display": "15.6\" 144Hz"
    }
  },
  {
    id: 6,
    name: "Wireless Bluetooth Speaker",
    brand: "AudioWave",
    price: 4999,
    originalPrice: 7999,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80",
    category: "Audio",
    description: "Portable speaker with 360° sound and IPX7 waterproof rating.",
    rating: 4.4,
    reviews: 312,
    inStock: true,
    badge: "Budget Pick",
    specifications: {
      "Battery": "12 hours",
      "Waterproof": "IPX7",
      "Connectivity": "Bluetooth 5.0",
      "Output": "20W"
    }
  },
  {
    id: 7,
    name: "Tablet Pro 12.9\"",
    brand: "TechPad",
    price: 54999,
    originalPrice: 69999,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80",
    category: "Tablets",
    description: "Professional tablet with stylus support and desktop-class performance.",
    rating: 4.7,
    reviews: 94,
    inStock: true,
    specifications: {
      "Display": "12.9\" Liquid Retina",
      "Storage": "256GB",
      "RAM": "8GB",
      "Processor": "M2 Chip"
    }
  },
  {
    id: 8,
    name: "Robot Vacuum Cleaner",
    brand: "CleanBot",
    price: 18999,
    originalPrice: 24999,
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=500&q=80",
    category: "Home Appliances",
    description: "Smart robot vacuum with mapping technology and app control.",
    rating: 4.5,
    reviews: 156,
    inStock: true,
    badge: "Smart Home",
    specifications: {
      "Suction Power": "2000Pa",
      "Battery": "120 minutes",
      "Dustbin": "600ml",
      "Features": "Mapping, App Control"
    }
  },
  {
    id: 9,
    name: "Fitness Tracker Band",
    brand: "FitLife",
    price: 2999,
    originalPrice: 4999,
    image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&q=80",
    category: "Wearables",
    description: "Track your activity, heart rate, and sleep patterns with 7-day battery life.",
    rating: 4.3,
    reviews: 421,
    inStock: true,
    specifications: {
      "Display": "AMOLED 1.1\"",
      "Battery": "7 days",
      "Water Resistance": "5ATM",
      "Sensors": "Heart Rate, SpO2"
    }
  },
  {
    id: 10,
    name: "Air Purifier Pro",
    brand: "PureAir",
    price: 14999,
    originalPrice: 19999,
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&q=80",
    category: "Home Appliances",
    description: "HEPA filter air purifier for rooms up to 500 sq ft with smart sensors.",
    rating: 4.6,
    reviews: 203,
    inStock: true,
    specifications: {
      "Coverage": "500 sq ft",
      "Filter": "HEPA H13",
      "CADR": "300 m³/h",
      "Noise": "25-50 dB"
    }
  },
  {
    id: 11,
    name: "Mechanical Gaming Keyboard",
    brand: "KeyMaster",
    price: 8999,
    originalPrice: 12999,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80",
    category: "Gaming",
    description: "RGB mechanical keyboard with Cherry MX switches and programmable keys.",
    rating: 4.8,
    reviews: 187,
    inStock: true,
    badge: "Gaming",
    specifications: {
      "Switches": "Cherry MX Red",
      "Backlighting": "RGB",
      "Connection": "Wired USB",
      "Features": "Programmable Macros"
    }
  },
  {
    id: 12,
    name: "Portable Power Bank 20000mAh",
    brand: "PowerMax",
    price: 1999,
    originalPrice: 2999,
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500&q=80",
    category: "Accessories",
    description: "High-capacity power bank with fast charging support for multiple devices.",
    rating: 4.4,
    reviews: 567,
    inStock: true,
    specifications: {
      "Capacity": "20000mAh",
      "Output": "18W Fast Charge",
      "Ports": "2x USB-A, 1x USB-C",
      "Weight": "350g"
    }
  }
];
