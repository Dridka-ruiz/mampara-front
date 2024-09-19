// src/utils/calcularTiempoLimpieza.js

export const calcularTiempoLimpieza = (distancia) => {
  if (distancia <= 3.5) {
    return 1;
  } else if (distancia <= 6) {
    return 2;
  } else {
    return 3.5;
  }
};
