import { useEffect, useRef, useState } from "react";
import { MdSunny } from "react-icons/md";
import { BsFillMoonStarsFill } from "react-icons/bs";

export default function App() {
  const h1 = useRef();
  const [icon, setIcon] = useState(<MdSunny />); // Inicialmente muestra el ícono del sol

  const ti = () => {
    const fechahora = new Date();
    const hora = fechahora.getHours().toString().padStart(2, "0");
    const minuto = fechahora.getMinutes().toString().padStart(2, "0");
    const segundo = fechahora.getSeconds().toString().padStart(2, "0");
    return `${hora}:${minuto}:${segundo}`;
  };

  const updateIcon = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 18) {
      setIcon(<MdSunny />); // Sol durante el día
    } else {
      setIcon(<BsFillMoonStarsFill />); // Luna durante la noche
    }
  };

  useEffect(() => {
    updateIcon(); // Inicializa el ícono
    const cl = setInterval(() => {
      h1.current.innerHTML = `${ti()}`;
      updateIcon(); // Actualiza el ícono cada segundo
    }, 1000);
    return () => clearInterval(cl);
  }, []);

  return (
    <div
      style={{
        display: "flex",

        alignItems: "center",
        justifyContent: "center",

        backgroundColor: "#bae3fd", // Color de fondo opcional
        gap: "2rem",
      }}
    >
      <h1
        ref={h1}
        style={{
          fontSize: "9rem", // Ajusta el tamaño de la fuente aquí
          textAlign: "center",
          margin: "0",
          padding: "0",
          fontFamily: "Orbitron, sans-serif", // Aplica la tipografía de reloj digital
          color: "#0383d3", // Color del texto
        }}
      >
        {ti()}
      </h1>
      <div
        style={{
          fontSize: "6rem", // Tamaño del ícono
          color: "#0383d3", // Color del ícono
          marginBottom: "10px",
        }}
      >
        {icon}
      </div>
    </div>
  );
}
