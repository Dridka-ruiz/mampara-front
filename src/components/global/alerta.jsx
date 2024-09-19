import React from "react";
import "../../style/cards.css";

function alerta() {
  return (
    <div className="comentario">
      <img
        src="img/system-regular-56-warning.gif"
        alt=""
        style={{ width: "30px", height: "30px" }}
      />
      Producto adelantado
    </div>
  );
}

export default alerta;
