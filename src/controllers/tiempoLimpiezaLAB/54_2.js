import { fetchEtiquetas54_2 } from "../../api/apiExt54_2";
import { fetchProductoExtruidos } from "../../api/extrusores/productoExtruido";
import { fetchProductos } from "../../api/productosApi";
import { fetchSetUp } from "../../api/setUp/extrusor/SetUp";

export const fetchAndProcessData = async () => {
  try {
    // Fetch productos extruidos
    const productosExtruidos = await fetchProductoExtruidos();

    // Filter productos extruidos where extrusor is "EXT54-II" and get the last one
    const ultimoProductoExtruido = productosExtruidos
      .filter((producto) => producto.extrusor === "EXT54-II")
      .pop();

    if (!ultimoProductoExtruido) {
      throw new Error("No se encontró producto extruido para EXT54-II.");
    }

    // Fetch productos
    const productosData = await fetchProductos();

    // Fetch setUp data
    const setUpData = await fetchSetUp();

    // Find setUpData for EXT54-II
    const setUpForExt54II = setUpData.find(
      (setUp) => setUp.maquina === "EXT54-II"
    );

    if (!setUpForExt54II) {
      throw new Error("No se encontró configuración de setUp para EXT54-II.");
    }

    // Map productos extruidos to add rendimiento, l, a, b from productosData using productoId
    const mappedProductosExtruidos = [
      {
        ...ultimoProductoExtruido,
        rendimiento:
          productosData.find((p) => p.id === ultimoProductoExtruido.productoId)
            ?.EXT54_II || null,
        l:
          productosData.find((p) => p.id === ultimoProductoExtruido.productoId)
            ?.l || null,
        a:
          productosData.find((p) => p.id === ultimoProductoExtruido.productoId)
            ?.a || null,
        b:
          productosData.find((p) => p.id === ultimoProductoExtruido.productoId)
            ?.b || null,
      },
    ];

    // Fetch etiquetas
    const etiquetas = await fetchEtiquetas54_2();

    // Map etiquetas to add rendimiento, l, a, b from productosData using productoId
    const mappedEtiquetas = etiquetas.map((etiqueta) => {
      const producto = productosData.find((p) => p.id === etiqueta.productoId);

      // Calculate rendimiento por hora
      const rendimientoPorHora = producto
        ? (etiqueta.kilos / producto.EXT54_II).toFixed(3)
        : null;

      return {
        ...etiqueta,
        rendimiento: producto ? producto.EXT54_II : null,
        rendimiento_hora: rendimientoPorHora,
        l: producto ? producto.l : null,
        a: producto ? producto.a : null,
        b: producto ? producto.b : null,
      };
    });

    // Calculate initial distance between ultimoProductoExtruido and the first etiqueta
    if (mappedProductosExtruidos.length > 0 && mappedEtiquetas.length > 0) {
      const productoExtruido = mappedProductosExtruidos[0];
      const primerProducto = mappedEtiquetas[0];
      primerProducto.distancia = calcularDistancia(
        productoExtruido,
        primerProducto
      );
    }

    // Calculate distances consecutively
    for (let i = 1; i < mappedEtiquetas.length; i++) {
      const producto1 = mappedEtiquetas[i - 1];
      const producto2 = mappedEtiquetas[i];
      if (
        producto1.l !== null &&
        producto1.a !== null &&
        producto1.b !== null &&
        producto2.l !== null &&
        producto2.a !== null &&
        producto2.b !== null
      ) {
        producto2.distancia = calcularDistancia(producto1, producto2);
      }
    }

    // Return the processed data
    return mappedProductosExtruidos.concat(mappedEtiquetas);
  } catch (error) {
    console.error("Error fetching data: ", error);
    throw error;
  }
};

const calcularDistancia = (producto1, producto2) => {
  const deltaE = Math.sqrt(
    Math.pow(producto1.l - producto2.l, 2) +
      Math.pow(producto1.a - producto2.a, 2) +
      Math.pow(producto1.b - producto2.b, 2)
  );
  return deltaE.toFixed(3);
};
