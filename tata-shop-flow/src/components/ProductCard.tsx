import { motion } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product, useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative bg-card rounded-xl shadow-soft hover:shadow-strong transition-smooth overflow-hidden border border-border"
    >
      <Link to={`/product/${product.id}`}>
        {/* Badge */}
        {product.badge && (
          <Badge className="absolute top-3 left-3 z-10 gradient-gold">
            {product.badge}
          </Badge>
        )}

        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          
          {/* Overlay on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-primary/10 backdrop-blur-[2px] flex items-center justify-center"
          >
            <Button
              size="lg"
              className="shadow-strong"
              onClick={(e) => {
                e.preventDefault();
                addToCart(product);
              }}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
            {product.brand}
          </p>
          <h3 className="font-semibold text-base mb-2 line-clamp-2 group-hover:text-primary transition-smooth">
            {product.name}
          </h3>

          {/* Rating */}
          {product.rating && (
            <div className="flex items-center space-x-1 mb-2">
              <Star className="h-4 w-4 fill-secondary text-secondary" />
              <span className="text-sm font-medium">{product.rating}</span>
              {product.reviews && (
                <span className="text-xs text-muted-foreground">
                  ({product.reviews})
                </span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-xl font-bold text-primary">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <>
                <span className="text-sm text-muted-foreground line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
                <Badge variant="secondary" className="text-xs">
                  {discount}% OFF
                </Badge>
              </>
            )}
          </div>

          {/* Stock Status */}
          {product.inStock === false && (
            <p className="text-sm text-destructive font-medium">Out of Stock</p>
          )}
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
