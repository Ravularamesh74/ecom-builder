import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";

const priceRanges = [
  { label: "Under $25", min: 0, max: 25 },
  { label: "$25 – $50", min: 25, max: 50 },
  { label: "$50 – $100", min: 50, max: 100 },
  { label: "$100 – $200", min: 100, max: 200 },
  { label: "Over $200", min: 200, max: Infinity },
];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "";
  const searchParam = searchParams.get("search") || "";

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [minRating, setMinRating] = useState(0);
  const [productType, setProductType] = useState<"" | "physical" | "digital">("");
  const [sortBy, setSortBy] = useState("featured");
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchParam) {
      const q = searchParam.toLowerCase();
      result = result.filter(
        (p) => p.title.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }
    if (selectedCategory) result = result.filter((p) => p.category === selectedCategory);
    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange];
      result = result.filter((p) => p.price >= range.min && p.price < range.max);
    }
    if (minRating > 0) result = result.filter((p) => p.rating >= minRating);
    if (productType) result = result.filter((p) => p.type === productType);

    switch (sortBy) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "rating": result.sort((a, b) => b.rating - a.rating); break;
      case "reviews": result.sort((a, b) => b.reviewCount - a.reviewCount); break;
    }

    return result;
  }, [searchParam, selectedCategory, selectedPriceRange, minRating, productType, sortBy]);

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedPriceRange(null);
    setMinRating(0);
    setProductType("");
    setSearchParams({});
  };

  const hasFilters = selectedCategory || selectedPriceRange !== null || minRating > 0 || productType || searchParam;

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Category */}
      <div>
        <h3 className="font-semibold text-sm mb-2">Category</h3>
        <ul className="space-y-1">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => { setSelectedCategory(selectedCategory === cat ? "" : cat); }}
                className={`text-sm w-full text-left px-2 py-1 rounded hover:bg-accent transition-colors ${
                  selectedCategory === cat ? "bg-accent text-primary font-medium" : "text-foreground"
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-semibold text-sm mb-2">Price</h3>
        <ul className="space-y-1">
          {priceRanges.map((range, i) => (
            <li key={range.label}>
              <button
                onClick={() => setSelectedPriceRange(selectedPriceRange === i ? null : i)}
                className={`text-sm w-full text-left px-2 py-1 rounded hover:bg-accent transition-colors ${
                  selectedPriceRange === i ? "bg-accent text-primary font-medium" : "text-foreground"
                }`}
              >
                {range.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-semibold text-sm mb-2">Customer Rating</h3>
        <ul className="space-y-1">
          {[4, 3, 2, 1].map((r) => (
            <li key={r}>
              <button
                onClick={() => setMinRating(minRating === r ? 0 : r)}
                className={`text-sm w-full text-left px-2 py-1 rounded hover:bg-accent transition-colors ${
                  minRating === r ? "bg-accent text-primary font-medium" : "text-foreground"
                }`}
              >
                {r}★ & Up
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Type */}
      <div>
        <h3 className="font-semibold text-sm mb-2">Product Type</h3>
        <ul className="space-y-1">
          {(["physical", "digital"] as const).map((t) => (
            <li key={t}>
              <button
                onClick={() => setProductType(productType === t ? "" : t)}
                className={`text-sm w-full text-left px-2 py-1 rounded capitalize hover:bg-accent transition-colors ${
                  productType === t ? "bg-accent text-primary font-medium" : "text-foreground"
                }`}
              >
                {t}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="container py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold">
            {searchParam ? `Results for "${searchParam}"` : selectedCategory || "All Products"}
          </h1>
          <p className="text-sm text-muted-foreground">{filteredProducts.length} products found</p>
        </div>
        <div className="flex items-center gap-3">
          {hasFilters && (
            <button onClick={clearFilters} className="text-sm text-primary hover:underline flex items-center gap-1">
              <X className="w-3 h-3" /> Clear
            </button>
          )}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="text-sm border border-border rounded-md px-3 py-1.5 bg-card"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Avg. Rating</option>
            <option value="reviews">Most Reviews</option>
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-1 text-sm border border-border rounded-md px-3 py-1.5 bg-card"
          >
            <SlidersHorizontal className="w-4 h-4" /> Filters
          </button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-56 flex-shrink-0">
          <div className="bg-card border border-border rounded-lg p-4 sticky top-36">
            <FilterSidebar />
          </div>
        </aside>

        {/* Mobile filter drawer */}
        {showFilters && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-foreground/50" onClick={() => setShowFilters(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-72 bg-card p-4 overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-bold">Filters</h2>
                <button onClick={() => setShowFilters(false)}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterSidebar />
            </div>
          </div>
        )}

        {/* Product grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg font-medium">No products found</p>
              <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
