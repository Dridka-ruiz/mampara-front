import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";

import TableRow from "@mui/material/TableRow";
import "../../../style/tablas/SetUp.css";

import { fetchSetUp } from "../../../api/setUp/extrusor/SetUp";

const columns = [
  { id: "id", label: "Id", minWidth: 170 },
  { id: "maquina", label: "Extrusor" },
  { id: "distanciaMin", label: "Distancia Mínima", minWidth: 100 },
  { id: "distanciaMax", label: "Distancia Máxima", minWidth: 100 },
  { id: "tiempos", label: "Tiempos", minWidth: 170 },
  { id: "", label: "Opciones", minWidth: 100 },
];

export default function LimpiezaExtrucion() {
  const [setUp, setSetUp] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(100);

  useEffect(() => {
    const fetchExistingDates = async () => {
      try {
        const response = await fetchSetUp();
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
      <h3
        style={{
          fontSize: "20px",
        }}
      >
        Tiempos de Limpieza L A B
      </h3>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    className="styleTable3"
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
                  .flatMap((item) =>
                    item.tiempos_distancia.map((td, index) => (
                      <TableRow
                        className="styleHover1"
                        role="checkbox"
                        key={`${item.id}-${index}`}
                      >
                        {index === 0 && (
                          <>
                            <TableCell
                              className={getColorClass(item.id, "tiempos-cell")}
                              rowSpan={item.tiempos_distancia.length}
                            >
                              {item.id}
                            </TableCell>
                            <TableCell
                              className={getColorClass(item.id, "tiempos-cell")}
                              rowSpan={item.tiempos_distancia.length}
                            >
                              {item.maquina}
                            </TableCell>
                          </>
                        )}
                        <TableCell
                          className={getColorClass(item.id, "tiempos-cell")}
                        >
                          {td.distanciaMin}
                        </TableCell>
                        <TableCell
                          className={getColorClass(item.id, "tiempos-cell")}
                        >
                          {td.distanciaMax}
                        </TableCell>{" "}
                        <TableCell
                          className={getColorClass(item.id, "tiempos-cell")}
                        >
                          {td.tiempos}
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
