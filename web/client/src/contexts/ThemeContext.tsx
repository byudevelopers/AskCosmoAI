import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";

type ThemeMode = "light" | "dark";

interface ThemeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Color constants for better maintainability
const COLORS = {
  dark: {
    primary: "#4A90E2",
    primaryLight: "#6BA6F5",
    primaryDark: "#2E5B8A",
    secondary: "#6BA6F5",
    secondaryLight: "#8BB8F8",
    secondaryDark: "#4A90E2",
    background: "#121212",
    paper: "#1E1E1E",
    text: "#FFFFFF",
    textSecondary: "#B0B0B0",
  },
  light: {
    primary: "#002E5D",
    primaryLight: "#0047BA",
    primaryDark: "#001A3A",
    secondary: "#0047BA",
    secondaryLight: "#3D6BDB",
    secondaryDark: "#002E5D",
    background: "#FFFFFF",
    paper: "#FFFFFF",
    text: "#002E5D",
    textSecondary: "#666666",
  },
} as const;

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const CustomThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
}) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    const savedMode = localStorage.getItem("themeMode") as ThemeMode;
    return savedMode || "dark";
  });

  useEffect(() => {
    localStorage.setItem("themeMode", mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme = useMemo(() => {
    const colors = COLORS[mode];

    return createTheme({
      palette: {
        mode,
        primary: {
          main: colors.primary,
          light: colors.primaryLight,
          dark: colors.primaryDark,
          contrastText: mode === "dark" ? "#000000" : "#FFFFFF",
        },
        secondary: {
          main: colors.secondary,
          light: colors.secondaryLight,
          dark: colors.secondaryDark,
          contrastText: mode === "dark" ? "#000000" : "#FFFFFF",
        },
        background: {
          default: colors.background,
          paper: colors.paper,
        },
        text: {
          primary: colors.text,
          secondary: colors.textSecondary,
        },
      },
      typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        h1: { fontWeight: 700, color: colors.text },
        h2: { fontWeight: 700, color: colors.text },
        h3: { fontWeight: 600, color: colors.text },
        h4: { fontWeight: 600, color: colors.text },
        h5: { fontWeight: 500, color: colors.text },
        h6: { fontWeight: 500, color: colors.text },
      },
      components: {
        MuiButton: {
          styleOverrides: {
            root: {
              borderRadius: 8,
              textTransform: "none",
              fontWeight: 500,
            },
            contained: {
              boxShadow:
                mode === "dark"
                  ? "0 2px 8px rgba(74, 144, 226, 0.3)"
                  : "0 2px 8px rgba(0, 46, 93, 0.2)",
              "&:hover": {
                boxShadow:
                  mode === "dark"
                    ? "0 4px 12px rgba(74, 144, 226, 0.4)"
                    : "0 4px 12px rgba(0, 46, 93, 0.3)",
              },
            },
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              borderRadius: 12,
              boxShadow:
                mode === "dark"
                  ? "0 2px 12px rgba(0, 0, 0, 0.3)"
                  : "0 2px 12px rgba(0, 46, 93, 0.1)",
            },
          },
        },
        MuiAppBar: {
          styleOverrides: {
            root: {
              backgroundColor: colors.paper,
              color: colors.text,
              boxShadow:
                mode === "dark"
                  ? "0 1px 4px rgba(0, 0, 0, 0.3)"
                  : "0 1px 4px rgba(0, 46, 93, 0.1)",
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              backgroundColor: colors.paper,
            },
          },
        },
      },
    });
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
