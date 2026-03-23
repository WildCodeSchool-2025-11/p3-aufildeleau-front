import React, { useState } from "react";
import { Box, TextField, Stack, Button, Alert } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { handleLogin, message } = useAuth();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("nanar");


  return (
    <Box mt={10}>
      <Stack direction={"column"} spacing={2}>
        {message && <Stack><Alert severity="error">{message.message}</Alert></Stack>}
        <Stack>
          <TextField
            name="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            label="Login"
            variant="outlined"
          />
        </Stack>{" "}
        <Stack>
          <TextField
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            label="Password"
            variant="outlined"
          />
        </Stack>
        <Stack>
          <Button
            variant="contained"
            onClick={() => handleLogin(login, password)}
          >
            Login
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Login;
