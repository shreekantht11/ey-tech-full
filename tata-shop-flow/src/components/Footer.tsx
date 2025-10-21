import { Link } from 'react-router-dom';
import { Linkedin, Instagram, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="gradient-primary text-primary-foreground mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-secondary">About Us</h3>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Tata Capital E-Store brings you premium products with flexible financing options. 
              Shop smart, finance smarter.
            </p>
            <div className="flex space-x-3">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-foreground/10 hover:bg-primary-foreground/20 p-2 rounded-lg transition-smooth"
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-foreground/10 hover:bg-primary-foreground/20 p-2 rounded-lg transition-smooth"
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-foreground/10 hover:bg-primary-foreground/20 p-2 rounded-lg transition-smooth"
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-secondary">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-sm hover:text-secondary transition-smooth">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-sm hover:text-secondary transition-smooth">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-secondary transition-smooth">
                  Track Order
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-secondary transition-smooth">
                  Returns
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-secondary">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm hover:text-secondary transition-smooth">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-secondary transition-smooth">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-secondary transition-smooth">
                  Financing Options
                </a>
              </li>
              <li>
                <a href="#" className="text-sm hover:text-secondary transition-smooth">
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4 text-secondary">Newsletter</h3>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Subscribe to get special offers and updates
            </p>
            <div className="flex space-x-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button variant="secondary" size="icon">
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-primary-foreground/80">
              © 2025 Tata Capital E-Store. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="hover:text-secondary transition-smooth">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-secondary transition-smooth">
                Terms of Service
              </a>
              <a href="#" className="hover:text-secondary transition-smooth">
                Cookie Policy
              </a>
            </div>
          </div>
          <p className="text-xs text-primary-foreground/60 mt-4 text-center md:text-left">
            Disclaimer: Financing options are subject to credit approval. Terms and conditions apply. 
            Tata Capital Limited is a registered NBFC.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
