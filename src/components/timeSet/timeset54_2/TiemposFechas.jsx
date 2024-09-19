import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "../../../style/tablas/SetUp.css";

import { fetchTime54_2 } from "../../../api/timeSet/timeSet54_2";

// Define las columnas de la tabla
const columns = [
  { id: "id", label: "Id", minWidth: 50 },
  { id: "maquina", label: "Maquina", minWidth: 170 },
  { id: "fecha", label: "Fecha", minWidth: 170 },
  { id: "hora1", label: "Hora 1", minWidth: 170 },
  { id: "hora2", label: "Hora 2", minWidth: 170 },
  { id: "hora3", label: "Hora 3", minWidth: 170 },
  { id: "hora4", label: "Hora 4", minWidth: 170 },
  { id: "totalHoras", label: "Total Horas", minWidth: 170 },
];

export default function TiemposFechas() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchTime54_2();
        const result = response.data;
        console.log("Datos obtenidos:", result); // Imprime los datos en la consola
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (data.length === 0) {
    return <p>No data available</p>;
  }

  const renderHoraData = (horaArray) => {
    if (!Array.isArray(horaArray)) {
      return "No data";
    }
    return horaArray
      .map((h) => `${h.horaMinima}-${h.horaMaxima} (${h.totalHora}h)`)
      .join(", ");
  };

  return (
    <div>
      <h3 style={{ fontSize: "20px" }}>Tiempos de Fechas</h3>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align="left"
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.maquina}</TableCell>
                  <TableCell>{row.fecha}</TableCell>
                  <TableCell>{renderHoraData(row.hora1)}</TableCell>
                  <TableCell>{renderHoraData(row.hora2)}</TableCell>
                  <TableCell>{renderHoraData(row.hora3)}</TableCell>
                  <TableCell>{renderHoraData(row.hora4)}</TableCell>
                  <TableCell>{row.totalHoras}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
