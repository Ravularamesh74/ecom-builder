import { Link } from "react-router-dom";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/data/products";
import { toast } from "sonner";
import { memo } from "react";
import { formatPrice } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast.success(`${product.title} added to cart`);
  };

  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col"
    >
      {/* IMAGE */}
      <div className="relative aspect-square bg-muted overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover transition duration-300 group-hover:opacity-0"
          loading="lazy"
        />

        {/* HOVER IMAGE */}
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt="preview"
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition duration-300"
          />
        )}

        {/* BADGES */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.badge && (
            <span className="bg-deal text-xs px-2 py-1 rounded font-semibold">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
              -{discount}%
            </span>
          )}
        </div>

        {/* HOVER ACTIONS */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3">
          <button
            onClick={handleAddToCart}
            className="bg-white text-black p-2 rounded-full hover:scale-110 transition"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>

          <button
            onClick={(e) => {
              e.preventDefault();
              toast.success("Added to wishlist ❤️");
            }}
            className="bg-white text-black p-2 rounded-full hover:scale-110 transition"
          >
            <Heart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-sm font-medium line-clamp-2 group-hover:text-primary transition mb-2">
          {product.title}
        </h3>

        {/* RATING */}
        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.round(product.rating)
                  ? "text-yellow-500 fill-current"
                  : "text-muted-foreground"
              }`}
            />
          ))}
          <span className="text-xs text-muted-foreground">
            ({product.reviewCount})
          </span>
        </div>

        {/* PRICE */}
        <div className="mt-auto">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-price">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm line-through text-muted-foreground">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default memo(ProductCard);