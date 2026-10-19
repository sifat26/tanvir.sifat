import { useEffect, useState, useCallback } from "react";

/**
 * useTheme — persistent dark/light theme with system preference fallback.
 * Reads the `dark` class already set by the no-flash script in index.html.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") return saved;
    return document.documentElement.classList.contains("light") ? "light" : "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
      root.setAttribute("data-theme", "light");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
      root.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem("theme", theme);
    } catch (_) {
      /* ignore */
    }
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((t) => (t === "dark" ? "light" : "dark"));
  }, []);

  return { theme, toggle, setTheme };
}
