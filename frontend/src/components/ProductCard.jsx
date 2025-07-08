import { EditIcon, Trash2Icon } from "lucide-react"; // Düzenle ve sil ikonları için
import { Link } from "react-router-dom"; // Sayfa yönlendirme için Link bileşeni
import { useProductStore } from "../store/useProductStore"; // Zustand store'dan ürün işlemleri için

function ProductCard({ product }) {
  // Zustand store'dan deleteProduct fonksiyonunu al
  const { deleteProduct } = useProductStore();

  return (
    // Kart bileşeni (DaisyUI + Tailwind ile)
    <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
      {/* Ürün görseli */}
      <figure className="relative pt-[56.25%]">
        {/* Görsel oranı 16:9 olacak şekilde ayarlanır */}
        <img src={product.image} alt={product.name} className="absolute top-0 left-0 w-full h-full object-cover" />
      </figure>

      <div className="card-body">
        {/* Ürün adı */}
        <h2 className="card-title text-lg font-semibold">{product.name}</h2>
        {/* Ürün fiyatı */}
        <p className="text-2xl font-bold text-primary">₺{Number(product.price).toFixed(2)}</p>

        {/* Kart aksiyonları (düzenle ve sil butonları) */}
        <div className="card-actions justify-end mt-4">
          {/* Düzenle butonu: Ürün detay sayfasına yönlendirir */}
          <Link to={`/product/${product.id}`} className="btn btn-sm btn-info btn-outline" title="Düzenle">
            <EditIcon className="size-4" />
          </Link>

          {/* Sil butonu: Ürünü siler */}
          <button className="btn btn-sm btn-error btn-outline" onClick={() => deleteProduct(product.id)} title="Sil">
            <Trash2Icon className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
