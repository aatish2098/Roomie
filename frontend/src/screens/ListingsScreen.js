import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ApartmentListings() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    BuildingName: "Mary Island",
    CompanyName: "Ramos Inc",
  });
  const [units, setUnits] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const listingRedirect = (e) => {
    navigate(`${e.target.name}/`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://127.0.0.1:8000/listings/", {
        BuildingName: inputs.BuildingName,
        CompanyName: inputs.CompanyName,
        UnitNumber: inputs.UnitNumber,
      });
      setUnits(response.data); // Assuming response data is the array of units
    } catch (error) {
      console.error("Error fetching apartment units:", error);
      // Handle errors appropriately in a real app
    }
  };

  const handleViewDetails = (unitId) => {
    // Placeholder for detail view functionality
    navigate(`/unit/${unitId}`);
    // You can replace this with navigation or setting state to show details
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
    },
    form: {
      width: "100%",
      maxWidth: "400px",
      backgroundColor: "#f7f7f7",
      padding: "20px",
      boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
      borderRadius: "8px",
      marginBottom: "20px",
    },
    inputGroup: {
      marginBottom: "20px",
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "2px solid #ccc",
      borderRadius: "4px",
    },
    button: {
      width: "100%",
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    results: {
      width: "100%",
      maxWidth: "400px",
    },
    unit: {
      listStyle: "none",
      backgroundColor: "#fff",
      padding: "15px",
      marginBottom: "10px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      borderRadius: "8px",
    },
    detailButton: {
      marginTop: "10px",
      backgroundColor: "#4CAF50", // Green color for details button
      color: "white",
      border: "none",
      borderRadius: "4px",
      padding: "8px 16px",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label>Building Name:</label>
          <input
            type="text"
            name="BuildingName"
            value={inputs.BuildingName}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Company Name:</label>
          <input
            type="text"
            name="CompanyName"
            value={inputs.CompanyName}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label>Unit Number:</label>
          <input
            type="text"
            name="UnitNumber"
            value={inputs.UnitNumber}
            onChange={handleChange}
            style={styles.input}
          />
        </div>
        <button
          type="submit"
          style={styles.button}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.buttonHover.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.button.backgroundColor)
          }
        >
          Submit
        </button>
      </form>

      {units.length > 0 && (
        <ul style={styles.results}>
          {units.map((unit) => (
            <li key={unit.UnitRentID} style={styles.unit}>
              <div>Unit Number: {unit.unitNumber}</div>
              <div>Monthly Rent: ${unit.MonthlyRent}</div>
              <div>Square Footage: {unit.squareFootage} sqft</div>
              <div>Available Date: {unit.AvailableDateForMoveIn}</div>
              <div># of Bedrooms: </div>
              <div># of Bathrooms:</div>
              <div>Average Market Rate:</div>
              <button
                style={styles.detailButton}
                onClick={() => handleViewDetails(unit.UnitRentID)}
              >
                View Details
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ApartmentListings;
