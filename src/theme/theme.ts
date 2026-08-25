import { createTheme } from "@mui/material/styles";

import { colors } from "./colors";
import { typography } from "./typography";

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },

    secondary: {
      main: colors.secondary,
    },

    background: {
      default: colors.background,
      paper: colors.paper,
    },
  },

  typography,

  shape: {
    borderRadius: 10,
  },
});