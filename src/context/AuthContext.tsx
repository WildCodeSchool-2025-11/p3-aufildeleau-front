import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

// Etape 1
const AuthContext = createContext(null);

// Etape 2
export default function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(false);
  const [message, setMessage] = useState('');
  let navigate = useNavigate();

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

    if (resp.status != 200) {
      setMessage({ message: data.message, status: resp.status});
      return;
    }
    
    setMessage('');
    setIsLogin(true);
    localStorage.setItem('token', data.token);
    navigate('/admin/dashboard')
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


  const currentUser = async () => {
    const loginStorage = localStorage.getItem('token');
    
    if(true === Boolean(loginStorage)){
      setIsLogin(true);
    }
  }

  useEffect(() => {
    currentUser();
  }, [])
  

  return (
    <AuthContext value={{ isLogin, handleLogin, handleLogout, handleSignup, message }}>
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
