import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[hsl(var(--marketplace-header))] text-[hsl(var(--marketplace-header-foreground))] mt-auto">
      <div className="container py-12">
        
        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* BRAND */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">ShopHub</h2>
            <p className="text-sm text-[hsl(var(--marketplace-header-foreground)/0.7)]">
              Your one-stop destination for quality products at the best prices.
              Shop smart, live better.
            </p>

            {/* SOCIAL */}
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
                <Twitter size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition">
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* LINKS */}
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to="/">About Us</Link></li>
              <li><Link to="/">Careers</Link></li>
              <li><Link to="/">Press</Link></li>
              <li><Link to="/">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Shop</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/products?category=Electronics">Electronics</Link></li>
              <li><Link to="/products?category=Clothing">Clothing</Link></li>
              <li><Link to="/products?category=Home">Home & Living</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li><Link to="/">Help Center</Link></li>
              <li><Link to="/">Returns</Link></li>
              <li><Link to="/">Shipping</Link></li>
              <li><Link to="/">Track Order</Link></li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h4 className="font-semibold mb-3">Stay Updated</h4>
            <p className="text-sm text-white/70 mb-3">
              Subscribe to get latest offers & updates.
            </p>

            <div className="flex items-center bg-white/10 rounded-lg overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent px-3 py-2 text-sm outline-none w-full"
              />
              <button className="bg-primary px-3 py-2 hover:opacity-90 transition">
                <Mail size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 my-8"></div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/60">
          
          <p>© {new Date().getFullYear()} ShopHub. All rights reserved.</p>

          <div className="flex gap-4">
            <Link to="/">Privacy Policy</Link>
            <Link to="/">Terms of Service</Link>
            <Link to="/">Cookies</Link>
          </div>

          {/* PAYMENT MOCK */}
          <div className="flex gap-2 text-white/50 text-xs">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>UPI</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;