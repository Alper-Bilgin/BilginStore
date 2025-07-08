// Gerekli React ve kütüphane fonksiyonlarını içe aktar
import { useNavigate, useParams } from "react-router-dom"; // Sayfa yönlendirme ve URL parametreleri için
import { useProductStore } from "../store/useProductStore"; // Zustand ile ürün state yönetimi için
import { useEffect } from "react"; // Yan etkiler (component mount, update) için
import { ArrowLeftIcon, SaveIcon, Trash2Icon } from "lucide-react"; // İkonlar için

function ProductPage() {
  // Zustand store'dan gerekli state ve fonksiyonları al
  const {
    currentProduct, // Seçili ürünün detayları
    formData, // Formda gösterilecek ürün verisi
    setFormData, // Form verisini güncelleyen fonksiyon
    loading, // Yüklenme durumu
    error, // Hata mesajı
    fetchProduct, // Ürün detayını API'den çeken fonksiyon
    updateProduct, // Ürünü güncelleyen fonksiyon
    deleteProduct, // Ürünü silen fonksiyon
  } = useProductStore();

  const navigate = useNavigate(); // Sayfa yönlendirme fonksiyonu
  const { id } = useParams(); // URL'den ürün id'sini al

  // Sayfa yüklendiğinde veya id değiştiğinde ürünü API'den çek
  useEffect(() => {
    fetchProduct(id);
  }, [fetchProduct, id]);

  // Ürünü silme işlemi için fonksiyon
  const handleDelete = async () => {
    if (window.confirm("Bu ürünü silmek istediğinizden emin misiniz?")) {
      await deleteProduct(id); // Ürünü sil
      navigate("/"); // Ana sayfaya yönlendir
    }
  };

  // Yüklenme durumunda spinner göster
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loading loading-spinner loading-lg" />
      </div>
    );
  }

  // Hata varsa hata mesajı göster
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="alert alert-error">{error}</div>
      </div>
    );
  }

  // Sayfa içeriği (ürün düzenleme formu ve görseli)
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Geri dön butonu */}
      <button onClick={() => navigate("/")} className="btn btn-ghost mb-8">
        <ArrowLeftIcon className="size-4 mr-2" />
        Ürünlere Dön
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Ürün görseli */}
        <div className="rounded-lg overflow-hidden shadow-lg bg-base-100">
          <img src={currentProduct?.image} alt={currentProduct?.name} className="size-full object-cover" />
        </div>

        {/* Ürün düzenleme formu */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-6">Ürünü Düzenle</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault(); // Sayfa yenilenmesini engelle
                updateProduct(id); // Ürünü güncelle
              }}
              className="space-y-6"
            >
              {/* Ürün adı alanı */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">Ürün Adı</span>
                </label>
                <input type="text" placeholder="Ürün adını girin" className="input input-bordered w-full" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>

              {/* Ürün fiyatı alanı */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">Fiyat</span>
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="input input-bordered w-full"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>

              {/* Ürün görseli URL alanı */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base font-medium">Görsel URL</span>
                </label>
                <input
                  type="text"
                  placeholder="https://ornek.com/gorsel.jpg"
                  className="input input-bordered w-full"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>

              {/* Form aksiyon butonları */}
              <div className="flex justify-between mt-8">
                {/* Silme butonu */}
                <button type="button" onClick={handleDelete} className="btn btn-error">
                  <Trash2Icon className="size-4 mr-2" />
                  Ürünü Sil
                </button>

                {/* Kaydet butonu */}
                <button type="submit" className="btn btn-primary" disabled={loading || !formData.name || !formData.price || !formData.image}>
                  {loading ? (
                    <span className="loading loading-spinner loading-sm" />
                  ) : (
                    <>
                      <SaveIcon className="size-4 mr-2" />
                      Değişiklikleri Kaydet
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
