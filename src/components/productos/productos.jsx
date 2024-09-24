import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button"; // Asegúrate de importar el botón
import EditIcon from "@mui/icons-material/Edit"; // Asegúrate de importar el ícono de edición
import { useState, useEffect } from "react";
import "../../style/tablas/global.css";
import BotonAgregarProductos from "./BotonAgregarProductos";
import EditPopover from "./EditarProducto"; // Asegúrate de importar tu componente EditPopover

const columns = [
  { id: "id", label: "Id", minWidth: 170 },
  { id: "clave", label: "Clave", minWidth: 170 },
  { id: "nombre", label: "Nombre", minWidth: 170 },
  { id: "l", label: "L", minWidth: 30 },
  { id: "a", label: "A", minWidth: 30 },
  { id: "b", label: "B", minWidth: 30 },
  { id: "1", label: "Color (LAB)", minWidth: 30 },
  { id: "molinos", label: "Molinos", minWidth: 30 },
  { id: "sistema", label: "Sistema", minWidth: 30 },
  { id: "acabado", label: "Acabado", minWidth: 30 },
  { id: "brillo", label: "Brillo", minWidth: 30 },
  { id: "EXT54_II", label: "EXT54_II", minWidth: 30 },

  { id: "MOLINO_1", label: "MOLINO_1", minWidth: 30 },
  { id: "MOLINO_2", label: "MOLINO_2", minWidth: 30 },

  { id: "CAL_EXT", label: "CAL_EXT", minWidth: 30 },
  { id: "CAL_MOL", label: "CAL_MOL", minWidth: 30 },
  { id: "CAL_MZ", label: "CAL_MZ", minWidth: 30 },
  { id: "CAL_BOND", label: "CAL_BOND", minWidth: 30 },
  { id: "CAL_CRIB", label: "CAL_CRIB", minWidth: 30 },
  { id: "mallas", label: "mallas", minWidth: 30 },
  { id: "media", label: "media", minWidth: 30 },
  { id: "", label: "Editar", minWidth: 30 },
];

export default function StickyHeadTable() {
  const [productos, setProductos] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/productos")
      .then((response) => response.json())
      .then((productos) => {
        productos.sort((a, b) => new Date(b.id) - new Date(a.id));
        setProductos(productos);
      });
  }, []);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEditClick = (producto) => {
    setSelectedProduct(producto); // Abre el diálogo de edición con el producto seleccionado
  };

  const handleProductUpdate = (updatedProduct) => {
    // Actualiza el producto en la lista de productos
    const updatedProductos = productos.map((producto) =>
      producto.id === updatedProduct.id ? updatedProduct : producto
    );
    setProductos(updatedProductos);
    setSelectedProduct(null); // Cierra el diálogo de edición
  };

  return (
    <div>
      <h2>Productos</h2>
      <BotonAgregarProductos />

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    className="styleTable"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {productos
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((producto) => (
                  <TableRow
                    className="styleHover"
                    role="checkbox"
                    tabIndex={-1}
                    key={producto.id}
                  >
                    {columns.map((column) => {
                      if (column.id === "") {
                        return (
                          <TableCell key={column.id} align="center">
                            <Button onClick={() => handleEditClick(producto)}>
                              <EditIcon
                                style={{
                                  color: "#efbc25",
                                }}
                              />
                            </Button>
                          </TableCell>
                        );
                      }
                      const value = producto[column.id];

                      // Verifica si la columna es una de las columnas CAL o EXT54_II
                      const isCalColumn =
                        column.id === "CAL_EXT" ||
                        column.id === "CAL_MOL" ||
                        column.id === "CAL_MZ" ||
                        column.id === "CAL_BOND" ||
                        column.id === "CAL_CRIB";

                      const isExtColumn = column.id === "EXT54_II";

                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            backgroundColor: isCalColumn
                              ? "#9cb6dd" // Color para las columnas CAL
                              : isExtColumn
                              ? "#71d7d4" // Color para la columna EXT54_II
                              : "inherit", // Color por defecto
                          }}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[50, 100, 150]}
          component="div"
          count={productos.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      {/* Componente para editar el producto */}
      {selectedProduct && (
        <EditPopover
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSave={handleProductUpdate} // Llama a la función cuando se guarde el producto
        />
      )}
    </div>
  );
}
