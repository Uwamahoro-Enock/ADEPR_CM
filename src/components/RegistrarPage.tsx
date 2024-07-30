import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

interface RegistrarPageProps {
  theme: string;
  toggleTheme: () => void;
}

const RegistrarPage: React.FC<RegistrarPageProps> = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: "",
    age: "",
    location: "",
    marital_status: "single",
    ID_number: "",
    role: "",
    contact_number: ""
  });

  const [notification, setNotification] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Check if user is authenticated
  const checkAuthentication = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  };

  React.useEffect(() => {
    checkAuthentication();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const response = await fetch("http://localhost:3000/register-member", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        setNotification({ message: "Member registered successfully!", type: "success" });
        setFormData({
          full_name: "",
          age: "",
          location: "",
          marital_status: "single",
          ID_number: "",
          role: "",
          contact_number: ""
        });
      } else {
        setNotification({ message: result.message || "Failed to register member", type: "error" });
      }

      // Hide notification after 2 seconds
      setTimeout(() => setNotification(null), 2000);

    } catch (error) {
      console.error("Error:", error);
      setNotification({ message: "Error occurred while registering member", type: "error" });
      setTimeout(() => setNotification(null), 2000);
    }
  };

  const handleNavigate = () => {
    navigate("/fetch-member");
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end mb-3" data-bs-theme="dark">
        <button className="btn btn-primary" onClick={toggleTheme}>
          {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </div>
      <h1 className="text-center">Welcome to the Registrar's Page</h1>
      <form onSubmit={handleSubmit}>
        {/* Form fields for member registration */}
        <div className="mb-3">
          <label htmlFor="full_name" className="form-label">Full Name</label>
          <input type="text" id="full_name" className="form-control" value={formData.full_name} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">Age</label>
          <input type="number" id="age" className="form-control" value={formData.age} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <input type="text" id="location" className="form-control" value={formData.location} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="marital_status" className="form-label">Marital Status</label>
          <select id="marital_status" className="form-control" value={formData.marital_status} onChange={handleChange}>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="ID_number" className="form-label">ID Number</label>
          <input type="text" id="ID_number" className="form-control" value={formData.ID_number} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">Role</label>
          <input type="text" id="role" className="form-control" value={formData.role} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="contact_number" className="form-label">Contact Number</label>
          <input type="text" id="contact_number" className="form-control" value={formData.contact_number} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </form>
      {notification && (
        <div className={`alert alert-${notification.type === "success" ? "success" : "danger"} mt-3`}>
          {notification.message}
        </div>
      )}
      <button className="btn btn-secondary mt-3" onClick={handleNavigate}>
        Fetch Member
      </button>
    </div>
  );
};

export default RegistrarPage;
