import React from "react";
import "../App.css";

interface RegistrarPageProps {
  theme: string;
  toggleTheme: () => void;
}

const RegistrarPage: React.FC<RegistrarPageProps> = ({
  theme,
  toggleTheme,
}) => {
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end mb-3" data-bs-theme="dark">
        <button className="btn btn-primary" onClick={toggleTheme}>
          {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </div>
      <h1 className="text-center">Welcome to the Registrar's Page</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="contact" className="form-label">
            Contact
          </label>
          <input
            type="text"
            className="form-control"
            id="contact"
            placeholder="Enter your contact"
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
            placeholder="Enter your age"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="address"
            placeholder="Enter your address"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="maritalStatus" className="form-label">
            Marital Status
          </label>
          <select className="form-control" id="maritalStatus">
            <option value="single">Single</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
            <option value="widowed">Widowed</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default RegistrarPage;
