import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404:", location.pathname);

    // 🔥 Replace with real analytics (Sentry / LogRocket)
    // logErrorToService(location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <div className="text-center max-w-md">

        {/* Illustration */}
        <div className="text-7xl mb-4">😕</div>

        {/* Title */}
        <h1 className="text-5xl font-extrabold mb-2">404</h1>
        <p className="text-lg text-muted-foreground mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">

          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 bg-secondary px-5 py-2.5 rounded-md hover:bg-secondary/80"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-primary text-white px-5 py-2.5 rounded-md hover:bg-primary/90"
          >
            Home
          </Link>
        </div>

        {/* Search */}
        <div className="mt-6">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-primary hover:underline text-sm"
          >
            <Search className="w-4 h-4" />
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;