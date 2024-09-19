import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import Button from "@mui/material/Button";
import { FaFileExcel } from "react-icons/fa";

const ExportToExcel = () => {
  const [data, setData] = useState([]);

  const endpoints = [
    {
      url: "http://localhost:3000/etiquetasExt54_2",
      setState: "etiquetas54_2",
    },
    {
      url: "http://localhost:3000/etiquetasBussl",
      setState: "etiquetasBussl",
    },
    {
      url: "http://localhost:3000/etiquetasExt70_2",
      setState: "etiquetasExt70_2",
    },
    {
      url: "http://localhost:3000/etiquetasExt54_4",
      setState: "etiquetasExt54_4",
    },
    {
      url: "http://localhost:3000/etiquetasExt54_5",
      setState: "etiquetasExt54_5",
    },
    {
      url: "http://localhost:3000/etiquetasExt54_1",
      setState: "etiquetasExt54_1",
    },
    {
      url: "http://localhost:3000/etiquetasExt58",
      setState: "etiquetasExt58",
    },
    {
      url: "http://localhost:3000/etiquetasExt40",
      setState: "etiquetasExt40",
    },
    {
      url: "http://localhost:3000/etiquetasExt54_3",
      setState: "etiquetasExt54_3",
    },
    {
      url: "http://localhost:3000/etiquetasExt54_7",
      setState: "etiquetasExt54_7",
    },
    {
      url: "http://localhost:3000/etiquetasExt70_1",
      setState: "etiquetasExt70_1",
    },
    {
      url: "http://localhost:3000/etiquetasBussll",
      setState: "etiquetasBuss2",
    },
    {
      url: "http://localhost:3000/etiquetasExt26_1",
      setState: "etiquetasExt26_1",
    },
    {
      url: "http://localhost:3000/etiquetasExt26_2",
      setState: "etiquetasExt26_2",
    },
    {
      url: "http://localhost:3000/etiquetasExt54_6",
      setState: "etiquetasExt54_6",
    },
    {
      url: "http://localhost:3000/etiquetasExt70_3",
      setState: "etiquetasExt70_3",
    },
    {
      url: "http://localhost:3000/etiquetasExt54_8",
      setState: "etiquetasExt54_8",
    },
  ];

  useEffect(() => {
    endpoints.forEach(fetchData);
  }, []);

  const fetchData = async ({ url }) => {
    try {
      const response = await axios.get(url);
      setData((prevData) => [...prevData, ...formatData(response.data)]);
    } catch (error) {
      console.error(`Error al obtener datos desde ${url}:`, error);
    }
  };

  const formatDate = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const formatDate2 = (date) => {
    const [day, month, year] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const formatData = (data) => {
    return data.map(
      ({
        fecha,
        fecha_entrega,
        polvos,
        comentarios,
        estado,
        cambios_usuario,
        incremento,
        proceso,
        premuestra,
        urgencias,
        productoId,
        createdAt,
        updatedAt,
        fecha_real,
        hora_real,
        tpd,
        hora_tpd,
        ...rest
      }) => ({
        ...rest,
        fecha_entrega: formatDate(fecha),
        fecha_llegada: formatDate(fecha_entrega),
        fecha_termino: formatDate(fecha_real),
        hora_termino: hora_real,
        fecha_tpd: formatDate2(tpd),
        hora_tpd: hora_tpd,
      })
    );
  };

  const exportToExcel = () => {
    try {
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(data);

      // Calcular el ancho de las columnas
      const columnWidths = Object.keys(data[0]).map((key) => {
        const maxLength = Math.max(
          ...data.map((row) => String(row[key]).length)
        );
        return { wch: maxLength > 10 ? maxLength : 10 }; // Ancho mínimo de 10
      });

      worksheet["!cols"] = columnWidths;

      XLSX.utils.book_append_sheet(workbook, worksheet, "mampara");
      XLSX.writeFile(workbook, "mampara.xlsx");
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
