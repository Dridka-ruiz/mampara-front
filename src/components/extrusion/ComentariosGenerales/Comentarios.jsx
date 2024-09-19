import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { MdAddComment } from "react-icons/md";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import { createComentarioGlobal } from "../../../api/extrusores/comentariosGenerales";
import useFetchUser from "../../Login/useFetchUser"; // Importa el hook personalizado

const FormularioComentario = ({ onComentarioCreated }) => {
  const user = useFetchUser(); // Obtén el usuario autenticado

  const [open, setOpen] = useState(false);
  const [comentarios, setComentario] = useState("");
  const [error, setError] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setError(false); // Resetear el estado de error al cerrar el diálogo
  };

  const handleAgregarComentario = async (event) => {
    event.preventDefault();
    if (comentarios.trim()) {
      try {
        const now = new Date();
        const fecha = now.toISOString().split("T")[0]; // Obtener solo la fecha en formato YYYY-MM-DD
        const newComentario = await createComentarioGlobal({
          comentarios,
          fecha,
          cambios_usuario: user.username, // Enviar el nombre del usuario al backend
        });

        onComentarioCreated(newComentario);
        setComentario(""); // Limpiamos el campo después de agregar el comentario
        handleClose();
        window.location.reload();
      } catch (error) {
        console.error("Error al agregar el comentario:", error);
      }
    } else {
      setError(true);
    }
  };

  const handleChangeComentario = (event) => {
    setComentario(event.target.value);
    setError(false); // Resetear el estado de error al escribir en el campo de comentarios
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        style={{
          border: "#d2933d 1px solid",
          color: "rgb(156, 66, 33)",
        }}
      >
        <MdAddComment
          color="#c47d32"
          style={{ fontSize: "18px", marginLeft: "5px" }}
        />
        Agregar
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Agrega un comentario u observación"}
        </DialogTitle>
        <DialogContent>
          <TextField
            id="filled-multiline-static"
            label="Comentarios"
            multiline
            rows={4}
            variant="filled"
            value={comentarios}
            onChange={handleChangeComentario}
            placeholder="Escribe tu comentario aquí"
            style={{
              background: "#f0deb8",
              width: "100%",
            }}
          />
          <TextField
            disabled
            style={{
              width: "150px",
            }}
            color="warning"
            margin="dense"
            label="Usuario"
            type="text"
            fullWidth
            name="cambios_usuario"
            value={user ? user.username : ""}
          />
          {error && (
            <Alert severity="error">El comentario no puede ir nulo.</Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleAgregarComentario}
            variant="contained"
            type="submit"
            style={{ backgroundColor: "green" }}
          >
            Agregar
          </Button>
          <Button
            onClick={handleClose}
            autoFocus
            variant="contained"
            style={{ backgroundColor: "red" }}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default FormularioComentario;
