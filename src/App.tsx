import {
  Container,
  CssBaseline,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import ResponsiveAppBar from "./components/Appbar";
import { Outlet } from "react-router-dom";
import { RootState } from "./store/root";
import { useSelector } from "react-redux";
import { Theme } from "@emotion/react";
import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./components/reactQuery";

function App() {
  const colorMode =
    useSelector((state: RootState) => state.app.colorMode) || "light";

  function getTheme(colorMode: "dark" | "light") {
    return {
      dark: {
        typography: {
          fontFamily: "Google Sans,Roboto, sans-serif",
          fontSize: 10,
        },
        palette: {
          type: "dark",

          mode: colorMode,
          ochre: {
            dark: "#121212",
            main: "#000",
            light: "#121212",
            // dark: will be calculated from palette.secondary.main,
            contrastText: "#525252",
          },
          notificationBg: "#072d3f",
        },
      },
      light: {
        typography: {
          fontFamily: "Google Sans,Roboto, sans-serif",
          fontSize: 10,
        },
        palette: {
          type: "light",
          mode: colorMode,
          background: { default: "#f0f0f0" },
          ochre: {
            dark: "#f7f7f7",
            main: "#fff",
            light: "#f7f7f7",
            // dark: will be calculated from palette.secondary.main,
            contrastText: "#dfdfdf",
          },
          notificationBg: "#c8eeff",
        },
      },
    }[colorMode];
  }
  const theme: Theme = React.useMemo(
    () => createTheme(getTheme(colorMode)),
    [colorMode]
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container
            maxWidth={"xl"}
            sx={{
              mt: "4rem",
            }}
          >
            <ResponsiveAppBar></ResponsiveAppBar>
            <Outlet />
          </Container>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
