import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Search,
  User,
  Menu,
  X,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { categories } from "@/data/products";

const Navbar = () => {
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  // Sticky shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fake search suggestions (replace with API later)
  useEffect(() => {
    if (!searchQuery.trim()) return setSuggestions([]);
    const filtered = categories.filter((c) =>
      c.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSuggestions(filtered.slice(0, 5));
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSuggestions([]);
    }
  };

  return (
    <header className={`sticky top-0 z-50 ${scrolled ? "shadow-lg" : ""}`}>
      {/* TOP BAR */}
      <div className="marketplace-header">
        <div className="container flex items-center gap-4 py-2 relative">

          {/* LOGO */}
          <Link to="/" className="text-xl font-extrabold">
            <span className="text-primary">Shop</span>Hub
          </Link>

          {/* LOCATION */}
          <button className="hidden lg:flex items-center gap-1 text-xs hover:bg-white/10 p-2 rounded">
            <MapPin className="w-4 h-4" />
            <div>
              <p className="text-[10px] opacity-70">Deliver to</p>
              <p className="font-bold text-xs">Your Location</p>
            </div>
          </button>

          {/* SEARCH */}
          <div className="flex-1 relative max-w-2xl">
            <form onSubmit={handleSearch} className="flex">
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="flex-1 px-4 py-2 rounded-l-md bg-card text-black text-sm outline-none"
              />
              <button className="bg-primary px-4 rounded-r-md">
                <Search className="w-5 h-5" />
              </button>
            </form>

            {/* SEARCH SUGGESTIONS */}
            {suggestions.length > 0 && (
              <div className="absolute bg-white text-black w-full mt-1 rounded shadow-lg z-50">
                {suggestions.map((item) => (
                  <div
                    key={item}
                    onClick={() => {
                      navigate(`/products?category=${item}`);
                      setSuggestions([]);
                    }}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">

            {/* ACCOUNT DROPDOWN */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className="flex items-center gap-1 text-xs hover:bg-white/10 p-2 rounded"
              >
                <User className="w-5 h-5" />
                <span>Account</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {accountOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded shadow-lg z-50">
                  <Link to="/login" className="block px-4 py-2 hover:bg-gray-100">Login</Link>
                  <Link to="/register" className="block px-4 py-2 hover:bg-gray-100">Register</Link>
                  <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">Orders</Link>
                </div>
              )}
            </div>

            {/* CART */}
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* MOBILE MENU */}
            <button
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* CATEGORY BAR */}
      <nav className="hidden lg:flex marketplace-nav">
        <div className="container flex gap-4 py-2 text-sm overflow-x-auto">
          <Link to="/products" className="font-semibold flex items-center gap-1">
            <Menu className="w-4 h-4" /> All
          </Link>
          {categories.map((cat) => (
            <Link key={cat} to={`/products?category=${cat}`}>
              {cat}
            </Link>
          ))}
        </div>
      </nav>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white text-black p-4 space-y-2 shadow-lg">
          <Link to="/login">Login</Link>
          <Link to="/cart">Cart</Link>
          <hr />
          {categories.map((cat) => (
            <Link key={cat} to={`/products?category=${cat}`}>
              {cat}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
};

export default Navbar;