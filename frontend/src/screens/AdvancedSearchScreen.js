import React, { useState } from 'react';
import axios from 'axios';

function AdvancedSearchScreen() {
    const today = new Date().toISOString().split('T')[0];

    const [inputs, setInputs] = useState({
        minRent: '',
        maxRent: '',
        city: '',
        state: '',
        earliestAvailableDateForMoveIn: today,
        latestAvailableDateForMoveIn: today,
        catCafe: false,
        centralAC: false,
        coffeeMachine: false,
        deliveryRoom: false,
        dishwasher: false,
        dryer: false,
        gameRoom: false,
        garden: false,
        gasStove: false,
        gym: false,
        inductionCooker: false,
        parking: false,
        publicWashingMachine: false,
        rooftop: false,
        swimmingPool: false,
        techLounge: false,
        washingMachine: false,
        wasteShredder: false,
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
            borderRadius: '4px',
            backgroundColor: 'white',
        },
        checkBox: {
            marginRight: '10px', // Space between checkbox and label text
            marginTop: '5px',
            cursor: 'pointer',
            width: 'auto'
        },
        label: {
            display: 'flex',
            alignItems: 'normal',
            margin: '10px 0',
            width: '100%',
        },
        labelText: {
            flexGrow: 1, // Allows the label text to take up remaining space
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
        },
        calendarInput: {
            width: '100%',
            padding: '10px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            backgroundColor: 'white',
            color: '#333'
        }
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                {/* Inputs for rent range */}
                <div style={styles.inputGroup}>
                    <label>Min Rent:</label>
                    <input type="number" name="minRent" value={inputs.minRent} onChange={handleChange} required
                           style={styles.input}/>
                </div>
                <div style={styles.inputGroup}>
                    <label>Max Rent:</label>
                    <input type="number" name="maxRent" value={inputs.maxRent} onChange={handleChange} required
                           style={styles.input}/>
                </div>
                {/* Inputs for city and state */}
                <div style={styles.inputGroup}>
                    <label>City:</label>
                    <input type="text" name="city" value={inputs.city} onChange={handleChange} required style={styles.input}/>
                </div>
                <div style={styles.inputGroup}>
                    <label>State (Initials):</label>
                    <input type="text" name="state" value={inputs.state} onChange={handleChange} required style={styles.input}/>
                </div>
                {/* Input for move in date */}
                <div style={styles.inputGroup}>
                    <label>Earliest Move In Date:</label>
                    <input type="date" name="earliestAvailableDateForMoveIn" value={inputs.earliestAvailableDateForMoveIn}
                           onChange={handleChange} required style={styles.input}/>
                </div>
                <div style={styles.inputGroup}>
                    <label>Latest Move In Date:</label>
                    <input type="date" name="latestAvailableDateForMoveIn" value={inputs.latestAvailableDateForMoveIn}
                           onChange={handleChange} required style={styles.input}/>
                </div>
                {/* Checkbox inputs for amenities */}
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="catCafe" checked={inputs.catCafe}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Cat Cafe</span>
                </div>
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="centralAC" checked={inputs.centralAC}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Central AC</span>
                </div>
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="coffeeMachine" checked={inputs.coffeeMachine}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Coffee Machine</span>
                </div>
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="deliveryRoom" checked={inputs.deliveryRoom}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Delivery Room</span>
                </div>
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="dishwasher" checked={inputs.dishwasher}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Dishwasher</span>
                </div>
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="dryer" checked={inputs.dryer}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Dryer</span>
                </div>
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="gameRoom" checked={inputs.gameRoom}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Game Room</span>
                </div>
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="garden" checked={inputs.garden}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Garden</span>
                </div>
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="gasStove" checked={inputs.gasStove}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Gas Stove</span>
                </div>
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="gym" checked={inputs.gym}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Gym</span>
                </div>
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="inductionCooker"
                           checked={inputs.inductionCooker}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Induction Cooker</span>
                </div>
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="parking" checked={inputs.parking}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Parking</span>
                </div>
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="publicWashingMachine"
                           checked={inputs.publicWashingMachine}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Public Washing Machine</span>
                </div>
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="rooftop" checked={inputs.rooftop}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Rooftop</span>
                </div>
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="swimmingPool" checked={inputs.swimmingPool}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Swimming Pool</span>
                </div>
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="techLounge" checked={inputs.techLounge}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Tech Lounge</span>
                </div>
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="washingMachine" checked={inputs.washingMachine}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Washing Machine</span>
                </div>
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="wasteShredder" checked={inputs.wasteShredder}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Waste Shredder</span>
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

