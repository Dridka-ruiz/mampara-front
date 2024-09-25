import React from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { RiFileExcel2Fill } from "react-icons/ri";

function ExportarExcel() {
  const fetchDataAndExport = async () => {
    try {
      // Realizar solicitudes a las tres APIs
      const [
        dataExt,
        dataBussl,
        dataExt70,
        dataExt54_4,
        dataExt54_5,
        dataExt54_1,
        dataExt58,
        dataExt40,
        dataExt54_3,
        dataExt54_7,
        dataExt72,
        dataBussll,
        dataExt26_1,
        dataExt54_6,
        dataExt73,
        dataExt54_8,
      ] = await Promise.all([
        fetch(
          "https://operaciones-mampara-dun.vercel.app/etiquetasExt54_2"
        ).then((res) => res.json()),
        fetch("https://operaciones-mampara-dun.vercel.app/etiquetasBussl").then(
          (res) => res.json()
        ),
        fetch(
          "https://operaciones-mampara-dun.vercel.app/etiquetasExt70_2"
        ).then((res) => res.json()),
        fetch(
          "https://operaciones-mampara-dun.vercel.app/etiquetasExt54_4"
        ).then((res) => res.json()),
        fetch(
          "https://operaciones-mampara-dun.vercel.app/etiquetasExt54_5"
        ).then((res) => res.json()),
        fetch(
          "https://operaciones-mampara-dun.vercel.app/etiquetasExt54_1"
        ).then((res) => res.json()),
        fetch("https://operaciones-mampara-dun.vercel.app/etiquetasExt58").then(
          (res) => res.json()
        ),
        fetch("https://operaciones-mampara-dun.vercel.app/etiquetasExt40").then(
          (res) => res.json()
        ),
        fetch(
          "https://operaciones-mampara-dun.vercel.app/etiquetasExt54_3"
        ).then((res) => res.json()),
        fetch(
          "https://operaciones-mampara-dun.vercel.app/etiquetasExt54_7"
        ).then((res) => res.json()),
        fetch(
          "https://operaciones-mampara-dun.vercel.app/etiquetasExt70_1"
        ).then((res) => res.json()),
        fetch(
          "https://operaciones-mampara-dun.vercel.app/etiquetasBussll"
        ).then((res) => res.json()),
        fetch(
          "https://operaciones-mampara-dun.vercel.app/etiquetasExt26_1"
        ).then((res) => res.json()),
        fetch(
          "https://operaciones-mampara-dun.vercel.app/etiquetasExt54_6"
        ).then((res) => res.json()),
        fetch(
          "https://operaciones-mampara-dun.vercel.app/etiquetasExt70_3"
        ).then((res) => res.json()),
        fetch(
          "https://operaciones-mampara-dun.vercel.app/etiquetasExt54_8"
        ).then((res) => res.json()),
      ]);

      // Función para formatear fechas
      const formatDate = (dateString) =>
        new Date(dateString).toLocaleDateString(undefined, {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        });

      // Filtrar y formatear datos de las APIs
      const filterData = (data) =>
        data.map(
          ({
            estado,
            incremento,
            procesos,
            premuestra,
            cambios_usuario,
            proceso,
            urgencias,
            comentarios,
            productoId,
            createdAt,
            updatedAt,
            polvos,
            fecha,
            fecha_entrega,
            fecha_real,
            hora_real,
            tpd,
            hora_tpd,
            ...rest
          }) => ({
            ...rest,
            "Fecha entrega": formatDate(fecha),
            "Fecha llegada": formatDate(fecha_entrega),
            "Fecha Termino": formatDate(fecha_real),
            "Hora Termino": hora_real,
            "Fecha Termino (TPD)": tpd,
            "Hora Termino (TPD)": hora_tpd,
          })
        );

      const combinedData = [
        ...filterData(dataExt),
        ...filterData(dataBussl),
        ...filterData(dataExt70),
        ...filterData(dataExt54_4),
        ...filterData(dataExt54_5),
        //
        ...filterData(dataExt54_1),
        ...filterData(dataExt58),
        ...filterData(dataExt40),
        ...filterData(dataExt54_3),
        ...filterData(dataExt54_7),
        ...filterData(dataExt72),
        ...filterData(dataBussll),
        ...filterData(dataExt26_1),
        ...filterData(dataExt54_6),
        ...filterData(dataExt73),
        ...filterData(dataExt54_8),
      ];

      // Generar y guardar el archivo Excel
      const worksheet = XLSX.utils.json_to_sheet(combinedData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Datos Combinados");

      // Ajustar el ancho de las columnas basado en el contenido
      const maxWidths = combinedData.reduce((acc, row) => {
        Object.keys(row).forEach((key, index) => {
          const cellValue = row[key]?.toString() || "";
          acc[index] = Math.max(acc[index] || 0, cellValue.length);
        });
        return acc;
      }, []);

      worksheet["!cols"] = maxWidths.map((width) => ({
        width: width < 10 ? 10 : width,
      }));

      // Guardar el archivo
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });
      saveAs(
        new Blob([excelBuffer], { type: "application/octet-stream" }),
        "Etiquetas_Combinadas.xlsx"
      );
    } catch (error) {
      console.error("Error al obtener o exportar los datos:", error);
    }
  };

  return (
    <div>
      <button
        onClick={fetchDataAndExport}
        style={{
          background: "green",
          display: "flex",
          gap: "0.5rem",
        }}
      >
        <RiFileExcel2Fill
          style={{
            fontSize: "25px",
          }}
        />
        Exportar a Excel
      </button>
    </div>
  );
}

export default ExportarExcel;
