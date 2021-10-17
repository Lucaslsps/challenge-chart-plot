import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#017eff",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
    info: {
      main: "#19857b",
    },
  },
  typography: {
    fontFamily: ['"Source Sans Pro"', '"Source Code Pro"', "sans-serif"].join(
      ","
    ),
    h6: {
      fontWeight: "bold",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 800,
      md: 1280,
      lg: 1920,
      xl: 2560,
    },
  },
});

export default theme;
