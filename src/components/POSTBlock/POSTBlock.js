import React, { useState, useEffect, useCallback } from 'react';
import './POSTBlock.scss';
import { FormInput } from './FormInput';
import { FileUpload } from './FileUpload';
import { RadioGroup } from './RadioGroup';
import { Button } from './Button';
import { validateForm } from '../../utils/validation';
import successImage from '../../assets/success-image.svg';

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
  const [isFormValid, setIsFormValid] = useState(false);
  const [touched, setTouched] = useState({});
  const [positions, setPositions] = useState([]);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [token, setToken] = useState('');

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

  const handleInputChange = useCallback((e) => {
    const { name, value, files } = e.target;
    const newValue = files ? files[0] : value;
  
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    setTouched({
      name: true,
      email: true,
      phone: true,
      position: true,
      photo: true,
    });
  
    const newErrors = validateForm(formData);
    setErrors(newErrors);
  
    if (Object.keys(newErrors).length === 0 && token) {
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
          setIsSuccess(true);
          setMessage('User registered successfully')
          setFormData({
            name: '',
            email: '',
            phone: '',
            position: '',
            photo: null,
          });
          setErrors({});
          setTouched({});
        } else {
          setMessage(data.message || 'Registration failed.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  useEffect(() => {
    fetchToken();
    fetchPositions();
  }, []);

  useEffect(() => {
    const validateFormOnChange = () => {
      const newErrors = validateForm(formData);
      setErrors(newErrors);
    };
  
    validateFormOnChange();
  }, [formData]);
  
  useEffect(() => {
    const hasErrors = Object.keys(errors).length > 0;
    const isFormComplete = 
      formData.name.trim() && 
      formData.email.trim() && 
      formData.phone.trim() && 
      formData.position && 
      formData.photo && 
      positions.length > 0 && 
      token;
  
    setIsFormValid(!hasErrors && isFormComplete);
  }, [errors, formData, positions, token]);


  return (
    <div className="POSTBlock">
  <div className="POSTBlock_container">
    {isSuccess ? (
      <div className="success-message">
        <p className="success-message_text">{message}</p>
        <img src={successImage} alt="Success" className="success-image" />
      </div>
    ) : (
      <>
        <h1 className="POSTBlock_title">
          Working with POST request
        </h1>
        <form onSubmit={handleSubmit} className="max-w-[380px] mx-auto">
          <FormInput
            name="name"
            label="Your name"
            value={formData.name}
            onChange={handleInputChange}
            error={touched.name && errors.name}
          />

          <FormInput
            name="email"
            type="email"
            label="Email"
            value={formData.email}
            onChange={handleInputChange}
            error={touched.email && errors.email}
          />

          <FormInput
            name="phone"
            type="tel"
            label="Phone"
            value={formData.phone}
            onChange={handleInputChange}
            error={touched.phone && errors.phone}
            helperText="+38 (XXX) XXX - XX - XX"
          />

          <RadioGroup
            label="Select your position"
            name="position"
            options={positions}
            value={formData.position}
            onChange={handleInputChange}
            error={touched.position && errors.position}
          />

          <FileUpload
            name="photo"
            onChange={handleInputChange}
            value={formData.photo}
            error={touched.photo && errors.photo}
          />

          <Button
            type="submit"
            disabled={Object.keys(errors).length > 0 || isSubmitting || !isFormValid}
          >
            {isSubmitting ? 'Signing up...' : 'Sign up'}
          </Button>
        </form>
      </>
    )}
  </div>
</div>
  );
}
