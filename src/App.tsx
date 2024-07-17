import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import RegistrarPage from "./components/RegistrarPage";
import Navbar from "./components/navigation";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registrar" element={<RegistrarPage />} />
      </Routes>
    </Router>
  );
}

export default App;
