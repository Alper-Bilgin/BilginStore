import { create } from "zustand";
// useThemeStore adında bir Zustand store'u oluştur ve dışa aktar
export const useThemeStore = create((set, get) => ({
  // theme: Uygulamanın mevcut temasını tutan state.
  // Eğer localStorage'da daha önce kaydedilmiş bir tema varsa onu alır,
  // yoksa varsayılan olarak "forest" temasını kullanır.
  theme: localStorage.getItem("preferred-theme") || "forest",

  // setTheme: Temayı değiştiren fonksiyon.
  // Yeni tema seçildiğinde hem localStorage'a kaydeder,
  // hem de Zustand store'daki theme değerini günceller.
  setTheme: (theme) => {
    localStorage.setItem("preferred-theme", theme); // Seçilen temayı localStorage'a kaydet
    set({ theme }); // Zustand store'daki theme değerini güncelle
  },
}));
