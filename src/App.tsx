import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Login from "./components/login";
import RegistrarPage from "./components/RegistrarPage";
import Navbar from "./components/navigation";
import "./App.css"; // Ensure to create appropriate CSS for dark and light themes

function App() {
  const location = useLocation();
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Apply theme to the body element
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <>
      {location.pathname !== "/registrar" && (
        <Navbar theme={theme} toggleTheme={toggleTheme} />
      )}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/registrar"
          element={<RegistrarPage theme={theme} toggleTheme={toggleTheme} />}
        />
      </Routes>
    </>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
