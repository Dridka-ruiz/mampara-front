import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";

import "../../../../style/DragAnDrop/DragAnDrop.css";
import "../../../../style/cards.css";
import "../../../../style/global/global.css";

const ExtrusionFormDialog = ({ open, onClose, etiqueta }) => {
  const [formData, setFormData] = useState({
    nombre: etiqueta ? etiqueta.nombre : "",
    clave: etiqueta ? etiqueta.clave : "",
    kilos: etiqueta ? etiqueta.kilos : "",
    fecha: etiqueta ? etiqueta.fecha : "",
  });

  useEffect(() => {
    if (etiqueta) {
      setFormData({
        nombre: etiqueta.nombre,
        clave: etiqueta.clave,
        kilos: etiqueta.kilos,
        fecha: etiqueta.fecha,
      });
    }
  }, [etiqueta]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/etiquetas/${etiqueta.id}`,
        formData
      );
      console.log("Datos actualizados:", response.data);
      onClose();
    } catch (error) {
      console.error("Error al actualizar los datos", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {etiqueta ? "Editar Etiqueta" : "Nueva Etiqueta"}
      </DialogTitle>

      <DialogContent>
        <div className="posicionamientoEtiquetas">
          <TextField
            disabled
            autoFocus
            margin="dense"
            label="Nombre"
            type="text"
            fullWidth
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
          />
        </div>
        <hr className="linea-etiqueta " />

        <hr className="linea-etiqueta " />
        <div className="sepadadorInferior">
          <TextField
            disabled
            margin="dense"
            label="Clave"
            type="text"
            fullWidth
            name="clave"
            value={formData.clave}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Fecha"
            type="date"
            fullWidth
            name="fecha"
            value={formData.fecha}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            label="Kilos"
            type="text"
            fullWidth
            name="kilos"
            value={formData.kilos}
            onChange={handleInputChange}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          style={{ backgroundColor: "red" }}
          onClick={onClose}
        >
          Cancelar
        </Button>
        <Button variant="contained" color="success" onClick={handleUpdate}>
          Actualizar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExtrusionFormDialog;
