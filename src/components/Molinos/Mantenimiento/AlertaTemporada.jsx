import React, { useEffect, useState } from "react";
import "../../../style/AlertaTemporada.css";

function AlertaTemporada() {
  const [seasonInfo, setSeasonInfo] = useState({
    currentSeason: "",
    daysUntilNextSeason: 0,
    nextSeason: "",
    nextSeasonDate: "",
  });

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();

    // Define the start dates for each season
    const seasons = {
      Invierno: new Date(year, 11, 21), // Dec 21
      Primavera: new Date(year, 2, 20), // Mar 20
      Verano: new Date(year, 5, 21), // Jun 21
      Otoño: new Date(year, 8, 23), // Sep 23
    };

    // Determine current season and next season
    let currentSeason = "";
    let nextSeason = "";
    let nextSeasonDate = "";

    if (today >= seasons.Invierno || today < seasons.Primavera) {
      currentSeason = "Invierno";
      nextSeason = "Primavera";
      nextSeasonDate = new Date(
        year + (today >= seasons.Invierno ? 1 : 0),
        2,
        20
      );
    } else if (today >= seasons.Primavera && today < seasons.Verano) {
      currentSeason = "Primavera";
      nextSeason = "Verano";
      nextSeasonDate = seasons.Verano;
    } else if (today >= seasons.Verano && today < seasons.Otoño) {
      currentSeason = "Verano";
      nextSeason = "Otoño";
      nextSeasonDate = seasons.Otoño;
    } else if (today >= seasons.Otoño && today < seasons.Invierno) {
      currentSeason = "Otoño";
      nextSeason = "Invierno";
      nextSeasonDate = seasons.Invierno;
    }

    const timeDiff = nextSeasonDate.getTime() - today.getTime();
    const daysUntilNextSeason = Math.ceil(timeDiff / (1000 * 3600 * 24));

    setSeasonInfo({
      currentSeason,
      daysUntilNextSeason,
      nextSeason,
      nextSeasonDate: nextSeasonDate.toLocaleDateString(),
    });
  }, []);

  return (
    <div
      className={`alerta-container ${seasonInfo.currentSeason.toLowerCase()}`}
    >
      <h2 className="title">Alerta para Mantenimiento</h2>
      <div className="posicionText">
        <h3 className="subtitle">La estación que estamos es:</h3>
        <p className="content">{seasonInfo.currentSeason}</p>
      </div>
      <div className="posicionText">
        <h3 className="subtitle">
          Faltan {seasonInfo.daysUntilNextSeason} días para la siguiente
          estación:
        </h3>
        <p className="content">{seasonInfo.nextSeason}</p>
      </div>
      <div className="posicionText">
        <h3 className="subtitle">Fecha de la siguiente estación:</h3>
        <p className="content">({seasonInfo.nextSeasonDate})</p>
      </div>
    </div>
  );
}

export default AlertaTemporada;
