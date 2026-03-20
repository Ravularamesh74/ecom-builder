import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="marketplace-header mt-auto">
    <div className="container py-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
        <div>
          <h4 className="font-bold mb-3">Get to Know Us</h4>
          <ul className="space-y-1.5 text-[hsl(var(--marketplace-header-foreground)/0.7)]">
            <li><Link to="/" className="hover:underline">About</Link></li>
            <li><Link to="/" className="hover:underline">Careers</Link></li>
            <li><Link to="/" className="hover:underline">Press</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">Shop With Us</h4>
          <ul className="space-y-1.5 text-[hsl(var(--marketplace-header-foreground)/0.7)]">
            <li><Link to="/products" className="hover:underline">All Products</Link></li>
            <li><Link to="/products?category=Electronics" className="hover:underline">Electronics</Link></li>
            <li><Link to="/products?category=Clothing" className="hover:underline">Clothing</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">Help</h4>
          <ul className="space-y-1.5 text-[hsl(var(--marketplace-header-foreground)/0.7)]">
            <li><Link to="/" className="hover:underline">Customer Service</Link></li>
            <li><Link to="/" className="hover:underline">Returns</Link></li>
            <li><Link to="/" className="hover:underline">Shipping</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">Connect</h4>
          <ul className="space-y-1.5 text-[hsl(var(--marketplace-header-foreground)/0.7)]">
            <li><Link to="/" className="hover:underline">Instagram</Link></li>
            <li><Link to="/" className="hover:underline">Twitter</Link></li>
            <li><Link to="/" className="hover:underline">Facebook</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[hsl(var(--marketplace-header-foreground)/0.1)] mt-6 pt-4 text-center text-xs text-[hsl(var(--marketplace-header-foreground)/0.5)]">
        © 2024 ShopHub. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
