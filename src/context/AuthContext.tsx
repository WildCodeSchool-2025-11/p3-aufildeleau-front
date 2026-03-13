import { createContext, useContext, useState } from "react";

// Etape 1
const AuthContext = createContext(null);

// Etape 2
export default function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);

  // Function login
  const handleLogin = async (login, password) => {
    const newData = { login, password };

    const resp = await fetch("http://localhost:3310/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    const data = await resp.json();

    if (resp.ok) {
      setIsLogin(true);
    }
  };

  // Function Création de compte
  const handleSignup = async (login, password) => {
    const newData = { login, password };

    const resp = await fetch("http://localhost:3310/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    const data = await resp.json();

    if (resp.ok) {
      setIsLogin(true);
    }
  };

  // Function déconnection
  const handleLogout = () => setIsLogin(false);

  return (
    <AuthContext value={{ isLogin, handleLogin, handleLogout, handleSignup }}>
      {children}
    </AuthContext>
  );
}

// Etape 3
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
