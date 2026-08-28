import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface Props {
  onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>

        {isMobile && (
          <IconButton
            color="inherit"
            edge="start"
            onClick={onMenuClick}
            sx={{ mr: 1 }}
            aria-label="Abrir menu"
          >
            <MenuIcon />
          </IconButton>
        )}

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
