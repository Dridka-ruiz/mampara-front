import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import CircularProgress from "@mui/material/CircularProgress";
import "../../style/cards.css";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useEffect } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

// Importa axios para hacer la solicitud POST
import axios from "axios";

function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export default function AlertDialog() {
  const [articulos, setArticulos] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [date, setDate] = useState(null);
  const [kilos, setKilos] = useState("");
  const [polvos, setPolvos] = useState(false); // Agregar el estado para "polvos"

  useEffect(() => {
    fetch("http://localhost:3000/productos")
      .then((response) => {
        return response.json();
      })
      .then((articulos) => {
        setArticulos(articulos);
      });
  }, []);

  const [open2, setOpen2] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open2 && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        setOptions([...articulos]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open2) {
      setOptions([]);
    }
  }, [open2]);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Manejador de cambio para el autocompletar
  const handleAutocompleteChange = (event, newValue) => {
    setSelectedArticle(newValue);
  };

  // Manejador para la fecha
  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  // Manejador para los kilos
  const handleKilosChange = (event) => {
    setKilos(event.target.value);
  };
  const handlePolvosChange = (event) => {
    setPolvos(event.target.checked);
  };

  const handleSave = () => {
    // Verificar que se han seleccionado un artículo, una fecha y kilos
    if (!selectedArticle || !date || !kilos) {
      console.error("Por favor, complete todos los campos antes de guardar.");
      return;
    }

    // Crear el objeto de datos a enviar
    const data = {
      nombre: selectedArticle.nombre,
      fecha: date,
      clave: selectedArticle.clave,
      kilos: kilos,
      polvos: polvos,
      estado: "activo", // Estado por defecto "activo"
      extrusor: " ",
      posicion: " ",
    };

    // Hacer la solicitud POST a la API
    //despues de los metodos lo que hace es un post en el cual hace un guardado de la etiqueta

    axios
      .post("http://localhost:3000/etiquetas", data)
      .then((response) => {
        // Aquí puedes manejar la respuesta de la API
        console.log("Etiqueta guardada con éxito", response.data);
        handleClose();
      })
      .catch((error) => {
        // Manejar errores
        console.error("Error al guardar la etiqueta", error);
      });
  };

  return (
    <div>
      <Button
        variant="contained"
        onClick={handleClickOpen}
        style={{ backgroundColor: "#005C53" }}
      >
        Agregar Etiqueta
        <AddCircleIcon />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          className="posicionamientoEtiquetas"
        >
          {"Agregar una etiqueta"}
        </DialogTitle>
        <DialogContent>
          <div style={{ padding: "0.3rem" }}>
            <div className="posicionamientoEtiquetas">
              <Autocomplete
                value={selectedArticle}
                onChange={handleAutocompleteChange}
                id="asynchronous-demo"
                sx={{ width: 300 }}
                open2={open2}
                onOpen={() => {
                  setOpen2(true);
                }}
                onClose={() => {
                  setOpen2(false);
                }}
                isOptionEqualToValue={(option, value) =>
                  option.nombre === value.nombre
                }
                getOptionLabel={(option) => option.nombre}
                options={options}
                loading={loading}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Nombre del producto"
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loading ? (
                            <CircularProgress color="inherit" size={20} />
                          ) : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  />
                )}
              />
            </div>
            <hr className="linea-etiqueta " />
            <div className="posicionamientoEtiquetas">
              <FormControlLabel
                control={
                  <Checkbox checked={polvos} onChange={handlePolvosChange} />
                }
                label="POLVOS"
              />
            </div>
            <hr className="linea-etiqueta" />
            <div style={{ display: "flex", gap: "0.3rem" }}>
              <FormControl
                style={{
                  width: "200px",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <DemoItem label="Agregar fecha de entrega">
                      <DatePicker
                        className="separacionCard"
                        value={date}
                        onChange={handleDateChange}
                      />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </FormControl>
              <DemoItem label="Clve de producto">
                <TextField
                  id="outlined-basic"
                  label="Clave de Producto"
                  variant="outlined"
                  disabled
                  value={selectedArticle ? selectedArticle.clave : ""}
                />
              </DemoItem>
              <FormControl sx={{ width: "34%" }} variant="outlined">
                <DemoItem label="Agregar los kilogramos">
                  <OutlinedInput
                    value={kilos}
                    id="outlined-adornment-weight"
                    endAdornment={
                      <InputAdornment position="end">kg</InputAdornment>
                    }
                    aria-describedby="outlined-weight-helper-text"
                    onChange={handleKilosChange}
                  />
                </DemoItem>
              </FormControl>
              <hr className="linea-etiqueta" />
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            style={{ backgroundColor: "red" }}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            autoFocus
            style={{ backgroundColor: "green" }}
          >
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
