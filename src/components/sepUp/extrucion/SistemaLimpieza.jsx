import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "../../../style/tablas/SetUp.css";

import { fetchSistemaLimpieza } from "../../../api/setUp/extrusor/SistemaLimpieza";

const columns = [
  { id: "id", label: "Id", minWidth: 50 },
  { id: "sistema", label: "Sistema Producto 1", minWidth: 170 },
  { id: "sistema_producto1", label: "Código Producto 1", minWidth: 170 },
  { id: "sistema2", label: "Sistema Producto 2", minWidth: 170 },
  { id: "termi_sistema2", label: "Código Producto 2", minWidth: 170 },
  { id: "tiempos_limpieza", label: "Tiempo Limpieza", minWidth: 170 },

  { id: "", label: "Opciones", minWidth: 100 },
];

export default function LimpiezaExtrucion() {
  const [setUp, setSetUp] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchExistingDates = async () => {
      try {
        const response = await fetchSistemaLimpieza();
        if (response && Array.isArray(response.data)) {
          setSetUp(response.data);
        } else {
          setSetUp([]);
        }
      } catch (error) {
        console.error("Error fetching existing dates:", error);
        setSetUp([]);
      }
    };

    fetchExistingDates();
  }, []);

  const getColorClass = (id, baseClass) => {
    return id % 2 === 0 ? `${baseClass}-id2` : `${baseClass}-id1`;
  };

  return (
    <div>
      <h3 style={{ fontSize: "20px" }}>Tiempos de Limpieza Sistema</h3>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    className="styleTableAcabado4"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(setUp) &&
                setUp
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((item) =>
                    item.producto2.map((producto, index) => (
                      <TableRow
                        className="styleHover1"
                        role="checkbox"
                        key={`${item.id}-${producto.id}`}
                      >
                        {index === 0 && (
                          <>
                            <TableCell
                              className={getColorClass(item.id, "sistema-cell")}
                              rowSpan={item.producto2.length}
                            >
                              {item.id}
                            </TableCell>
                            <TableCell
                              className={getColorClass(item.id, "sistema-cell")}
                              rowSpan={item.producto2.length}
                            >
                              {item.sistema}
                            </TableCell>
                            <TableCell
                              className={getColorClass(item.id, "sistema-cell")}
                              rowSpan={item.producto2.length}
                            >
                              {item.sistema_producto1}
                            </TableCell>
                          </>
                        )}
                        <TableCell
                          className={getColorClass(item.id, "sistema-cell")}
                        >
                          {producto.sistema2}
                        </TableCell>
                        <TableCell
                          className={getColorClass(item.id, "sistema-cell")}
                        >
                          {producto.termi_sistema2}
                        </TableCell>
                        <TableCell
                          className={getColorClass(item.id, "sistema-cell")}
                        >
                          {producto.tiempos_limpieza}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
