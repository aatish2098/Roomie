import React, { useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

const Form = styled.form`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Result = styled.div`
  margin-top: 1rem;
  color: #333;
  font-size: 1.1rem;
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
    try {
      const response = await fetch('http://127.0.0.1:8000/budgeting/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          zipcode: formData.zipcode,
          numBathrooms: formData.numBathrooms,
          numBedrooms: formData.numRooms,
        })
      });
      const data = await response.json();
      if (data.status === 'success') {
        setResult(`Here's your average monthly rent for zipcode ${data.data.zipcode} with ${data.data.numBathrooms} bathrooms and ${data.data.numBedrooms} bedrooms: ${data.data.averageRent}`);
        setError('');
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
          <Input type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} />
        </Label>
        <Label>
          Number of Rooms:
          <Input type="number" name="numRooms" value={formData.numRooms} onChange={handleChange} />
        </Label>
        <Label>
          Number of Bathrooms:
          <Input type="number" name="numBathrooms" value={formData.numBathrooms} onChange={handleChange} />
        </Label>
        <Button type="submit">Submit</Button>
        {result && <Result>{result}</Result>}
        {error && <Result style={{ color: 'red' }}>{error}</Result>}
      </Form>
    </Container>
  );
}

export default Budgeting;
