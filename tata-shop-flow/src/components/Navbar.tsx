import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, Home, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getCartCount } = useCart();
  const location = useLocation();
  const cartCount = getCartCount();
  const { customer, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass-effect shadow-medium">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="gradient-primary px-4 py-2 rounded-lg"
            >
              <h1 className="text-xl font-bold text-primary-foreground">
                Tata Capital <span className="text-secondary">E-Store</span>
              </h1>
            </motion.div>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 shadow-soft"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant={isActive('/') ? 'default' : 'ghost'}
              asChild
            >
              <Link to="/" className="flex items-center space-x-2">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Link>
            </Button>

            <Button
              variant={isActive('/products') ? 'default' : 'ghost'}
              asChild
            >
              <Link to="/products">Products</Link>
            </Button>

            <Button
              variant="ghost"
              asChild
              className="relative"
            >
              <Link to="/cart" className="flex items-center space-x-2">
                <ShoppingCart className="h-4 w-4" />
                <span>Cart</span>
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-secondary text-secondary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </Link>
            </Button>

            {/** show user name or login link */}
            {customer ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Hi, {customer.name}</span>
                <Button variant="ghost" size="icon" onClick={logout}>
                  <User className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button variant="ghost" size="icon" asChild>
                <Link to="/auth">
                  <User className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background"
          >
            <div className="px-4 py-4 space-y-2">
              <Button
                variant={isActive('/') ? 'default' : 'ghost'}
                className="w-full justify-start"
                asChild
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to="/" className="flex items-center space-x-2">
                  <Home className="h-4 w-4" />
                  <span>Home</span>
                </Link>
              </Button>

              <Button
                variant={isActive('/products') ? 'default' : 'ghost'}
                className="w-full justify-start"
                asChild
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to="/products">Products</Link>
              </Button>

              <Button
                variant={isActive('/cart') ? 'default' : 'ghost'}
                className="w-full justify-start relative"
                asChild
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to="/cart" className="flex items-center space-x-2">
                  <ShoppingCart className="h-4 w-4" />
                  <span>Cart</span>
                  {cartCount > 0 && (
                    <span className="ml-auto bg-secondary text-secondary-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start"
                asChild
                onClick={() => setIsMenuOpen(false)}
              >
                <Link to="/auth" className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>Login / Sign Up</span>
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
