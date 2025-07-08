import { PaletteIcon } from "lucide-react"; // Palet ikonu için
import { THEMES } from "../constants"; // Tema seçenekleri sabiti
import { useThemeStore } from "../store/useThemeStore"; // Zustand ile tema yönetimi

function ThemeSelector() {
  // Zustand store'dan mevcut tema ve tema değiştirme fonksiyonunu al
  const { theme, setTheme } = useThemeStore();

  return (
    // Dropdown menü (DaisyUI ile)
    <div className="dropdown dropdown-end">
      {/* Dropdown'u açan buton */}
      <button tabIndex={0} className="btn btn-ghost btn-circle">
        <PaletteIcon className="size-5" />
      </button>

      {/* Dropdown içeriği */}
      <div
        tabIndex={0}
        className="dropdown-content mt-2 p-1 shadow-2xl bg-base-200 backdrop-blur-lg rounded-2xl
        w-56 border border-base-content/10"
      >
        {/* Tüm tema seçeneklerini listele */}
        {THEMES.map((themeOption) => (
          <button
            key={themeOption.name}
            // Seçili tema ise arka plan ve yazı rengi farklı, değilse hover efekti uygula
            className={`
              w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-colors
              ${theme === themeOption.name ? "bg-primary/10 text-primary" : "hover:bg-base-content/5"}
            `}
            onClick={() => setTheme(themeOption.name)} // Temayı değiştir
          >
            {/* Tema ikonu */}
            <PaletteIcon className="size-4" />
            {/* Tema adı */}
            <span className="text-sm font-medium">{themeOption.label}</span>

            {/* Tema renk önizlemesi (küçük daireler) */}
            <div className="ml-auto flex gap-1">
              {themeOption.colors.map((color, i) => (
                <span key={i} className="size-2 rounded-full" style={{ backgroundColor: color }} />
              ))}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ThemeSelector;
