import { useParams, Link } from "react-router-dom";
import {
  ShoppingCart,
  ArrowLeft,
  Truck,
  Shield,
  Check,
  Zap,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import StarRating from "@/components/StarRating";
import ProductCard from "@/components/ProductCard";
import { products, reviews } from "@/data/products";
import { useState } from "react";
import { toast } from "sonner";
import { formatPrice } from "@/lib/utils";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h2 className="text-xl font-semibold">Product not found</h2>
        <Link to="/products" className="text-primary mt-2 inline-block">
          Back to products
        </Link>
      </div>
    );
  }

  const productReviews = reviews.filter((r) => r.productId === product.id);
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const discount = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) *
          100
      )
    : 0;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${quantity} item(s) added to cart`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    toast.success("Redirecting to checkout...");
  };

  return (
    <div className="container py-6">
      <Link
        to="/products"
        className="flex items-center gap-1 text-sm text-primary mb-4"
      >
        <ArrowLeft size={16} /> Back
      </Link>

      <div className="grid lg:grid-cols-2 gap-10">

        {/* 🖼 IMAGE GALLERY */}
        <div>
          <div className="aspect-square bg-muted rounded-xl overflow-hidden">
            <img
              src={product.images[activeImage]}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex gap-2 mt-3">
            {product.images.map((img, i) => (
              <img
                key={i}
                src={img}
                onClick={() => setActiveImage(i)}
                className={`w-16 h-16 object-cover rounded cursor-pointer border ${
                  i === activeImage ? "border-primary" : ""
                }`}
              />
            ))}
          </div>
        </div>

        {/* 🧾 INFO */}
        <div className="flex flex-col">

          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>

          <div className="flex items-center gap-2 mb-3">
            <StarRating rating={product.rating} showValue />
            <span className="text-sm text-muted-foreground">
              ({product.reviewCount} reviews)
            </span>
          </div>

          <div className="mb-4">
            <span className="text-3xl font-bold text-price">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <div className="text-sm">
                <span className="line-through mr-2">
                  {formatPrice(product.originalPrice)}
                </span>
                <span className="text-red-500">
                  {discount}% OFF
                </span>
              </div>
            )}
          </div>

          <p className="text-muted-foreground mb-4">
            {product.description}
          </p>

          {/* FEATURES */}
          {product.features && (
            <ul className="mb-4 space-y-1">
              {product.features.map((f) => (
                <li key={f} className="flex gap-2 text-sm">
                  <Check size={14} className="text-primary" /> {f}
                </li>
              ))}
            </ul>
          )}

          {/* STOCK */}
          <p className="text-sm mb-4 text-green-600">
            {product.stock > 10
              ? "In Stock"
              : `Only ${product.stock} left!`}
          </p>

          {/* QUANTITY */}
          <div className="flex gap-3 mb-4">
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border px-3 py-2 rounded"
            >
              {Array.from({
                length: Math.min(10, product.stock),
              }).map((_, i) => (
                <option key={i}>{i + 1}</option>
              ))}
            </select>

            <button
              onClick={handleAddToCart}
              className="flex-1 bg-primary text-white py-2 rounded-lg"
            >
              <ShoppingCart size={18} /> Add to Cart
            </button>
          </div>

          {/* BUY NOW */}
          <button
            onClick={handleBuyNow}
            className="bg-yellow-400 text-black py-3 rounded-lg font-semibold mb-4"
          >
            Buy Now
          </button>

          {/* TRUST */}
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Truck size={14} /> Free Shipping
            </span>
            <span className="flex items-center gap-1">
              <Shield size={14} /> Secure Payment
            </span>
            <span className="flex items-center gap-1">
              <Zap size={14} /> Fast Delivery
            </span>
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <section className="mt-12">
        <h2 className="text-xl font-bold mb-4">Reviews</h2>

        {productReviews.map((r) => (
          <div key={r.id} className="border p-4 rounded mb-3">
            <StarRating rating={r.rating} size="sm" />
            <p className="text-sm font-semibold">{r.title}</p>
            <p className="text-xs text-muted-foreground">
              {r.userName}
            </p>
            <p className="text-sm mt-1">{r.comment}</p>
          </div>
        ))}
      </section>

      {/* RELATED */}
      <section className="mt-12">
        <h2 className="text-xl font-bold mb-4">
          Related Products
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {relatedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;