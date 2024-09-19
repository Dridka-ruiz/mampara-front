import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "../../../style/tablas/SetUp.css";

import { fetchAcabadoLimpieza } from "../../../api/setUp/extrusor/AcabadoLimpieza";

const columns = [
  { id: "id", label: "Id", minWidth: 50 },
  { id: "acabado", label: "Acabado Producto 1", minWidth: 170 },
  { id: "acabado_producto1", label: "Código Producto 1", minWidth: 170 },
  { id: "acabado2", label: "Acabado Producto 2", minWidth: 170 },
  { id: "termi_acabado2", label: "Código Producto 2", minWidth: 170 },
  { id: "tiempos_limpieza", label: "Tiempo Limpieza", minWidth: 170 },
  { id: "tiempo", label: "Tiempo", minWidth: 170 },
  { id: "", label: "Opciones", minWidth: 100 },
];

export default function LimpiezaExtrucion() {
  const [setUp, setSetUp] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchExistingDates = async () => {
      try {
        const response = await fetchAcabadoLimpieza();
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
      <h3 style={{ fontSize: "20px" }}>Tiempos de Limpieza Acabado</h3>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    className="styleTableAcabado3"
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
                              className={getColorClass(item.id, "acabado-cell")}
                              rowSpan={item.producto2.length}
                            >
                              {item.id}
                            </TableCell>
                            <TableCell
                              className={getColorClass(item.id, "acabado-cell")}
                              rowSpan={item.producto2.length}
                            >
                              {item.acabado}
                            </TableCell>
                            <TableCell
                              className={getColorClass(item.id, "acabado-cell")}
                              rowSpan={item.producto2.length}
                            >
                              {item.acabado_producto1}
                            </TableCell>
                          </>
                        )}
                        <TableCell
                          className={getColorClass(item.id, "acabado-cell")}
                        >
                          {producto.acabado2}
                        </TableCell>
                        <TableCell
                          className={getColorClass(item.id, "acabado-cell")}
                        >
                          {producto.termi_acabado2}
                        </TableCell>
                        <TableCell
                          className={getColorClass(item.id, "acabado-cell")}
                        >
                          {producto.tiempos_limpieza}
                        </TableCell>
                        <TableCell
                          className={getColorClass(item.id, "acabado-cell")}
                        >
                          {producto.tiempo}
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
