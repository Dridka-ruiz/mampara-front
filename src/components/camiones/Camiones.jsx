import React from "react";
import "../../style/global/camiones.css";

const App = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <h2 className="tipografia">Salida de los camiones</h2>
      </div>
      <div>
        <iframe
          style={{
            width: "1080px",
            height: "1500px",
            position: "relative",
          }}
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vRy47O95YeRugTV6IjD6fUEmmUkmiTvqbSUW-B2WqefGLt0Z6pLIkd66gyd7q9EX6sWICwIv_eG7ML9/pubhtml?widget=true&amp;headers=false"
          scrolling="no"
        ></iframe>
      </div>
    </div>
  );
};

export default App;
