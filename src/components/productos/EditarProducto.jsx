import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function EditPopover({ product, onClose, onSave }) {
  const [editedProduct, setEditedProduct] = useState(product);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct({ ...editedProduct, [name]: value });
  };

  const handleSave = () => {
    // Aquí puedes realizar una solicitud PUT o PATCH para actualizar el producto en el servidor
    fetch(`http://localhost:3000/productos/${editedProduct.id}`, {
      method: "PUT", // o PATCH dependiendo de tu API
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        onSave(data); // Actualiza el producto en la tabla principal
      });
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Editar Producto</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{ "& .MuiTextField-root": { m: 1, width: "25ch" } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            margin="dense"
            label="Nombre"
            name="nombre"
            value={editedProduct.nombre}
            onChange={handleInputChange}
            fullWidth
          />{" "}
          <TextField
            margin="dense"
            label="Clave"
            name="clave"
            value={editedProduct.clave}
            onChange={handleInputChange}
            fullWidth
          />
        </Box>

        <Accordion defaultExpanded>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>Editar L, A, B</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { m: 1, width: "17ch" } }}
              noValidate
              autoComplete="off"
            >
              <TextField
                margin="dense"
                label="L"
                name="l"
                value={editedProduct.l}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="A"
                name="a"
                value={editedProduct.a}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="B"
                name="b"
                value={editedProduct.b}
                onChange={handleInputChange}
                fullWidth
              />
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Editar Sistema, Acabado y Brillo</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { m: 1, width: "17ch" } }}
              noValidate
              autoComplete="off"
            >
              <TextField
                margin="dense"
                label="Sistema"
                name="sistema"
                value={editedProduct.sistema}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Acabado"
                name="acabado"
                value={editedProduct.acabado}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Brillo"
                name="brillo"
                value={editedProduct.brillo}
                onChange={handleInputChange}
                fullWidth
              />
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Rendimientos Extrusor</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { m: 1, width: "15ch" } }}
              noValidate
              autoComplete="off"
            >
              <TextField
                margin="dense"
                label="EXT54_II"
                name="EXT54_II"
                value={editedProduct.EXT54_II}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="EXTBUSS_I"
                name="EXTBUSS_I"
                value={editedProduct.EXTBUSS_I}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="EXT70_II"
                name="EXT70_II"
                value={editedProduct.EXT70_II}
                onChange={handleInputChange}
                fullWidth
              />
            </Box>
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { m: 1, width: "15ch" } }}
              noValidate
              autoComplete="off"
            >
              <TextField
                margin="dense"
                label="EXT54_IV"
                name="EXT54_IV"
                value={editedProduct.EXT54_IV}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="EXT54_V"
                name="EXT54_V"
                value={editedProduct.EXT54_V}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="EXT54_I"
                name="EXT54_I"
                value={editedProduct.EXT54_I}
                onChange={handleInputChange}
                fullWidth
              />
            </Box>
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { m: 1, width: "15ch" } }}
              noValidate
              autoComplete="off"
            >
              <TextField
                margin="dense"
                label="EXT_58"
                name="EXT_58"
                value={editedProduct.EXT_58}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="EXT_40"
                name="EXT_40"
                value={editedProduct.EXT_40}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="EXT54_III"
                name="EXT54_III"
                value={editedProduct.EXT54_III}
                onChange={handleInputChange}
                fullWidth
              />
            </Box>
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { m: 1, width: "15ch" } }}
              noValidate
              autoComplete="off"
            >
              <TextField
                margin="dense"
                label="EXT54_VII"
                name="EXT54_VII"
                value={editedProduct.EXT54_VII}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="EXT70_I"
                name="EXT70_I"
                value={editedProduct.EXT70_I}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="EXTBUSS_II"
                name="EXTBUSS_II"
                value={editedProduct.EXTBUSS_II}
                onChange={handleInputChange}
                fullWidth
              />
            </Box>
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { m: 1, width: "15ch" } }}
              noValidate
              autoComplete="off"
            >
              <TextField
                margin="dense"
                label="EXT54_VI"
                name="EXT54_VI"
                value={editedProduct.EXT54_VI}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="EXT70_III"
                name="EXT70_III"
                value={editedProduct.EXT70_III}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="EXT54_VIII"
                name="EXT54_VIII"
                value={editedProduct.EXT54_VIII}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="EXT_26_I"
                name="EXT_26_I"
                value={editedProduct.EXT_26_I}
                onChange={handleInputChange}
                fullWidth
              />
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Rendimientos Molinos</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { m: 1, width: "15ch" } }}
              noValidate
              autoComplete="off"
            >
              <TextField
                margin="dense"
                label="MOLINO_1"
                name="MOLINO_1"
                value={editedProduct.MOLINO_1}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="MOLINO_2"
                name="MOLINO_2"
                value={editedProduct.MOLINO_2}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="MOLINO_3"
                name="MOLINO_3"
                value={editedProduct.MOLINO_3}
                onChange={handleInputChange}
                fullWidth
              />
            </Box>
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { m: 1, width: "15ch" } }}
              noValidate
              autoComplete="off"
            >
              <TextField
                margin="dense"
                label="MOLINO_4"
                name="MOLINO_4"
                value={editedProduct.MOLINO_4}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="MOLINO_5"
                name="MOLINO_5"
                value={editedProduct.MOLINO_5}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="MOLINO_6"
                name="MOLINO_6"
                value={editedProduct.MOLINO_6}
                onChange={handleInputChange}
                fullWidth
              />
            </Box>

            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { m: 1, width: "15ch" } }}
              noValidate
              autoComplete="off"
            >
              <TextField
                margin="dense"
                label="MOLINO_7"
                name="MOLINO_7"
                value={editedProduct.MOLINO_7}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="MOLINO_8"
                name="MOLINO_8"
                value={editedProduct.MOLINO_8}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="MOLINO_9"
                name="MOLINO_9"
                value={editedProduct.MOLINO_9}
                onChange={handleInputChange}
                fullWidth
              />
            </Box>
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { m: 1, width: "15ch" } }}
              noValidate
              autoComplete="off"
            >
              <TextField
                margin="dense"
                label="MOLINO_10"
                name="MOLINO_10"
                value={editedProduct.MOLINO_10}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="MOLINO_11"
                name="MOLINO_11"
                value={editedProduct.MOLINO_11}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="MOLINO_12"
                name="MOLINO_12"
                value={editedProduct.MOLINO_12}
                onChange={handleInputChange}
                fullWidth
              />
            </Box>

            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { m: 1, width: "15ch" } }}
              noValidate
              autoComplete="off"
            >
              <TextField
                margin="dense"
                label="MOLINO_13"
                name="MOLINO_13"
                value={editedProduct.MOLINO_13}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="MOLINO_14"
                name="MOLINO_14"
                value={editedProduct.MOLINO_14}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="MOLINO_15"
                name="MOLINO_15"
                value={editedProduct.MOLINO_15}
                onChange={handleInputChange}
                fullWidth
              />
            </Box>
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { m: 1, width: "15ch" } }}
              noValidate
              autoComplete="off"
            >
              <TextField
                margin="dense"
                label="MOLINO_16"
                name="MOLINO_16"
                value={editedProduct.MOLINO_16}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="MOLINO_1A"
                name="MOLINO_1A"
                value={editedProduct.MOLINO_1A}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="MOLINO_3A"
                name="MOLINO_3A"
                value={editedProduct.MOLINO_3A}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="MOLINO_4A"
                name="MOLINO_4A"
                value={editedProduct.MOLINO_4A}
                onChange={handleInputChange}
                fullWidth
              />
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Tiempos Calidad</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { m: 1, width: "15ch" } }}
              noValidate
              autoComplete="off"
            >
              <TextField
                margin="dense"
                label="CAL_EXT"
                name="CAL_EXT"
                value={editedProduct.CAL_EXT}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="CAL_MOL"
                name="CAL_MOL"
                value={editedProduct.CAL_MOL}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="CAL_MZ"
                name="CAL_MZ"
                value={editedProduct.CAL_MZ}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="CAL_CRIB"
                name="CAL_CRIB"
                value={editedProduct.CAL_CRIB}
                onChange={handleInputChange}
                fullWidth
              />
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography>Malla y Media</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              component="form"
              sx={{ "& .MuiTextField-root": { m: 1, width: "15ch" } }}
              noValidate
              autoComplete="off"
            >
              <TextField
                margin="dense"
                label="Mallas"
                name="mallas"
                value={editedProduct.mallas}
                onChange={handleInputChange}
                fullWidth
              />
              <TextField
                margin="dense"
                label="Media"
                name="media"
                value={editedProduct.media}
                onChange={handleInputChange}
                fullWidth
              />
            </Box>
          </AccordionDetails>
        </Accordion>
        {/* Agrega más campos de entrada según sea necesario */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSave}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
}
