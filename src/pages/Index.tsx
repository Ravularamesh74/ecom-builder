import { Link } from "react-router-dom";
import { ArrowRight, Truck, Shield, RotateCcw, Zap } from "lucide-react";
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
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-primary/10 via-accent to-primary/5 py-8 md:py-12">
        <div className="container">
          <div className="max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">
              Shop <span className="text-primary">Millions</span> of Products
            </h1>
            <p className="text-muted-foreground text-lg mb-6">
              Discover amazing deals on electronics, fashion, digital courses, and more. Fast delivery & easy returns.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors"
            >
              Shop Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-b border-border bg-card py-4">
        <div className="container grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
          {[
            { icon: Truck, label: "Free Shipping $50+" },
            { icon: Shield, label: "Secure Payments" },
            { icon: RotateCcw, label: "30-Day Returns" },
            { icon: Zap, label: "Fast Digital Delivery" },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center justify-center gap-2 text-muted-foreground">
              <Icon className="w-5 h-5 text-primary" />
              <span className="font-medium">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container py-8">
        <h2 className="text-xl font-bold mb-4">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/products?category=${encodeURIComponent(cat)}`}
              className="bg-card border border-border rounded-lg p-3 text-center hover:shadow-md hover:border-primary/30 transition-all group"
            >
              <div className="text-2xl mb-1">{categoryIcons[cat] || "📦"}</div>
              <span className="text-xs font-medium group-hover:text-primary transition-colors">{cat}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Today's Deals */}
      <section className="container py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Today's Deals</h2>
          <Link to="/products" className="text-sm text-primary hover:underline flex items-center gap-1">
            See all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {dealProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Best Sellers */}
      <section className="container py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Best Sellers</h2>
          <Link to="/products" className="text-sm text-primary hover:underline flex items-center gap-1">
            See all <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {bestSellers.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-card border-y border-border py-10">
        <div className="container text-center">
          <h2 className="text-2xl font-bold mb-2">Ready to find what you need?</h2>
          <p className="text-muted-foreground mb-4">Browse our full catalog of physical and digital products.</p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors"
          >
            Browse All Products <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
