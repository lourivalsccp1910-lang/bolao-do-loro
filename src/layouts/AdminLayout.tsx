import { Box } from "@mui/material";

import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Content from "../components/layout/Content";

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Header />

      <Box
        sx={{
          display: "flex",
        }}
      >
        <Sidebar />

        <Content>{children}</Content>
      </Box>
    </Box>
  );
}