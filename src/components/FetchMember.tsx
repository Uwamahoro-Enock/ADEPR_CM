import { useState } from "react";
import axios from "axios";

function FetchMember() {
  const [memberId, setMemberId] = useState("");
  const [memberDetails, setMemberDetails] = useState<any>(null);
  const [error, setError] = useState("");

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
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/fetch-member/${memberId}`
      );

      if (response.status === 200) {
        setMemberDetails(response.data);
        setError(""); // Clear any previous errors
      } else if (response.status === 404) {
        setError("User doesn't exist");
        setMemberDetails(null);
      } else {
        setError("An unexpected error occurred");
        setMemberDetails(null);
      }
    } catch (error) {
      // Handle network or other unexpected errors
      setError("An error occurred while fetching member details");
      setMemberDetails(null);
    }
  };

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
              {JSON.stringify(memberDetails, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default FetchMember;
