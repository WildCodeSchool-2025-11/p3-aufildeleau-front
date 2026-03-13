import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Route, Link as RouterLink, Routes } from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/admin/Dashboard";
import Items from "./pages/admin/Items";
import { useAuth } from "./context/AuthContext";
import { Button } from "@mui/material";

function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      sx={{
        color: "text.secondary",
      }}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      <Link
        component={RouterLink}
        to="/register"
        variant="h6"
        underline="hover"
      >
        Créer un compte
      </Link>
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function App() {
  const { isLogin, handleLogout } = useAuth();

  return (
    <Container maxWidth="sm">
      {/* Barre de navigation simple */}
      <Box component="nav" sx={{ p: 2, borderBottom: "1px solid #ddd" }}>
        <Stack direction="row" spacing={4} justifyContent="center">
          <Link component={RouterLink} to="/" variant="h6" underline="hover">
            Accueil
          </Link>
          <Link
            component={RouterLink}
            to="/about"
            variant="h6"
            underline="hover"
          >
            À propos
          </Link>
          {!isLogin ? (
            <Link
              component={RouterLink}
              to="/Login"
              variant="h6"
              underline="hover"
            >
              Login
            </Link>
          ) : (
            <>
              <Box component={Button} onClick={handleLogout} variant="h6">
                Déconnection
              </Box>
              <Link
                component={RouterLink}
                to="/admin/dashboard"
                variant="h6"
                underline="hover"
              >
                Admin
              </Link>
              <Link
                component={RouterLink}
                to="/admin/items"
                variant="h6"
                underline="hover"
              >
                Items
              </Link>
            </>
          )}
        </Stack>
      </Box>

      {/* Configuration des Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/items" element={<Items />} />
      </Routes>

      <Box sx={{ my: 4 }}>
        <Copyright />
      </Box>
    </Container>
  );
}
