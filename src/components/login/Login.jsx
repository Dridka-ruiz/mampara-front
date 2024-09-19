import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";
import "../../style/login/login.css";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });

      if (response.data && response.data.token && response.data.permissions) {
        const { token, permissions } = response.data;
        login(token, permissions);
      } else {
        setError("Invalid response format from server");
      }
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <div className="container">
        <div className="login-container">
          <div></div>
          <div className="login">
            <h2
              style={{
                color: "rgb(31 42 74)",
              }}
            >
              Bienvenido
            </h2>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                <AccountCircle sx={{ color: "#6d6d6d", mr: 1, my: 0.5 }} />
                <TextField
                  style={{ color: "#6d6d6d !importan" }}
                  id="input-with-sx"
                  label="Nombre de Usuario"
                  variant="standard"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Box>

              <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
                <InputLabel htmlFor="standard-adornment-password">
                  Contraseña
                </InputLabel>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  id="standard-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
              <button type="submit">Iniciar secion</button>
            </form>
            {error && <p>{error}</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
