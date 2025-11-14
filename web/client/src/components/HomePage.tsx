import { Container, Typography, Grid, Box, Paper } from "@mui/material";
import {
  Chat as ChatIcon,
  Speed as SpeedIcon,
  Group as GroupIcon,
} from "@mui/icons-material";

const features = [
  {
    title: "Conversational Support",
    description:
      "Get clear, contextual answers for admissions, classes, and campus life in seconds.",
    icon: ChatIcon,
    color: "primary.light",
  },
  {
    title: "Realtime Knowledge Base",
    description:
      "Grounded responses backed by curated university resources—always up to date.",
    icon: SpeedIcon,
    color: "secondary.light",
  },
  {
    title: "Shared Workspaces",
    description:
      "Bring classmates and advisors into the same conversation with secure access controls.",
    icon: GroupIcon,
    color: "primary.light",
  },
] as const;

function HomePage() {
  return (
    <Box sx={{ flexGrow: 1, py: 8 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "text.primary",
              mb: 2,
            }}
          >
            Your personalized guide to every question on campus
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ maxWidth: 600, mx: "auto", mb: 4 }}
          >
            Ask Cosmo AI to plan your semester, uncover campus resources, and
            keep every conversation organized.
          </Typography>
        </Box>

        {/* Feature Cards */}
        <Typography
          variant="h3"
          component="h2"
          sx={{
            textAlign: "center",
            mb: 6,
            fontWeight: "bold",
            color: "text.primary",
          }}
        >
          Made for curious minds
        </Typography>

        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            mb: 6,
            color: "text.secondary",
            maxWidth: 600,
            mx: "auto",
          }}
        >
          AskCosmo AI pairs natural conversation with institutional knowledge so
          your community can focus on learning, not searching.
        </Typography>

        <Grid container spacing={4}>
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Grid size={{ xs: 12, md: 4 }} key={index}>
                <Paper
                  elevation={3}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition:
                      "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: 6,
                    },
                    borderRadius: 3,
                    overflow: "hidden",
                  }}
                >
                  <Box sx={{ flexGrow: 1, p: 3 }}>
                    <Box sx={{ textAlign: "center", mb: 2 }}>
                      <IconComponent
                        sx={{ fontSize: 40, color: "primary.main" }}
                      />
                    </Box>
                    <Typography
                      variant="h5"
                      component="h3"
                      gutterBottom
                      sx={{
                        fontWeight: "bold",
                        textAlign: "center",
                        color: "text.primary",
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{ textAlign: "center" }}
                    >
                      {feature.description}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
}

export default HomePage;
