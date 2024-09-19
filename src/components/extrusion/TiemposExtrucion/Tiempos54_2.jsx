import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useState, useEffect } from "react";
import "../../../style/tablas/global.css";
import "../../../style/tablas/tiemposProduccion.css";

import { fetchEtiquetas54_2 } from "../../../api/extrusores/apiExt54_2";
import { fetchProductoExtruidos } from "../../../api/extrusores/productoExtruido";
import { fetchProductos } from "../../../api/productosApi";
import { fetchSetUp } from "../../../api/setUp/extrusor/SetUp";
import { fetchSistemaLimpieza } from "../../../api/setUp/extrusor/SistemaLimpieza";
import { fetchAcabadoLimpieza } from "../../../api/setUp/extrusor/AcabadoLimpieza";
import { fetchBrilloLimpieza } from "../../../api/setUp/extrusor/BrilloLimpieza";
import { fetchParosMantenimientos } from "../../../api/setUp/extrusor/ParosMantenimiento";
import { fetchTime54_2 } from "../../../api/timeSet/timeSet54_2";
import dateAndTime from "date-and-time";

const formatDateWithoutTime = (date) => {
  // Suponiendo que la fecha está en el formato "aaaa-mm-dd"
  const [year, month, day] = date.split("-");
  return `${day}-${month}-${year}`;
};

const columns = [
  { id: "id", label: "Id", minWidth: 170 },
  { id: "clave", label: "Clave", minWidth: 170 },
  { id: "nombre", label: "Nombre", minWidth: 170 },
  { id: "kilos", label: "Kilos", minWidth: 170 },

  { id: "extrusor", label: "Extrusor", minWidth: 100 },
  { id: "productoId", label: "id Producto", minWidth: 100 },
  { id: "rendimiento", label: "Rendimiento", minWidth: 100 },
  { id: "rendimiento_hora", label: "Rendimiento hr", minWidth: 100 },
  { id: "l", label: "L", minWidth: 100 },
  { id: "a", label: "A", minWidth: 100 },
  { id: "b", label: "B", minWidth: 100 },
  { id: "distancia", label: "Distancia L,A,B", minWidth: 100 },
  {
    id: "tiempos_limpieza",
    label: "Tiempos de Limpieza LAB(Hr)",
    minWidth: 10,
  },
  { id: "sistema", label: "Sistema", minWidth: 100 },
  { id: "acabado", label: "Acabado", minWidth: 100 },
  { id: "brillo", label: "Brillo", minWidth: 100 },
  { id: "tiempos_lim_sistema", label: "Limpieza Sistema (Hr)", minWidth: 10 },
  { id: "tiempos_lim_acabado", label: "Limpieza Acabado (Hr)", minWidth: 10 },
  { id: "tiempos_lim_brillo", label: "Limpieza Brillo (Hr)", minWidth: 10 },
  {
    id: "max_tiempo_limpieza",
    label: "Tiempo máximo de Limpieza",
    minWidth: 10,
  },
  {
    id: "CAL_EXT",
    label: "Tiempo de Calidad",
    minWidth: 10,
  },
  {
    id: "tiempo_ext_total",
    label: "Tiempo Extrucion Total",
    minWidth: 10,
  },

  {
    id: "fecha_real",
    label: "Fecha Termino",
    minWidth: 10,
  },
  {
    id: "hora_real",
    label: "Hora Termino",
    minWidth: 10,
  },
  { id: "tpd", label: "Fecha TPD", minWidth: 170 },
  {
    id: "hora_tpd",
    label: "Hora TPD",
    minWidth: 170,
  },
];

export default function StickyHeadTable() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const productosExtruidos = await fetchProductoExtruidos();

        const ultimoProductoExtruido = productosExtruidos
          .filter((producto) => producto.extrusor === "EXT54-II")
          .pop();

        const productosData = await fetchProductos();

        const mappedProductosExtruidos = ultimoProductoExtruido
          ? [
              {
                ...ultimoProductoExtruido,
                rendimiento:
                  productosData.find(
                    (p) => p.id === ultimoProductoExtruido.productoId
                  )?.EXT54_II || null,
                l:
                  productosData.find(
                    (p) => p.id === ultimoProductoExtruido.productoId
                  )?.l || null,
                a:
                  productosData.find(
                    (p) => p.id === ultimoProductoExtruido.productoId
                  )?.a || null,
                b:
                  productosData.find(
                    (p) => p.id === ultimoProductoExtruido.productoId
                  )?.b || null,
                sistema:
                  productosData.find(
                    (p) => p.id === ultimoProductoExtruido.productoId
                  )?.sistema || null,
                acabado:
                  productosData.find(
                    (p) => p.id === ultimoProductoExtruido.productoId
                  )?.acabado || null,
                brillo:
                  productosData.find(
                    (p) => p.id === ultimoProductoExtruido.productoId
                  )?.brillo || null,

                CAL_EXT:
                  productosData.find(
                    (p) => p.id === ultimoProductoExtruido.productoId
                  )?.CAL_EXT || null,
              },
            ]
          : [];

        const etiquetas = await fetchEtiquetas54_2();

        const mappedEtiquetas = etiquetas.map((etiqueta) => {
          const producto = productosData.find(
            (p) => p.id === etiqueta.productoId
          );

          const rendimientoPorHora = producto
            ? (etiqueta.kilos / producto.EXT54_II).toFixed(3)
            : null;

          const rendimientoPorHora300 = producto
            ? (300 / producto.EXT54_II).toFixed(3)
            : null;

          return {
            ...etiqueta,
            rendimiento: producto ? producto.EXT54_II : null,
            rendimiento_hora: rendimientoPorHora,
            rendimiento_kilos: rendimientoPorHora300,
            l: producto ? producto.l : null,
            a: producto ? producto.a : null,
            b: producto ? producto.b : null,
            sistema: producto ? producto.sistema : null,
            acabado: producto ? producto.acabado : null,
            brillo: producto ? producto.brillo : null,
            CAL_EXT: producto ? producto.CAL_EXT : null,
          };
        });

        const allProducts = [...mappedProductosExtruidos, ...mappedEtiquetas];

        if (allProducts.length > 1) {
          const firstExtruido = allProducts[0];
          const firstEtiqueta = allProducts[1];
          firstEtiqueta.distancia = calcularDistancia(
            firstExtruido,
            firstEtiqueta
          );
        }

        for (let i = 2; i < allProducts.length; i++) {
          const producto1 = allProducts[i - 1];
          const producto2 = allProducts[i];
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

        const setUpData = await fetchSetUp();
        const setUpDataSistema = await fetchSistemaLimpieza();
        const setUpDataAcabado = await fetchAcabadoLimpieza();
        const setUpDataBrillo = await fetchBrilloLimpieza();
        const setUpDataParosMantenimiento = await fetchParosMantenimientos();
        const setUpDatafetchTime54_2 = await fetchTime54_2();
        const fechasTimeArray = Array.isArray(setUpDatafetchTime54_2)
          ? setUpDatafetchTime54_2
          : setUpDatafetchTime54_2.data;
        const parosMantenimientoArray = Array.isArray(
          setUpDataParosMantenimiento
        )
          ? setUpDataParosMantenimiento
          : setUpDataParosMantenimiento.data;
        const sistemasLimpiezaArray = Array.isArray(setUpDataSistema)
          ? setUpDataSistema
          : setUpDataSistema.data;
        const acabadosLimpiezaArray = Array.isArray(setUpDataAcabado)
          ? setUpDataAcabado
          : setUpDataAcabado.data;
        const brillosLimpiezaArray = Array.isArray(setUpDataBrillo)
          ? setUpDataBrillo
          : setUpDataBrillo.data;
        const setUpArray = Array.isArray(setUpData)
          ? setUpData
          : setUpData.data;
        const setUpEXT54II = setUpArray.find(
          (setup) => setup.maquina === "EXT54-II"
        );

        allProducts.forEach((producto, index, array) => {
          if (!setUpEXT54II || sistemasLimpiezaArray.length === 0) return;

          const tiempoLimpieza = setUpEXT54II.tiempos_distancia.find(
            (tiempo) =>
              parseFloat(producto.distancia) >= tiempo.distanciaMin &&
              parseFloat(producto.distancia) <= tiempo.distanciaMax
          );
          producto.tiempos_limpieza = tiempoLimpieza
            ? tiempoLimpieza.tiempos
            : "";

          const producto1 = array[index];
          const producto2 = array[index + 1];

          if (!producto1 || !producto2) return;

          const actualizarTiempo = (coincidente, key) => {
            if (!coincidente) return;

            const itemCoincidente = coincidente.producto2.find(
              (prod2) => prod2[`termi_${key}2`] === producto2[key]
            );

            if (!itemCoincidente) return;

            let tiempo = setUpEXT54II.tiempos_distancia.find(
              (t) => t.id === itemCoincidente.tiempos_limpieza
            );

            array[index + 1] = {
              ...array[index + 1],
              [`tiempos_lim_${key}`]: tiempo ? tiempo.tiempos : "default",
            };
          };

          actualizarTiempo(
            sistemasLimpiezaArray.find(
              (s) => s.sistema_producto1 === producto1.sistema
            ),
            "sistema"
          );
          actualizarTiempo(
            acabadosLimpiezaArray.find(
              (a) => a.acabado_producto1 === producto1.acabado
            ),
            "acabado"
          );
          actualizarTiempo(
            brillosLimpiezaArray.find(
              (b) => b.brillo_producto1 === producto1.brillo
            ),
            "brillo"
          );
        });

        allProducts.forEach((producto) => {
          const tiempos = [
            parseFloat(producto.tiempos_limpieza),

            parseFloat(producto.tiempos_lim_sistema),
            parseFloat(producto.tiempos_lim_acabado),
            parseFloat(producto.tiempos_lim_brillo),
          ];

          const maxTiempoLimpieza = Math.max(
            ...tiempos.filter((tiempo) => !isNaN(tiempo))
          );

          let coincidenciaEncontrada = false;
          let pruebaValor = "";

          setUpEXT54II.tiempos_distancia.forEach((tiempo) => {
            if (maxTiempoLimpieza == tiempo.id) {
              pruebaValor = tiempo.tiempos;

              coincidenciaEncontrada = true;
            }
          });

          producto.max_tiempo_limpieza = pruebaValor;

          producto.tiempo_ext_total =
            (parseFloat(producto.rendimiento_hora) || 0) +
            (parseFloat(convertirTiempoDecimal(producto.max_tiempo_limpieza)) ||
              0) +
            (parseFloat(producto.CAL_EXT) || 0);

          if (parosMantenimientoArray.length > 0) {
            const tTotal = parseFloat(parosMantenimientoArray[0].t_total);
            producto.tiempo_ext_total *= tTotal;
          }

          producto.tiempo_total300 =
            (parseFloat(producto.rendimiento_kilos) || 0) +
            (parseFloat(convertirTiempoDecimal(producto.max_tiempo_limpieza)) ||
              0) +
            (parseFloat(producto.CAL_EXT) || 0);

          function isTimeInRange(time, start, end) {
            const format = "HH:mm";
            const timeToCheck = dateAndTime.parse(time, format);
            const startTime = dateAndTime.parse(start, format);
            const endTime = dateAndTime.parse(end, format);

            if (end === "00:00") {
              endTime.setDate(endTime.getDate() + 1);
            }

            return timeToCheck >= startTime && timeToCheck < endTime;
          }

          // Array para almacenar los datos que se van a enviar al servidor
          const datosParaEnviar = [];

          allProducts.forEach((producto, index) => {
            if (producto.fecha_real && producto.hora_real) {
              let fechaIndex = fechasTimeArray.findIndex(
                (fechaObj) => fechaObj.fecha === producto.fecha_real
              );

              while (fechaIndex < fechasTimeArray.length) {
                let fechaMatch = fechasTimeArray[fechaIndex];

                if (fechaMatch) {
                  const fechaHoraStr = `${fechaMatch.fecha} ${producto.hora_real}`;
                  const fechaHora = dateAndTime.parse(
                    fechaHoraStr,
                    "YYYY-MM-DD HH:mm:ss"
                  );
                  const tiempoExtTotal =
                    index < allProducts.length - 1
                      ? allProducts[index + 1].tiempo_ext_total
                      : 0;
                  const resultado = dateAndTime.addHours(
                    fechaHora,
                    tiempoExtTotal
                  );

                  const intervalos = ["hora1", "hora2", "hora3", "hora4"];
                  let puntoInicio = null;
                  let intervaloInicio = null;

                  for (let i = 0; i < intervalos.length; i++) {
                    const intervalo = fechaMatch[intervalos[i]][0];
                    if (
                      intervalo.totalHora !== "0" &&
                      intervalo.horaMinima &&
                      intervalo.horaMaxima &&
                      isTimeInRange(
                        producto.hora_real,
                        intervalo.horaMinima,
                        intervalo.horaMaxima
                      )
                    ) {
                      puntoInicio = intervalos[i];
                      intervaloInicio = intervalo;
                      break;
                    }
                  }

                  if (puntoInicio) {
                    const horaReal = dateAndTime.parse(
                      producto.hora_real,
                      "HH:mm"
                    );
                    const horaMaximaIntervalo = dateAndTime.parse(
                      intervaloInicio.horaMaxima,
                      "HH:mm"
                    );

                    let diferenciaMinutos = dateAndTime
                      .subtract(horaMaximaIntervalo, horaReal)
                      .toMinutes();
                    if (diferenciaMinutos < 0) {
                      diferenciaMinutos += 24 * 60; // Manejar el cruce de medianoche
                    }

                    let duracionTotalHoras = diferenciaMinutos / 60;
                    let siguienteIndice = intervalos.indexOf(puntoInicio) + 1;
                    let horaMaximaUltimoIntervalo = horaMaximaIntervalo;
                    let fechaUltimoIntervalo = fechaMatch.fecha;

                    while (duracionTotalHoras < tiempoExtTotal) {
                      if (siguienteIndice >= intervalos.length) {
                        fechaIndex++;
                        if (fechaIndex >= fechasTimeArray.length) {
                          console.log(
                            "No se encontraron más intervalos o fechas."
                          );
                          break;
                        }
                        fechaMatch = fechasTimeArray[fechaIndex];
                        siguienteIndice = 0;
                        continue;
                      }

                      const siguienteIntervalo =
                        fechaMatch[intervalos[siguienteIndice]][0];
                      if (
                        siguienteIntervalo.totalHora !== "0" &&
                        siguienteIntervalo.horaMinima &&
                        siguienteIntervalo.horaMaxima
                      ) {
                        const horaMinimaSiguiente = dateAndTime.parse(
                          siguienteIntervalo.horaMinima,
                          "HH:mm"
                        );
                        const horaMaximaSiguiente = dateAndTime.parse(
                          siguienteIntervalo.horaMaxima,
                          "HH:mm"
                        );

                        let duracionSiguienteIntervalo = dateAndTime
                          .subtract(horaMaximaSiguiente, horaMinimaSiguiente)
                          .toMinutes();
                        if (duracionSiguienteIntervalo < 0) {
                          duracionSiguienteIntervalo += 24 * 60;
                        }

                        duracionTotalHoras += duracionSiguienteIntervalo / 60;
                        horaMaximaUltimoIntervalo = horaMaximaSiguiente;
                        fechaUltimoIntervalo = fechaMatch.fecha;
                      }

                      siguienteIndice++;
                    }

                    const diferencia = duracionTotalHoras - tiempoExtTotal;
                    if (horaMaximaUltimoIntervalo) {
                      const horaTotalFinal = dateAndTime.addMinutes(
                        horaMaximaUltimoIntervalo,
                        -diferencia * 60
                      );
                      const horaTotalFormateada = dateAndTime.format(
                        horaTotalFinal,
                        "HH:mm"
                      );

                      if (index < allProducts.length - 1) {
                        allProducts[index + 1].fecha_real =
                          fechaUltimoIntervalo;
                        allProducts[index + 1].hora_real = horaTotalFormateada;

                        // Agregar los datos a un array para enviar después
                        datosParaEnviar.push({
                          id: index + 1, // El ID será 1, 2, 3, etc.
                          fecha_real: fechaUltimoIntervalo,
                          hora_real: horaTotalFormateada,
                        });
                      }
                    }
                  } else {
                    console.log(
                      "No se encontró un punto de inicio en los intervalos."
                    );
                  }
                } else {
                  console.log(
                    "No se encontró una fecha coincidente para:",
                    producto.fecha_real
                  );
                }

                break;
              }
            }
          });

          // Enviar todos los datos en una sola petición
          if (datosParaEnviar.length > 0) {
            const promises = datosParaEnviar.map((datos) =>
              fetch(`http://localhost:3000/etiquetasExt54_2/${datos.id}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  fecha_real: datos.fecha_real,
                  hora_real: datos.hora_real,
                }),
              })
            );

            Promise.all(promises)
              .then((responses) => {
                responses.forEach((response, index) => {
                  if (!response.ok) {
                    throw new Error(
                      `Error en la solicitud para el producto con ID ${datosParaEnviar[index].id}`
                    );
                  }
                });
                return Promise.all(
                  responses.map((response) => response.json())
                );
              })
              .then((data) => {
                console.log(
                  "Todos los datos fueron enviados correctamente:",
                  data
                );
              })
              .catch((error) => {
                console.error("Error al enviar los datos:", error);
              });
          } else {
            console.log("No hay datos para enviar.");
          }

          allProducts.forEach((producto, index) => {
            if (producto.fecha_real && producto.hora_real) {
              let fechaHoraUnida = `${producto.fecha_real} ${producto.hora_real}`;

              const fechaHoraParseada = dateAndTime.parse(
                fechaHoraUnida,
                "YYYY-MM-DD HH:mm"
              );

              if (index < allProducts.length - 1) {
                const siguienteProducto = allProducts[index + 1];

                if (siguienteProducto.tiempo_total300) {
                  let tiempo_total300 = siguienteProducto.tiempo_total300;

                  const resultadoConTiempoTotal300 = dateAndTime.addHours(
                    fechaHoraParseada,
                    tiempo_total300
                  );

                  // Formatear para obtener la fecha y hora por separado
                  const fechaFormateada = dateAndTime.format(
                    resultadoConTiempoTotal300,
                    "DD-MM-YYYY"
                  );
                  const horaFormateada = dateAndTime.format(
                    resultadoConTiempoTotal300,
                    "HH:mm:ss"
                  );

                  // Asignar la fecha y hora a los campos correspondientes
                  producto.tpd = fechaFormateada;
                  producto.hora_tpd = horaFormateada;

                  console.log(
                    "Fecha y hora divididas:",
                    fechaFormateada,
                    horaFormateada,
                    tiempo_total300
                  );

                  // Enviar el resultado a la API, utilizando el índice para determinar el ID
                  const id = index + 1; // El ID será 1, 2, 3, etc.
                  fetch(`http://localhost:3000/etiquetasExt54_2/${id}`, {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      tpd: fechaFormateada,
                      hora_tpd: horaFormateada,
                    }),
                  })
                    .then((response) => {
                      if (!response.ok) {
                        throw new Error("Error en la solicitud");
                      }
                      return response.json();
                    })
                    .then((data) => {
                      console.log("Datos enviados correctamente:", data);
                    })
                    .catch((error) => {
                      console.error("Error al enviar los datos:", error);
                    });
                } else {
                  console.warn(
                    `Producto ${index + 1} no tiene tiempo_total300`
                  );
                }
              } else {
                console.warn(
                  `Producto ${index} no tiene un siguiente producto para sumar tiempo_total300`
                );
              }
            } else {
              console.warn(`Producto ${index} no tiene fecha_real o hora_real`);
            }
          });

          producto.tiempo_ext_total = parseFloat(
            producto.tiempo_ext_total.toFixed(2)
          );
        });

        setProductos(allProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const convertirTiempoDecimal = (tiempoHHMMSS) => {
    const partes = tiempoHHMMSS.split(":");
    const horas = parseInt(partes[0], 10);
    const minutos = parseInt(partes[1], 10);
    const segundos = parseInt(partes[2], 10);

    const tiempoDecimal = horas + minutos / 60 + segundos / 3600;
    return parseFloat(tiempoDecimal.toFixed(2));
  };

  const calcularDistancia = (producto1, producto2) => {
    const deltaE = Math.sqrt(
      Math.pow(producto1.l - producto2.l, 2) +
        Math.pow(producto1.a - producto2.a, 2) +
        Math.pow(producto1.b - producto2.b, 2)
    );
    return deltaE.toFixed(3);
  };

  return (
    <div>
      <h2>Tiempos Extrusion 54 2</h2>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    className="styleTableMampara"
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {productos.map((producto, rowIndex) => (
                <TableRow className="styleHover" key={producto.id}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align}>
                      {column.id === "fecha_real"
                        ? formatDateWithoutTime(producto[column.id])
                        : column.id === "tpd"
                        ? rowIndex === 0 // Si es la primera fila, no muestra nada
                          ? ""
                          : productos[rowIndex - 1].tpd
                        : column.id === "hora_tpd"
                        ? rowIndex === 0 // Si es la primera fila, no muestra nada
                          ? ""
                          : productos[rowIndex - 1].hora_tpd
                        : producto[column.id]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
