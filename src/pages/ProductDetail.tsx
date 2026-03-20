import { useParams, Link } from "react-router-dom";
import { ShoppingCart, ArrowLeft, Truck, Shield, Star, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import StarRating from "@/components/StarRating";
import ProductCard from "@/components/ProductCard";
import { products, reviews } from "@/data/products";
import { useState } from "react";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container py-16 text-center">
        <p className="text-lg font-medium">Product not found</p>
        <Link to="/products" className="text-primary hover:underline mt-2 inline-block">Back to products</Link>
      </div>
    );
  }

  const productReviews = reviews.filter((r) => r.productId === product.id);
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity}x ${product.title} added to cart`);
  };

  return (
    <div className="container py-6">
      <Link to="/products" className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-4">
        <ArrowLeft className="w-4 h-4" /> Back to products
      </Link>

      <div className="grid md:grid-cols-2 gap-8 bg-card border border-border rounded-lg p-6">
        {/* Image */}
        <div className="aspect-square overflow-hidden rounded-lg bg-muted">
          <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <span className={`self-start text-xs px-2 py-0.5 rounded-full mb-2 ${
            product.type === "digital" ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"
          }`}>
            {product.type === "digital" ? "Digital Product" : "Physical Product"}
          </span>

          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>

          <div className="flex items-center gap-2 mb-3">
            <StarRating rating={product.rating} showValue />
            <span className="text-sm text-muted-foreground">({product.reviewCount.toLocaleString()} reviews)</span>
          </div>

          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-3xl font-bold text-price">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <>
                <span className="text-lg text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
                <span className="text-sm font-semibold text-deal">Save {discount}%</span>
              </>
            )}
          </div>

          <p className="text-muted-foreground mb-4">{product.description}</p>

          {/* Features */}
          {product.features && (
            <ul className="space-y-1 mb-4">
              {product.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary" /> {f}
                </li>
              ))}
            </ul>
          )}

          {/* Stock */}
          <p className={`text-sm font-medium mb-4 ${product.stock > 10 ? "text-marketplace-badge" : "text-deal"}`}>
            {product.stock > 10 ? "In Stock" : `Only ${product.stock} left!`}
          </p>

          {/* Quantity & Add to cart */}
          <div className="flex items-center gap-3 mb-4">
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border border-border rounded-md px-3 py-2 bg-card text-sm"
            >
              {Array.from({ length: Math.min(10, product.stock) }).map((_, i) => (
                <option key={i + 1} value={i + 1}>Qty: {i + 1}</option>
              ))}
            </select>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-primary text-primary-foreground py-2.5 px-6 rounded-md font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" /> Add to Cart
            </button>
          </div>

          {/* Trust signals */}
          <div className="flex gap-4 text-xs text-muted-foreground border-t border-border pt-4">
            <span className="flex items-center gap-1"><Truck className="w-4 h-4" /> Free shipping $50+</span>
            <span className="flex items-center gap-1"><Shield className="w-4 h-4" /> Secure checkout</span>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section className="mt-10">
        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
        {productReviews.length === 0 ? (
          <p className="text-muted-foreground">No reviews yet for this product.</p>
        ) : (
          <div className="space-y-4">
            {productReviews.map((review) => (
              <div key={review.id} className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-1">
                  <StarRating rating={review.rating} size="sm" />
                  <span className="font-semibold text-sm">{review.title}</span>
                </div>
                <p className="text-xs text-muted-foreground mb-2">
                  By {review.userName} on {new Date(review.date).toLocaleDateString()}
                  {review.verified && <span className="text-marketplace-badge ml-2">✓ Verified Purchase</span>}
                </p>
                <p className="text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Related */}
      {relatedProducts.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold mb-4">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProductDetail;
