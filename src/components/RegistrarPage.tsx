import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

interface RegistrarPageProps {
  theme: string;
  toggleTheme: () => void;
}

const RegistrarPage: React.FC<RegistrarPageProps> = ({
  theme,
  toggleTheme,
}) => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/register-member", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
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
        <div className="mb-3">
          <label htmlFor="full_name" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            className="form-control"
            id="full_name"
            value={formData.full_name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contact_number" className="form-label">
            Contact Number
          </label>
          <input
            type="text"
            className="form-control"
            id="contact_number"
            value={formData.contact_number}
            onChange={handleChange}
            placeholder="Enter your contact number"
            required
            pattern="\d{10}"
            title="Contact number must be 10 digits"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ID_number" className="form-label">
            ID Number
          </label>
          <input
            type="text"
            className="form-control"
            id="ID_number"
            value={formData.ID_number}
            onChange={handleChange}
            placeholder="Enter your ID number"
            required
            pattern="\d{16}"
            title="ID number must be 16 digits"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="number"
            className="form-control"
            id="age"
            value={formData.age}
            onChange={handleChange}
            placeholder="Enter your age"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            type="text"
            className="form-control"
            id="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter your location"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <input
            type="text"
            className="form-control"
            id="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Enter your role"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="marital_status" className="form-label">
            Marital Status
          </label>
          <select className="form-control" id="marital_status" value={formData.marital_status} onChange={handleChange} required>
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleNavigate}
        >
          Fetch Data
        </button>
      </form>
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default RegistrarPage;
