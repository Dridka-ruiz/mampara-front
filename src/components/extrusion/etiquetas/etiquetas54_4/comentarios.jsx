import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { AiOutlineWarning } from "react-icons/ai";
import { toast } from "react-toastify";
import useFetchUser from "../../../Login/useFetchUser"; // Importa el hook personalizado

const ExtrusionFormComents = ({ open, onClose, etiqueta, onSaved }) => {
  const user = useFetchUser(); // Obtén el usuario autenticado
  const [formData, setFormData] = useState({
    nombre: etiqueta ? etiqueta.nombre : "",
    comentarios: etiqueta ? etiqueta.comentarios : "",
  });

  useEffect(() => {
    if (etiqueta) {
      setFormData({
        nombre: etiqueta.nombre,
        comentarios: etiqueta.comentarios,
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

  const handleUpdateComents = async () => {
    if (!formData.comentarios) {
      toast.error("El campo de comentarios no puede estar vacío.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/etiquetasExt54_4/${etiqueta.id}`,
        {
          ...formData,
          cambios_usuario: user.username, // Agrega el nombre del usuario logueado
        }
      );
      console.log("Datos actualizados:", response.data);
      onClose();
      if (onSaved) onSaved(); // Call onSaved when the data is successfully saved
      window.location.reload();
    } catch (error) {
      console.error("Error al actualizar los datos", error);
    }
  };

  const handleDeleteComents = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/etiquetasExt54_4/${etiqueta.id}`,

        {
          ...formData,
          comentarios: "",
          cambios_usuario: "", // Borrar el nombre del usuario
        }
      );
      console.log("Comentario eliminado:", response.data);
      onClose();
      if (onSaved) onSaved(); // Call onSaved when the data is successfully saved
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar el comentario", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleUpdateComents();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <AiOutlineWarning
          color="#E0AF00"
          style={{
            fontSize: "30px",
          }}
        />
        <DialogTitle>{"Agrega una observacion del producto"}</DialogTitle>

        <AiOutlineWarning
          color="#E0AF00"
          style={{
            fontSize: "30px",
          }}
        />
      </div>

      <DialogContent>
        <div
          className="posicionamientoEtiquetas"
          style={{
            display: "grid",
            justifyItems: "center",
            gap: "1rem",
          }}
        >
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
            style={{
              width: "400px",
            }}
          />

          <TextField
            style={{
              width: "400px",
            }}
            color="warning"
            margin="dense"
            label="Observaciones del producto"
            type="text"
            fullWidth
            name="comentarios"
            value={formData.comentarios}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress} // Añade este evento
          />

          <TextField
            disabled
            style={{
              width: "400px",
            }}
            color="warning"
            margin="dense"
            label="Usuario"
            type="text"
            fullWidth
            name="cambios_usuario"
            value={user ? user.username : ""}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="success"
          onClick={handleUpdateComents}
        >
          Agregar
        </Button>
        <Button
          variant="contained"
          style={{ backgroundColor: "red" }}
          onClick={onClose}
        >
          Cancelar
        </Button>{" "}
        <Button
          variant="contained"
          style={{ backgroundColor: "#EB5E00" }}
          onClick={handleDeleteComents}
        >
          Eliminar comentario
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExtrusionFormComents;
