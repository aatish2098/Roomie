import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

function SearchComponent({ params }) {
    const [unitRentID, setUnitRentID] = useParams();
    const [roommateCnt, setRoommateCnt] = useState('');
    const [moveInDate, setMoveInDate] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        const postData = {
            UnitRentID: unitRentID,
            roommateCnt: roommateCnt || undefined,
            moveInDate: moveInDate || undefined
        };

        try {
            const response = await axios.post('http://127.0.0.1:8000/searchInterest/', postData);
            setResults(response.data);
        } catch (error) {
            console.error('Error fetching data: ', error);
        }
    };

    return (
        <div>
            <h1>Interest Search for the Unit</h1>
            <div>
                <label>Roommate Count:</label>
                <input
                    type="number"
                    value={roommateCnt}
                    onChange={e => setRoommateCnt(e.target.value)}
                />
            </div>
            <div>
                <label>Move In Date:</label>
                <input
                    type="date"
                    value={moveInDate}
                    onChange={e => setMoveInDate(e.target.value)}
                />
            </div>
            <button onClick={handleSearch}>Search</button>

            <h2>Results</h2>
            <ul>
                {results.map(result => (
                    <li key={result.unitRentID}>
                        <strong>Unit ID:</strong> {result.unitRentID}<br />
                        <strong>Move In Date:</strong> {result.MoveInDate}<br />
                        <strong>Roommate Count:</strong> {result.RoommateCount}<br />
                        <strong>Phone:</strong> {result.PhoneNumber}<br />
                        <strong>Email:</strong> {result.email}<br />
                        <strong>Name:</strong> {result.Name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchComponent;
