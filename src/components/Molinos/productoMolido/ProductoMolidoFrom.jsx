import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";
import { apiUrlProductosMolidos } from "../../../api/molinos/productoMolido";
import useFetchUser from "../../Login/useFetchUser"; // Importa el hook personalizado

const ExtrusionFormDialog = ({
  open,
  onClose,
  etiqueta,
  productoExtruido,
  setProductoExtruido,
  onDeleteEtiqueta, // Agregar esta línea
}) => {
  const user = useFetchUser(); // Obtén el usuario autenticado

  const [formData, setFormData] = useState({
    nombre: etiqueta ? etiqueta.nombre : "",
    clave: etiqueta ? etiqueta.clave : "",
    cantidad: etiqueta ? etiqueta.cantidad : "",
    maquina: etiqueta ? etiqueta.maquina : "",
    fecha_real: etiqueta ? etiqueta.fecha_real : "",
    hora_real: etiqueta ? etiqueta.hora_real : "",
    fecha_programada: etiqueta ? etiqueta.fecha_programada : "",
    hora_programada: etiqueta ? etiqueta.hora_programada : "",
    productoId: etiqueta ? etiqueta.productoId : "",
    usuario: etiqueta ? etiqueta.usuario : "",
  });

  const [alertMessage, setAlertMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (etiqueta) {
      setFormData({
        nombre: etiqueta.nombre,
        clave: etiqueta.clave,
        cantidad: etiqueta.cantidad,
        maquina: etiqueta.maquina,
        fecha_real: etiqueta.fecha_real,
        hora_real: etiqueta.hora_real,
        fecha_programada: etiqueta.fecha_programada,
        hora_programada: etiqueta.hora_programada,
        productoId: etiqueta.productoId,
        usuario: user.username,
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

  const handleClose = () => {
    setAlertMessage("");
    setSuccessMessage("");
  };

  // Validación: Verificar el formato de hora en formato de 24 horas
  const validate24HourFormat = (time) => {
    const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return regex.test(time);
  };
  // Validación: Verificar que la fecha no pase del año en curso
  const validateYear = (date) => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const inputYear = new Date(date).getFullYear();
    return inputYear <= currentYear;
  };

  const handleSave = async () => {
    try {
      // Validación: Verificar si todos los campos requeridos están llenos
      const requiredFields = [
        "nombre",
        "clave",
        "maquina",
        "cantidad",
        "fecha_real",
        "hora_real",
        "productoId",
        "usuario",
      ];
      const missingFields = requiredFields.filter((field) => !formData[field]);

      if (missingFields.length > 0) {
        console.error("Por favor, complete todos los campos requeridos.");
        setAlertMessage("Todos los campos obligatorios deben estar llenos.");
        return;
      }

      // Validación: Verificar formato de hora en formato de 24 horas
      if (!validate24HourFormat(formData.hora_real)) {
        console.error("El formato de la hora real es incorrecto.");
        setAlertMessage(
          "El formato de la hora real debe ser HH:mm (24 horas)."
        );
        return;
      }
      // Validación: Verificar que la fecha real no pase del año en curso
      if (!validateYear(formData.fecha_real)) {
        console.error("La fecha real no debe pasar del año en curso.");
        setAlertMessage("La fecha real no debe pasar del año en curso.");
        return;
      }

      const dataToSave = {
        ...formData,
        fecha_programada: "",
        hora_programada: "",
      };

      await axios.post(apiUrlProductosMolidos, dataToSave);

      console.log("Datos del formulario guardados con éxito:", formData);

      // Eliminar la etiqueta después de guardar los datos
      if (onDeleteEtiqueta) {
        onDeleteEtiqueta();
      }

      setSuccessMessage("Datos guardados con éxito");
    } catch (error) {
      console.error("Error al guardar los datos del formulario", error);
      setAlertMessage("Error al guardar los datos del formulario");
    }

    if (!alertMessage && !successMessage) {
      handleClose();
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{"Producto Molido"}</DialogTitle>

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
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <TextField
            disabled
            autoFocus
            margin="dense"
            label="Clave"
            type="text"
            fullWidth
            name="clave"
            value={formData.clave}
            onChange={handleInputChange}
          />
          <TextField
            disabled
            margin="dense"
            label="Extrusor"
            type="text"
            fullWidth
            name="maquina"
            value={formData.maquina}
            onChange={handleInputChange}
          />
        </div>
        <div className="sepadadorInferior">
          <TextField
            margin="dense"
            label="Cantidad"
            type="text"
            fullWidth
            name="cantidad"
            value={formData.cantidad}
            onChange={handleInputChange}
            style={{ width: "34%" }}
          />

          <TextField
            margin="dense"
            label="Fecha"
            type="date"
            fullWidth
            name="fecha_real"
            value={formData.fecha_real}
            onChange={handleInputChange}
            style={{ width: "34%" }}
          />
          <TextField
            margin="dense"
            label="Hora real"
            type="text"
            name="hora_real"
            value={formData.hora_real}
            onChange={handleInputChange}
            style={{ width: "34%" }}
            placeholder="HH:mm"
            helperText="Formato: HH:mm (24 horas)"
          />
        </div>
        <div>
          <TextField
            margin="dense"
            label="Usuario"
            type="text"
            name="usuario"
            value={formData.usuario}
            onChange={handleInputChange}
            style={{ width: "34%" }}
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
        <Button variant="contained" color="success" onClick={handleSave}>
          {"Guardar"}
        </Button>
      </DialogActions>

      {/* Snackbar para mostrar el mensaje de alerta */}
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={alertMessage !== ""}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="error"
          onClose={handleClose}
        >
          {alertMessage}
        </MuiAlert>
      </Snackbar>

      {/* Snackbar para mostrar el mensaje de éxito */}
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={successMessage !== ""}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="success"
          onClose={handleClose}
        >
          {successMessage}
        </MuiAlert>
      </Snackbar>
    </Dialog>
  );
};

export default ExtrusionFormDialog;
