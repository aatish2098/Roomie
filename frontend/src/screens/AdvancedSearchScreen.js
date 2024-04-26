import React, { useState } from 'react';
import axios from 'axios';

function AdvancedSearchScreen() {
    const [inputs, setInputs] = useState({
        minRent: '',
        maxRent: '',
        city: '',
        state: '',
        inDoorWashingMachine: false,
        gym: false
    });
    const [units, setUnits] = useState([]);
    const [noMatch, setNoMatch] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:8000/advanced-search/', { params: { ...inputs } });
            if (response.data.length > 0) {
                setUnits(response.data);
                setNoMatch(false);
            } else {
                setUnits([]);
                setNoMatch(true);
            }
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '500px', backgroundColor: '#f7f7f7', padding: '20px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '8px', marginBottom: '20px' }}>
                {/* Inputs for rent range */}
                <div style={{ marginBottom: '20px' }}>
                    <label>Min Rent:</label>
                    <input type="number" name="minRent" value={inputs.minRent} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '2px solid #ccc', borderRadius: '4px' }} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label>Max Rent:</label>
                    <input type="number" name="maxRent" value={inputs.maxRent} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '2px solid #ccc', borderRadius: '4px' }} />
                </div>
                {/* Inputs for city and state */}
                <div style={{ marginBottom: '20px' }}>
                    <label>City:</label>
                    <input type="text" name="city" value={inputs.city} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '2px solid #ccc', borderRadius: '4px' }} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label>State:</label>
                    <input type="text" name="state" value={inputs.state} onChange={handleChange} style={{ width: '100%', padding: '10px', border: '2px solid #ccc', borderRadius: '4px' }} />
                </div>
                {/* Checkbox inputs for amenities */}
                <div style={{ marginBottom: '20px' }}>
                    <label>
                        <input type="checkbox" name="inDoorWashingMachine" checked={inputs.inDoorWashingMachine} onChange={handleChange} />
                        In-door Washing Machine
                    </label>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label>
                        <input type="checkbox" name="gym" checked={inputs.gym} onChange={handleChange} />
                        Gym Access
                    </label>
                </div>
                <button type="submit" style={styles.button}
                        onMouseOver={e => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                        onMouseOut={e => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}>Submit
                </button>
            </form>
            {units.length > 0 ? (
                <ul style={{width: '100%', maxWidth: '500px'}}>
                    {units.map(unit => (
                        <li key={unit.UnitID} style={{
                            listStyle: 'none',
                            backgroundColor: '#fff',
                            padding: '15px',
                            marginBottom: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', borderRadius: '8px'
                        }}>
                            <div>Unit Number: {unit.UnitNumber}</div>
                            <div>Monthly Rent: ${unit.MonthlyRent}</div>
                            <div>City: {unit.AddrCity}</div>
                            <div>State: {unit.AddrState}</div>
                            <div>Available Date: {unit.AvailableDateForMoveIn}</div>
                            <button style={styles.detailButton} onClick={() => handleViewDetails(unit.UnitRentID)}>
                                View Details
                            </button>
                        </li>
                    ))}
                </ul>
            ) : noMatch && (
                <div>No matching units found. Please adjust your search criteria.</div>
            )}
        </div>
    );
}

export default AdvancedSearchScreen;

