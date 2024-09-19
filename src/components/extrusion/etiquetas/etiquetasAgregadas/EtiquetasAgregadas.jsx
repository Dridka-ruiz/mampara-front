import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import "../../../../style/DragAnDrop/DragAnDrop.css";
import "../../../../style/cards.css";
import "../../../../style/global/global.css";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { apiUrl, fetchProductos } from "../../../../api/apiEtiquetas";

import Opciones from "../../global/opciones/option";
import Container from "@mui/material/Container";
import EditFormDialog from "./editFrom";
import { LabToRGB } from "../../../../color/colorConverter";
import { AiFillAlert } from "react-icons/ai";
import Comentario from "../../../global/alerta";
import { FaExclamationTriangle } from "react-icons/fa";

const EtiquetaTable = ({ etiquetas, setEtiquetas }) => {
  const [loading, setLoading] = useState(true);
  const [productos, setProductos] = useState([]);
  const [selectedEtiqueta, setSelectedEtiqueta] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [nuevaEtiquetaAgregada, setNuevaEtiquetaAgregada] = useState(false);

  useEffect(() => {
    const cargarDatosDesdeApi = async () => {
      try {
        const [etiquetasResponse, productosResponse] = await Promise.all([
          axios.get(apiUrl),
          fetchProductos(),
        ]);
        setEtiquetas(etiquetasResponse.data);
        setProductos(productosResponse);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar datos desde la API", error);
        setLoading(false);
      }
    };

    cargarDatosDesdeApi();
  }, [setEtiquetas]);

  const handleDeleteEtiqueta = (etiquetaId) => {
    const updatedEtiquetas = etiquetas.filter(
      (etiqueta) => etiqueta.id !== etiquetaId
    );
    setEtiquetas(updatedEtiquetas);
    guardarEtiquetas(updatedEtiquetas);
  };

  useEffect(() => {
    if (nuevaEtiquetaAgregada) {
      guardarEtiquetas(etiquetas);
      setNuevaEtiquetaAgregada(false);
      console.log("etiquetas guardadas", etiquetas);
    }
  }, [etiquetas, nuevaEtiquetaAgregada]);

  const guardarEtiquetas = async (etiquetas) => {
    try {
      await axios.post(apiUrl, etiquetas);
      console.log("Etiquetas guardadas con éxito");
    } catch (error) {
      console.error("Error al guardar las etiquetas", error);
    }
  };

  const formatDateWithoutTime = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleEstadoChange = (etiquetaId) => {
    const updatedEtiquetas = etiquetas.map((etiqueta) =>
      etiqueta.id === etiquetaId
        ? {
            ...etiqueta,
            estado: etiqueta.estado === "activo" ? "inactivo" : "activo",
          }
        : etiqueta
    );
    setEtiquetas(updatedEtiquetas);
    guardarEtiquetas(updatedEtiquetas);
  };

  const handleUrgenciaChange = (etiquetaId) => {
    const updatedEtiquetas = etiquetas.map((etiqueta) =>
      etiqueta.id === etiquetaId
        ? {
            ...etiqueta,
            urgencias: etiqueta.urgencias === "activo" ? "inactivo" : "activo",
          }
        : etiqueta
    );
    setEtiquetas(updatedEtiquetas);
    guardarEtiquetas(updatedEtiquetas);
  };

  const handleEditEtiqueta = (etiquetaId) => {
    const selected = etiquetas.find((etiqueta) => etiqueta.id === etiquetaId);
    setSelectedEtiqueta(selected);
    setOpenDialog(true);
  };

  const differenceInDays = (date1, date2) => {
    const diffInTime = new Date(date1) - new Date(date2);
    return diffInTime / (1000 * 3600 * 24);
  };

  return (
    <>
      <div className="position etiquetasAgregadas">
        <h6 className="text-center tittle">Etiquetas Agregadas</h6>
        <div>
          {loading ? (
            <CircularProgress color="secondary" />
          ) : (
            <ReactSortable
              group="groupName"
              animation={200}
              setList={setEtiquetas}
              delayOnTouchStart={true}
              delay={2}
              list={etiquetas}
              className="position"
              onAdd={() => setNuevaEtiquetaAgregada(true)}
              onSort={() => setNuevaEtiquetaAgregada(true)}
              onRemove={() => setNuevaEtiquetaAgregada(true)}
              ghostClass="sortable-ghost"
              chosenClass="sortable-chosen"
              forceFallback={true}
            >
              {etiquetas.map((item) => {
                const producto = productos.find(
                  (producto) => producto.id === item.productoId
                );
                const molinos = producto ? producto.molinos : "Desconocido";

                return (
                  <div
                    key={item.id}
                    className="etiqueta"
                    data-id={item.id}
                    draggable={true}
                  >
                    <div className="m-3 cursor-draggable">
                      <div className="espaciadoEtiqueta">
                        <div className="titulosTyle">{item.nombre}</div>
                        <div
                          className={`etiqueta2 ${
                            item.estado === "inactivo"
                              ? "etiqueta-inactiva"
                              : ""
                          }`}
                        >
                          <Opciones
                            onDeleteClick={() => handleDeleteEtiqueta(item.id)}
                            onEstadoChange={() => handleEstadoChange(item.id)}
                            onUrgenciaChange={() =>
                              handleUrgenciaChange(item.id)
                            }
                            onEditClick={() => handleEditEtiqueta(item.id)}
                            onExtrudeClick={() =>
                              handleExtrudeEtiqueta(item.id)
                            }
                            id={item.id}
                          />
                        </div>
                      </div>

                      <div className="styloTipoMolinos">
                        <div className="tamañoLetraClave">{item.clave}</div>

                        <p
                          className="fechasOrdenes"
                          style={{
                            color: "#4E6CD9",
                          }}
                        >
                          {molinos}
                        </p>
                      </div>

                      <hr className="linea-etiqueta" />
                      <div
                        className="firmatoDiseño"
                        style={{
                          background:
                            item.urgencias === "activo" ? "#DBF227" : "",
                        }}
                      >
                        <strong>
                          {item.polvos && (
                            <p className="espaciadoPolvos">POLVOS</p>
                          )}
                        </strong>
                        <strong className="colorUrgente">
                          {item.urgencias === "activo" && (
                            <p className="espaciadoUrgencia">
                              Urgente <AiFillAlert />
                            </p>
                          )}
                        </strong>
                      </div>

                      <hr className="linea-etiqueta" />
                      <div className="position2 spaciadoEtiquetaLetras">
                        <div>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            <p className="interlineadoP">Fecha de Orden</p>
                            <p className="tamañoLetra fechasOrdenes">
                              {formatDateWithoutTime(item.fecha_entrega)}
                            </p>
                          </div>
                          <div style={{ display: "flex", gap: "7px" }}>
                            <div>
                              {differenceInDays(item.fecha, new Date()) <=
                                6 && (
                                <FaExclamationTriangle
                                  style={{ color: "orange" }}
                                />
                              )}
                            </div>

                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                color:
                                  differenceInDays(item.fecha, new Date()) > 6
                                    ? "green"
                                    : differenceInDays(item.fecha, new Date()) >
                                      3
                                    ? "orange"
                                    : "red",
                              }}
                            >
                              <p className="interlineadoP">Fecha de Entrega</p>
                              <p className="tamañoLetra fechasOrdenes">
                                {formatDateWithoutTime(item.fecha)}
                              </p>
                            </div>
                          </div>
                        </div>
                        <Container
                          style={{
                            width: "40%",
                            margin: "0rem",
                          }}
                        >
                          <p className="interlineadoP ">Kilos</p>
                          <p>{item.kilos}kg</p>
                        </Container>
                      </div>
                    </div>
                  </div>
                );
              })}
            </ReactSortable>
          )}
        </div>

        <EditFormDialog
          open={openDialog}
          onClose={() => {
            setOpenDialog(false);
            setSelectedEtiqueta(null);
          }}
          etiqueta={selectedEtiqueta}
        />
      </div>
    </>
  );
};

export default EtiquetaTable;
