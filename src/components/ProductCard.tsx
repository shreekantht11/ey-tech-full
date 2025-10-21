import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, IndianRupee } from 'lucide-react';

interface Product {
  productId: string;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  features: string[];
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-primary/10 hover:border-primary/30">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
        />
        <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground">
          {product.category}
        </Badge>
      </div>

      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-3">
          {product.features.slice(0, 2).map((feature, idx) => (
            <Badge key={idx} variant="outline" className="text-xs">
              {feature}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-1 text-2xl font-bold text-primary">
          <IndianRupee className="h-5 w-5" />
          {product.price.toLocaleString('en-IN')}
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          or finance from ₹{Math.round(product.price / 12).toLocaleString('en-IN')}/month
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={() => onAddToCart(product)}
          className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
