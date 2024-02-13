import { MenuItem } from "./components/MenuDrawler";
import HomeIcon from "@mui/icons-material/Home";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";

export const menusItems: MenuItem[] = [
  {
    icon: <HomeIcon />,
    title: "Home",
    url: "/",
    items: [],
  },
  {
    icon: <FormatAlignJustifyIcon />,
    title: "Forms",
    url: "/forms",
    items: [],
  },
];
