import React from "react";

import LimpiezaExtrucion from "./extrucion/LimpiezaExtrucion";
import AcabadoLimpieza from "./extrucion/AcabadoLimpieza";
import SistemaLimpieza from "./extrucion/SistemaLimpieza";
import BrilloLimpieza from "./extrucion/BrilloLimpieza";
import T_mant_parosExtrucion from "./extrucion/t_mant_paros";

import "../../style/tablas/global.css";

export default function SetUps() {
  return (
    <div>
      <h2>SetUp</h2>

      <div
        style={{
          display: "flex",
          gap: "2rem",
        }}
      >
        <T_mant_parosExtrucion />
        <LimpiezaExtrucion />
        <AcabadoLimpieza />
        <SistemaLimpieza />
        <BrilloLimpieza />
      </div>
    </div>
  );
}
