import React from "react";
import {
  Box,
  Typography,
  Stack,
  IconButton,
  Tooltip,
  useTheme,
  useMediaQuery,
  Paper,
} from "@mui/material";
import CopyrightIcon from "@mui/icons-material/Copyright";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailIcon from "@mui/icons-material/Email";

export default function Footer() {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
      component="footer"
      sx={{
        mt: 8,
        px: 2,
        py: 4,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          backgroundColor: "#ffffff",
          color: "#5c4d7d",
          p: isLargeScreen ? 5 : 3,
          borderRadius: 4,
          maxWidth: "1000px",
          width: "100%",
          textAlign: "center",
          boxShadow: "0 8px 24px rgba(92, 77, 125, 0.15)",
        }}
      >
        <Stack
          direction="row"
          spacing={isLargeScreen ? 3 : 2}
          justifyContent="center"
          mb={3}
        >
          <Tooltip title="GitHub">
            <IconButton
              href="https://github.com/MRROBOT4850"
              target="_blank"
              rel="noopener"
              sx={{ color: "#5c4d7d", "&:hover": { color: "#8a7bc9" } }}
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="LinkedIn">
            <IconButton
              href="https://linkedin.com/in/shivam-chaudhary-dev"
              target="_blank"
              rel="noopener"
              sx={{ color: "#5c4d7d", "&:hover": { color: "#8a7bc9" } }}
            >
              <LinkedInIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Email">
            <IconButton
              href="mailto:shivamchaudhary4850@gmail.com"
              sx={{ color: "#5c4d7d", "&:hover": { color: "#8a7bc9" } }}
            >
              <EmailIcon />
            </IconButton>
          </Tooltip>
        </Stack>

        <Typography
          variant="body2"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 0.5,
            fontSize: "0.85rem",
            color: "#5c4d7d",
            mb: 3,
          }}
        >
          <CopyrightIcon fontSize="small" />
          Shivam Chaudhary — {new Date().getFullYear()}
        </Typography>

        <Box sx={{ textAlign: "center" }}>
          <Tooltip title="Back to Top">
            <IconButton
              onClick={scrollToTop}
              sx={{
                color: "#5c4d7d",
                "&:hover": {
                  color: "#8a7bc9",
                },
              }}
            >
              <KeyboardArrowUpIcon fontSize="medium" />
            </IconButton>
          </Tooltip>
        </Box>
      </Paper>
    </Box>
  );
}
