import { fetchMantParos } from "../../api/extrusores/SetUp/apiT_mant_paros";

export const getMantParosPercentage = async () => {
  try {
    const data = await fetchMantParos();
    const totalMantParos = data.reduce((acc, curr) => {
      const tMantenimiento = parseFloat(curr.t_mantenimiento) || 0;
      const tParos = parseFloat(curr.t_paros) || 0;
      return acc + tMantenimiento + tParos;
    }, 0);
    const percentage = totalMantParos / data.length || 0; // calcular el promedio
    return 1 + percentage / 100;
  } catch (error) {
    console.error("Error al obtener datos de mantenimiento y paros", error);
    return 1; // en caso de error, devolver 1 para no afectar el cálculo
  }
};
