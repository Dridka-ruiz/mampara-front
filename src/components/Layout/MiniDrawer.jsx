import React, { useState, useEffect } from "react";
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
import { PiCardsBold } from "react-icons/pi";
import { AiOutlineFileDone } from "react-icons/ai";
import { BsArchive } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import PermisoValidator from "../Login/PermisoValidator";
import { GiManualMeatGrinder } from "react-icons/gi";
import { LiaBusinessTimeSolid } from "react-icons/lia";
import { LuCalendarClock } from "react-icons/lu";
import { TbClockCog } from "react-icons/tb";
import { FaTruckFast } from "react-icons/fa6";
import { useAuth } from "../Login/AuthContext";
import User from "./user";
//import ExtrusorAyuda from "../CentroAyuda/ExtrusorAyuda";

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
    icon: <PiCardsBold color="#035089" />,
    link: "/mampara-extrucion",
    rol: "extrusores.mostrar",
  },
  {
    id: "02",
    name: "Productos Extruidos",
    icon: <AiOutlineFileDone color="#0077cd" />,
    link: "/terminados",
    rol: "productos_estruidos.mostrar",
  },
  {
    id: "03",
    name: "Tiempos Extrucion",
    icon: <LuCalendarClock color="#0795ed" />,
    link: "/tiempos-extrucion",
    rol: "productos_estruidos.mostrar",
  },
  {
    id: "04",
    name: "Etiqietas Molinos",
    icon: <GiManualMeatGrinder color="#4d43bf" />,
    link: "/mampara-molinos",
    rol: "molinos.mostrar",
  },

  {
    id: "05",
    name: "Productos Molidos",
    icon: <AiOutlineFileDone color="#5a51da" />,
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
  {
    id: "07",
    name: "Usuarios",
    icon: <FaUserCircle color="#AB65FC" />,
    link: "/usuarios",
    rol: "usuario.mostra",
  },
  {
    id: "08",
    name: "TimeSep",
    icon: <LiaBusinessTimeSolid color="#4444FC" />,
    link: "/time-set",
    rol: "usuario.mostra",
  },
  {
    id: "09",
    name: "SetUp",
    icon: <TbClockCog color="#4444FC" />,
    link: "/setup",
    rol: "usuario.mostra",
  },
  {
    id: "10",
    name: "Camiones",
    icon: <FaTruckFast color="#689EC6" />,
    link: "/camiones",
    rol: "usuario.mostra",
  },
];

export default function MiniDrawer() {
  const { logout } = useAuth();

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
    logout(); // Llama a la función de logout del contexto de autenticación
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Actualiza la página automáticamente
      window.location.reload();
    }, 10 * 60 * 1000); // 10 minutos en milisegundos

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []);

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

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "3rem",
          }}
        >
          <User />
          <Button
            onClick={handleLogout}
            variant="outlined"
            style={{
              background: "#835eb3",
              color: "rgb(255, 255, 255)",
              borderRadius: "20px",
              display: "flex",
              gap: "1rem",
            }}
          >
            <IoLogOut
              style={{
                color: "#FFFFFF",
                fontSize: "65px",
                margin: "-15px",
              }}
            />
            Salir
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
          {data.slice(0, 3).map((dataItem) => (
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
                    "&:hover": {
                      backgroundColor: "#cfecff", // Cambia el color de fondo al pasar el mouse
                    },
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
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {data.slice(3).map((dataItem) => (
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
                    "&:hover": {
                      backgroundColor: "#cfecff", // Cambia el color de fondo al pasar el mouse
                    },
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
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>

        <Divider />
      </Drawer>
      <Box className="margenGlobal">
        <DrawerHeader />
        <Outlet />
        {/*   <ExtrusorAyuda /> */}
      </Box>
    </Box>
  );
}
