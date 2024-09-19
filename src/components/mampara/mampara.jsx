import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//importacion de estilo
import "../../style/DragAnDrop/DragAnDrop.css";
import "../../style/cards.css";
import "../../style/global/global.css";
//componente de formulario
import EtiquetaForm from "../extrusion/etiquetas/etiquetasAgregadas/FormAgregarEtiqueta";
//mostrar etiquetas Agregaadas
import EtiquetasAgregadas from "../extrusion/etiquetas/etiquetasAgregadas/EtiquetasAgregadas";
import { createEtiqueta, fetchEtiquetas } from "../../api/apiEtiquetas";
//guardar etiquetas de molinos
import {
  createEtiquetaMol,
  fetchEtiquetasMol,
} from "../../api/molinos/etiquetasMolinos";

//mostrar etiquetas de extrusores
import EtiquetasExt54_2 from "../extrusion/etiquetas/etiquetas54_2/etiquetas54_2";
import EtiquetasBuss1 from "../extrusion/etiquetas/etiquetasBuss1/etiquetasBuss1";
import EtiquetasExt70_2 from "../extrusion/etiquetas/etiquetas70_2/etiquetasExt70_2";
import EtiquetasExt54_4 from "../extrusion/etiquetas/etiquetas54_4/etiquetas54_4";
import EtiquetasExt54_5 from "../extrusion/etiquetas/etiquetas54_5/etiquetas54_5";
import EtiquetasExt54_1 from "../extrusion/etiquetas/etiquetas54_1/etiquetas54_1";
import EtiquetasExt58 from "../extrusion/etiquetas/etiquetas58/etiquetas58";
import EtiquetasExt40 from "../extrusion/etiquetas/etiquetas40/etiquetas40";
import EtiquetasExt54_3 from "../extrusion/etiquetas/etiquetas54_3/etiquetas54_3";
import EtiquetasExt54_7 from "../extrusion/etiquetas/etiquetas54_7/etiquetas54_7";
import EtiquetasExt70_1 from "../extrusion/etiquetas/etiquetas70_1/etiquetasExt70_1";
import EtiquetasBuss2 from "../extrusion/etiquetas/etiquetasBuss2/etiquetasBuss2";
import EtiquetasExt26_1 from "../extrusion/etiquetas/etiquetas26_1/etiquetas26_1";
import EtiquetasExt26_2 from "../extrusion/etiquetas/etiquetas26_2/etiquetas26_2";
import EtiquetasExt54_6 from "../extrusion/etiquetas/etiquetas54_6/etiquetas54_6";
import EtiquetasExt70_3 from "../extrusion/etiquetas/etiquetas70_3/etiquetasExt70_3";
import EtiquetasExt54_8 from "../extrusion/etiquetas/etiquetas54_8/etiquetas54_8";
import FichasFechas from "../fichasInformativas/fichasFechas";
import ExportacionExcel from "../extrusion/archivosExcel/ExportacionExcel";
import "../../style/etiquetas.css";
import PermisoValidator from "../Login/PermisoValidator";
import EtiquetaTable from "../extrusion/ComentariosGenerales/ComentariosGenerales";
import { fetchComentariosGlobales } from "../../api/extrusores/comentariosGenerales";

import Reloj from "../reloj/Reloj";

const Mampara = () => {
  const [etiquetas, setEtiquetas] = useState([]);
  const [etiquetasMol, setEtiquetasMol] = useState([]);

  const [showAlert, setShowAlert] = useState(false);
  const [etiquetas54_2, setEtiquetas54_2] = useState([]);
  const [etiquetasBuss1, setEtiquetasBuss1] = useState([]);

  const [etiquetasExt70_2, setEtiquetasExt70_2] = useState([]);
  const [etiquetas54_4, setEtiquetas54_4] = useState([]);
  const [etiquetas54_5, setEtiquetas54_5] = useState([]);
  const [etiquetas54_1, setEtiquetas54_1] = useState([]);
  const [etiquetas58, setEtiquetas58] = useState([]);
  const [etiquetas40, setEtiquetas40] = useState([]);
  const [etiquetas54_3, setEtiquetas54_3] = useState([]);
  const [etiquetas54_7, setEtiquetas54_7] = useState([]);
  const [etiquetasExt70_1, setEtiquetasExt70_1] = useState([]);
  const [etiquetasBuss2, setEtiquetasBuss2] = useState([]);
  const [etiquetas26_1, setEtiquetas26_1] = useState([]);
  const [etiquetas26_2, setEtiquetas26_2] = useState([]);
  const [etiquetas54_6, setEtiquetas54_6] = useState([]);
  const [etiquetasExt70_3, setEtiquetasExt70_3] = useState([]);
  const [etiquetas54_8, setEtiquetas54_8] = useState([]);

  const [comentarios, setComentarios] = useState([]);
  const [comentariosGlobales, setComentariosGlobales] = useState([]);

  //Aviso de agregacion de comentario
  const notify = (message) => toast.success(message);

  //const [reloadFlag, setReloadFlag] = useState(false);

  const cargarEtiquetas = async () => {
    const etiquetas = await fetchEtiquetas();
    //const etiquetasMol = await fetchEtiquetasMol();

    setEtiquetas(etiquetas);
  };

  const cargarComentarios = async () => {
    const comentariosGlobales = await fetchComentariosGlobales();
    setComentariosGlobales(comentariosGlobales);
  };

  useEffect(() => {
    cargarEtiquetas();
    cargarComentarios();
  }, []);

  const handleEtiquetaCreated = async (newEtiqueta) => {
    try {
      await createEtiqueta(newEtiqueta);
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

  const handleComentarioCreated = (newComentario) => {
    setComentariosGlobales((prevComentarios) => [
      newComentario,
      ...prevComentarios,
    ]);
  };
  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            gap: "25rem",
          }}
        >
          <h2>Mampara Extrusores</h2>
        </div>
        <div style={{ marginBottom: "0.5rem", display: "flex", gap: ".5rem" }}>
          <PermisoValidator permiso="extrusores.crear">
            <EtiquetaForm onEtiquetaCreated={handleEtiquetaCreated} />
          </PermisoValidator>

          <PermisoValidator permiso="extrusores.exportacion">
            <ExportacionExcel />
          </PermisoValidator>
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
        {/* estilo para etiquetas agregadas al extrusor */}
        <div className="fondo ">
          <div
            style={{
              display: "grid",
              gap: "1rem",
            }}
          >
            <EtiquetasExt54_2
              etiquetas54_2={etiquetas54_2}
              setEtiquetas54_2={setEtiquetas54_2}
            />
            <EtiquetasBuss1
              etiquetasBuss1={etiquetasBuss1}
              setEtiquetasBuss1={setEtiquetasBuss1}
            />
            <EtiquetasExt70_2
              etiquetasExt70_2={etiquetasExt70_2}
              setEtiquetasExt70_2={setEtiquetasExt70_2}
            />
            <EtiquetasExt54_4
              etiquetas54_4={etiquetas54_4}
              setEtiquetas54_4={setEtiquetas54_4}
            />
            <EtiquetasExt54_5
              etiquetas54_5={etiquetas54_5}
              setEtiquetas54_5={setEtiquetas54_5}
            />
            <EtiquetasExt54_1
              etiquetas54_1={etiquetas54_1}
              setEtiquetas54_1={setEtiquetas54_1}
            />
            <EtiquetasExt58
              etiquetas58={etiquetas58}
              setEtiquetas58={setEtiquetas58}
            />
            <EtiquetasExt40
              etiquetas40={etiquetas40}
              setEtiquetas40={setEtiquetas40}
            />
            <EtiquetasExt54_3
              etiquetas54_3={etiquetas54_3}
              setEtiquetas54_3={setEtiquetas54_3}
            />
            <EtiquetasExt54_7
              etiquetas54_7={etiquetas54_7}
              setEtiquetas54_7={setEtiquetas54_7}
            />
            <EtiquetasExt70_1
              etiquetasExt70_1={etiquetasExt70_1}
              setEtiquetasExt70_1={setEtiquetasExt70_1}
            />
            <EtiquetasBuss2
              etiquetasBuss2={etiquetasBuss2}
              setEtiquetasBuss2={setEtiquetasBuss2}
            />
            <EtiquetasExt26_1
              etiquetas26_1={etiquetas26_1}
              setEtiquetas26_1={setEtiquetas26_1}
            />
            {/*    <EtiquetasExt26_2
              etiquetas26_2={etiquetas26_2}
              setEtiquetas26_2={setEtiquetas26_2}
            /> */}
            <EtiquetasExt54_6
              etiquetas54_6={etiquetas54_6}
              setEtiquetas54_6={setEtiquetas54_6}
            />
            <EtiquetasExt70_3
              etiquetasExt70_3={etiquetasExt70_3}
              setEtiquetasExt70_3={setEtiquetasExt70_3}
            />
            <EtiquetasExt54_8
              etiquetas54_8={etiquetas54_8}
              setEtiquetas54_8={setEtiquetas54_8}
            />
          </div>
        </div>
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            gap: "40rem",
          }}
        >
          <EtiquetaTable
            onComentarioCreated={handleComentarioCreated}
            comentariosGlobales={comentariosGlobales}
            setComentariosGlobales={setComentariosGlobales}
          />
          <Reloj />
        </div>
      </div>
    </>
  );
};
export default Mampara;
