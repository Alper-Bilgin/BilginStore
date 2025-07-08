import { DollarSignIcon, ImageIcon, Package2Icon, PlusCircleIcon } from "lucide-react"; // İkonlar için
import { useProductStore } from "../store/useProductStore"; // Zustand store'dan ürün işlemleri için

function AddProductModal() {
  // Zustand store'dan ürün ekleme fonksiyonu, form verisi ve loading state'ini al
  const { addProduct, formData, setFormData, loading } = useProductStore();

  return (
    // DaisyUI modal bileşeni
    <dialog id="add_product_modal" className="modal">
      <div className="modal-box">
        {/* Kapatma butonu (sağ üstte X) */}
        {/* Buradaki <form> kaldırılmalı, sadece <button> kullanılmalı */}
        <button type="button" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => document.getElementById("add_product_modal").close()}>
          X
        </button>

        {/* Modal başlığı */}
        <h3 className="font-bold text-xl mb-8">Yeni Ürün Ekle</h3>

        {/* Ürün ekleme formu */}
        <form onSubmit={addProduct} className="space-y-6">
          <div className="grid gap-6">
            {/* Ürün Adı Girişi */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Ürün Adı</span>
              </label>
              <div className="relative">
                {/* Sol tarafta ikon */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <Package2Icon className="size-5" />
                </div>
                {/* Ürün adı inputu */}
                <input
                  type="text"
                  placeholder="Ürün adını girin"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
            </div>

            {/* Ürün Fiyatı Girişi */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Fiyat</span>
              </label>
              <div className="relative">
                {/* Sol tarafta ikon */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <DollarSignIcon className="size-5" />
                </div>
                {/* Fiyat inputu */}
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>
            </div>

            {/* Ürün Görseli (URL) Girişi */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-base font-medium">Görsel URL</span>
              </label>
              <div className="relative">
                {/* Sol tarafta ikon */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-base-content/50">
                  <ImageIcon className="size-5" />
                </div>
                {/* Görsel URL inputu */}
                <input
                  type="text"
                  placeholder="https://ornek.com/gorsel.jpg"
                  className="input input-bordered w-full pl-10 py-3 focus:input-primary transition-colors duration-200"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Modal altındaki aksiyon butonları */}
          <div className="modal-action">
            {/* İptal butonu: Modalı kapatır */}
            <button type="button" className="btn btn-ghost" onClick={() => document.getElementById("add_product_modal").close()}>
              İptal
            </button>
            {/* Ürün ekle butonu: Formu gönderir */}
            <button type="submit" className="btn btn-primary min-w-[120px]" disabled={!formData.name || !formData.price || !formData.image || loading}>
              {loading ? (
                // Yüklenme animasyonu
                <span className="loading loading-spinner loading-sm" />
              ) : (
                <>
                  <PlusCircleIcon className="size-5 mr-2" />
                  Ürünü Ekle
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Modal arka planı (tıklayınca modalı kapatır) */}
      {/* DaisyUI gereği burada form kalabilir, ancak üstteki iç içe form hatası çözülmüş olur */}
      <form method="dialog" className="modal-backdrop">
        <button>Kapat</button>
      </form>
    </dialog>
  );
}

export default AddProductModal;
