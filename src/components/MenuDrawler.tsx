import {
  Box,
  Divider,
  Drawer,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { ReactElement } from "react";
import { menusItems } from "../menusItems.tsx";

export default function MenuDrawler(props: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Drawer
      className="drawer"
      anchor="left"
      open={props.open}
      onClose={props.onClose}
    >
      <Box
        sx={{
          p: 2,
        }}
      >
        {/* Header */}
        <Stack direction="row" alignItems="flex-end" spacing={1}>
          <img
            src={"/image/logo/bacumeen_logo_high_res.jpg"}
            width={100}
            height={100}
            alt="App Logo"
          />
          <Stack>
            <Typography
              variant="subtitle1"
              textTransform={"uppercase"}
              fontWeight={"bold"}
            >
              Bacuumen Forms
            </Typography>
            <Typography variant="subtitle2" textTransform="uppercase">
              Simple yet Effective!
            </Typography>
          </Stack>
        </Stack>

        <Divider
          sx={{
            mt: 2,
          }}
        />

        {/* Body */}
        <Box>
          {" "}
          <List>
            {menusItems.map((menu) => {
              return <RenderMenu key={menu.url} menu={menu} />;
            })}
          </List>
        </Box>
      </Box>
    </Drawer>
  );
}

export interface MenuItem {
  title: string;
  url: string;
  icon: ReactElement;
  type?: "group";
  items?: MenuItem[];
}

function RenderMenu(props: { menu: MenuItem }) {
  const theme = useTheme();

  const menu = props.menu;
  const activeLink = location.pathname == menu.url;

  return (
    <Link
      style={{
        textDecoration: "inherit",
        backgroundColor: "inherit",
        color: "inherit",
      }}
      href={menu.url}
    >
      <ListItemButton
        sx={{
          color: activeLink ? theme.palette.action.active : "inherit",
          background: activeLink ? theme.palette.action.selected : "inherit",
        }}
      >
        <ListItemIcon>{menu.icon}</ListItemIcon>
        <ListItemText primary={menu.title} />
      </ListItemButton>
    </Link>
  );
}
