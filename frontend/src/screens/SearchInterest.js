import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function SearchComponent() {
  const { unitRentID } = useParams();
  const [roommateCnt, setRoommateCnt] = useState("");
  const [moveInDate, setMoveInDate] = useState("");
  const [results, setResults] =  useState(null);
  const [searchMessage, setSearchMessage] = useState("");

  const handleSearch = async () => {
    const postData = {
      UnitRentID: unitRentID,
      roommateCnt: roommateCnt || undefined,
      moveInDate: moveInDate || undefined,
    };
    try {
    const response = await axios.post(
        "http://127.0.0.1:8000/searchInterest/",
        postData
      );

      if (Array.isArray(response.data)) {
        setResults(response.data);
        setSearchMessage(""); // Clear any previous message
      } else {
        setResults(null); // Clear previous results
        setSearchMessage(response.data.status); // Set the message
      }
    } catch (error) {
      console.error("Error fetching data: ", error);
      setSearchMessage("Error fetching data"); // Set error message
    }
  };


  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '300px',
    margin: 'auto',
    gap: '10px',
    alignItems: 'flex-start',
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    margin: '4px 0',
    display: 'inline-block',
    border: '1px solid #ccc',
    borderRadius: '4px',
    boxSizing: 'border-box',
  };

  const buttonStyle = {
    width: '100%',
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '14px 20px',
    margin: '8px 0',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  const resultsTableStyle = {
    width: '100%',
    marginTop: '20px',
    borderTop: '1px solid #ddd',
    textAlign: 'left',
  };

  const thStyle = {
    borderBottom: '1px solid #ddd',
    padding: '8px',
    background: '#f0f0f0',
  };

  const tdStyle = {
    borderBottom: '1px solid #ddd',
    padding: '8px',
  };
    const hstyle = {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '400px',
      marginTop: '40px',
      marginBottom: '60px',
      marginLeft:"330px",
    margin: 'auto',
    gap: '10px',
    alignItems: 'flex-start',
  };
    const renderSearchResults = () => {
    if (results) {
      return (
 <table style={resultsTableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Unit ID</th>
              <th style={thStyle}>Move In Date</th>
              <th style={thStyle}>Roommate Count</th>
              <th style={thStyle}>Phone</th>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Name</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result) => (
              <tr key={result.unitRentID}>
                <td style={tdStyle}>{result.unitRentID}</td>
                <td style={tdStyle}>{result.MoveInDate}</td>
                <td style={tdStyle}>{result.RoommateCount}</td>
                <td style={tdStyle}>{result.PhoneNumber}</td>
                <td style={tdStyle}>{result.email}</td>
                <td style={tdStyle}>{result.Name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } else if (searchMessage) {
      return <p style={{ textAlign: 'center' }}>{searchMessage}</p>;
    }
    return null;
  };

    return (
    <div style={{ maxWidth: '1000px', margin: 'auto' }}>
      <h5 style={hstyle}>Interest Search for  Unit {unitRentID}</h5>
      <div style={formStyle}>
                <label>Roommate Count:</label>
        <input
          style={inputStyle}
          type="number"
          value={roommateCnt}
          onChange={(e) => setRoommateCnt(e.target.value)}
        />
        <label>Move In Date (results include within 60 days)</label>
        <input
          style={inputStyle}
          type="date"
          value={moveInDate}
          onChange={(e) => setMoveInDate(e.target.value)}
        />
        <button style={buttonStyle} onClick={handleSearch}>Search</button>
      </div>
      {renderSearchResults()}
    </div>
  );
}

export default SearchComponent;
