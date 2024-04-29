import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
`;

const Form = styled.form`
  background: white;
  padding: 2.5rem;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.12);
  width: 90%;
  max-width: 500px;
  box-sizing: border-box;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 1rem;
  color: #333;
  font-size: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 2rem;
  border: 2px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 1.2rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  &:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }
  &:active {
    transform: translateY(1px);
  }
`;

const Result = styled.div`
  margin-top: 2rem;
  color: #28527a;
  font-size: 1.2rem;
  padding: 1rem;
  border-radius: 8px;
  background-color: #e7f5ff;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  border-left: 5px solid #007bff;
`;

function Budgeting() {
  const [formData, setFormData] = useState({
    zipcode: '',
    numRooms: '',
    numBathrooms: ''
  });
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

const handleSubmit = async (e) => {
  e.preventDefault();
console.log("Checking for CSRF token...");
const csrfToken = Cookies.get('csrftoken');
console.log(document.cookie);


  try {
    const response = await fetch('http://127.0.0.1:8000/budgeting/', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken
      },
      body: JSON.stringify({
        zipcode: formData.zipcode,
        numBathrooms: formData.numBathrooms,
        numBedrooms: formData.numRooms,
      })
    });
    const data = await response.json();
    if (data.status === 'success') {
      const averageRent = Math.floor(+data.data.averageRent);
      if (averageRent === 0) {
        setResult(`The selected zipcode doesn't have units with ${formData.numBathrooms} bathroom(s) and ${formData.numRooms} bedroom(s). Try a different combination.`);
        setError('');
      } else {
        setResult(`Here's your average monthly rent for Zipcode ${data.data.zipcode} with ${data.data.numBathrooms} bathroom(s) and ${data.data.numBedrooms} bedroom(s): ${averageRent}`);
        setError('');
      }
    } else {
      setError(data.message || 'An error occurred');
      setResult('');
    }
  } catch (err) {
    setError('Failed to fetch data');
    setResult('');
  }
};

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Label>
          Zipcode:
          <Input type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} required />
        </Label>
        <Label>
          Number of Rooms:
          <Input type="number" name="numRooms" value={formData.numRooms} onChange={handleChange} required />
        </Label>
        <Label>
          Number of Bathrooms:
          <Input type="number" name="numBathrooms" value={formData.numBathrooms} onChange={handleChange} required />
        </Label>
        <Button type="submit">Submit</Button>
        {result && <Result>{result}</Result>}
        {error && <Result style={{ color: 'red', backgroundColor: '#ffdede', borderLeftColor: 'red' }}>{error}</Result>}
      </Form>
    </Container>
  );
}

export default Budgeting;
