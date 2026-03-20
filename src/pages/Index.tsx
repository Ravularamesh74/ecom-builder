import { Link } from "react-router-dom";
import {
  ArrowRight,
  Truck,
  Shield,
  RotateCcw,
  Zap,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";

const dealProducts = products.filter((p) => p.originalPrice);
const bestSellers = products.filter((p) => p.badge === "Best Seller");

const categoryIcons: Record<string, string> = {
  Electronics: "💻",
  Clothing: "👕",
  "Home & Kitchen": "🏠",
  "Books & Courses": "📚",
  Software: "🖥️",
  "Sports & Outdoors": "⚽",
  "Beauty & Health": "💄",
  "Toys & Games": "🎮",
};

const Index = () => {
  return (
    <div className="min-h-screen">

      {/* 🔥 DEAL STRIP */}
      <div className="bg-primary text-white text-center py-2 text-sm font-medium">
        ⚡ Limited Offer: Use <b>SAVE10</b> for 10% OFF
      </div>

      {/* 🚀 HERO */}
      <section className="bg-gradient-to-r from-primary/20 to-accent/20 py-16">
        <div className="container grid md:grid-cols-2 gap-8 items-center">
          
          <div>
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
              Discover <span className="text-primary">Top Deals</span>
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              Shop electronics, fashion, and digital products at unbeatable prices.
            </p>

            <div className="flex gap-3">
              <Link
                to="/products"
                className="bg-primary text-white px-6 py-3 rounded-lg font-semibold"
              >
                Shop Now
              </Link>

              <Link
                to="/products?category=Electronics"
                className="border px-6 py-3 rounded-lg font-semibold"
              >
                Explore Electronics
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da"
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="border-b bg-card py-4">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
          {[
            { icon: Truck, label: "Free Shipping ₹4000+" },
            { icon: Shield, label: "Secure Payments" },
            { icon: RotateCcw, label: "30-Day Returns" },
            { icon: Zap, label: "Instant Delivery" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center justify-center gap-2">
              <Icon className="w-5 h-5 text-primary" />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* 🧩 CATEGORIES */}
      <section className="container py-10">
        <h2 className="text-xl font-bold mb-6">Shop by Category</h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/products?category=${cat}`}
              className="bg-card border rounded-xl p-4 text-center hover:shadow-lg hover:scale-105 transition group"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition">
                {categoryIcons[cat] || "📦"}
              </div>
              <span className="text-xs font-medium group-hover:text-primary">
                {cat}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 🔥 TRENDING (SCROLLABLE) */}
      <section className="container py-8">
        <h2 className="text-xl font-bold mb-4">Trending Now 🔥</h2>

        <div className="flex gap-4 overflow-x-auto">
          {products.slice(0, 8).map((product) => (
            <div key={product.id} className="min-w-[200px]">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* 💰 TODAY DEALS */}
      <section className="container py-8">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Today's Deals</h2>
          <Link to="/products" className="text-primary flex items-center gap-1">
            See all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {dealProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* ⭐ BEST SELLERS */}
      <section className="container py-8">
        <div className="flex justify-between mb-4">
          <h2 className="text-xl font-bold">Best Sellers</h2>
          <Link to="/products" className="text-primary flex items-center gap-1">
            See all <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {bestSellers.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 🚀 CTA */}
      <section className="bg-card border-y py-12 text-center">
        <h2 className="text-2xl font-bold mb-2">
          Ready to explore more?
        </h2>
        <p className="text-muted-foreground mb-4">
          Browse thousands of products across all categories.
        </p>

        <Link
          to="/products"
          className="bg-primary text-white px-6 py-3 rounded-lg font-semibold"
        >
          Browse All Products
        </Link>
      </section>
    </div>
  );
};

export default Index;