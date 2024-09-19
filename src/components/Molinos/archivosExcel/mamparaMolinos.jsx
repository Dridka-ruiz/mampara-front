import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import Button from "@mui/material/Button";
import { FaFileExcel } from "react-icons/fa";

const ExportToExcel = () => {
  const [data, setData] = useState([]);
  const [etiquetasMol1, setEtiquetasMol1] = useState([]);
  const [etiquetasMol2, setEtiquetasMol2] = useState([]);
  const [etiquetasMol3, setEtiquetasMol3] = useState([]);
  const [etiquetasMol4, setEtiquetasMol4] = useState([]);
  const [etiquetasMol5, setEtiquetasMol5] = useState([]);
  const [etiquetasMol6, setEtiquetasMol6] = useState([]);
  const [etiquetasMol7, setEtiquetasMol7] = useState([]);
  const [etiquetasMol8, setEtiquetasMol8] = useState([]);
  const [etiquetasMol9, setEtiquetasMol9] = useState([]);
  const [etiquetasMol10, setEtiquetasMol10] = useState([]);
  const [etiquetasMol11, setEtiquetasMol11] = useState([]);
  const [etiquetasMol12, setEtiquetasMol12] = useState([]);
  const [etiquetasMol13, setEtiquetasMol13] = useState([]);
  const [etiquetasMol14, setEtiquetasMol14] = useState([]);
  const [etiquetasMol15, setEtiquetasMol15] = useState([]);
  const [etiquetasMol16, setEtiquetasMol16] = useState([]);
  const [etiquetasMol17, setEtiquetasMol17] = useState([]);
  const [etiquetasMol1A, setEtiquetasMol1A] = useState([]);
  const [etiquetasMol3A, setEtiquetasMol3A] = useState([]);
  const [etiquetasMol4A, setEtiquetasMol4A] = useState([]);

  useEffect(() => {
    /*   fetchData(); */
    fetchData1();
    fetchData2();
    fetchData3();
    fetchData4();
    fetchData5();
    fetchData6();
    fetchData7();
    fetchData8();
    fetchData9();
    fetchData10();
    fetchData11();
    fetchData12();
    fetchData13();
    fetchData14();
    fetchData15();
    fetchData16();
    fetchData17();
    fetchData1A();
    fetchData3A();
    fetchData4A();
  }, []);

  const fetchData1 = async () => {
    try {
      const response = await axios.get("http://localhost:3000/etiquetasMol1");
      setEtiquetasMol1(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };
  const fetchData2 = async () => {
    try {
      const response = await axios.get("http://localhost:3000/etiquetasMol2");
      setEtiquetasMol2(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };
  const fetchData3 = async () => {
    try {
      const response = await axios.get("http://localhost:3000/etiquetasMol3");
      setEtiquetasMol3(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };
  const fetchData4 = async () => {
    try {
      const response = await axios.get("http://localhost:3000/etiquetasMol4");
      setEtiquetasMol4(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };
  const fetchData5 = async () => {
    try {
      const response = await axios.get("http://localhost:3000/etiquetasMol5");
      setEtiquetasMol5(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };
  const fetchData6 = async () => {
    try {
      const response = await axios.get("http://localhost:3000/etiquetasMol6");
      setEtiquetasMol6(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };
  const fetchData7 = async () => {
    try {
      const response = await axios.get("http://localhost:3000/etiquetasMol7");
      setEtiquetasMol7(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };
  const fetchData8 = async () => {
    try {
      const response = await axios.get("http://localhost:3000/etiquetasMol8");
      setEtiquetasMol8(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };
  const fetchData9 = async () => {
    try {
      const response = await axios.get("http://localhost:3000/etiquetasMol9");
      setEtiquetasMol9(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };
  const fetchData10 = async () => {
    try {
      const response = await axios.get("http://localhost:3000/etiquetasMol10");
      setEtiquetasMol10(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };
  const fetchData11 = async () => {
    try {
      const response = await axios.get("http://localhost:3000/etiquetasMol11");
      setEtiquetasMol11(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };
  const fetchData12 = async () => {
    try {
      const response = await axios.get("http://localhost:3000/etiquetasMol12");
      setEtiquetasMol12(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };
  const fetchData13 = async () => {
    try {
      const response = await axios.get("http://localhost:3000/etiquetasMol13");
      setEtiquetasMol13(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };
  const fetchData14 = async () => {
    try {
      const response = await axios.get("http://localhost:3000/etiquetasMol14");
      setEtiquetasMol14(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };
  const fetchData15 = async () => {
    try {
      const response = await axios.get("http://localhost:3000/etiquetasMol15");
      setEtiquetasMol15(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };
  const fetchData16 = async () => {
    try {
      const response = await axios.get("http://localhost:3000/etiquetasMol16");
      setEtiquetasMol16(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };
  const fetchData17 = async () => {
    try {
      const response = await axios.get("http://localhost:3000/etiquetasMol17");
      setEtiquetasMol17(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };
  const fetchData1A = async () => {
    try {
      const response = await axios.get("http://localhost:3000/etiquetasMol1A");
      setEtiquetasMol1A(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };

  const fetchData3A = async () => {
    try {
      const response = await axios.get("http://localhost:3000/etiquetasMol3A");
      setEtiquetasMol3A(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };
  const fetchData4A = async () => {
    try {
      const response = await axios.get("http://localhost:3000/etiquetasMol4A");
      setEtiquetasMol4A(response.data);
    } catch (error) {
      console.error("Error al obtener datos desde la API:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const exportToExcel = () => {
    try {
      // Excluye las columnas createdAt y updatedAt y ajusta el formato de la fecha
      const dataToExport = data.map(
        ({
          createdAt,
          updatedAt,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          fecha: formatDate(fecha),
        })
      );
      const dataToExport1 = etiquetasMol1.map(
        ({
          createdAt,
          updatedAt,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          fecha: formatDate(fecha),
        })
      );

      const dataToExport2 = etiquetasMol2.map(
        ({
          createdAt,
          updatedAt,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          fecha: formatDate(fecha),
        })
      );
      const dataToExport3 = etiquetasMol3.map(
        ({
          createdAt,
          updatedAt,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          fecha: formatDate(fecha),
        })
      );
      const dataToExport4 = etiquetasMol4.map(
        ({
          createdAt,
          updatedAt,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          fecha: formatDate(fecha),
        })
      );
      const dataToExport5 = etiquetasMol5.map(
        ({
          createdAt,
          updatedAt,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          fecha: formatDate(fecha),
        })
      );
      const dataToExport6 = etiquetasMol6.map(
        ({
          createdAt,
          updatedAt,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          fecha: formatDate(fecha),
        })
      );
      const dataToExport7 = etiquetasMol7.map(
        ({
          createdAt,
          updatedAt,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          fecha: formatDate(fecha),
        })
      );
      const dataToExport8 = etiquetasMol8.map(
        ({
          createdAt,
          updatedAt,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          fecha: formatDate(fecha),
        })
      );
      const dataToExport9 = etiquetasMol9.map(
        ({
          createdAt,
          updatedAt,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          fecha: formatDate(fecha),
        })
      );
      const dataToExport10 = etiquetasMol10.map(
        ({
          createdAt,
          updatedAt,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          fecha: formatDate(fecha),
        })
      );
      const dataToExport11 = etiquetasMol11.map(
        ({
          createdAt,
          updatedAt,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          fecha: formatDate(fecha),
        })
      );
      const dataToExport12 = etiquetasMol12.map(
        ({
          createdAt,
          updatedAt,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          fecha: formatDate(fecha),
        })
      );
      const dataToExport13 = etiquetasMol13.map(
        ({
          createdAt,
          updatedAt,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          fecha: formatDate(fecha),
        })
      );
      const dataToExport14 = etiquetasMol14.map(
        ({
          createdAt,
          updatedAt,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          fecha: formatDate(fecha),
        })
      );
      const dataToExport15 = etiquetasMol15.map(
        ({
          createdAt,
          updatedAt,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          fecha: formatDate(fecha),
        })
      );
      const dataToExport16 = etiquetasMol16.map(
        ({
          createdAt,
          updatedAt,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          fecha: formatDate(fecha),
        })
      );

      const dataToExport17 = etiquetasMol17.map(
        ({
          createdAt,
          updatedAt,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          fecha: formatDate(fecha),
        })
      );

      const dataToExport1A = etiquetasMol1A.map(
        ({
          createdAt,
          updatedAt,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          fecha: formatDate(fecha),
        })
      );

      const dataToExport3A = etiquetasMol3A.map(
        ({
          createdAt,
          updatedAt,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          fecha: formatDate(fecha),
        })
      );
      const dataToExport4A = etiquetasMol4A.map(
        ({
          createdAt,
          updatedAt,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          polvos,
          estado,
          posicion,
          fecha,
          ...rest
        }) => ({
          ...rest,
          id,
          clave,
          kilos,
          nombre,
          maquina,
          fecha: formatDate(fecha),
        })
      );
      // Combina ambos conjuntos de datos en una sola matriz
      const combinedData = [
        ...dataToExport,
        ...dataToExport1,
        ...dataToExport2,
        ...dataToExport3,
        ...dataToExport4,
        ...dataToExport5,
        ...dataToExport6,
        ...dataToExport7,
        ...dataToExport8,
        ...dataToExport9,
        ...dataToExport10,
        ...dataToExport11,
        ...dataToExport12,
        ...dataToExport13,
        ...dataToExport14,
        ...dataToExport15,
        ...dataToExport16,
        ...dataToExport17,
        ...dataToExport1A,
        ...dataToExport3A,
        ...dataToExport4A,
      ];

      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(combinedData);
      XLSX.utils.book_append_sheet(workbook, worksheet, "mampara molinos");

      XLSX.writeFile(workbook, "mamparaMolinos.xlsx");
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
