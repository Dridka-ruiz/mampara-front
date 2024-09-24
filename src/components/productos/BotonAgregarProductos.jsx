import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useState } from "react";
import Switch from "@mui/material/Switch";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { BiPlusCircle } from "react-icons/bi";
import "../../style/formulario/formulario.css";
import { MdOutlineCancel } from "react-icons/md";

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [productosBase, setProductosBase] = useState([
    {
      nombre: "",
      clave: "",
      l: "",
      a: "",
      b: "",
      sistema: "",
      acabado: "",
      brillo: "",
      molinos: "",
      EXT54_II: "",
      EXTBUSS_I: "",
      EXT70_II: "",
      EXT54_IV: "",
      EXT54_V: "",
      EXT54_I: "",
      EXT_58: "",
      EXT_40: "",
      EXT54_III: "",
      EXT54_VII: "",
      EXT70_I: "",
      EXTBUSS_II: "",
      EXT54_VI: "",
      EXT70_III: "",
      EXT54_VIII: "",
      EXT_26_I: "",
      EXT_26_II: "",
      MOLINO_1: "",
      MOLINO_2: "",
      MOLINO_3: "",
      MOLINO_4: "",
      MOLINO_5: "",
      MOLINO_6: "",
      MOLINO_7: "",
      MOLINO_8: "",
      MOLINO_9: "",
      MOLINO_10: "",
      MOLINO_11: "",
      MOLINO_12: "",
      MOLINO_13: "",
      MOLINO_14: "",
      MOLINO_15: "",
      MOLINO_16: "",
      MOLINO_1A: "",
      MOLINO_3A: "",
      MOLINO_4A: "",
      CAL_EXT: "",
      CAL_MOL: "",
      CAL_MZ: "",
      CAL_BOND: "",
      CAL_CRIB: "",
      mallas: "",
      media: "",
    },
  ]);
  const handleAgregarBase = () => {
    const primerProducto = productosBase[0];
    setProductosBase([
      ...productosBase,
      {
        nombre: "",
        clave: "",
        l: "",
        a: "",
        b: "",
        sistema: "",
        acabado: primerProducto.acabado,
        brillo: "",
        molinos: "",
        EXT54_II: "",
        EXTBUSS_I: "",
        EXT70_II: "",
        EXT54_IV: "",
        EXT54_V: "",
        EXT54_I: "",
        EXT_58: "",
        EXT_40: "",
        EXT54_III: "",
        EXT54_VII: "",
        EXT70_I: "",
        EXTBUSS_II: "",
        EXT54_VI: "",
        EXT70_III: "",
        EXT54_VIII: "",
        EXT_26_I: "",
        EXT_26_II: "",
        MOLINO_1: "",
        MOLINO_2: "",
        MOLINO_3: "",
        MOLINO_4: "",
        MOLINO_5: "",
        MOLINO_6: "",
        MOLINO_7: "",
        MOLINO_8: "",
        MOLINO_9: "",
        MOLINO_10: "",
        MOLINO_11: "",
        MOLINO_12: "",
        MOLINO_13: "",
        MOLINO_14: "",
        MOLINO_15: "",
        MOLINO_16: "",
        MOLINO_1A: "",
        MOLINO_3A: "",
        MOLINO_4A: "",
        CAL_EXT: "",
        CAL_MOL: "",
        CAL_MZ: "",
        CAL_BOND: "",
        CAL_CRIB: "",
        mallas: "",
        media: "",
      },
    ]);
  };

  const handleNombreChange = (event, index) => {
    const newProductosBase = [...productosBase];
    newProductosBase[index].nombre = event.target.value;
    setProductosBase(newProductosBase);
  };

  const handleClaveChange = (event, index) => {
    const newProductosBase = [...productosBase];
    newProductosBase[index].clave = event.target.value;

    // Obtener el tercer caracter de la clave y asignarlo a acabado solo para el primer formulario
    if (index === 0) {
      const thirdChar = event.target.value.charAt(2);
      newProductosBase[index].acabado = thirdChar;
    }

    // Obtener el cuarto caracter de la clave y asignarlo a brillo para todos los formularios
    const fourthChar = event.target.value.charAt(3);
    newProductosBase[index].brillo = fourthChar;

    // Obtener el primer o segundo caracter de la clave y asignarlo a sistema
    const firstChar = event.target.value.charAt(0);
    const secondChar = event.target.value.charAt(1);
    if (firstChar === "B") {
      newProductosBase[index].sistema = secondChar;
    } else {
      newProductosBase[index].sistema = firstChar;
    }
    setProductosBase(newProductosBase);
  };

  const handleLChange = (event, index) => {
    const newProductosBase = [...productosBase];
    newProductosBase[index].l = event.target.value;
    setProductosBase(newProductosBase);
  };

  const handleAChange = (event, index) => {
    const newProductosBase = [...productosBase];
    newProductosBase[index].a = event.target.value;
    setProductosBase(newProductosBase);
  };

  const handleBChange = (event, index) => {
    const newProductosBase = [...productosBase];
    newProductosBase[index].b = event.target.value;
    setProductosBase(newProductosBase);
  };

  const handleSistemaChange = (event, index) => {
    const newProductosBase = [...productosBase];
    newProductosBase[index].sistema = event.target.value;
    setProductosBase(newProductosBase);
  };

  const handleAcabadoChange = (event, index) => {
    const newProductosBase = [...productosBase];
    newProductosBase[index].acabado = event.target.value;
    setProductosBase(newProductosBase);
  };

  const handleBrilloChange = (event, index) => {
    const newProductosBase = [...productosBase];
    newProductosBase[index].brillo = event.target.value;
    setProductosBase(newProductosBase);
  };
  const handleSave = () => {
    axios
      .post("http://localhost:3000/productos", productosBase)
      .then((response) => {
        console.log("Productos Guardados con éxito", response.data);
        handleClose();
      })
      .catch((error) => {
        console.error("Error al guardar los productos", error);
      });
  };

  const handleEliminarBase = (index) => {
    const newProductosBase = [...productosBase];
    newProductosBase.splice(index, 1);
    setProductosBase(newProductosBase);
  };

  return (
    <React.Fragment>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        startIcon={<AddCircleIcon />}
      >
        Agregar Productos
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Agregar Productos"}</DialogTitle>
        <DialogContent>
          {productosBase.map((producto, index) => (
            <div key={index} style={{ display: "grid", gap: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {index > 0 && ( // Mostrar título solo a partir del segundo formulario adicional
                  <DialogTitle
                    style={{
                      margin: "17px 0px -28px 0px",
                      padding: "0px",
                    }}
                  >
                    {"Agregar Bases"}
                  </DialogTitle>
                )}
                <TextField
                  id={`nombre-${index}`}
                  label="Nombre del Producto"
                  variant="outlined"
                  style={{ marginTop: "1rem" }}
                  onChange={(event) => handleNombreChange(event, index)}
                  value={producto.nombre}
                />
                <TextField
                  id={`clave-${index}`}
                  label="Clave del Producto"
                  variant="outlined"
                  onChange={(event) => handleClaveChange(event, index)}
                  value={producto.clave}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                }}
              >
                <TextField
                  id={`sistema-${index}`}
                  label="Sistema"
                  variant="outlined"
                  onChange={(event) => handleSistemaChange(event, index)}
                  value={producto.sistema}
                />
                <TextField
                  id={`acabado-${index}`}
                  label="Acabado"
                  variant="outlined"
                  onChange={(event) => handleAcabadoChange(event, index)}
                  value={producto.acabado}
                />
                <TextField
                  id={`brillo-${index}`}
                  label="Brillo"
                  variant="outlined"
                  onChange={(event) => handleBrilloChange(event, index)}
                  value={producto.brillo}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                }}
              >
                <TextField
                  id={`l-${index}`}
                  label="L"
                  variant="outlined"
                  onChange={(event) => handleLChange(event, index)}
                  value={producto.l}
                />
                <TextField
                  id={`a-${index}`}
                  label="A"
                  variant="outlined"
                  onChange={(event) => handleAChange(event, index)}
                  value={producto.a}
                />
                <TextField
                  id={`b-${index}`}
                  label="B"
                  variant="outlined"
                  onChange={(event) => handleBChange(event, index)}
                  value={producto.b}
                />
              </div>
              {index > 0 && (
                <Button
                  variant="contained"
                  style={{
                    width: "250px",
                    display: "flex",
                    gap: "5px",
                    margin: "1rem 0",
                    background: "#F54B00",
                  }}
                  onClick={() => handleEliminarBase(index)}
                >
                  <MdOutlineCancel style={{ fontSize: "20px" }} />
                  Eliminar
                </Button>
              )}
            </div>
          ))}
          <div
            style={{
              display: "flex",
              gap: "1rem",
            }}
          >
            <Button
              variant="contained"
              style={{
                width: "250px",
                display: "flex",
                gap: "5px",
                margin: "1rem 0",
                background: "#07A0ED",
              }}
              onClick={handleAgregarBase}
            >
              <BiPlusCircle style={{ fontSize: "20px" }} />
              Agregar Base
            </Button>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleSave}
            style={{
              background: "green",
            }}
          >
            Agregar
          </Button>
          <Button
            onClick={handleClose}
            autoFocus
            variant="contained"
            style={{
              background: "red",
            }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
