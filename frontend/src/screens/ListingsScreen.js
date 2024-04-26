import React, { useState } from 'react';
import axios from 'axios';

function ApartmentListings() {
    const [inputs, setInputs] = useState({
        BuildingName: '',
        CompanyName: ''
    });
    const [units, setUnits] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/listings/', {
                BuildingName: inputs.BuildingName,
                CompanyName: inputs.CompanyName
            });
            setUnits(response.data);
        } catch (error) {
            console.error('Error fetching apartment units:', error);
        }
    };

    const handleViewDetails = (unitId) => {
        console.log('View details for unit:', unitId);
    };

    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px'
        },
        form: {
            width: '100%',
            maxWidth: '400px',
            backgroundColor: '#f7f7f7',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            borderRadius: '8px',
            marginBottom: '20px'
        },
        inputGroup: {
            marginBottom: '20px'
        },
        input: {
            width: '100%',
            padding: '10px',
            border: '2px solid #ccc',
            borderRadius: '4px'
        },
        button: {
            width: '100%',
            padding: '10px 20px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
        },
        buttonHover: {
            backgroundColor: '#0056b3'
        },
        results: {
            width: '100%',
            maxWidth: '400px'
        },
        unit: {
            listStyle: 'none',
            backgroundColor: '#fff',
            padding: '15px',
            marginBottom: '10px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            borderRadius: '8px'
        },
        detailButton: {
            marginTop: '10px',
            backgroundColor: '#4CAF50', // Green color for details button
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            padding: '8px 16px',
            cursor: 'pointer'
        }
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
                <button type="submit" style={styles.button}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}>Submit</button>
            </form>

            {units.length > 0 && (
                <ul style={styles.results}>
                    {units.map(unit => (
                        <li key={unit.UnitRentID} style={styles.unit}>
                            <div>Unit Number: {unit.unitNumber}</div>
                            <div>Monthly Rent: ${unit.MonthlyRent}</div>
                            <div>Square Footage: {unit.squareFootage} sqft</div>
                            <div>Available Date: {unit.AvailableDateForMoveIn}</div>
                            <button style={styles.detailButton} onClick={() => handleViewDetails(unit.UnitRentID)}>
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