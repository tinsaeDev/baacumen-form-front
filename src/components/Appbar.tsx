import { AppBar, IconButton, Stack, Toolbar } from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import MenuDrawler from "./MenuDrawler";
import { DarkMode, LightMode } from "@mui/icons-material";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/root";
import { setColorMode } from "../store/app";

export default function ResponsiveAppBar() {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const colorMode =
    useSelector((state: RootState) => state.app.colorMode) || "light";

  const dispatch = useDispatch();
  return (
    <>
      <AppBar color="inherit" position="fixed">
        <Toolbar variant="dense">
          <Stack
            flexGrow={1}
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack>
              <IconButton
                size="small"
                onClick={() => {
                  setDrawerOpen(true);
                }}
              >
                <MenuIcon />
              </IconButton>
            </Stack>
            <Stack>
              <IconButton
                onClick={() => {
                  if (colorMode == "dark") {
                    dispatch(setColorMode("light"));
                  } else {
                    dispatch(setColorMode("dark"));
                  }
                }}
              >
                {colorMode == "dark" ? (
                  <LightMode color="warning" />
                ) : (
                  <DarkMode />
                )}
              </IconButton>
            </Stack>
          </Stack>
        </Toolbar>
      </AppBar>

      <MenuDrawler
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
        }}
      />
    </>
  );
}
