import React, { useState } from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { BsCaretLeftFill, BsCaretRightFill } from "react-icons/bs";
import "../../style/Ayuda.css";
import { MdOutlineNotificationsActive } from "react-icons/md";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiDialog-paper": {
    maxWidth: "800px", // Ajusta el ancho máximo del diálogo
    width: "90%", // Ajusta el ancho del diálogo
  },
}));

export default function CustomizedDialogs() {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Rutas de las imágenes
  const images = [
    "img/Tutorial/yo3.png",

    "img/Tutorial/1.png",
    "img/Tutorial/2.png",

    "img/Tutorial/4.png",
    "img/Tutorial/5.png",
    "img/Tutorial/6.png",
  ];

  const nextImage = () => setCurrentIndex((currentIndex + 1) % images.length);
  const prevImage = () =>
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);

  return (
    <React.Fragment>
      <IconButton
        variant="outlined"
        onClick={handleClickOpen}
        className="ayuda-container"
        style={{
          display: "grid",
        }}
      >
        <MdOutlineNotificationsActive
          color="red"
          className="vibrate"
          style={{
            marginBottom: "-5px",
          }}
        />

        <img
          src="https://firebasestorage.googleapis.com/v0/b/mampara-e5ebb.appspot.com/o/ajustes.gif?alt=media&token=de1596ae-09c4-4558-bd0e-d2fe3959d154"
          alt=""
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "25px",
          }}
        />
      </IconButton>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Nueva Actualización
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div className="carousel">
            <IconButton
              onClick={prevImage}
              className="carousel-button"
              style={{ color: "#2166ba" }}
            >
              <BsCaretLeftFill />
            </IconButton>
            <img
              src={images[currentIndex]}
              alt={`Imagen ${currentIndex + 1}`}
              className="carousel-image"
              style={{
                width: currentIndex === 0 ? "400px" : "600px", // Ajusta el tamaño de la primera imagen
              }}
            />
            <IconButton
              onClick={nextImage}
              className="carousel-button"
              style={{ color: "#2166ba" }}
            >
              <BsCaretRightFill />
            </IconButton>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
