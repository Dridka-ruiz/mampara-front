import React, { useEffect, useRef, useState } from "react";
import "../../../style/time/fecha.css";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { fetchTime54_2 } from "../../../api/timeSet/timeSet54_2";
import { fetchTimeBuss1 } from "../../../api/timeSet/timeSetBuss1";
import { fetchTime70_2 } from "../../../api/timeSet/timeSet70_2";
import { fetchTime54_4 } from "../../../api/timeSet/timeSet54_4";
import { fetchTime54_5 } from "../../../api/timeSet/timeSet54_5";
import { fetchTime54_1 } from "../../../api/timeSet/timeSet54_1";
import { fetchTime58 } from "../../../api/timeSet/timeSet58";
import { fetchTime40 } from "../../../api/timeSet/timeSet40";
import { fetchTime54_3 } from "../../../api/timeSet/timeSet54_3";
import { fetchTime54_7 } from "../../../api/timeSet/timeSet54_7";
import { fetchTime70_1 } from "../../../api/timeSet/timeSet70_1";
import { fetchTimeBuss2 } from "../../../api/timeSet/timeSetBuss2";
import { fetchTime26_1 } from "../../../api/timeSet/timeSet26_1";
import { fetchTime26_2 } from "../../../api/timeSet/timeSet26_2";
import { fetchTime54_6 } from "../../../api/timeSet/timeSet54_6";
import { fetchTime70_3 } from "../../../api/timeSet/timeSet70_3";
import { fetchTime54_8 } from "../../../api/timeSet/timeSet54_8";

function Tiempo54_2() {
  const [timeData, setTimeData] = useState({
    "EXT54-II": [],
    BUSS1: [],
    "EXT70-II": [],
    "EXT54-IV": [],
    "EXT54-V": [],
    "EXT54-I": [],
    EXT58: [],
    EXT40: [],
    "EXT54-III": [],
    "EXT54-VII": [],
    "EXT70-I": [],
    BUSS2: [],
    "EXT26-I": [],
    "EXT26-II": [],
    "EXT54-VI": [],
    "EXT70-III": [],
    "EXT54-VIII": [],
  });

  const today = new Date().toISOString().split("T")[0];
  const todayRefs = useRef({});
  const containerRefs = useRef({
    "EXT54-II": useRef(null),
    BUSS1: useRef(null),
    "EXT70-II": useRef(null),
    "EXT54-IV": useRef(null),
    "EXT54-V": useRef(null),
    "EXT54-I": useRef(null),
    EXT58: useRef(null),
    EXT40: useRef(null),
    "EXT54-III": useRef(null),
    "EXT54-VII": useRef(null),
    "EXT70-I": useRef(null),
    BUSS2: useRef(null),
    "EXT26-I": useRef(null),
    "EXT26-II": useRef(null),
    "EXT54-VI": useRef(null),
    "EXT70-III": useRef(null),
    "EXT54-VIII": useRef(null),
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await Promise.all([
          fetchTime54_2(),
          fetchTimeBuss1(),
          fetchTime70_2(),
          fetchTime54_4(),
          fetchTime54_5(),
          fetchTime54_1(),
          fetchTime58(),
          fetchTime40(),
          fetchTime54_3(),
          fetchTime54_7(),
          fetchTime70_1(),
          fetchTimeBuss2(),
          fetchTime26_1(),
          fetchTime26_2(),
          fetchTime54_6(),
          fetchTime70_3(),
          fetchTime54_8(),
        ]);

        const newData = {
          "EXT54-II": data[0].data,
          BUSS1: data[1].data,
          "EXT70-II": data[2].data,
          "EXT54-IV": data[3].data,
          "EXT54-V": data[4].data,
          "EXT54-I": data[5].data,
          EXT58: data[6].data,
          EXT40: data[7].data,
          "EXT54-III": data[8].data,
          "EXT54-VII": data[9].data,
          "EXT70-I": data[10].data,
          BUSS2: data[11].data,
          "EXT26-I": data[12].data,
          "EXT26-II": data[13].data,
          "EXT54-VI": data[14].data,
          "EXT70-III": data[15].data,
          "EXT54-VIII": data[16].data,
        };

        setTimeData(newData);
        scrollToToday(newData);
      } catch (error) {
        console.error("Error fetching time data:", error);
      }
    };

    fetchData();
  }, []);

  const formatDateWithoutTime = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}/${month}/${year}`;
  };

  const scrollToToday = (data) => {
    Object.keys(todayRefs.current).forEach((key) => {
      if (todayRefs.current[key]) {
        todayRefs.current[key].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    });
  };

  const renderData = (title, data, ref) => (
    <div className="pociconTabla" ref={ref}>
      <div
        className="tamañoScroll"
        style={{
          width: "1900px",
        }}
      >
        {data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={index}
              ref={(el) => {
                if (item.fecha === today) {
                  todayRefs.current[title] = el;
                }
              }}
              className={item.fecha === today ? "fechaHoy" : ""}
            >
              {item.fecha === today && <span> El día de hoy es:</span>}

              <CardContent
                style={{
                  paddingBottom: "0px",
                  margin: "0px",
                  width: "490px",
                }}
                className={`extrusor2 ${item.fecha === today ? "today" : ""}`}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                  }}
                >
                  <p className="pText">
                    Dia: {formatDateWithoutTime(item.fecha)}
                  </p>
                  <p className="pText">
                    Total de horas por dia: {item.totalHoras}
                  </p>
                </div>

                <CardContent className="cardContext">
                  {item.hora1 && item.hora1.length > 0 && (
                    <Typography className="horasInpares">
                      <p className="horaTittle">Hora 1</p>
                      {item.hora1[0].horaMinima} - {item.hora1[0].horaMaxima}
                      <p className="horaTittle">
                        ({item.hora1[0].totalHora} horas)
                      </p>
                    </Typography>
                  )}
                  {item.hora2 && item.hora2.length > 0 && (
                    <Typography className="horasPares">
                      <p className="horaTittle">Hora 2</p>
                      {item.hora2[0].horaMinima} - {item.hora2[0].horaMaxima}
                      <p className="horaTittle">
                        ({item.hora2[0].totalHora} horas)
                      </p>
                    </Typography>
                  )}
                  {item.hora3 && item.hora3.length > 0 && (
                    <Typography className="horasInpares">
                      <p className="horaTittle">Hora 3</p>
                      {item.hora3[0].horaMinima} - {item.hora3[0].horaMaxima}
                      <p className="horaTittle">
                        ({item.hora3[0].totalHora} horas)
                      </p>
                    </Typography>
                  )}
                  {item.hora4 && item.hora4.length > 0 && (
                    <Typography className="horasPares">
                      <p className="horaTittle">Hora 4</p>
                      {item.hora4[0].horaMinima} - {item.hora4[0].horaMaxima}
                      <p className="horaTittle">
                        ({item.hora4[0].totalHora} horas)
                      </p>
                    </Typography>
                  )}
                </CardContent>
              </CardContent>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );

  return (
    <div style={{ overflowX: "scroll", marginTop: "1rem" }}>
      <div style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
        {Object.keys(timeData).map((key) => (
          <React.Fragment key={key}>
            {renderData(key, timeData[key], containerRefs.current[key])}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Tiempo54_2;
