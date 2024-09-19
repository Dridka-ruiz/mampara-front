import React from "react";
import FechaPorDia from "./components/FechaPorDia";
import Tiempo54_2 from "./timeset54_2/Tiempo54_2";
import TiemposFechas from "./timeset54_2/TiemposFechas";
import AgregarFechas from "./components/Formulario/AgregarFechas";
function TimeSet() {
  return (
    <>
      <FechaPorDia />
      <AgregarFechas />
      <div className="fondoTabla">
        <div className="extrusor">Extrusor</div>
        <div
          style={{
            display: "flex",
            gap: "1rem",
          }}
        >
          <div className="desplazamientoExtrusor">
            <h3 className="extrusorNom">EXT54-II</h3>
            <h3 className="extrusorNom">BUSS1</h3>
            <h3 className="extrusorNom">EXT70-II</h3>
            <h3 className="extrusorNom">EXT54-IV</h3>
            <h3 className="extrusorNom">EXT54-V</h3>
            <h3 className="extrusorNom">EXT54-I</h3>
            <h3 className="extrusorNom">EXT58</h3>
            <h3 className="extrusorNom">EXT40</h3>
            <h3 className="extrusorNom">EXT54-III</h3>
            <h3 className="extrusorNom">EXT54-VII</h3>
            <h3 className="extrusorNom">EXT70-I</h3>
            <h3 className="extrusorNom">BUSS2</h3>
            <h3 className="extrusorNom">EXT26-I</h3>
            <h3 className="extrusorNom">EXT26-II</h3>
            <h3 className="extrusorNom">EXT54-VI</h3>
            <h3 className="extrusorNom">EXT70-III</h3>
            <h3 className="extrusorNom">EXT54-VIII</h3>
          </div>
          <Tiempo54_2 />
          {/*    <TiemposFechas /> */}
        </div>

        {/*   <TiempoBuss1 /> */}
      </div>
    </>
  );
}

export default TimeSet;
