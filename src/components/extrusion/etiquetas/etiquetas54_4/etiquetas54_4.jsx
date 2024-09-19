import "../../../../style/DragAnDrop/DragAnDrop.css";
import "../../../../style/cards.css";
import "../../../../style/global/global.css";
import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import { apiUrlEtiquetasExt54_4 } from "../../../../api/extrusores/apiExt54_4";
import CircularProgress from "@mui/material/CircularProgress";
import Opciones from "../../global/opciones/option";
import EditFormDialog from "./editFrom";
import ExtrusionFormDialog from "../../productoExtruidoPrueba1/ExtrusionFormDialog";
import Container from "@mui/material/Container";
import PermisoValidator from "../../../Login/PermisoValidator";
import { FaExclamationTriangle } from "react-icons/fa";
import ProcesosMuestras from "../../global/progreso/ProcesosMuestras";
import { AiFillAlert } from "react-icons/ai";

import ExtrusionFormComents from "./comentarios";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

import OpcionCalidad from "../../global/opciones/optionCalidad";
import { fetchProductos } from "../../../../api/apiEtiquetas";
import IncompletoFromDialog from "./IncompletoFromDialog";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f8f0dc",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: "100%",
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #d2913d",
    borderRadius: "20px",
  },
}));

const EtiquetaTable54_4 = ({ etiquetas54_4, setEtiquetas54_4 }) => {
  const [loading, setLoading] = useState(true);
  const [selectedEtiqueta, setSelectedEtiqueta] = useState(null); // Nuevo estado
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEtiqueta2, setSelectedEtiqueta2] = useState(null); // Nuevo estado
  const [openDialog2, setOpenDialog2] = useState(false);
  const [nuevaEtiquetaAgregada, setNuevaEtiquetaAgregada] = useState(false);
  const [openDialog3, setOpenDialog3] = useState(false);
  const [selectedComents, setSelectedComents] = useState(null);
  const [productos, setProductos] = useState([]);
  const [openDialog4, setOpenDialog4] = useState(false);
  const [selectedEtiqueta4, setSelectedEtiqueta4] = useState(null);

  useEffect(() => {
    const cargarEtiquetasDesdeApi = async () => {
      try {
        const [etiquetasResponse, productosResponse] = await Promise.all([
          axios.get(apiUrlEtiquetasExt54_4),
          fetchProductos(),
        ]);

        setEtiquetas54_4(etiquetasResponse.data);
        setProductos(productosResponse);
        setLoading(false);
        /* 
        const response = await axios.get(apiUrlEtiquetasExt54_4);
        setEtiquetas54_4(response.data);
        setLoading(false); */
      } catch (error) {
        console.error("Error al cargar etiquetas desde la API", error);
        setLoading(false);
      }
    };

    cargarEtiquetasDesdeApi();
  }, [setEtiquetas54_4]);

  const handleDeleteEtiqueta = (etiquetaId) => {
    // Lógica para eliminar la etiqueta con el ID proporcionado
    const updatedEtiquetas = etiquetas54_4.filter(
      (etiquetas) => etiquetas.id !== etiquetaId
    );
    setEtiquetas54_4(updatedEtiquetas);
    guardarEtiquetas(updatedEtiquetas);
  };

  useEffect(() => {
    if (nuevaEtiquetaAgregada) {
      guardarEtiquetas(etiquetas54_4);
      setNuevaEtiquetaAgregada(false);
      console.log("etiquetas guardadas 54_4", etiquetas54_4);
    }
  }, [etiquetas54_4, nuevaEtiquetaAgregada]);

  // Función para realizar el guardado automático de las etiquetas
  const guardarEtiquetas = async (etiquetas) => {
    try {
      // Asegurar que el campo "extrusor" sea "EXT54-II"
      const etiquetasConExtrusor = etiquetas.map((etiqueta, index) => ({
        ...etiqueta,
        extrusor: "EXT54-IV",
        id: index + 1,
      }));

      // Realizar el guardado de las etiquetas
      await axios.post(apiUrlEtiquetasExt54_4, etiquetasConExtrusor);
      console.log("Etiquetas guardadas con éxito");
    } catch (error) {
      console.error("Error al guardar las etiquetas", error);
    }
  };

  const formatDateWithoutTime = (date) => {
    // Suponiendo que la fecha está en el formato "aaaa-mm-dd"
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const handleUrgenciaChange = (etiquetaId) => {
    const updatedEtiquetas = etiquetas54_4.map((etiqueta) =>
      etiqueta.id === etiquetaId
        ? {
            ...etiqueta,
            urgencias: etiqueta.urgencias === "activo" ? "inactivo" : "activo",
          }
        : etiqueta
    );
    setEtiquetas54_4(updatedEtiquetas);
    guardarEtiquetas(updatedEtiquetas);
  };

  //editar producto
  const handleEditEtiqueta = (etiquetaId) => {
    // Buscar la etiqueta seleccionada
    const selected = etiquetas54_4.find(
      (etiqueta) => etiqueta.id === etiquetaId
    );
    setSelectedEtiqueta(selected);
    // Abrir el diálogo de edición
    setOpenDialog(true);
  };

  //opcion de producto extruido
  const handleExtrudeEtiqueta = (etiquetaId) => {
    // Buscar la etiqueta seleccionada
    const selected2 = etiquetas54_4.find(
      (etiqueta) => etiqueta.id === etiquetaId
    );
    setSelectedEtiqueta2(selected2);
    // Abrir el diálogo de extrusión
    setOpenDialog2(true);
  };

  const handleIncompletoEtiqueta = (etiquetaId) => {
    // Buscar la etiqueta seleccionada
    const selected4 = etiquetas54_4.find(
      (etiqueta) => etiqueta.id === etiquetaId
    );
    setSelectedEtiqueta4(selected4);
    // Abrir el diálogo de extrusión
    setOpenDialog4(true);
  };

  const differenceInDays = (date1, date2) => {
    const diffInTime = new Date(date1) - new Date(date2);
    return diffInTime / (1000 * 3600 * 24);
  };

  const handlePremuestraChange = (etiquetaId) => {
    const updatedEtiquetas = etiquetas54_4.map((etiqueta) =>
      etiqueta.id === etiquetaId
        ? {
            ...etiqueta,
            premuestra: !etiqueta.premuestra, // Cambia el estado de premuestra
          }
        : etiqueta
    );
    setEtiquetas54_4(updatedEtiquetas);
    guardarEtiquetas(updatedEtiquetas); // Guarda los cambios en la base de datos
  };

  const handleProcesoChange = (etiquetaId) => {
    const updatedEtiquetas = etiquetas54_4.map((etiqueta) =>
      etiqueta.id === etiquetaId
        ? {
            ...etiqueta,
            proceso: !etiqueta.proceso, // Cambia el estado de preproceso
          }
        : etiqueta
    );
    setEtiquetas54_4(updatedEtiquetas);
    guardarEtiquetas(updatedEtiquetas); // Guarda los cambios en la base de datos
  };

  const handleComentsEtiqueta = (etiquetaId) => {
    const selected = etiquetas54_4.find(
      (etiqueta) => etiqueta.id === etiquetaId
    );
    setSelectedComents(selected);
    setOpenDialog3(true);
    const updatedEtiquetas = etiquetas54_4.map((etiqueta) =>
      etiqueta.id === etiquetaId
        ? {
            ...etiqueta,
            estado: etiqueta.estado === "activo" ? "inactivo" : "activo",
          }
        : etiqueta
    );
    setEtiquetas54_4(updatedEtiquetas);
    guardarEtiquetas(updatedEtiquetas);
  };

  return (
    <>
      <PermisoValidator permiso="extrusores.mover">
        <div className="position etiquetasAgregadas">
          <h6 className="text-center tittleEtiquetas">54 IV</h6>
          {loading ? (
            <CircularProgress color="secondary" />
          ) : (
            <ReactSortable
              group="groupName"
              animation={200}
              setList={setEtiquetas54_4}
              delayOnTouchStart={true}
              delay={2}
              list={etiquetas54_4}
              className="position"
              onAdd={() => setNuevaEtiquetaAgregada(true)}
              onRemove={() => setNuevaEtiquetaAgregada(true)}
              onSort={() => setNuevaEtiquetaAgregada(true)}
              ghostClass="sortable-ghost" // Clase CSS para el elemento de arrastre fantasma
              chosenClass="sortable-chosen" // Clase CSS para el elemento seleccionado
              forceFallback={true}
            >
              {etiquetas54_4.map((item, index) => {
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
                    <HtmlTooltip
                      placement="top-end"
                      title={
                        item.comentarios ? (
                          <React.Fragment>
                            <Typography color="inherit">
                              {item.cambios_usuario} - {item.comentarios}
                            </Typography>
                          </React.Fragment>
                        ) : (
                          ""
                        )
                      }
                    >
                      <div className="m-3 cursor-draggable">
                        <div className="espaciadoEtiqueta ">
                          <div className=" titulosTyle ">{item.nombre}</div>
                          <div
                            className={`etiqueta2 ${
                              item.estado === "inactivo"
                                ? "etiqueta-inactiva"
                                : ""
                            }`}
                          >
                            <Opciones
                              onDeleteClick={() =>
                                handleDeleteEtiqueta(item.id)
                              }
                              onComentarioClick={() =>
                                handleComentsEtiqueta(item.id)
                              } // Agregar esta línea
                              onUrgenciaChange={() =>
                                handleUrgenciaChange(item.id)
                              }
                              onEditClick={() => handleEditEtiqueta(item.id)} // Agregar esta línea
                              onExtrudeClick={() =>
                                handleExtrudeEtiqueta(item.id)
                              } // Agregar esta línea
                              onPausadoClick={() =>
                                handleIncompletoEtiqueta(item.id)
                              } // Agregar esta línea
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
                                      ? "green" // Verde si está a más de 7 días
                                      : differenceInDays(
                                          item.fecha,
                                          new Date()
                                        ) > 3
                                      ? "orange" // Naranja si está a más de 3 días
                                      : "red", // Rojo si está a 3 días o menos
                                }}
                              >
                                <p className="interlineadoP">
                                  Fecha de Entrega
                                </p>
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
                            <div>
                              <div>
                                <p className="interlineadoP ">Kilos</p>
                                <p
                                  className="colorImcrementoKilos"
                                  style={{
                                    color: item.incremento ? "#005db9" : "",
                                  }}
                                >
                                  {item.kilos}kg
                                </p>
                              </div>
                              <p className="colorIncremento">
                                {item.incremento == 1 ? "Incremento" : ""}
                              </p>
                            </div>
                            <div>
                              <ProcesosMuestras
                                premuestra={item.premuestra}
                                handlePremuestraClick={() =>
                                  handlePremuestraChange(item.id)
                                } // Pasar la función de manejo de cambio de estado
                                proceso={item.proceso}
                                handleProcesoClick={() =>
                                  handleProcesoChange(item.id)
                                } // Pasar la función de manejo de cambio de estado
                              />
                            </div>
                          </Container>
                        </div>
                      </div>
                    </HtmlTooltip>
                  </div>
                );
              })}
            </ReactSortable>
          )}
          <EditFormDialog
            open={openDialog}
            onClose={() => {
              setOpenDialog(false);
              setSelectedEtiqueta(null);
            }}
            etiqueta={selectedEtiqueta}
          />
          <ExtrusionFormComents
            open={openDialog3}
            onClose={() => {
              setOpenDialog3(false);
              setSelectedComents(null);
            }}
            etiqueta={selectedComents}
          />
          <ExtrusionFormDialog
            open={openDialog2}
            onClose={() => {
              setOpenDialog2(false);
              setSelectedEtiqueta2(null);
            }}
            etiqueta={selectedEtiqueta2}
            onDeleteEtiqueta={() => handleDeleteEtiqueta(selectedEtiqueta2.id)}
          />
          <IncompletoFromDialog
            open={openDialog4}
            onClose={() => {
              setOpenDialog4(false);
              setSelectedEtiqueta4(null);
            }}
            etiqueta={selectedEtiqueta4}
          />
        </div>
      </PermisoValidator>
      <PermisoValidator permiso="extrusores.no_mover">
        <div className="position etiquetasAgregadas">
          <h6 className="text-center tittleEtiquetas">54 IV</h6>
          {loading ? (
            <CircularProgress color="secondary" />
          ) : (
            <div className="position">
              {etiquetas54_4.map((item, index) => {
                const producto = productos.find(
                  (producto) => producto.id === item.productoId
                );
                const molinos = producto ? producto.molinos : "Desconocido";

                return (
                  <div key={item.id} className="etiqueta" data-id={item.id}>
                    <HtmlTooltip
                      placement="top-end"
                      title={
                        item.comentarios ? (
                          <React.Fragment>
                            <Typography color="inherit">
                              {item.cambios_usuario} - {item.comentarios}
                            </Typography>
                          </React.Fragment>
                        ) : (
                          ""
                        )
                      }
                    >
                      <div className="m-3 cursor-draggable">
                        <div className="espaciadoEtiqueta ">
                          <div className=" titulosTyle ">{item.nombre}</div>
                          <div
                            className={`etiqueta2 ${
                              item.estado === "inactivo"
                                ? "etiqueta-inactiva"
                                : ""
                            }`}
                          >
                            <OpcionCalidad
                              onDeleteClick={() =>
                                handleDeleteEtiqueta(item.id)
                              }
                              onComentarioClick={() =>
                                handleComentsEtiqueta(item.id)
                              } // Agregar esta línea
                              onUrgenciaChange={() =>
                                handleUrgenciaChange(item.id)
                              }
                              onEditClick={() => handleEditEtiqueta(item.id)} // Agregar esta línea
                              onExtrudeClick={() =>
                                handleExtrudeEtiqueta(item.id)
                              } // Agregar esta línea
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
                                      ? "green" // Verde si está a más de 7 días
                                      : differenceInDays(
                                          item.fecha,
                                          new Date()
                                        ) > 3
                                      ? "orange" // Naranja si está a más de 3 días
                                      : "red", // Rojo si está a 3 días o menos
                                }}
                              >
                                <p className="interlineadoP">
                                  Fecha de Entrega
                                </p>
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
                            <div>
                              <div>
                                <p className="interlineadoP ">Kilos</p>
                                <p
                                  className="colorImcrementoKilos"
                                  style={{
                                    color: item.incremento ? "#005db9" : "",
                                  }}
                                >
                                  {item.kilos}kg
                                </p>
                              </div>
                              <p className="colorIncremento">
                                {item.incremento == 1 ? "Incremento" : ""}
                              </p>
                            </div>
                            <div>
                              <ProcesosMuestras
                                premuestra={item.premuestra}
                                handlePremuestraClick={() =>
                                  handlePremuestraChange(item.id)
                                } // Pasar la función de manejo de cambio de estado
                                proceso={item.proceso}
                                handleProcesoClick={() =>
                                  handleProcesoChange(item.id)
                                } // Pasar la función de manejo de cambio de estado
                              />
                            </div>
                          </Container>
                        </div>
                      </div>
                    </HtmlTooltip>
                  </div>
                );
              })}
            </div>
          )}
          <EditFormDialog
            open={openDialog}
            onClose={() => {
              setOpenDialog(false);
              setSelectedEtiqueta(null);
            }}
            etiqueta={selectedEtiqueta}
          />
          <ExtrusionFormComents
            open={openDialog3}
            onClose={() => {
              setOpenDialog3(false);
              setSelectedComents(null);
            }}
            etiqueta={selectedComents}
          />
          <ExtrusionFormDialog
            open={openDialog2}
            onClose={() => {
              setOpenDialog2(false);
              setSelectedEtiqueta2(null);
            }}
            etiqueta={selectedEtiqueta2}
            onDeleteEtiqueta={() => handleDeleteEtiqueta(selectedEtiqueta2.id)}
          />
        </div>
      </PermisoValidator>
    </>
  );
};

export default EtiquetaTable54_4;
