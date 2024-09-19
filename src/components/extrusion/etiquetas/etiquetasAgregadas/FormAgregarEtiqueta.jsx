import React, { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "react-select";
import { fetchProductos } from "../../../../api/productosApi";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import "../../../../style/cards.css";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { AiFillAlert } from "react-icons/ai";

const EtiquetaForm = ({ onEtiquetaCreated }) => {
  const [alertMessage, setAlertMessage] = useState("");
  const [polvos, setPolvos] = useState(false);
  const [urgencias, setUrgencias] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [productos, setProductos] = useState([]);
  const [open, setOpen] = useState(false);

  const [etiquetaData, setEtiquetaData] = useState({
    fecha: "",
    clave: "",
    nombre: "",
    kilos: "",
    polvos: false,
    fecha_entrega: "",
    cambios_usuario: "",
    urgencias: false,
    productoId: "",
    fecha_real: "",
    hora_real: "",
    tpd: "",
    hora_tpd: "",
  });

  // Realiza la carga de productos solo una vez al montar el componente
  useEffect(() => {
    const cargarProductos = async () => {
      const productos = await fetchProductos();
      setProductos(productos);
    };

    cargarProductos();
  }, []); // Se pasa un array vacío para que se ejecute solo una vez

  const handleAutocompleteChange = (event, newValue) => {
    setSelectedArticle(newValue);
    setEtiquetaData((prevData) => ({
      ...prevData,
      productoId: newValue ? newValue.id : "",
      clave: newValue ? newValue.clave : "",
      nombre: newValue ? newValue.nombre : "",
    }));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e;
    if (name === "kilos" && isNaN(value)) {
      return;
    }
    setEtiquetaData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !etiquetaData.fecha ||
      !selectedArticle ||
      !etiquetaData.kilos ||
      !etiquetaData.fecha_entrega
    ) {
      setAlertMessage("Todos los campos obligatorios deben estar llenos.");
      return;
    }

    const datosAEnviar = {
      nombre: selectedArticle.nombre,
      clave: selectedArticle.clave,
      kilos: etiquetaData.kilos,
      fecha: etiquetaData.fecha,
      polvos,
      estado: "activo",
      posicion: " ",
      fecha_entrega: etiquetaData.fecha_entrega,
      cambios_usuario: "",
      premuestra: "",
      proceso: "",
      incremento: "",
      urgencias: urgencias ? "activo" : "inactivo",
      comentarios: "",
      productoId: selectedArticle.id,
      fecha_real: "",
      hora_real: "",
      tpd: "",
      hora_tpd: "",
    };

    onEtiquetaCreated(datosAEnviar);

    setEtiquetaData({
      fecha: "",
      fecha_entrega: "",
      clave: "",
      nombre: "",
      kilos: "",
      polvos: false,
      estado: "activo",
      posicion: " ",
      cambios_usuario: "",
      premuestra: "",
      proceso: "",
      incremento: "",
      urgencias: false,
      comentarios: "",
      productoId: "",
      fecha_real: "",
      hora_real: "",
      tpd: "",
      hora_tpd: "",
    });

    setPolvos(false);
    setUrgencias(false);
    setAlertMessage("");

    if (!alertMessage) {
      handleClose();
    }
  };

  const handlePolvosChange = (event) => {
    setPolvos(event.target.checked);
  };
  const handleUrgenciasChange = (event) => {
    setUrgencias(event.target.checked);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<AddCircleOutlineIcon />}
      >
        Agregar Etiqueta
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Agregar Etiqueta"}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <div className="posicionamientoEtiquetas">
              <Select
                className="select-formulario"
                value={selectedOption}
                onChange={(value) => {
                  setSelectedOption(value);
                  handleAutocompleteChange(null, value);
                }}
                options={productos}
                isSearchable
                placeholder="Nombre del producto"
                getOptionLabel={(option) => option.nombre}
                getOptionValue={(option) => option.id}
              />
            </div>
            <DemoItem label="Clave de producto">
              <TextField
                id="outlined-basic"
                label="Clave de Producto"
                variant="outlined"
                disabled
                value={selectedArticle ? selectedArticle.clave : ""}
              />
            </DemoItem>
            <hr className="linea-etiqueta " />
            <div className="posicionamientoEtiquetas">
              <FormControlLabel
                control={
                  <Checkbox checked={polvos} onChange={handlePolvosChange} />
                }
                label="POLVOS"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={urgencias}
                    onChange={handleUrgenciasChange}
                  />
                }
                label="URGENCIAS"
              />
              <AiFillAlert
                style={{
                  color: " red",
                  fontSize: "20px",
                  marginTop: "10px",
                }}
              />
            </div>
            <hr className="linea-etiqueta" />
            <div style={{ display: "flex", gap: "1rem" }}>
              <div>
                <DemoItem label="Fecha de Orden">
                  <TextField
                    margin="dense"
                    type="date"
                    fullWidth
                    name="fecha_entrega"
                    value={etiquetaData.fecha_entrega}
                    onChange={(e) =>
                      handleChange({
                        name: "fecha_entrega",
                        value: e.target.value,
                      })
                    }
                  />
                </DemoItem>
                <DemoItem label="Fecha de entrega de producto">
                  <TextField
                    margin="dense"
                    type="date"
                    fullWidth
                    name="fecha"
                    value={etiquetaData.fecha}
                    onChange={(e) =>
                      handleChange({
                        name: "fecha",
                        value: e.target.value,
                      })
                    }
                  />
                </DemoItem>
              </div>
              <div>
                <DemoItem label="Entrar a Molino ">
                  <TextField
                    id="outlined-basic"
                    label="Tipo Molino"
                    variant="outlined"
                    disabled
                    value={selectedArticle ? selectedArticle.molinos : ""}
                  />
                </DemoItem>
                <FormControl sx={{ width: "90%" }} variant="outlined">
                  <DemoItem label="Agregar los kilogramos">
                    <OutlinedInput
                      value={etiquetaData.kilos}
                      id="outlined-adornment-weight"
                      onChange={(e) =>
                        handleChange({ name: "kilos", value: e.target.value })
                      }
                      endAdornment={
                        <InputAdornment position="end">kg</InputAdornment>
                      }
                      aria-describedby="outlined-weight-helper-text"
                    />
                  </DemoItem>
                </FormControl>
              </div>
            </div>
            <div style={{ width: "40%" }}>
              <DemoItem label="Usuario que agregó etiqueta">
                <TextField
                  id="outlined-basic"
                  label="Usuario que agregó etiqueta"
                  variant="outlined"
                  disabled
                />
              </DemoItem>
            </div>
            {alertMessage && (
              <Alert severity="error" sx={{ marginBottom: 2, marginTop: 2 }}>
                {alertMessage}
              </Alert>
            )}
            <div className="styleBotton">
              <Button
                variant="contained"
                type="submit"
                style={{ backgroundColor: "green" }}
              >
                Guardar Etiqueta
              </Button>
              <Button
                onClick={handleClose}
                variant="contained"
                color="error"
                sx={{ marginLeft: 2 }}
              >
                Cancelar
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EtiquetaForm;
