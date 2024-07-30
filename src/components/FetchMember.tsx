import { useState, useEffect } from "react";
import axios, { AxiosError } from "axios";

function FetchMember() {
  const [memberId, setMemberId] = useState("");
  const [memberDetails, setMemberDetails] = useState<any>(null);
  const [error, setError] = useState("");
  const [displayText, setDisplayText] = useState("");

  const validateId = (id: string) => {
    if (id.length !== 16) {
      return "Invalid ID format. ID must be exactly 16 digits.";
    }
    if (!/^\d+$/.test(id)) {
      return "ID should contain numbers only.";
    }
    return "";
  };

  const handleFetch = async () => {
    const validationError = validateId(memberId);
    if (validationError) {
      setError(validationError);
      setMemberDetails(null);
      setDisplayText("");
      return;
    }

    try {
      const token = localStorage.getItem('token'); // Assuming the token is stored in localStorage after login
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/fetch-member/${memberId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        setMemberDetails(response.data);
        setError(""); // Clear any previous errors
      }
    } catch (err: unknown) {
      const axiosError = err as AxiosError;
      if (axiosError.response && axiosError.response.status === 404) {
        setError("User doesn't exist");
        setMemberDetails(null);
        setDisplayText("");
      } else {
        // Handle network or other unexpected errors
        setError("An error occurred while fetching member details");
        setMemberDetails(null);
        setDisplayText("");
      }
    }
  };

  useEffect(() => {
    if (memberDetails) {
      const details = `
        Full Name: ${memberDetails.full_name}
        Age: ${memberDetails.age}
        Location: ${memberDetails.location}
        Marital Status: ${memberDetails.marital_status}
        Role: ${memberDetails.role}
        Contact Number: ${memberDetails.contact_number}
      `;
      let index = 0;
      const interval = setInterval(() => {
        setDisplayText(details.slice(0, index));
        index++;
        if (index > details.length) {
          clearInterval(interval);
        }
      }, 50); // Adjust the speed here
      return () => clearInterval(interval);
    }
  }, [memberDetails]);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-dark">
      <h1>Fetch Member</h1>
      <div className="card p-4 bg-white" style={{ width: "20rem" }}>
        <div className="mb-3">
          <label htmlFor="memberId" className="form-label">
            Member ID
          </label>
          <input
            type="text"
            className="form-control"
            id="memberId"
            placeholder="Enter member ID"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            required
          />
        </div>
        <div className="d-grid">
          <button className="btn btn-primary" onClick={handleFetch}>
            Fetch
          </button>
        </div>
        {error && <div className="mt-3 text-center text-danger">{error}</div>}
        {memberDetails && (
          <div className="mt-3 text-center">
            <h4>Member Details</h4>
            <pre
              style={{
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                backgroundColor: "black",
                color: "red",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              {displayText}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default FetchMember;
