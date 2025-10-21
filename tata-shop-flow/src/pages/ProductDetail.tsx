import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, CreditCard, ChevronLeft, Heart } from 'lucide-react';
import { products } from '@/data/products';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FinancePopup from '@/components/FinancePopup';
import ProductCard from '@/components/ProductCard';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isFinancePopupOpen, setIsFinancePopupOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = products.find(p => p.id === parseInt(id || '0'));

  // Ensure the page is scrolled to top when opening a product detail
  useEffect(() => {
    try {
      // immediate scroll to top
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      // guard against layout shifts by ensuring another frame scroll
      requestAnimationFrame(() => window.scrollTo(0, 0));
    } catch (e) {
      // fallback
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <Button onClick={() => navigate('/products')}>Back to Products</Button>
        </div>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const images = [product.image, product.image, product.image]; // In real app, multiple images

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-muted shadow-medium">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {product.badge && (
                  <Badge className="absolute top-4 left-4 gradient-gold text-base px-4 py-2">
                    {product.badge}
                  </Badge>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-smooth ${
                      selectedImage === index
                        ? 'border-primary shadow-medium'
                        : 'border-transparent hover:border-muted-foreground/30'
                    }`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                {product.brand}
              </p>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.name}</h1>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating!)
                            ? 'fill-secondary text-secondary'
                            : 'text-muted'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{product.rating}</span>
                  {product.reviews && (
                    <span className="text-sm text-muted-foreground">
                      ({product.reviews} reviews)
                    </span>
                  )}
                </div>
              )}

              {/* Price */}
              <div className="flex items-baseline space-x-3 mb-4">
                <span className="text-4xl font-bold text-primary">
                  ₹{product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-muted-foreground line-through">
                      ₹{product.originalPrice.toLocaleString()}
                    </span>
                    <Badge variant="secondary" className="text-base">
                      {discount}% OFF
                    </Badge>
                  </>
                )}
              </div>

              {/* EMI Info */}
              <div className="bg-muted rounded-lg p-4 mb-6">
                <p className="text-sm font-medium mb-1">
                  EMI starting from ₹{Math.round(product.price / 12).toLocaleString()}/month
                </p>
                <p className="text-xs text-muted-foreground">
                  Get instant financing approval from Tata Capital
                </p>
              </div>

              {/* Stock Status */}
              <div className="flex items-center space-x-2 mb-6">
                <div
                  className={`h-2 w-2 rounded-full ${
                    product.inStock !== false ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <span className="text-sm font-medium">
                  {product.inStock !== false ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                size="lg"
                className="w-full shadow-medium"
                onClick={() => addToCart(product)}
                disabled={product.inStock === false}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>

              <Button
                size="lg"
                variant="secondary"
                className="w-full shadow-medium"
                onClick={() => setIsFinancePopupOpen(true)}
                disabled={product.inStock === false}
              >
                <CreditCard className="mr-2 h-5 w-5" />
                Finance with Tata Capital
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="w-full"
              >
                <Heart className="mr-2 h-5 w-5" />
                Add to Wishlist
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <div className="prose max-w-none">
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              {product.specifications ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-border pb-2">
                      <span className="font-medium">{key}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground">No specifications available</p>
              )}
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <p className="text-muted-foreground">
                Customer reviews will be displayed here.
              </p>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Finance Popup */}
      <FinancePopup
        isOpen={isFinancePopupOpen}
        onClose={() => setIsFinancePopupOpen(false)}
        amount={product.price}
      />
    </div>
  );
};

export default ProductDetail;
