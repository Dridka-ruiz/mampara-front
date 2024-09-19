import * as React from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";
import "../../../style/tablas/global.css";
import { apiParosMantenimiento } from "../../../api/setUp/extrusor/ParosMantenimiento";

const columns = [
  { id: "id", label: "Id", minWidth: 170 },
  { id: "t_mantenimento", label: "Tiempos Mantenimiento", minWidth: 170 },
  { id: "t_paros", label: "Tiempos Paros", minWidth: 170 },
  { id: "t_final", label: "Tiempos TOTAL", minWidth: 170 },
  { id: "formula", label: "Fórmula 1+(suma_tiempos/100)", minWidth: 170 },
];

export default function StickyHeadTable() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(apiParosMantenimiento);
        let productos = response.data;

        // Ordenar los productos por fecha programada de más reciente a más antigua
        productos.sort((a, b) => new Date(b.id) - new Date(a.id));

        // Agregar t_final y fórmula a cada producto
        const productosConTFinalYFormula = productos.map((producto) => {
          const t_mantenimento = parseFloat(producto.t_mantenimento) || 0;
          const t_paros = parseFloat(producto.t_paros) || 0;
          const t_final = t_mantenimento + t_paros;
          const formula = 1 + t_final / 100;

          // Enviar el valor de fórmula a la API
          actualizarTTotal(producto.id, formula);

          return {
            ...producto,
            t_final,
            formula,
          };
        });
        setProductos(productosConTFinalYFormula);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchData();
  }, []);

  const actualizarTTotal = async (id, formula) => {
    try {
      await axios.put(`${apiParosMantenimiento}/${id}`, {
        t_total: formula,
      });
    } catch (error) {
      console.error("Error al actualizar t_total:", error);
    }
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <h2>Tiempos de Paro y Mantenimiento</h2>

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
                      const value = producto[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          className="styleHover2"
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
      </Paper>
    </div>
  );
}
