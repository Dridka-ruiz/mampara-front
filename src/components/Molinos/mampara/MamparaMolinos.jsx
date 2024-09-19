import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "../../../style/DragAnDrop.css";
import EtiquetasAgregadas from "../etiquetas/etiquetasAgregadas/etiquetasAgregadasMol";
import EtiquetasForm from "../etiquetas/etiquetasAgregadas/FormAgregarEtiqueta";

import {
  createEtiquetaMol,
  fetchEtiquetasMol,
} from "../../../api/molinos/etiquetasMolinos";
import ExcelMolinos from "../archivosExcel/mamparaMolinos";

import EtiquetasMol1 from "../etiquetas/Mol1/EtiquetasMol1";
import EtiquetasMol2 from "../etiquetas/Mol2/EtiquetasMol2";
import EtiquetasMol3 from "../etiquetas/Mol3/EtiquetasMol3";
import EtiquetasMol4 from "../etiquetas/Mol4/EtiquetasMol4";
import EtiquetasMol5 from "../etiquetas/Mol5/EtiquetasMol5";
import EtiquetasMol6 from "../etiquetas/Mol6/EtiquetasMol6";
import EtiquetasMol7 from "../etiquetas/Mol7/EtiquetasMol7";
import EtiquetasMol8 from "../etiquetas/Mol8/EtiquetasMol8";
import EtiquetasMol9 from "../etiquetas/Mol9/EtiquetasMol9";
import EtiquetasMol10 from "../etiquetas/Mol10/EtiquetasMol10";
import EtiquetasMol11 from "../etiquetas/Mol11/EtiquetasMol11";
import EtiquetasMol12 from "../etiquetas/Mol12/EtiquetasMol12";
import EtiquetasMol13 from "../etiquetas/Mol13/EtiquetasMol13";
import EtiquetasMol14 from "../etiquetas/Mol14/EtiquetasMol14";
import EtiquetasMol15 from "../etiquetas/Mol15/EtiquetasMol15";
import EtiquetasMol16 from "../etiquetas/Mol16/EtiquetasMol16";
import EtiquetasMol17 from "../etiquetas/Mol17/EtiquetasMol17";
import EtiquetasMol1A from "../etiquetas/Mol1A/EtiquetasMol1A";
import EtiquetasMol3A from "../etiquetas/Mol3A/EtiquetasMol3A";
import EtiquetasMol4A from "../etiquetas/Mol4A/EtiquetasMol4A";
import FichasFechas from "../../fichasInformativas/fichasFechas";
import AlertaTemporada from "../Mantenimiento/AlertaTemporada";
import ProductFinal from "../global/ProductosTerminadosE/ProductFinal";

const MamparaMolinos = () => {
  const [etiquetas, setEtiquetas] = useState([]);
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

  const [showAlert, setShowAlert] = useState(false);
  const cargarEtiquetas = async () => {
    const etiquetas = await fetchEtiquetasMol();
    //const etiquetasMol = await fetchEtiquetasMol();

    setEtiquetas(etiquetas);
  };

  useEffect(() => {
    cargarEtiquetas();
  }, []);

  const handleEtiquetaCreated = async (newEtiqueta) => {
    try {
      await createEtiquetaMol(newEtiqueta);

      cargarEtiquetas();
      toast.success("Etiqueta agregada con éxito");
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } catch (error) {
      console.error("Error al guardar la etiqueta", error);
      toast.error("Error al guardar la etiqueta");
    }
  };

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            gap: "55rem",
          }}
        >
          <h2
            style={{
              margin: "0px",
            }}
          >
            Mampara Molinos{" "}
          </h2>
          {/*  <AlertaTemporada /> */}
          {/*     <ProductFinal /> */}
        </div>

        <div style={{ marginBottom: "0.5rem", display: "flex", gap: ".5rem" }}>
          <EtiquetasForm onEtiquetaCreated={handleEtiquetaCreated} />
          <ExcelMolinos />
        </div>

        <div
          style={{
            display: "flex",
            gap: " 2rem",
            alignItems: "center",
          }}
        >
          <FichasFechas />
          <EtiquetasAgregadas
            etiquetas={etiquetas}
            setEtiquetas={setEtiquetas}
          />
        </div>
        <ToastContainer />

        <div className="fondo ">
          <div
            style={{
              display: "grid",
              gap: "1rem",
            }}
          >
            <EtiquetasMol1
              etiquetasMol1={etiquetasMol1}
              setEtiquetasMol1={setEtiquetasMol1}
            />
            <EtiquetasMol2
              etiquetasMol2={etiquetasMol2}
              setEtiquetasMol2={setEtiquetasMol2}
            />
            <EtiquetasMol3
              etiquetasMol3={etiquetasMol3}
              setEtiquetasMol3={setEtiquetasMol3}
            />
            <EtiquetasMol4
              etiquetasMol4={etiquetasMol4}
              setEtiquetasMol4={setEtiquetasMol4}
            />
            <EtiquetasMol5
              etiquetasMol5={etiquetasMol5}
              setEtiquetasMol5={setEtiquetasMol5}
            />
            <EtiquetasMol6
              etiquetasMol6={etiquetasMol6}
              setEtiquetasMol6={setEtiquetasMol6}
            />
            <EtiquetasMol7
              etiquetasMol7={etiquetasMol7}
              setEtiquetasMol7={setEtiquetasMol7}
            />
            <EtiquetasMol8
              etiquetasMol8={etiquetasMol8}
              setEtiquetasMol8={setEtiquetasMol8}
            />
            <EtiquetasMol9
              etiquetasMol9={etiquetasMol9}
              setEtiquetasMol9={setEtiquetasMol9}
            />
            <EtiquetasMol10
              etiquetasMol10={etiquetasMol10}
              setEtiquetasMol10={setEtiquetasMol10}
            />
            <EtiquetasMol11
              etiquetasMol11={etiquetasMol11}
              setEtiquetasMol11={setEtiquetasMol11}
            />
            <EtiquetasMol12
              etiquetasMol12={etiquetasMol12}
              setEtiquetasMol12={setEtiquetasMol12}
            />
            <EtiquetasMol13
              etiquetasMol13={etiquetasMol13}
              setEtiquetasMol13={setEtiquetasMol13}
            />
            <EtiquetasMol14
              etiquetasMol14={etiquetasMol14}
              setEtiquetasMol14={setEtiquetasMol14}
            />
            <EtiquetasMol15
              etiquetasMol15={etiquetasMol15}
              setEtiquetasMol15={setEtiquetasMol15}
            />
            <EtiquetasMol16
              etiquetasMol16={etiquetasMol16}
              setEtiquetasMol16={setEtiquetasMol16}
            />
            <EtiquetasMol17
              etiquetasMol17={etiquetasMol17}
              setEtiquetasMol17={setEtiquetasMol17}
            />
            <EtiquetasMol1A
              etiquetasMol1A={etiquetasMol1A}
              setEtiquetasMol1A={setEtiquetasMol1A}
            />
            <EtiquetasMol3A
              etiquetasMol3A={etiquetasMol3A}
              setEtiquetasMol3A={setEtiquetasMol3A}
            />
            <EtiquetasMol4A
              etiquetasMol4A={etiquetasMol4A}
              setEtiquetasMol4A={setEtiquetasMol4A}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default MamparaMolinos;
