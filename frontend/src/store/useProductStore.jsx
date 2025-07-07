import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "";

export const useProductStore = create((set, get) => ({
  // products: Ürünlerin tutulduğu dizi
  products: [],
  // loading: Yüklenme durumunu belirten boolean
  loading: false,
  // error: Hata mesajı
  error: null,
  // currentProduct: Seçili/aktif ürün
  currentProduct: null,

  // formData: Ürün ekleme/güncelleme formunun state'i
  formData: {
    name: "",
    price: "",
    image: "",
  },

  // setFormData: Form verisini güncelleyen fonksiyon
  setFormData: (formData) => set({ formData }),

  // resetForm: Formu sıfırlayan fonksiyon
  resetForm: () => set({ formData: { name: "", price: "", image: "" } }),

  // addProduct: Yeni ürün ekleyen fonksiyon (form submit ile tetiklenir)
  addProduct: async (e) => {
    e.preventDefault(); // Formun varsayılan davranışını engelle sayfa yenilenmesi vs.
    set({ loading: true }); // Yüklenme durumunu başlat

    try {
      const { formData } = get(); // Güncel form verisini al
      await axios.post(`${BASE_URL}/api/products`, formData); // API'ye yeni ürün ekle
      await get().fetchProducts(); // Ürün listesini güncelle
      get().resetForm(); // Formu sıfırla
      toast.success("Ürün başarıyla eklendi"); // Başarı bildirimi göster
      document.getElementById("add_product_modal").close(); // Modalı kapat
    } catch (error) {
      console.log("addProduct fonksiyonunda hata", error);
      toast.error("Bir hata oluştu");
    } finally {
      set({ loading: false }); // Yüklenme durumunu bitir
    }
  },

  // fetchProducts: Tüm ürünleri API'den çeken fonksiyon
  fetchProducts: async () => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products`);
      //   response.data.data => İlk data => Axios'un cevabındaki ana veri (response.data) İkinci data => Backend'in JSON'undaki ürünler dizisi
      set({ products: response.data.data, error: null }); // Ürünleri state'e kaydet
    } catch (err) {
      // Eğer rate limit hatası varsa özel mesaj göster
      if (err.status == 429) set({ error: "Çok fazla istek atıldı", products: [] });
      else set({ error: "Bir hata oluştu", products: [] });
    } finally {
      set({ loading: false });
    }
  },

  // deleteProduct: Belirli bir ürünü silen fonksiyon
  deleteProduct: async (id) => {
    console.log("deleteProduct fonksiyonu çağrıldı", id);
    set({ loading: true });
    try {
      await axios.delete(`${BASE_URL}/api/products/${id}`); // API'den ürünü sil
      // Silinen ürünü products dizisinden çıkar
      set((prev) => ({ products: prev.products.filter((product) => product.id !== id) }));
      toast.success("Ürün başarıyla silindi");
    } catch (error) {
      console.log("deleteProduct fonksiyonunda hata", error);
      toast.error("Bir hata oluştu");
    } finally {
      set({ loading: false });
    }
  },

  // fetchProduct: Belirli bir ürünü (detayını) API'den çeken fonksiyon
  fetchProduct: async (id) => {
    set({ loading: true });
    try {
      const response = await axios.get(`${BASE_URL}/api/products/${id}`);
      set({
        currentProduct: response.data.data, // Seçili ürünü state'e kaydet
        formData: response.data.data, // Formu mevcut ürünle doldur
        error: null,
      });
    } catch (error) {
      console.log("fetchProduct fonksiyonunda hata", error);
      set({ error: "Bir hata oluştu", currentProduct: null });
    } finally {
      set({ loading: false });
    }
  },

  // updateProduct: Belirli bir ürünü güncelleyen fonksiyon
  updateProduct: async (id) => {
    set({ loading: true });
    try {
      const { formData } = get(); // Güncel form verisini al
      const response = await axios.put(`${BASE_URL}/api/products/${id}`, formData); // API'ye güncellenmiş ürünü gönder
      set({ currentProduct: response.data.data }); // Güncellenen ürünü state'e kaydet
      toast.success("Ürün başarıyla güncellendi");
    } catch (error) {
      toast.error("Bir hata oluştu");
      console.log("updateProduct fonksiyonunda hata", error);
    } finally {
      set({ loading: false });
    }
  },
}));
