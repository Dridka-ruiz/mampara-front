import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";
import "../../style/tablas/global.css";
import { LabToRGB } from "../../color/colorConverter";

import BotonAgregarProductos from "./BotonAgregarProductos";

const columns = [
  { id: "id", label: "Id", minWidth: 170 },
  { id: "clave", label: "Clave", minWidth: 170 },
  { id: "nombre", label: "Nombre", minWidth: 170 },
  { id: "l", label: "L", minWidth: 30 },
  { id: "a", label: "A", minWidth: 30 },
  { id: "b", label: "B", minWidth: 30 },
  { id: "r", label: "R", minWidth: 30 },
  { id: "g", label: "g", minWidth: 30 },
  { id: "b_", label: "B_", minWidth: 30 },
  { id: "1", label: "Color (LAB)", minWidth: 30 },
  /*  { id: "2", label: "Color (RGB)", minWidth: 30 }, */
  { id: "molinos", label: "Molinos", minWidth: 30 },
  { id: "sistema", label: "Sistema", minWidth: 30 },
  { id: "acabado", label: "Acabado", minWidth: 30 },
  { id: "brillo", label: "Brillo", minWidth: 30 },
];

export default function StickyHeadTable() {
  const [productos, setProductos] = useState([]);
  /*   console.log(productos); */

  useEffect(() => {
    fetch("http://localhost:3000/productos")
      .then((response) => {
        return response.json();
      })
      .then((productos) => {
        // Ordenar los productos por fecha programada de más reciente a más antigua
        productos.sort((a, b) => new Date(b.id) - new Date(a.id));
        setProductos(productos);
      });
  }, []);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <h2>Productos </h2>
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
                .map((productos) => {
                  return (
                    <TableRow
                      /* hover */
                      className="styleHover "
                      role="checkbox"
                      tabIndex={-1}
                      key={productos.id}
                    >
                      {columns.map((column) => {
                        const value = productos[column.id];
                        if (
                          column.id === "" &&
                          column.label === "Color (LAB)"
                        ) {
                          // Si la columna es para el color (LAB), pinta la celda con el color LAB
                          const { r, g, b_ } = LabToRGB(
                            productos["l"],
                            productos["a"],
                            productos["b"]
                          );
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{
                                backgroundColor: `rgb(${r}, ${g}, ${b_})`,
                              }}
                            >
                              {value}
                            </TableCell>
                          );
                        } else if (
                          column.id === "" &&
                          column.label === "Color (RGB)"
                        ) {
                          // Si la columna es para el color (RGB), pinta la celda con el color RGB
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{
                                backgroundColor: `rgb(${productos.r}, ${productos.g}, ${productos.b_})`,
                              }}
                            >
                              {value}
                            </TableCell>
                          );
                        }

                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
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
    </div>
  );
}
