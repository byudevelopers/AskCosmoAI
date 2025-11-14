import { Box, Typography, Link } from "@mui/material";
import { GitHub as GitHubIcon } from "@mui/icons-material";

function SimpleFooter() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "background.paper",
        py: 3,
        mt: "auto",
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          © {new Date().getFullYear()} AskCosmoAI. All rights reserved.
        </Typography>
        <Link
          href="https://github.com/byudevelopers/AskCosmoAI"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            gap: 1,
            textDecoration: "none",
            color: "text.secondary",
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          <GitHubIcon />
          View on GitHub
        </Link>
      </Box>
    </Box>
  );
}

export default SimpleFooter;
