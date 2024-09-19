import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DesktopMacIcon from "@mui/icons-material/DesktopMac";
import { Outlet, Link } from "react-router-dom";

import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import UsuariosLogueados from "../components/login/users/usauriosLogeados";
import { PiCardsBold } from "react-icons/pi";
import { AiOutlineFileDone } from "react-icons/ai";
import { BsArchive } from "react-icons/bs";

import { FaUserCircle } from "react-icons/fa";
//import PermisoValidator from "../components/login/PermissionValidator"; // Importa el componente PermissionValidator
import PermisoValidator from "../components/login/PermissionValidator";
import { GiManualMeatGrinder } from "react-icons/gi";
import { LiaBusinessTimeSolid } from "react-icons/lia";

import { LuCalendarClock } from "react-icons/lu";

import { TbClockCog } from "react-icons/tb";
import { FaTruckFast } from "react-icons/fa6";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const data = [
  {
    id: "01",
    name: "Etiqietas Extrusores",
    icon: <PiCardsBold color="#2A629A" />,
    link: "/mampara",
    rol: "extrusores.mostrar",
  },
  {
    id: "02",
    name: "Productos Extruidos",
    icon: <AiOutlineFileDone color="#3C749B" />,
    link: "/terminados",
    rol: "productos_estruidos.mostrar",
  },
  /*   {
    id: "03",
    name: "Tiempos Extrucion",
    icon: <LuCalendarClock color="#8857BF" />,
    link: "/tiempos-extrucion",
    rol: "productos_estruidos.mostrar",
  }, */
  {
    id: "04",
    name: "Etiqietas Molinos",
    icon: <GiManualMeatGrinder color="#1AB7BA" />,
    link: "/mampara-molinos",
    rol: "molinos.mostrar",
  },

  {
    id: "05",
    name: "Productos Molidos",
    icon: <AiOutlineFileDone color="#689EC6" />,
    link: "/productos-molidos",
    rol: "molinos.mostrar",
  },
  {
    id: "06",
    name: "Productos",
    icon: <BsArchive color="#026873" />,
    link: "/Productos",
    rol: "productos.mostrar",
  },
  /*   {
    id: "07",
    name: "Usuarios",
    icon: <FaUserCircle color="#AB65FC" />,
    link: "/usuarios",
    rol: "usuario.mostra",
  }, */
  /*   {
    id: "08",
    name: "TimeSep",
    icon: <LiaBusinessTimeSolid color="#4444FC" />,
    link: "/time-set",
    rol: "usuario.mostra",
  }, */
  /*   {
    id: "09",
    name: "SetUp",
    icon: <TbClockCog color="#4444FC" />,
    link: "/setup",
    rol: "usuario.mostra",
  }, */
  {
    id: "10",
    name: "Camiones",
    icon: <FaTruckFast color="#689EC6" />,
    link: "/camiones",
    rol: "usuario.mostra",
  },
];

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [authenticated, setAuthenticated] = React.useState(false); // Estado de autenticación
  const [username, setUsername] = React.useState("");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    setAuthenticated(false);
    sessionStorage.removeItem("authenticated");

    // Limpieza de la caché del usuario al cerrar sesión
    sessionStorage.clear(); // Limpiar toda la caché de la sesión actual

    // Puedes realizar otras acciones necesarias al cerrar sesión
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        style={{
          background: "#115189",
          display: "grid",
          gridTemplateColumns: "6fr 1fr 1fr",
          justifyContent: "space-around",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Produccion
          </Typography>
        </Toolbar>
        <Toolbar>
          <UsuariosLogueados />
        </Toolbar>
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Button
            onClick={handleLogout}
            variant="outlined"
            style={{
              background: "#835eb3",
              color: "rgb(255, 255, 255)",
              borderRadius: "20px",
            }}
          >
            <IoLogOut
              style={{
                color: "#FFFFFF",
                fontSize: "25PX",
              }}
            />
            <Link to="/" style={{ color: "#FFFFFF" }}>
              Salir
            </Link>
          </Button>
        </div>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {data.map((dataItem) => (
            <PermisoValidator key={dataItem.id} permiso={dataItem.rol}>
              <ListItem
                key={dataItem.id}
                disablePadding
                sx={{ display: "block" }}
              >
                <Link to={dataItem.link} style={{ color: "black" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                      }}
                      style={{
                        fontSize: "30px",
                      }}
                    >
                      {dataItem.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={dataItem.name}
                      sx={{ opacity: open ? 1 : 0 }}
                    />
                  </ListItemButton>{" "}
                </Link>
              </ListItem>
            </PermisoValidator>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Box className="margenGlobal">
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}
