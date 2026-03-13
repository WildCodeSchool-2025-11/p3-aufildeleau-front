import React, { useState } from "react";
import { Box, TextField, Stack, Button } from "@mui/material";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { handleSignup } = useAuth();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("nanar");

  console.log(login)

  return (
    <Box mt={10}>
      <Stack direction={"column"} spacing={2}>
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
          <Button variant="contained" onClick={() => handleSignup(login, password)} >
            Créer un compte
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Register;
