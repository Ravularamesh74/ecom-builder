import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products, categories } from "@/data/products";

const priceRanges = [
  { label: "Under ₹2500", min: 0, max: 2500 },
  { label: "₹2500 – ₹5000", min: 2500, max: 5000 },
  { label: "₹5000 – ₹10000", min: 5000, max: 10000 },
  { label: "₹10000 – ₹20000", min: 10000, max: 20000 },
  { label: "Over ₹20000", min: 20000, max: Infinity },
];

const ITEMS_PER_PAGE = 8;

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");
  const [selectedPriceRange, setSelectedPriceRange] = useState<number | null>(null);
  const [minRating, setMinRating] = useState(0);
  const [productType, setProductType] = useState<"" | "physical" | "digital">("");
  const [sortBy, setSortBy] = useState("featured");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const searchParam = searchParams.get("search") || "";

  // ✅ Sync URL
  useEffect(() => {
    const params: any = {};
    if (selectedCategory) params.category = selectedCategory;
    if (searchParam) params.search = searchParam;
    setSearchParams(params);
  }, [selectedCategory]);

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (searchParam) {
      const q = searchParam.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (selectedCategory)
      result = result.filter((p) => p.category === selectedCategory);

    if (selectedPriceRange !== null) {
      const range = priceRanges[selectedPriceRange];
      result = result.filter(
        (p) => p.price >= range.min && p.price < range.max
      );
    }

    if (minRating > 0)
      result = result.filter((p) => p.rating >= minRating);

    if (productType)
      result = result.filter((p) => p.type === productType);

    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [searchParam, selectedCategory, selectedPriceRange, minRating, productType, sortBy]);

  // ✅ Pagination
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const clearFilters = () => {
    setSelectedCategory("");
    setSelectedPriceRange(null);
    setMinRating(0);
    setProductType("");
    setPage(1);
  };

  return (
    <div className="container py-6">

      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">
          {searchParam ? `Results for "${searchParam}"` : "All Products"}
        </h1>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden border px-3 py-1 flex gap-1"
        >
          <SlidersHorizontal size={16} /> Filters
        </button>
      </div>

      {/* FILTER CHIPS */}
      <div className="flex gap-2 flex-wrap mb-4">
        {selectedCategory && (
          <span className="bg-accent px-3 py-1 text-sm rounded flex items-center gap-1">
            {selectedCategory}
            <X size={14} onClick={() => setSelectedCategory("")} />
          </span>
        )}
        {minRating > 0 && (
          <span className="bg-accent px-3 py-1 text-sm rounded">
            {minRating}★+
          </span>
        )}
      </div>

      <div className="flex gap-6">

        {/* SIDEBAR */}
        <aside className="hidden lg:block w-56">
          <div className="bg-card p-4 rounded border sticky top-32 space-y-4">

            <h3 className="font-semibold">Category</h3>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="block text-sm"
              >
                {cat}
              </button>
            ))}

            <h3 className="font-semibold mt-4">Price</h3>
            {priceRanges.map((r, i) => (
              <button
                key={r.label}
                onClick={() => setSelectedPriceRange(i)}
                className="block text-sm"
              >
                {r.label}
              </button>
            ))}

            <button
              onClick={clearFilters}
              className="text-red-500 text-sm mt-4"
            >
              Clear Filters
            </button>
          </div>
        </aside>

        {/* PRODUCTS */}
        <div className="flex-1">

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {paginatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          {/* PAGINATION */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 border rounded ${
                  page === i + 1 ? "bg-primary text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Products;