import type { ReactNode } from "react";
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "default" | "modern-minimal" | "supabase";
type Mode = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  mode: Mode;
  setTheme: (theme: Theme) => void;
  setMode: (mode: Mode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Initialize state with stored values or defaults
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "default";
    try {
      const stored = localStorage.getItem("theme");
      return (stored as Theme) || "default";
    } catch {
      return "default";
    }
  });

  const [mode, setModeState] = useState<Mode>(() => {
    if (typeof window === "undefined") return "light";
    try {
      const stored = localStorage.getItem("theme-mode");
      return (stored as Mode) || "light";
    } catch {
      return "light";
    }
  });

  // Apply theme to document
  const applyTheme = (newTheme: Theme, newMode: Mode) => {
    try {
      // Remove any existing theme classes
      document.documentElement.className = document.documentElement.className
        .split(" ")
        .filter((cls) => !cls.startsWith("theme-"))
        .join(" ");

      // Add new theme class
      document.documentElement.classList.add(`theme-${newTheme}`);

      // Handle dark mode
      if (newMode === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } catch (error) {
      console.error("Error applying theme:", error);
    }
  };

  // Set theme and persist
  const setTheme = (newTheme: Theme) => {
    try {
      setThemeState(newTheme);
      localStorage.setItem("theme", newTheme);
      applyTheme(newTheme, mode);
    } catch (error) {
      console.error("Error setting theme:", error);
    }
  };

  // Set mode and persist
  const setMode = (newMode: Mode) => {
    try {
      setModeState(newMode);
      localStorage.setItem("theme-mode", newMode);
      applyTheme(theme, newMode);
    } catch (error) {
      console.error("Error setting mode:", error);
    }
  };

  // Toggle mode
  const toggleMode = () => {
    setMode(mode === "light" ? "dark" : "light");
  };

  // Apply theme on mount and when theme/mode changes
  useEffect(() => {
    applyTheme(theme, mode);
  }, [theme, mode]);

  // Listen for storage changes (for sync across tabs)
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "theme" && e.newValue) {
        const newTheme = e.newValue as Theme;
        if (newTheme !== theme) {
          setThemeState(newTheme);
        }
      }
      if (e.key === "theme-mode" && e.newValue) {
        const newMode = e.newValue as Mode;
        if (newMode !== mode) {
          setModeState(newMode);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [theme, mode]);

  // Ensure theme is applied on initial render (in case early script failed)
  useEffect(() => {
    applyTheme(theme, mode);
  }, []);

  const value: ThemeContextType = {
    theme,
    mode,
    setTheme,
    setMode,
    toggleMode,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
