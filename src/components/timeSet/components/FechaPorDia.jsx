import React from "react";
import "../../../style/time/fecha.css";

function FechaPorDia() {
  const fecha = new Date();
  const opciones = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const fechaFormateada = fecha.toLocaleDateString("es-ES", opciones);

  return (
    <>
      <div className="estiloCard">
        <h3 className="tittle1">El dia de hoy es:</h3>
        <h4 className="fecha">{fechaFormateada}</h4>
      </div>
    </>
  );
}

export default FechaPorDia;
