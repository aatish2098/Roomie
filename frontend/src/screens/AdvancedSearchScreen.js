import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function AdvancedSearchScreen() {
    const navigate = useNavigate();

    const today = new Date().toISOString().split('T')[0];

    const [inputs, setInputs] = useState({
        minRent: '',
        maxRent: '',
        city: '',
        state: '',
        AvailableDateForMoveIn: today,
        CatCafe: false,
        CentralAC: false,
        CoffeeMachine: false,
        DeliveryRoom: false,
        DishWasher: false,
        Dryer: false,
        GameRoom: false,
        Garden: false,
        GasStove: false,
        Gym: false,
        InductionCooker: false,
        Parking: false,
        PublicWashingMachine: false,
        RoofTop: false,
        SwimmingPool: false,
        TechLounge: false,
        WashingMachine: false,
        WasteShredder: false

    });
    const [units, setUnits] = useState([]);

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
            const response = await axios.post('http://127.0.0.1:8000/advanced-search/', {
                minRent: inputs.minRent,
                maxRent: inputs.maxRent,
                city: inputs.city,
                state: inputs.state,
                AvailableDateForMoveIn: inputs.AvailableDateForMoveIn,
                CatCafe: inputs.CatCafe,
                CentralAC: inputs.CentralAC,
                CoffeeMachine: inputs.CoffeeMachine,
                DeliveryRoom: inputs.DeliveryRoom,
                Dishwasher: inputs.Dishwasher,
                Dryer: inputs.Dryer,
                GameRoom: inputs.GameRoom,
                Garden: inputs.Garden,
                GasStove: inputs.GasStove,
                Gym: inputs.Gym,
                InductionCooker: inputs.InductionCooker,
                Parking: inputs.Parking,
                PublicWashingMachine: inputs.PublicWashingMachine,
                RoofTop: inputs.RoofTop,
                "Swimming Pool": inputs.SwimmingPool,
                TechLounge: inputs.TechLounge,
                WashingMachine: inputs.WashingMachine,
                WasteShredder: inputs.WasteShredder,
            });
            if (response.data.length > 0) {
                setUnits(response.data);
            } else {
                setUnits([]);
            }
        } catch (error) {
            console.error('Error fetching apartment units:', error);
        }
    };

  const handleViewDetails = (unitId) => {
    // Placeholder for detail view functionality
    navigate(`/unit/${unitId}`);
    // You can replace this with navigation or setting state to show details
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
                    <input type="text" name="city" value={inputs.city} onChange={handleChange} required
                           style={styles.input}/>
                </div>
                <div style={styles.inputGroup}>
                    <label>State (Initials):</label>
                    <input type="text" name="state" value={inputs.state} onChange={handleChange} required
                           style={styles.input}/>
                </div>
                {/* Input for move in date */}
                <div style={styles.inputGroup}>
                    <label>Available Date For Move In:</label>
                    <input type="date" name="AvailableDateForMoveIn"
                           value={inputs.AvailableDateForMoveIn}
                           onChange={handleChange} required style={styles.input}/>
                </div>
                {/* Checkbox inputs for amenities */}
                <div style={styles.label}>
                    <label>Building Amenities:</label>
                </div>
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="CatCafe" checked={inputs.CatCafe}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Cat Cafe</span>
                </div>
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="CoffeeMachine" checked={inputs.CoffeeMachine}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Coffee Machine</span>
                </div>
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="DeliveryRoom" checked={inputs.DeliveryRoom}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Delivery Room</span>
                </div>
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="GameRoom" checked={inputs.GameRoom}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Game Room</span>
                </div>
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="Garden" checked={inputs.Garden}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Garden</span>
                </div>
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="Gym" checked={inputs.Gym}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Gym</span>
                </div>
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="Parking" checked={inputs.Parking}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Parking</span>
                </div>
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="PublicWashingMachine"
                           checked={inputs.PublicWashingMachine}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Public Washing Machine</span>
                </div>
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="RoofTop" checked={inputs.RoofTop}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Rooftop</span>
                </div>
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="SwimmingPool" checked={inputs.SwimmingPool}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Swimming Pool</span>
                </div>
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="TechLounge" checked={inputs.TechLounge}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Tech Lounge</span>
                </div>
                <div style={styles.label}>
                    <label>Unit Amenities:</label>
                </div>
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="CentralAC" checked={inputs.CentralAC}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Central AC</span>
                </div>
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="DishWasher" checked={inputs.DishWasher}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Dishwasher</span>
                </div>
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="Dryer" checked={inputs.Dryer}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Dryer</span>
                </div>
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="GasStove" checked={inputs.GasStove}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Gas Stove</span>
                </div>
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="InductionCooker"
                           checked={inputs.InductionCooker}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Induction Cooker</span>
                </div>
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="WashingMachine" checked={inputs.WashingMachine}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Washing Machine</span>
                </div>
                <div style={styles.label}>
                    <input type="checkbox" style={styles.checkBox} name="WasteShredder" checked={inputs.WasteShredder}
                           onChange={handleChange}/>
                    <span style={styles.labelText}>Waste Shredder</span>
                </div>
                <button type="submit" style={styles.button}
                        onMouseOver={e => e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor}
                        onMouseOut={e => e.currentTarget.style.backgroundColor = styles.button.backgroundColor}>Submit
                </button>
            </form>
            {units.length > 0 && (
                <ul style={styles.results}>
                    {units.map(unit => (
                        <li key={unit.UnitRentID} style={styles.unit}>
                            <div>Unit Number: {unit.unitNumber}</div>
                            <div>Monthly Rent: ${unit.MonthlyRent}</div>
                            <div>Square Footage: {unit.SquareFootage} sqft</div>
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

export default AdvancedSearchScreen;

