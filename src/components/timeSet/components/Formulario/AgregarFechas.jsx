import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";

// Importa las funciones de API para guardar los datos en los extrusores
import { createTime54_2 } from "../../../../api/timeSet/timeSet54_2";
import { createTimeBuss1 } from "../../../../api/timeSet/timeSetBuss1";
import { createTime70_2 } from "../../../../api/timeSet/timeSet70_2";
import { createTime54_4 } from "../../../../api/timeSet/timeSet54_4";
import { createTime54_5 } from "../../../../api/timeSet/timeSet54_5";
import { createTime54_1 } from "../../../../api/timeSet/timeSet54_1";
import { createTime58 } from "../../../../api/timeSet/timeSet58";
import { createTime40 } from "../../../../api/timeSet/timeSet40";
import { createTime54_3 } from "../../../../api/timeSet/timeSet54_3";
import { createTime54_7 } from "../../../../api/timeSet/timeSet54_7";
import { createTime70_1 } from "../../../../api/timeSet/timeSet70_1";
import { createTimeBuss2 } from "../../../../api/timeSet/timeSetBuss2";
import { createTime26_1 } from "../../../../api/timeSet/timeSet26_1";
import { createTime26_2 } from "../../../../api/timeSet/timeSet26_2";
import { createTime54_6 } from "../../../../api/timeSet/timeSet54_6";
import { createTime70_3 } from "../../../../api/timeSet/timeSet70_3";
import { createTime54_8 } from "../../../../api/timeSet/timeSet54_8";

import { MdMoreTime } from "react-icons/md";

export default function AgregarFechas() {
  const [open, setOpen] = React.useState(false);
  const [checkedItems, setCheckedItems] = React.useState({
    all: false,
    ext54_2: false,
    buss1: false,
    ext70_2: false,
    ext54_4: false,
    ext54_5: false,
    ext54_1: false,
    ext58: false,
    ext40: false,
    ext54_3: false,
    ext54_7: false,
    ext70_1: false,
    extBuss2: false,
    ext26_1: false,
    ext26_2: false,
    ext54_6: false,
    ext70_3: false,
    ext54_8: false,
  });

  const [formData, setFormData] = React.useState({
    fecha: "",
    totalHoras: 0,
    hora1: [
      { id: "1", horaMinima: "00:00", horaMaxima: "06:00", totalHora: 6 },
    ],
    hora2: [
      { id: "2", horaMinima: "06:00", horaMaxima: "14:00", totalHora: 8 },
    ],
    hora3: [
      { id: "3", horaMinima: "14:00", horaMaxima: "21:30", totalHora: 7.5 },
    ],
    hora4: [
      { id: "4", horaMinima: "21:30", horaMaxima: "00:00", totalHora: 2.5 },
    ],
    maquina: "",
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems((prev) => ({
      ...prev,
      [name]: checked,
      ...(name === "all" && {
        ext54_2: checked,
        buss1: checked,
        ext70_2: checked,
        ext54_4: checked,
        ext54_5: checked,
        ext54_1: checked,
        ext58: checked,
        ext40: checked,
        ext54_3: checked,
        ext54_7: checked,
        ext70_1: checked,
        extBuss2: checked,
        ext26_1: checked,
        ext26_2: checked,
        ext54_6: checked,
        ext70_3: checked,
        ext54_8: checked,
      }),
    }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Función para calcular la diferencia entre dos horas
  const calculateTotalHour = (horaMinima, horaMaxima) => {
    const [minH, minM] = horaMinima.split(":").map(Number);
    const [maxH, maxM] = horaMaxima.split(":").map(Number);
    const start = new Date(0, 0, 0, minH, minM);
    const end = new Date(0, 0, 0, maxH, maxM);
    const diff = (end - start) / 1000 / 60 / 60; // Diferencia en horas
    return diff < 0 ? diff + 24 : diff; // Si es negativo, ajusta para día siguiente
  };

  // Manejador de cambio para las horas de "hora1", "hora2", "hora3", "hora4"
  const handleHoraChange = (event, horaKey) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      const updatedHora = { ...prev[horaKey][0], [name]: value };
      const totalHora = calculateTotalHour(
        updatedHora.horaMinima,
        updatedHora.horaMaxima
      );

      return {
        ...prev,
        [horaKey]: [{ ...updatedHora, totalHora }],
      };
    });
  };

  const handleAdd = () => {
    if (checkedItems.ext54_2) {
      createTime54_2(formData);
    }
    if (checkedItems.buss1) {
      createTimeBuss1(formData);
    }
    if (checkedItems.ext70_2) {
      createTime70_2(formData);
    }
    if (checkedItems.ext54_4) {
      createTime54_4(formData);
    }
    if (checkedItems.ext54_5) {
      createTime54_5(formData); // Ajusta la llamada a la función API según tus necesidades
    }
    if (checkedItems.ext54_1) {
      createTime54_1(formData); // Ajusta la llamada a la función API según tus necesidades
    }
    if (checkedItems.ext58) {
      createTime58(formData); // Ajusta la llamada a la función API según tus necesidades
    }
    if (checkedItems.ext40) {
      createTime40(formData); // Ajusta la llamada a la función API según tus necesidades
    }
    if (checkedItems.ext54_3) {
      createTime54_3(formData); // Ajusta la llamada a la función API según tus necesidades
    }
    if (checkedItems.ext54_7) {
      createTime54_7(formData); // Ajusta la llamada a la función API según tus necesidades
    }
    if (checkedItems.ext70_1) {
      createTime70_1(formData); // Ajusta la llamada a la función API según tus necesidades
    }
    if (checkedItems.extBuss2) {
      createTimeBuss2(formData); // Ajusta la llamada a la función API según tus necesidades
    }
    if (checkedItems.ext26_1) {
      createTime26_1(formData); // Ajusta la llamada a la función API según tus necesidades
    }
    if (checkedItems.ext26_2) {
      createTime26_2(formData); // Ajusta la llamada a la función API según tus necesidades
    }
    if (checkedItems.ext54_6) {
      createTime54_6(formData); // Ajusta la llamada a la función API según tus necesidades
    }
    if (checkedItems.ext70_3) {
      createTime70_3(formData); // Ajusta la llamada a la función API según tus necesidades
    }
    if (checkedItems.ext54_8) {
      createTime54_8(formData); // Ajusta la llamada a la función API según tus necesidades
    }

    handleClose();
  };

  return (
    <React.Fragment>
      <Button variant="contained" onClick={handleClickOpen} color="success">
        <MdMoreTime style={{ fontSize: "25px" }} />
        Agregar Fechas
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{
            fontSize: "25px",
          }}
        >
          {"Agrega las fechas y las horas de trabajo "}
        </DialogTitle>
        <DialogContent>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkedItems.all}
                onChange={handleChange}
                name="all"
              />
            }
            label="Para Todos"
            labelPlacement="start"
          />
          <div className="pocicionamientoChec">
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems.ext54_2}
                    onChange={handleChange}
                    name="ext54_2"
                  />
                }
                label="EXT54 II"
                labelPlacement="start"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems.buss1}
                    onChange={handleChange}
                    name="buss1"
                  />
                }
                label="BUSS I"
                labelPlacement="start"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems.ext70_2}
                    onChange={handleChange}
                    name="ext70_2"
                  />
                }
                label="EXT70 II"
                labelPlacement="start"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems.ext54_4}
                    onChange={handleChange}
                    name="ext54_4"
                  />
                }
                label="EXT54 IV"
                labelPlacement="start"
              />

              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems.ext54_5}
                    onChange={handleChange}
                    name="ext54_5"
                  />
                }
                label="EXT54 V"
                labelPlacement="start"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems.ext54_1}
                    onChange={handleChange}
                    name="ext54_1"
                  />
                }
                label="EXT54 I"
                labelPlacement="start"
              />
            </Box>
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems.ext58}
                    onChange={handleChange}
                    name="ext58"
                  />
                }
                label="EXT 58"
                labelPlacement="start"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems.ext40}
                    onChange={handleChange}
                    name="ext40"
                  />
                }
                label="EXT 40"
                labelPlacement="start"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems.ext54_3}
                    onChange={handleChange}
                    name="ext54_3"
                  />
                }
                label="EXT54 III"
                labelPlacement="start"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems.ext54_7}
                    onChange={handleChange}
                    name="ext54_7"
                  />
                }
                label="EXT54 VII"
                labelPlacement="start"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems.ext70_1}
                    onChange={handleChange}
                    name="ext70_1"
                  />
                }
                label="EXT70 I"
                labelPlacement="start"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems.extBuss2}
                    onChange={handleChange}
                    name="extBuss2"
                  />
                }
                label="BUSS 2"
                labelPlacement="start"
              />
            </Box>
            <Box>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems.ext26_1}
                    onChange={handleChange}
                    name="ext26_1"
                  />
                }
                label="EXT26 1"
                labelPlacement="start"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems.ext26_2}
                    onChange={handleChange}
                    name="ext26_2"
                  />
                }
                label="EXT26 2"
                labelPlacement="start"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems.ext54_6}
                    onChange={handleChange}
                    name="ext54_6"
                  />
                }
                label="EXT54 6"
                labelPlacement="start"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems.ext70_3}
                    onChange={handleChange}
                    name="ext70_3"
                  />
                }
                label="EXT70 3"
                labelPlacement="start"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedItems.ext54_8}
                    onChange={handleChange}
                    name="ext54_8"
                  />
                }
                label="EXT54 8"
                labelPlacement="start"
              />
            </Box>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <Box style={{ display: "flex", gap: "1rem" }}>
              <TextField
                margin="dense"
                type="date"
                fullWidth
                name="fecha"
                label="Fecha"
                value={formData.fecha}
                onChange={handleInputChange}
              />
              <TextField
                margin="dense"
                type="number"
                fullWidth
                name="totalHoras"
                label="Total Horas"
                value={formData.totalHoras}
                onChange={handleInputChange}
              />
            </Box>

            {/* Hora 1 */}
            <Box style={{ display: "flex", gap: "1rem" }}>
              <TextField
                margin="dense"
                type="text"
                fullWidth
                name="horaMinima"
                label="Hora Mínima 1"
                value={formData.hora1[0].horaMinima}
                onChange={(e) => handleHoraChange(e, "hora1")}
              />
              <TextField
                margin="dense"
                type="text"
                fullWidth
                name="horaMaxima"
                label="Hora Máxima 1"
                value={formData.hora1[0].horaMaxima}
                onChange={(e) => handleHoraChange(e, "hora1")}
              />
              <TextField
                margin="dense"
                type="number"
                fullWidth
                name="totalHora"
                label="Total Hora 1"
                value={formData.hora1[0].totalHora}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>

            {/* Hora 2 */}
            <Box style={{ display: "flex", gap: "1rem" }}>
              <TextField
                margin="dense"
                type="text"
                fullWidth
                name="horaMinima"
                label="Hora Mínima 2"
                value={formData.hora2[0].horaMinima}
                onChange={(e) => handleHoraChange(e, "hora2")}
              />
              <TextField
                margin="dense"
                type="text"
                fullWidth
                name="horaMaxima"
                label="Hora Máxima 2"
                value={formData.hora2[0].horaMaxima}
                onChange={(e) => handleHoraChange(e, "hora2")}
              />
              <TextField
                margin="dense"
                type="number"
                fullWidth
                name="totalHora"
                label="Total Hora 2"
                value={formData.hora2[0].totalHora}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>

            {/* Hora 3 */}
            <Box style={{ display: "flex", gap: "1rem" }}>
              <TextField
                margin="dense"
                type="text"
                fullWidth
                name="horaMinima"
                label="Hora Mínima 3"
                value={formData.hora3[0].horaMinima}
                onChange={(e) => handleHoraChange(e, "hora3")}
              />
              <TextField
                margin="dense"
                type="text"
                fullWidth
                name="horaMaxima"
                label="Hora Máxima 3"
                value={formData.hora3[0].horaMaxima}
                onChange={(e) => handleHoraChange(e, "hora3")}
              />
              <TextField
                margin="dense"
                type="number"
                fullWidth
                name="totalHora"
                label="Total Hora 3"
                value={formData.hora3[0].totalHora}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>

            {/* Hora 4 */}
            <Box style={{ display: "flex", gap: "1rem" }}>
              <TextField
                margin="dense"
                type="text"
                fullWidth
                name="horaMinima"
                label="Hora Mínima 4"
                value={formData.hora4[0].horaMinima}
                onChange={(e) => handleHoraChange(e, "hora4")}
              />
              <TextField
                margin="dense"
                type="text"
                fullWidth
                name="horaMaxima"
                label="Hora Máxima 4"
                value={formData.hora4[0].horaMaxima}
                onChange={(e) => handleHoraChange(e, "hora4")}
              />
              <TextField
                margin="dense"
                type="number"
                fullWidth
                name="totalHora"
                label="Total Hora 4"
                value={formData.hora4[0].totalHora}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="error">
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleAdd}
            autoFocus
            color="success"
          >
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
