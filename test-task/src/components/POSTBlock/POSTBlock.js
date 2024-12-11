import React, { useEffect, useState} from 'react';
import './POSTBlock.scss';

const POSTBlock = () => {

  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitLoading, setSubmitLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    photo: null,
  });

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

  useEffect( () => {
    const fetchPositions = async () => {
      setLoading(true);

      try {
        const responce = await fetch ('https://frontend-test-assignment-api.abz.agency/api/v1/positions');
        const data = await responce.json();

        if(data.success) {
          setPositions(data.positions);
        }
      } catch (error) {
        console.error('Error fetching positions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
    fetchPositions();
  }, []);


  const validateForm = () => {
    const newErrors = {};
  
    if (!formData.name || formData.name.length < 2 || formData.name.length > 60) {
      newErrors.name = 'Name must be between 2 and 60 characters.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    const phoneRegex = /^\+380\d{9}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Phone number must start with +380 and have 9 digits.';
    }
    if (!formData.position) {
      newErrors.position = 'Please select a position.';
    }
    if (!formData.photo) {
      newErrors.photo = 'Please upload a photo.';
    } else if (formData.photo.size > 5 * 1024 * 1024) {
      newErrors.photo = 'Photo size must not exceed 5MB.';
    }
  
    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
  
    setFormData((prevFormData) => {
      const updatedData = {
        ...prevFormData,
        [name]: name === 'photo' ? files[0] : value,
      };
      validateForm(updatedData);
      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitLoading(true);

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
      setSubmitLoading(false);
    }
  };

  return (
    <div className="POSTBlock">
      <div className="POSTBlock_container">
        <h1 className="POSTBlock_title">Working with POST request</h1>
        <form className="POSTBlock_form" onSubmit={handleSubmit}>
        <div className="POSTBlock_field">
    <input
      type="text"
      name="name"
      placeholder="Your name"
      className="POSTBlock_input"
      value={formData.name}
      onChange={handleInputChange}
    />
    {errors.name && <small className="error">{errors.name}</small>}
  </div>

  <div className="POSTBlock_field">
    <input
      type="email"
      name="email"
      placeholder="Email"
      className="POSTBlock_input"
      value={formData.email}
      onChange={handleInputChange}
    />
    {errors.email && <small className="error">{errors.email}</small>}
  </div>

  <div className="POSTBlock_field">
    <input
      type="tel"
      name="phone"
      placeholder="Phone"
      className="POSTBlock_input"
      value={formData.phone}
      onChange={handleInputChange}
    />
    {errors.phone && <small className="error">{errors.phone}</small>}
    <small className="POSTBlock_input-example">+38 (XXX) XXX - XX - XX</small>
  </div>

          <p className="POSTBlock_label">Select your position</p>
          <div className="POSTBlock_radio-group">
            {loading ? (
              <p>Loading positions...</p>
            ) : (
              positions.map((position) => (
                <label key={position.id} className="POSTBlock_radio">
                  <input
                    type="radio"
                    name="position"
                    value={position.name}
                    onChange={handleInputChange}
                  />
                  {position.name}
                </label>
              ))
            )}
            {errors.position && <small className="error">{errors.position}</small>}
          </div>

          <div className="POSTBlock_upload">
            <label className="POSTBlock_upload-btn">
              Upload
              <input type="file" name="photo" onChange={handleInputChange} accept="image/jpeg" />
            </label>
            <span className="POSTBlock_upload-text">
              {formData.photo ? formData.photo.name : 'Upload your photo'}
            </span>
            {errors.photo && <small className="error">{errors.photo}</small>}
          </div>

          <button
            type="submit"
            className="POSTBlock_submit-btn"
            disabled={!isFormValid || submitLoading}
          >
            {submitLoading ? 'Submitting...' : 'Sign up'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default POSTBlock;