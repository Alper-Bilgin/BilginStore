import { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import { PlusCircleIcon, RefreshCwIcon } from "lucide-react";

function HomePage() {
  const { products, loading, error, fetchProducts } = useProductStore;

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  console.log("Ürünler : ", products);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 ">
      <div className="flex justify-between items-center mb-8">
        <button className="btn btn-primary" onClick={() => document.getElementById("add_product_modal").showModal()}>
          <PlusCircleIcon className="size-5 mr-2" />
          Add Product
        </button>
        <button className="btn btn-ghost btn-circle" onClick={fetchProducts}>
          <RefreshCwIcon className="size-5" />
        </button>
      </div>

      {error && <div className="alert alert-error mb-8">{error}</div>}
    </main>
  );
}

export default HomePage;
