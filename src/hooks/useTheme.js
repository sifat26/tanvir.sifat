import { useEffect, useState, useCallback } from "react";

/**
 * useTheme — persistent dark/light theme with system preference fallback.
 * Reads the `dark` class already set by the no-flash script in index.html.
 */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return document.documentElement.classList.contains("dark") ? "dark" : "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
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
