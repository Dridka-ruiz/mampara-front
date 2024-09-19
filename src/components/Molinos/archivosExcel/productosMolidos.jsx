import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import Button from "@mui/material/Button";
import { FaFileExcel } from "react-icons/fa";
import generalData from "../../../api/fechas"; // Importa los datos generales

const ExportToExcel = () => {
  const [productoMolido, setProductoMolido] = useState([]);
  useEffect(() => {
    fetchDataProductoMolido();
  }, []);

  const fetchDataProductoMolido = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/productos-molidos"
      );
      setProductoMolido(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };

  const formatDate2 = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}/${month}/${year}`;
  };

  const generateFechaClave = (fechaReal, generalData) => {
    const fechaClave = generalData.find(
      (fecha) => formatDate2(fecha.fecha_real) === formatDate2(fechaReal)
    );

    return fechaClave ? `${fechaClave.general}` : "";
  };

  const exportToExcel = () => {
    try {
      const dataToExportProductoMolido = productoMolido.map(
        ({
          createdAt,
          updatedAt,
          id,
          clave,
          fecha_real,
          nombre,
          maquina,
          cantidad,
          fecha_programada,
          hora_programada,
          hora_real,
          ...rest
        }) => ({
          ...rest,
          clave: clave,
          cantidad: cantidad,
          nombre: nombre,
          maquina: maquina,
          fecha_programada: fecha_programada,
          hora_programada: hora_programada,
          fecha_real: formatDate(fecha_real),
          hora_real: hora_real,
          claveUnica: `${generateFechaClave(fecha_real, generalData)}${clave}`,
        })
      );

      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(dataToExportProductoMolido);
      XLSX.utils.book_append_sheet(workbook, worksheet, "productos_Molidos");

      XLSX.writeFile(workbook, "productos_molidos.xlsx");
    } catch (error) {
      console.error("Error al exportar a Excel:", error);
    }
  };

  return (
    <div>
      <Button
        startIcon={<FaFileExcel />}
        variant="contained"
        onClick={exportToExcel}
        color="success"
      >
        Exportar a Excel
      </Button>
    </div>
  );
};

export default ExportToExcel;
