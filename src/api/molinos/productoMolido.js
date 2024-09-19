import axios from "axios";

export const apiUrlProductosMolidos = "http://localhost:3000/productos-molidos";

export const fetchProductoMolidos = async () => {
  const response = await axios.get(apiUrlProductosMolidos);
  return response.data;
};

export const createProductosMolidos = async (productosMolidosData) => {
  const response = await axios.post(
    apiUrlProductosMolidos,
    productosMolidosData
  );
  return response.data;
};
