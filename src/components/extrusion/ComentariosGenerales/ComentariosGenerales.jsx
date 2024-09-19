import React, { useEffect, useState } from "react";
import "../../../style/DragAnDrop/DragAnDrop.css";
import "../../../style/cards.css";
import "../../../style/global/global.css";
import {
  fetchComentariosGlobales,
  createComentarioGlobal,
} from "../../../api/extrusores/comentariosGenerales";
import Opciones from "./opciones/option";
import "../../../style/global/comentarios.css";
import FormularioComentario from "./Comentarios";

import Avatar from "@mui/material/Avatar";
import { brown } from "@mui/material/colors";

const EtiquetaTable = () => {
  const [comentariosGlobales, setComentariosGlobales] = useState([]);

  useEffect(() => {
    const getComentariosGlobales = async () => {
      try {
        const comentarios = await fetchComentariosGlobales();
        setComentariosGlobales(comentarios);
      } catch (error) {
        console.error("Error al obtener los comentarios:", error);
      }
    };

    getComentariosGlobales();
  }, []);

  const handleDeleteEtiqueta = async (etiquetaId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/comentariosGlobales/${etiquetaId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Error al eliminar el comentario");
      }

      const updatedComentarios = comentariosGlobales.filter(
        (comentario) => comentario.id !== etiquetaId
      );
      setComentariosGlobales(updatedComentarios);
    } catch (error) {
      console.error("Error al eliminar el comentario:", error);
    }
  };

  const handleComentarioCreated = (newComentario) => {
    const fecha = new Date().toISOString().split("T")[0];
    const id = Math.random().toString(36).substr(2, 9);
    const comentarioConDatos = { ...newComentario, id, fecha };
    setComentariosGlobales((prevComentarios) => [
      comentarioConDatos,
      ...prevComentarios,
    ]);
  };

  const formatDateWithoutTime = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="position comentariosGlobalesAgregadas position">
      <div className="comentarios">
        <div className="positionComent">
          <h3
            className="colorComentaios "
            style={{
              width: "50px",
            }}
          >
            Comentarios Generales
          </h3>
          <FormularioComentario onComentarioCreated={handleComentarioCreated} />
        </div>
        <div className="posicionComentario">
          {comentariosGlobales.map((comentario) => {
            const userInitial = comentario.cambios_usuario
              ? comentario.cambios_usuario.charAt(0).toUpperCase()
              : "";

            return (
              <div key={comentario.id} className="comentEstilo">
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <Opciones
                    onDeleteClick={() => handleDeleteEtiqueta(comentario.id)}
                  />
                  <p className="estiloComponet">
                    <strong>Comentarios:</strong>
                  </p>
                </div>

                <p className="stiloComentario">{comentario.comentarios}</p>
                <p className="stiloFecha">
                  Fecha: {formatDateWithoutTime(comentario.fecha)}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    margin: "5px",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: brown[500],
                      marginRight: "5px",
                      fontSize: "18px",
                      width: "25px",
                      height: "25px",
                    }}
                  >
                    {userInitial}
                  </Avatar>
                  <p style={{ margin: 0, color: "#392011", fontSize: "15px" }}>
                    {comentario.cambios_usuario}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EtiquetaTable;
