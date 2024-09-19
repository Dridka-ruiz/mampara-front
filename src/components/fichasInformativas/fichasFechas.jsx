import React from "react";
import "../../style/DragAnDrop/DragAnDrop.css";
import "../../style/cards.css";
import "../../style/global/global.css";

function fichasFechas() {
  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: "15rem",
        }}
      >
        <div className="boedeFechas">
          <h3 className="hmargin">Colores de las fechas</h3>
          <div
            className="alieacionestilo"
            style={{
              fontSize: "18px",
            }}
          >
            <div className="tresDias" />0 a -3 días
          </div>
          <div
            className="alieacionestilo"
            style={{
              fontSize: "18px",
            }}
          >
            <div className="seisDias" />4 a 6 días
          </div>
          <div
            className="alieacionestilo"
            style={{
              fontSize: "18px",
            }}
          >
            <div className="ochoDias" />7 días o más
          </div>
        </div>
      </div>
    </div>
  );
}

export default fichasFechas;
