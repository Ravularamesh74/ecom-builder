import { Link } from "react-router-dom";
import { Package, ArrowLeft, CheckCircle, Clock, XCircle } from "lucide-react";
import { products } from "@/data/products";
import { toast } from "sonner";

// 🔥 MOCK ORDERS (replace with API later)
const orders = [
  {
    id: "ORD123",
    date: "2026-03-15",
    status: "delivered",
    total: 120,
    items: [products[0], products[1]],
  },
  {
    id: "ORD124",
    date: "2026-03-18",
    status: "processing",
    total: 75,
    items: [products[2]],
  },
];

const statusMap = {
  delivered: {
    label: "Delivered",
    icon: CheckCircle,
    color: "text-green-600",
  },
  processing: {
    label: "Processing",
    icon: Clock,
    color: "text-yellow-500",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    color: "text-red-500",
  },
};

const Orders = () => {
  if (orders.length === 0) {
    return (
      <div className="container py-16 text-center">
        <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold">No orders yet</h1>
        <p className="text-muted-foreground mb-6">
          Start shopping to see your orders here.
        </p>
        <Link
          to="/products"
          className="bg-primary text-white px-6 py-3 rounded-lg"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-6">

      {/* HEADER */}
      <Link
        to="/"
        className="flex items-center gap-1 text-sm text-primary mb-4"
      >
        <ArrowLeft size={16} /> Back to Home
      </Link>

      <h1 className="text-2xl font-bold mb-6">Your Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => {
          const StatusIcon = statusMap[order.status].icon;

          return (
            <div
              key={order.id}
              className="bg-card border rounded-xl p-5 space-y-4"
            >
              {/* TOP */}
              <div className="flex flex-col md:flex-row justify-between gap-3">

                <div>
                  <p className="font-semibold text-sm">
                    Order ID: {order.id}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Placed on{" "}
                    {new Date(order.date).toLocaleDateString()}
                  </p>
                </div>

                <div
                  className={`flex items-center gap-1 text-sm font-medium ${statusMap[order.status].color}`}
                >
                  <StatusIcon size={16} />
                  {statusMap[order.status].label}
                </div>

                <div className="font-bold">
                  ${order.total.toFixed(2)}
                </div>
              </div>

              {/* ITEMS */}
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3"
                  >
                    <img
                      src={item.images[0]}
                      className="w-14 h-14 rounded object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium line-clamp-1">
                        {item.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        ${item.price}
                      </p>
                    </div>

                    <Link
                      to={`/product/${item.id}`}
                      className="text-sm text-primary"
                    >
                      View
                    </Link>
                  </div>
                ))}
              </div>

              {/* ACTIONS */}
              <div className="flex gap-3 pt-2 border-t">
                <button
                  onClick={() => toast.success("Reordering items...")}
                  className="text-sm bg-primary text-white px-4 py-1.5 rounded-md"
                >
                  Reorder
                </button>

                <button className="text-sm border px-4 py-1.5 rounded-md">
                  Track Order
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;