import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import { TbCircleLetterP } from "react-icons/tb";
import { FaRegCheckCircle } from "react-icons/fa";
import { styled } from "@mui/material/styles";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import PermisoValidator from "../../../Login/PermisoValidator";
import "../../../../style/proceso.css";

export default function ProcesosMuestras({
  premuestra,
  handlePremuestraClick,
  handleProcesoClick,
  proceso,
}) {
  // Estado para almacenar el color de fondo del botón
  const [buttonBackground, setButtonBackground] = useState("transparent");
  const [buttonBackground2, setButtonBackground2] = useState("transparent2");
  const [buttonColor, setButtonColor] = useState("rgb(85 82 207);"); // Color de texto inicial: negro
  const [buttonColor2, setButtonColor2] = useState("#fffff"); // Color de texto inicial: negro

  // useEffect para actualizar el color del botón "Premuestra" al cargar el componente
  useEffect(() => {
    // Si premuestra es verdadero, actualizar el color del botón a azul
    if (premuestra == 1) {
      setButtonBackground2("#0081cd");
      setButtonColor2("#616161");
    } else {
      // Si premuestra es falso, el color de fondo será transparente
      setButtonBackground2("#c1b1b1");
      setButtonColor2("#0081cd"); // Color de texto original
    }
  }, [premuestra]);

  // useEffect para actualizar el color del botón "Muestra" al cargar el componente
  useEffect(() => {
    // Si muestra es verdadero, actualizar el color del botón a azul
    if (proceso == 1) {
      setButtonBackground("green");
      setButtonColor("#616161");
    } else {
      // Si proceso es falso, el color de fondo será transparente
      setButtonBackground("#616161");
      setButtonColor("green"); // Color de texto original
    }
  }, [proceso]);

  // Función para manejar el clic en el botón "Premuestra"
  const handleButtonClick2 = () => {
    // Actualizar el color de fondo del botón a azul si premuestra es verdadero
    if (premuestra) {
      setButtonBackground2("#006180");
      setButtonColor2("#c1b1b1");
    }
    handlePremuestraClick();
  };

  // Función para manejar el clic en el botón "Muestra"
  const handleButtonClick = () => {
    // Actualizar el color de fondo del botón a azul si muestra es verdadero
    if (proceso) {
      setButtonBackground("rgb(40 110 171 / 95%)");
      setButtonColor("#616161");
    }
    handleProcesoClick();
  };

  return (
    <>
      <PermisoValidator permiso="boton.formulaSeleccionar">
        <div className="posicionamiento">
          <IconButton
            size="small"
            onClick={handleButtonClick} // Asociar la función de manejo de clic
          >
            <FaRegCheckCircle
              className="colorFormula"
              style={{
                padding: "0px",
                borderRadius: "25px",
                background: buttonBackground, // Establecer el color de fondo del botón
              }}
            />
          </IconButton>

          <IconButton size="small" onClick={handleButtonClick2}>
            <TbCircleLetterP
              className="tamañoPremuestra"
              style={{
                padding: "0px",
                background: buttonBackground2, // Establecer el color de fondo del botón
                color: "#ffff",
                borderRadius: "25px",
              }}
            />
          </IconButton>
        </div>
      </PermisoValidator>
      <PermisoValidator permiso="boton.formulaNoSeleccionar">
        <div className="posicionamiento">
          <FaRegCheckCircle
            className="colorFormula"
            style={{
              padding: "0px",
              borderRadius: "25px",
              background: buttonBackground, // Establecer el color de fondo del botón
            }}
          />

          <TbCircleLetterP
            className="tamañoPremuestra"
            style={{
              padding: "0px",
              background: buttonBackground2, // Establecer el color de fondo del botón
              color: "#ffff",
              borderRadius: "25px",
            }}
          />
        </div>
      </PermisoValidator>
    </>
  );
}
