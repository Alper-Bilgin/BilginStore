import { useEffect } from "react";
import { useProductStore } from "../store/useProductStore"; // Zustand store'dan ürün işlemleri için
import { PackageIcon, PlusCircleIcon, RefreshCwIcon } from "lucide-react"; // İkonlar için
import ProductCard from "../components/ProductCard"; // Ürün kartı bileşeni
import AddProductModal from "../components/AddProductModal"; // Ürün ekleme modalı

function HomePage() {
  // Zustand store'dan ürünler, yüklenme durumu, hata ve ürünleri çekme fonksiyonunu al
  const { products, loading, error, fetchProducts } = useProductStore();

  // Sayfa ilk yüklendiğinde ürünleri API'den çek
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 ">
      {/* Üst kısım: Ürün ekle ve yenile butonları */}
      <div className="flex justify-between items-center mb-8">
        {/* Ürün ekle butonu (modalı açar) */}
        <button className="btn btn-primary" onClick={() => document.getElementById("add_product_modal").showModal()}>
          <PlusCircleIcon className="size-5 mr-2" />
          Ürün Ekle
        </button>
        {/* Yenile butonu (ürünleri tekrar çeker) */}
        <button className="btn btn-ghost btn-circle" onClick={fetchProducts}>
          <RefreshCwIcon className="size-5" />
        </button>
      </div>

      {/* Ürün ekleme modalı */}
      <AddProductModal />

      {/* Hata varsa hata mesajı göster */}
      {error && <div className="alert alert-error mb-8">{error}</div>}

      {/* Ürün yoksa ve yüklenmiyorsa bilgilendirici mesaj göster */}
      {products.length === 0 && !loading && (
        <div className="flex flex-col justify-center items-center h-96 space-y-4">
          {/* Paket ikonu */}
          <div className="bg-base-100 rounded-full p-6">
            <PackageIcon className="size-12" />
          </div>
          {/* Bilgilendirici metin */}
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold">Hiç ürün bulunamadı</h3>
            <p className="text-gray-500 max-w-sm">Envantere ilk ürününü ekleyerek başlayabilirsin.</p>
          </div>
        </div>
      )}

      {/* Yüklenme durumunda spinner göster */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        // Ürünler yüklendiyse ürün kartlarını listele
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}

export default HomePage;
