import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, User, Menu, X, MapPin, ChevronDown } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { categories } from "@/data/products";

const Navbar = () => {
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Main header bar */}
      <div className="marketplace-header">
        <div className="container flex items-center gap-4 py-2">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 text-xl font-extrabold tracking-tight">
            <span className="text-primary">Shop</span>
            <span className="text-[hsl(var(--marketplace-header-foreground))]">Hub</span>
          </Link>

          {/* Deliver to */}
          <button className="hidden lg:flex items-center gap-1 text-xs hover:outline hover:outline-1 hover:outline-[hsl(var(--marketplace-header-foreground)/0.3)] rounded p-1">
            <MapPin className="w-4 h-4 text-[hsl(var(--marketplace-header-foreground)/0.7)]" />
            <div className="text-left">
              <span className="text-[hsl(var(--marketplace-header-foreground)/0.7)] block leading-tight">Deliver to</span>
              <span className="font-bold text-[hsl(var(--marketplace-header-foreground))] leading-tight">Your Location</span>
            </div>
          </button>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex-1 flex max-w-2xl">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products, brands, and more..."
              className="flex-1 px-4 py-2 rounded-l-md text-sm text-foreground bg-card focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-r-md transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>

          {/* Right side icons */}
          <div className="flex items-center gap-3">
            {/* Account */}
            <button className="hidden sm:flex items-center gap-1 text-xs hover:outline hover:outline-1 hover:outline-[hsl(var(--marketplace-header-foreground)/0.3)] rounded p-1">
              <User className="w-5 h-5 text-[hsl(var(--marketplace-header-foreground))]" />
              <div className="text-left">
                <span className="text-[hsl(var(--marketplace-header-foreground)/0.7)] block leading-tight">Hello, Sign in</span>
                <span className="font-bold text-[hsl(var(--marketplace-header-foreground))] leading-tight flex items-center gap-0.5">
                  Account <ChevronDown className="w-3 h-3" />
                </span>
              </div>
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex items-center gap-1 hover:outline hover:outline-1 hover:outline-[hsl(var(--marketplace-header-foreground)/0.3)] rounded p-1"
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6 text-[hsl(var(--marketplace-header-foreground))]" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </div>
              <span className="hidden sm:block text-xs font-bold text-[hsl(var(--marketplace-header-foreground))]">Cart</span>
            </Link>

            {/* Mobile menu toggle */}
            <button
              className="lg:hidden text-[hsl(var(--marketplace-header-foreground))]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Category nav bar */}
      <nav className="marketplace-nav hidden lg:block">
        <div className="container flex items-center gap-4 py-1 text-sm overflow-x-auto">
          <Link to="/products" className="hover:underline font-semibold whitespace-nowrap flex items-center gap-1">
            <Menu className="w-4 h-4" /> All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/products?category=${encodeURIComponent(cat)}`}
              className="hover:underline whitespace-nowrap"
            >
              {cat}
            </Link>
          ))}
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden marketplace-nav border-t border-[hsl(var(--marketplace-header-foreground)/0.1)]">
          <div className="container py-3 space-y-2">
            <Link to="/products" className="block py-1 font-semibold" onClick={() => setMobileMenuOpen(false)}>
              All Products
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                to={`/products?category=${encodeURIComponent(cat)}`}
                className="block py-1 text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
