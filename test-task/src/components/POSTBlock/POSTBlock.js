import React, { useState, useEffect, useCallback } from 'react';
import './POSTBlock.scss';
import { FormInput } from './FormInput';
import { FileUpload } from './FileUpload';
import { RadioGroup } from './RadioGroup';
import { Button } from './Button';
import { validateForm } from '../../utils/validation';

export function POSTBlock() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    photo: null,
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [positions, setPositions] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/token');
        const data = await response.json();
        if (data.success) {
          setToken(data.token);
        } else {
          console.error('Failed to fetch token:', data.message);
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };

    const fetchPositions = async () => {
      try {
        const response = await fetch('https://frontend-test-assignment-api.abz.agency/api/v1/positions');
        const data = await response.json();
        if (data.success) {
          setPositions(data.positions);
        } else {
          console.error('Failed to fetch positions:', data.message);
        }
      } catch (error) {
        console.error('Error fetching positions:', error);
      }
    };

    fetchToken();
    fetchPositions();
  }, []);

  const handleInputChange = useCallback((e) => {
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }));

    const newErrors = validateForm({
      ...formData,
      [name]: newValue
    });
    setErrors(newErrors);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', formData.phone);
      formDataToSend.append('position_id', positions.find((pos) => pos.name === formData.position)?.id || '');
      formDataToSend.append('photo', formData.photo);

      try {
        const response = await fetch(
          'https://frontend-test-assignment-api.abz.agency/api/v1/users',
          {
            method: 'POST',
            headers: {
              Token: token,
            },
            body: formDataToSend,
          }
        );
        const data = await response.json();
        if (data.success) {
          alert('User registered successfully!');
          setFormData({
            name: '',
            email: '',
            phone: '',
            position: '',
            photo: null,
          });
          setErrors({});
        } else {
          alert(data.message || 'Registration failed.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="POSTBlock">
      <div className="POSTBlock_container">
      <form onSubmit={handleSubmit} className="max-w-[380px] mx-auto">
        <h1 className="text-4xl font-normal text-center mb-12 w-full">Working with POST request</h1>

        <FormInput
          name="name"
          label="Your name"
          value={formData.name}
          onChange={handleInputChange}
          error={errors.name}
        />

        <FormInput
          name="email"
          type="email"
          label="Email"
          value={formData.email}
          onChange={handleInputChange}
          error={errors.email}
        />

        <FormInput
          name="phone"
          type="tel"
          label="Phone"
          value={formData.phone}
          onChange={handleInputChange}
          error={errors.phone}
          helperText="+38 (XXX) XXX - XX - XX"
        />

        <RadioGroup
          label="Select your position"
          name="position"
          options={positions}
          value={formData.position}
          onChange={handleInputChange}
          error={errors.position}
        />

        <FileUpload
          name="photo"
          onChange={handleInputChange}
          value={formData.photo}
          error={errors.photo}
        />

        <Button
          type="submit"
          disabled={Object.keys(errors).length > 0 || isSubmitting}
        >
          {isSubmitting ? 'Signing up...' : 'Sign up'}
        </Button>
      </form>
      </div>
    </div>
  );
}
