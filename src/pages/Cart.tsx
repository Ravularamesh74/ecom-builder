import { Link } from "react-router-dom";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  Tag,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { toast } from "sonner";

const Cart = () => {
  const {
    items,
    removeFromCart,
    updateQuantity,
    totalPrice,
    totalItems,
    clearCart,
  } = useCart();

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  const SHIPPING_THRESHOLD = 50;
  const SHIPPING_COST = 5.99;

  const applyCoupon = () => {
    if (coupon === "SAVE10") {
      setDiscount(0.1);
      toast.success("Coupon applied!");
    } else {
      toast.error("Invalid coupon");
    }
  };

  const shipping = totalPrice >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const discountedTotal = totalPrice * (1 - discount);
  const finalTotal = discountedTotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container py-20 text-center">
        <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold">Your cart is empty</h1>
        <p className="text-muted-foreground mt-2 mb-6">
          Start adding products to see them here.
        </p>
        <Link
          to="/products"
          className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-6">
      <Link
        to="/products"
        className="flex items-center gap-1 text-sm text-primary mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Continue Shopping
      </Link>

      <h1 className="text-2xl font-bold mb-6">
        Shopping Cart ({totalItems})
      </h1>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* ITEMS */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, quantity }) => (
            <div
              key={product.id}
              className="bg-card border rounded-xl p-4 flex gap-4 hover:shadow-md transition"
            >
              <img
                src={product.images[0]}
                className="w-24 h-24 rounded object-cover"
              />

              <div className="flex-1">
                <h3 className="font-medium text-sm">
                  {product.title}
                </h3>

                {/* QUANTITY */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex border rounded">
                    <button
                      onClick={() =>
                        updateQuantity(product.id, quantity - 1)
                      }
                      className="p-1"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="px-3">{quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(product.id, quantity + 1)
                      }
                      className="p-1"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      removeFromCart(product.id);
                      toast.success("Item removed");
                    }}
                  >
                    <Trash2 className="text-red-500 w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="font-bold">
                ${(product.price * quantity).toFixed(2)}
              </div>
            </div>
          ))}

          <button
            onClick={() => {
              clearCart();
              toast.success("Cart cleared");
            }}
            className="text-sm text-red-500"
          >
            Clear Cart
          </button>
        </div>

        {/* SUMMARY */}
        <div className="bg-card border rounded-xl p-6 sticky top-24">
          <h2 className="font-bold mb-4">Order Summary</h2>

          {/* COUPON */}
          <div className="flex mb-4">
            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Coupon code"
              className="flex-1 border rounded-l px-3 py-2 text-sm"
            />
            <button
              onClick={applyCoupon}
              className="bg-primary px-3 rounded-r"
            >
              <Tag size={16} />
            </button>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-green-500">
                <span>Discount</span>
                <span>-{(discount * 100).toFixed(0)}%</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? "FREE" : `$${shipping}`}</span>
            </div>

            <div className="border-t pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
          </div>

          <button className="w-full bg-primary text-white py-3 rounded-lg mt-4 font-semibold">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;