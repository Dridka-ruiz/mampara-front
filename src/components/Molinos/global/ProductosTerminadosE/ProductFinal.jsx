import React, { useEffect, useState } from "react";
import { fetchEtiquetas54_2 } from "../../../../api/apiExt54_2";

function ProductFinal() {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchEtiquetas54_2(); // Llamada a la API
        if (response && response.length > 0) {
          setProduct(response[0]); // Establecer el primer producto en el estado
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {product ? (
        <div>
          <p>Nombre: {product.nombre}</p>
          <p>Clave: {product.clave}</p>
        </div>
      ) : (
        <p>Cargando producto...</p>
      )}
    </div>
  );
}

export default ProductFinal;
