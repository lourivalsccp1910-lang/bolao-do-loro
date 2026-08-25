import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";

import {
  FaChartPie,
  FaUsers,
  FaTrophy,
  FaFutbol,
  FaClipboardList,
  FaRankingStar,
  FaMoneyBillWave,
} from "react-icons/fa6";

import { Link } from "react-router-dom";

const menu = [
  {
    text: "Dashboard",
    icon: <FaChartPie />,
    path: "/",
  },
  {
    text: "Participantes",
    icon: <FaUsers />,
    path: "/participantes",
  },
  {
    text: "Campeonatos",
    icon: <FaTrophy />,
    path: "/campeonatos",
  },
  {
    text: "Jogos",
    icon: <FaFutbol />,
    path: "/jogos",
  },
  {
    text: "Palpites",
    icon: <FaClipboardList />,
    path: "/palpites",
  },
  {
    text: "Ranking",
    icon: <FaRankingStar />,
    path: "/ranking",
  },
  {
    text: "Financeiro",
    icon: <FaMoneyBillWave />,
    path: "/financeiro",
  },
];

export default function Sidebar() {
  return (
    <Box
      sx={{
        width: 260,
        backgroundColor: "#ffffff",
        borderRight: "1px solid #e0e0e0",
        minHeight: "calc(100vh - 64px)",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          padding: 2,
          fontWeight: "bold",
        }}
      >
        MENU
      </Typography>

      <List>
        {menu.map((item) => (
          <ListItemButton
            key={item.text}
            component={Link}
            to={item.path}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>

            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}