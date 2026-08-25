import {
  AppBar,
  Avatar,
  Box,
  Toolbar,
  Typography,
} from "@mui/material";

export default function Header() {
  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>

        <Avatar
          sx={{
            bgcolor: "secondary.main",
            mr: 2,
            width: 40,
            height: 40,
          }}
        >
          🦜
        </Avatar>

        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
          }}
        >
          Bolão do Loro
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Typography variant="body2">
          Versão 0.3
        </Typography>

      </Toolbar>
    </AppBar>
  );
}