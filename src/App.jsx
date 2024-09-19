import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login/Login";
import Profile from "./components/Login/Profile";
import { AuthProvider, useAuth } from "./components/Login/AuthContext";
import Layout from "./components/Layout/Layout"; // Importa tu nuevo Layout
//import Mampara from "./components/Extrusores/Mampara/mampara";
import Mampara from "./components/mampara/mampara";
import Terminados from "./components/extrusion/productoExtruidoPrueba1/TableProductoExtruido";
import MamparaMolinos from "./components/Molinos/mampara/MamparaMolinos";
import Productos from "./components/productos/productos";
import TimeSet from "./components/timeSet/TimeSet";
import ProductoMolido from "./components/Molinos/productoMolido/productosMolidosTable";
import TiemposExtrucion from "./components/extrusion/TiemposExtrucion/TiemposExterucion";
import SetUps from "./components/sepUp/SetUps";
import Camiones from "./components/camiones/Camiones";

function AppRoutes() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={token ? <Navigate to="/profile" /> : <Login />}
      />
      <Route element={<Layout />}>
        <Route
          path="/profile"
          element={token ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/mampara-extrucion"
          element={token ? <Mampara /> : <Navigate to="/login" />}
        />
        <Route
          path="/terminados"
          element={token ? <Terminados /> : <Navigate to="/login" />}
        />
        <Route
          path="/mampara-molinos"
          element={token ? <MamparaMolinos /> : <Navigate to="/login" />}
        />
        <Route
          path="/productos"
          element={token ? <Productos /> : <Navigate to="/login" />}
        />
        <Route
          path="/time-set"
          element={token ? <TimeSet /> : <Navigate to="/login" />}
        />
        <Route
          path="/productos-molidos"
          element={token ? <ProductoMolido /> : <Navigate to="/login" />}
        />
        <Route
          path="/tiempos-extrucion"
          element={token ? <TiemposExtrucion /> : <Navigate to="/login" />}
        />
        <Route
          path="/setup"
          element={token ? <SetUps /> : <Navigate to="/login" />}
        />
        <Route
          path="/camiones"
          element={token ? <Camiones /> : <Navigate to="/login" />}
        />
        {/* Agrega más rutas aquí */}
      </Route>
      <Route
        path="/"
        element={<Navigate to={token ? "/profile" : "/login"} />}
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
