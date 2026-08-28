import { Box, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";

import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Content from "../components/layout/Content";

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Header
        onMenuClick={() => setMobileMenuOpen(true)}
      />

      <Box
        sx={{
          display: "flex",
        }}
      >
        {isMobile ? (
          <Sidebar
            mobile
            open={mobileMenuOpen}
            onClose={() => setMobileMenuOpen(false)}
          />
        ) : (
          <Sidebar />
        )}

        <Content>{children}</Content>
      </Box>
    </Box>
  );
}
