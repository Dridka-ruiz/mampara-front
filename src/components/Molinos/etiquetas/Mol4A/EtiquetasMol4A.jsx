import React, { useEffect, useState } from "react";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import { apiUrlEtiquetasMol4A } from "../../../../api/molinos/apiMol4A";
import CircularProgress from "@mui/material/CircularProgress";
import Opciones from "../../global/option";
import EditFormDialog from "./editFrom";
import ProductoMolidoFrom from "../../productoMolido/ProductoMolidoFrom";
import Container from "@mui/material/Container";
import PermisoValidator from "../../../Login/PermisoValidator";
import { FaExclamationTriangle } from "react-icons/fa";
import { AiFillAlert } from "react-icons/ai";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import ExtrusionFormComents from "./comentarios";
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

const EtiquetasMol4A = ({ etiquetasMol4A, setEtiquetasMol4A, onSaved }) => {
  const [loading, setLoading] = useState(true);
  const [selectedEtiqueta, setSelectedEtiqueta] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEtiqueta2, setSelectedEtiqueta2] = useState(null);
  const [openDialog2, setOpenDialog2] = useState(false);
  const [nuevaEtiquetaAgregada, setNuevaEtiquetaAgregada] = useState(false);

  const [openDialog3, setOpenDialog3] = useState(false);
  const [selectedComents, setSelectedComents] = useState(null);
  const [productos, setProductos] = useState([]);
  const [openDialog4, setOpenDialog4] = useState(false);
  const [selectedEtiqueta4, setSelectedEtiqueta4] = useState(null);

  //console.log("mapeo de datos", etiquetasMol4A);
  useEffect(() => {
    const cargarEtiquetasDesdeApi = async () => {
      try {
        const [etiquetasResponse, productosResponse] = await Promise.all([
          axios.get(apiUrlEtiquetasMol4A),
          fetchProductos(),
        ]);
        setEtiquetasMol4A(etiquetasResponse.data);
        setProductos(productosResponse);
        setLoading(false);
        /*  try {
        const response = await axios.get(apiUrlEtiquetasMol4A);
        setEtiquetasMol4A(response.data);
        setLoading(false); */
      } catch (error) {
        console.error("Error al cargar etiquetas desde la API", error);
        setLoading(false);
      }
    };

    cargarEtiquetasDesdeApi();
  }, [setEtiquetasMol4A]);

  const handleDeleteEtiqueta = async (etiquetaId) => {
    // Lógica para eliminar la etiqueta con el ID proporcionado
    const updatedEtiquetas = etiquetasMol4A.filter(
      (etiqueta) => etiqueta.id !== etiquetaId
    );
    setEtiquetasMol4A(updatedEtiquetas);
    guardarEtiquetas(updatedEtiquetas);
  };
  useEffect(() => {
    if (nuevaEtiquetaAgregada) {
      guardarEtiquetas(etiquetasMol4A);
      setNuevaEtiquetaAgregada(false);
      console.log("etiquetas guardadas Mol4A", etiquetasMol4A);
    }
  }, [etiquetasMol4A, nuevaEtiquetaAgregada]);

  const guardarEtiquetas = async (etiquetas) => {
    try {
      // Asegurar que el campo "maquina" sea "EXT54-II" y asignar IDs únicos
      const etiquetasConExtrusor = etiquetas.map((etiqueta, index) => ({
        ...etiqueta,
        maquina: "MOLINO 4A",
        id: index + 1,
      }));

      // Realizar el guardado de las etiquetas
      await axios.post(apiUrlEtiquetasMol4A, etiquetasConExtrusor);
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

  const handleEstadoChange = (etiquetaId) => {
    const updatedEtiquetas = etiquetasMol4A.map((etiqueta) =>
      etiqueta.id === etiquetaId
        ? {
            ...etiqueta,
            estado: etiqueta.estado === "activo" ? "inactivo" : "activo",
          }
        : etiqueta
    );
    setEtiquetasMol4A(updatedEtiquetas);
    guardarEtiquetas(updatedEtiquetas);
  };

  const handleEditEtiqueta = (etiquetaId) => {
    const selected = etiquetasMol4A.find(
      (etiqueta) => etiqueta.id === etiquetaId
    );
    setSelectedEtiqueta(selected);
    setOpenDialog(true);
  };

  const handleExtrudeEtiqueta = (etiquetaId) => {
    const selected2 = etiquetasMol4A.find(
      (etiqueta) => etiqueta.id === etiquetaId
    );
    setSelectedEtiqueta2(selected2);
    setOpenDialog2(true);
  };

  const handleIncompletoEtiqueta = (etiquetaId) => {
    const selected4 = etiquetasMol4A.find(
      (etiqueta) => etiqueta.id === etiquetaId
    );
    setSelectedEtiqueta4(selected4);
    setOpenDialog4(true);
  };
  const differenceInDays = (date1, date2) => {
    const diffInTime = new Date(date1) - new Date(date2);
    return diffInTime / (1000 * 3600 * 24);
  };

  const handleUrgenciaChange = (etiquetaId) => {
    const updatedEtiquetas = etiquetasMol4A.map((etiqueta) =>
      etiqueta.id === etiquetaId
        ? {
            ...etiqueta,
            urgencias: etiqueta.urgencias === "activo" ? "inactivo" : "activo",
          }
        : etiqueta
    );
    setEtiquetasMol4A(updatedEtiquetas);
    guardarEtiquetas(updatedEtiquetas);
  };
  const handleComentsEtiqueta = (etiquetaId) => {
    const selected = etiquetasMol4A.find(
      (etiqueta) => etiqueta.id === etiquetaId
    );
    setSelectedComents(selected);
    setOpenDialog3(true);
    const updatedEtiquetas = etiquetasMol4A.map((etiqueta) =>
      etiqueta.id === etiquetaId
        ? {
            ...etiqueta,
            estado: etiqueta.estado === "activo" ? "inactivo" : "activo",
          }
        : etiqueta
    );
    setEtiquetasMol4A(updatedEtiquetas);
    guardarEtiquetas(updatedEtiquetas);
  };

  return (
    <>
      <PermisoValidator permiso="molinos.mover">
        <div className="position etiquetasAgregadas">
          <div className="text-center tittleEtiquetasMolinos">
            <h3 className="separacionTextoM">
              {" "}
              MOL
              <strong
                style={{
                  fontSize: "40px",
                }}
              >
                4A
              </strong>
            </h3>
            <p className="separacionTextoM">Mangas</p>
          </div>
          {loading ? (
            <CircularProgress color="secondary" />
          ) : (
            <ReactSortable
              group="groupName"
              animation={200}
              setList={setEtiquetasMol4A}
              delayOnTouchStart={true}
              delay={2}
              list={etiquetasMol4A}
              className="position"
              onAdd={() => setNuevaEtiquetaAgregada(true)}
              onRemove={() => setNuevaEtiquetaAgregada(true)}
              onSort={() => setNuevaEtiquetaAgregada(true)}
              ghostClass="sortable-ghost" // Clase CSS para el elemento de arrastre fantasma
              chosenClass="sortable-chosen" // Clase CSS para el elemento seleccionado
              forceFallback={true}
            >
              {etiquetasMol4A.map((item) => {
                const producto = productos.find(
                  (producto) => producto.id === item.productoId
                );

                const molinos = producto ? producto.molinos : "Desconocido";
                const mallas = producto ? producto.mallas : "Desconocido";
                const media = producto ? producto.media : "Desconocido";
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
                            {/* <PermisoValidator permiso="molinos.mostrarOpciones"> */}
                            <Opciones
                              onDeleteClick={() =>
                                handleDeleteEtiqueta(item.id)
                              }
                              onUrgenciaChange={() =>
                                handleUrgenciaChange(item.id)
                              }
                              onEditClick={() => handleEditEtiqueta(item.id)} // Agregar esta línea
                              onComentarioClick={() =>
                                handleComentsEtiqueta(item.id)
                              } // Agregar esta línea
                              onExtrudeClick={() =>
                                handleExtrudeEtiqueta(item.id)
                              } // Agregar esta línea
                              onPausadoClick={() =>
                                handleIncompletoEtiqueta(item.id)
                              } // Agregar esta línea
                              id={item.id}
                            />
                            {/*  </PermisoValidator> */}
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
                          <div>
                            <Container>
                              <p className="interlineadoP ">Kilos</p>
                              <p>{item.kilos}kg</p>
                            </Container>
                            <div
                              style={{
                                display: "flex",
                              }}
                            >
                              <Container>
                                <p className="interlineadoP ">Mallas</p>
                                <p>{mallas}</p>
                              </Container>
                              <Container>
                                <p className="interlineadoP ">Media</p>
                                <p>{media}</p>
                              </Container>
                            </div>
                          </div>
                        </div>
                      </div>
                    </HtmlTooltip>
                  </div>
                );
              })}
              <EditFormDialog
                open={openDialog}
                onClose={() => {
                  setOpenDialog(false);
                  setSelectedEtiqueta(null);
                }}
                etiqueta={selectedEtiqueta}
              />
              <ProductoMolidoFrom
                open={openDialog2}
                onClose={() => {
                  setOpenDialog2(false);
                  setSelectedEtiqueta2(null);
                }}
                etiqueta={selectedEtiqueta2}
                onDeleteEtiqueta={() =>
                  handleDeleteEtiqueta(selectedEtiqueta2.id)
                }
              />
              <ExtrusionFormComents
                open={openDialog3}
                onClose={() => {
                  setOpenDialog3(false);
                  setSelectedComents(null);
                }}
                etiqueta={selectedComents}
                onSaved={onSaved} // Pass the onSaved prop to the child component
              />
              <IncompletoFromDialog
                open={openDialog4}
                onClose={() => {
                  setOpenDialog4(false);
                  setSelectedEtiqueta4(null);
                }}
                etiqueta={selectedEtiqueta4}
              />
            </ReactSortable>
          )}
        </div>
      </PermisoValidator>
      <PermisoValidator permiso="molinos.no_mover">
        <div className="position etiquetasAgregadas">
          <div className="text-center tittleEtiquetasMolinos">
            <h3 className="separacionTextoM">
              {" "}
              MOL
              <strong
                style={{
                  fontSize: "40px",
                }}
              >
                4A
              </strong>
            </h3>
            <p className="separacionTextoM">Mangas</p>
          </div>
          {loading ? (
            <CircularProgress color="secondary" />
          ) : (
            <div className="position">
              {etiquetasMol4A.map((item) => {
                const producto = productos.find(
                  (producto) => producto.id === item.productoId
                );

                const molinos = producto ? producto.molinos : "Desconocido";
                const mallas = producto ? producto.mallas : "Desconocido";
                const media = producto ? producto.media : "Desconocido";
                return (
                  <div key={item.id} className="etiqueta" data-id={item.id}>
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
                          <PermisoValidator permiso="molinos.mostrarOpciones">
                            <Opciones
                              onDeleteClick={() =>
                                handleDeleteEtiqueta(item.id)
                              }
                              onEstadoChange={() => handleEstadoChange(item.id)}
                              onEditClick={() => handleEditEtiqueta(item.id)} // Agregar esta línea
                              onExtrudeClick={() =>
                                handleExtrudeEtiqueta(item.id)
                              } // Agregar esta línea
                              id={item.id}
                            />
                          </PermisoValidator>
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
                                    : differenceInDays(item.fecha, new Date()) >
                                      3
                                    ? "orange" // Naranja si está a más de 3 días
                                    : "red", // Rojo si está a 3 días o menos
                              }}
                            >
                              <p className="interlineadoP">Fecha de Entrega</p>
                              <p className="tamañoLetra fechasOrdenes">
                                {formatDateWithoutTime(item.fecha)}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div>
                          <Container>
                            <p className="interlineadoP ">Kilos</p>
                            <p>{item.kilos}kg</p>
                          </Container>
                          <div
                            style={{
                              display: "flex",
                            }}
                          >
                            <Container>
                              <p className="interlineadoP ">Mallas</p>
                              <p>{mallas}</p>
                            </Container>
                            <Container>
                              <p className="interlineadoP ">Media</p>
                              <p>{media}</p>
                            </Container>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              <EditFormDialog
                open={openDialog}
                onClose={() => {
                  setOpenDialog(false);
                  setSelectedEtiqueta(null);
                }}
                etiqueta={selectedEtiqueta}
              />
              <ProductoMolidoFrom
                open={openDialog2}
                onClose={() => {
                  setOpenDialog2(false);
                  setSelectedEtiqueta2(null);
                }}
                etiqueta={selectedEtiqueta2}
                onDeleteEtiqueta={() =>
                  handleDeleteEtiqueta(selectedEtiqueta2.id)
                }
              />
            </div>
          )}
        </div>
      </PermisoValidator>
    </>
  );
};

export default EtiquetasMol4A;
