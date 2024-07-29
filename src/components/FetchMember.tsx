import { useState } from "react";
import axios from "axios";

function FetchMember() {
  const [memberId, setMemberId] = useState("");
  const [memberDetails, setMemberDetails] = useState<any>(null);
  const [error, setError] = useState("");

  const handleFetch = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/members/${memberId}`
      );
      if (response.status === 200) {
        setMemberDetails(response.data);
        setError("");
      } else {
        setError("Member not found");
        setMemberDetails(null);
      }
    } catch (error) {
      setError("An error occurred while fetching member details");
      setMemberDetails(null);
    }
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light text-dark">
      <h1>FetchMe</h1>
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
            <pre>{JSON.stringify(memberDetails, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default FetchMember;
