import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container py-16 text-center">
        <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Looks like you haven't added any products yet.</p>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold hover:bg-primary/90 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <Link to="/products" className="inline-flex items-center gap-1 text-sm text-primary hover:underline mb-4">
        <ArrowLeft className="w-4 h-4" /> Continue Shopping
      </Link>

      <h1 className="text-2xl font-bold mb-6">Shopping Cart ({totalItems} items)</h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Cart items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div key={product.id} className="bg-card border border-border rounded-lg p-4 flex gap-4">
              <Link to={`/product/${product.id}`} className="w-24 h-24 flex-shrink-0 rounded-md overflow-hidden bg-muted">
                <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <Link to={`/product/${product.id}`} className="font-medium text-sm hover:text-primary line-clamp-2">
                  {product.title}
                </Link>
                <span className={`inline-block text-xs mt-1 px-2 py-0.5 rounded-full ${
                  product.type === "digital" ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"
                }`}>
                  {product.type === "digital" ? "Digital" : "Physical"}
                </span>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex items-center border border-border rounded-md">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="p-1.5 hover:bg-muted transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-3 text-sm font-medium">{quantity}</span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="p-1.5 hover:bg-muted transition-colors"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-destructive hover:text-destructive/80 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="font-bold text-price">${(product.price * quantity).toFixed(2)}</p>
                {quantity > 1 && (
                  <p className="text-xs text-muted-foreground">${product.price.toFixed(2)} each</p>
                )}
              </div>
            </div>
          ))}
          <button onClick={clearCart} className="text-sm text-destructive hover:underline">
            Clear Cart
          </button>
        </div>

        {/* Order summary */}
        <div className="bg-card border border-border rounded-lg p-6 h-fit sticky top-36">
          <h2 className="text-lg font-bold mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal ({totalItems} items)</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span className={totalPrice >= 50 ? "text-marketplace-badge font-medium" : ""}>
                {totalPrice >= 50 ? "FREE" : "$5.99"}
              </span>
            </div>
            <div className="border-t border-border pt-2 flex justify-between font-bold text-base">
              <span>Total</span>
              <span className="text-price">${(totalPrice + (totalPrice >= 50 ? 0 : 5.99)).toFixed(2)}</span>
            </div>
          </div>
          <button className="w-full bg-primary text-primary-foreground py-3 rounded-md font-semibold mt-4 hover:bg-primary/90 transition-colors">
            Proceed to Checkout
          </button>
          <p className="text-xs text-muted-foreground text-center mt-2">
            {totalPrice < 50 && `Add $${(50 - totalPrice).toFixed(2)} more for free shipping`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
