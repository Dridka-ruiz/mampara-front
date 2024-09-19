import React, { useState, useEffect } from "react";
import { ReactSortable } from "react-sortablejs";
import axios from "axios";
import { apiUrlProductosExtruidos } from "../../../api/extrusores/productoExtruido";
import CircularProgress from "@mui/material/CircularProgress";
import ExtrusionFormDialog from "./ExtrusionFormDialog";

const ProductoExtruido = ({ productoExtruido, setProductoExtruido }) => {
  const [loading, setLoading] = useState(true);
  const [selectedEtiqueta, setSelectedEtiqueta] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [isNewEtiqueta, setIsNewEtiqueta] = useState(true);

  useEffect(() => {
    const cargarEtiquetasDesdeApi = async () => {
      try {
        const response = await axios.get(apiUrlProductosExtruidos);
        setProductoExtruido(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar etiquetas desde la API", error);
        setLoading(false);
      }
    };

    cargarEtiquetasDesdeApi();
  }, [setProductoExtruido]);

  const handleEtiquetasChange = (newState) => {
    setProductoExtruido(newState);
    console.log("Productos Extruidos posicionadas:", newState);
    guardarEtiquetas(newState);
  };

  const guardarEtiquetas = async (etiquetas) => {
    const dataToSave = etiquetas.map((item) => ({
      nombre: item.nombre,
      clave: item.clave,
      extrusor: item.extrusor,
      fecha_programada: "", // o establecer un valor predeterminado
      hora_programada: "",
      fecha_real: "",
      hora_real: "",
      cantidad: "",
    }));

    try {
      await axios.post(apiUrlProductosExtruidos, dataToSave);
      console.log("Etiquetas guardadas con éxito");
    } catch (error) {
      console.error("Error al guardar las etiquetas", error);
    }
  };

  const handleAddEtiqueta = () => {
    const nuevaEtiqueta = {
      fechaTerminacion: "",
      horaTermino: "",
    };

    setProductoExtruido([...productoExtruido, nuevaEtiqueta]);
    setSelectedEtiqueta(null);
    setIsNewEtiqueta(true);
    setOpenDialog(true);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFormSubmit = (formData) => {
    console.log("Formulario enviado:", formData);
    handleCloseDialog();
  };

  const handleEditEtiqueta = (etiquetaId) => {
    const selected = productoExtruido.find(
      (etiqueta) => etiqueta.id === etiquetaId
    );
    setSelectedEtiqueta(selected);
    setIsNewEtiqueta(false);
    setOpenDialog(true);
  };

  return (
    <div className="position etiquetasAgregadas">
      <h6 className="text-center tittle">Productos extruidos</h6>
      {loading ? (
        <CircularProgress color="secondary" />
      ) : (
        <ReactSortable
          group="groupName"
          animation={200}
          setList={handleEtiquetasChange}
          delayOnTouchStart={true}
          delay={2}
          list={productoExtruido}
          className="position"
          onAdd={handleAddEtiqueta}
        >
          {productoExtruido.map((item, index) => (
            <div key={item.id} data-id={item.id}>
              <div className="m-3 cursor-draggable">
                <div className="espaciadoEtiqueta posicionamientoEtiquetas">
                  <div
                    className="card-body titulosTyle "
                    style={{ display: "flex", justifyContent: " space-around" }}
                  >
                    {item.nombre} - Posición: {index + 1}
                  </div>
                </div>
                <hr className="linea-etiqueta" />
                <div className="position2 spaciadoEtiquetaLetras">
                  <p className="tamañoLetra">{item.clave}</p>
                  <p className="tamañoLetra">{item.extrusor}</p>
                </div>
                <button onClick={() => handleEditEtiqueta(item.id)}>
                  Editar Etiqueta
                </button>
              </div>
            </div>
          ))}
        </ReactSortable>
      )}
      <ExtrusionFormDialog
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
          setSelectedEtiqueta(null);
          setIsNewEtiqueta(true);
        }}
        etiqueta={selectedEtiqueta}
        isNewEtiqueta={isNewEtiqueta}
      />
    </div>
  );
};

export default ProductoExtruido;
