import { AppBar, Toolbar, Typography, Box, IconButton } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
import { useTheme } from "../contexts/ThemeContext";

function SimpleHeader() {
  const { mode, toggleMode } = useTheme();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ backgroundColor: "background.paper", color: "text.primary" }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              "& span": {
                color: "secondary.main",
              },
            }}
          >
            AskCosmo<span>AI</span>
          </Typography>
        </Box>
        <IconButton
          onClick={toggleMode}
          color="inherit"
          aria-label={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}
          sx={{
            ml: 1,
            transition: "transform 0.2s ease-in-out",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        >
          {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default SimpleHeader;
