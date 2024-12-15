export const validateForm = (data) => {
  const errors = {};

  if (!data.name) {
    errors.name = 'Name is required';
  } else if (data.name.length < 2 || data.name.length > 60) {
    errors.name = 'Name must be between 2 and 60 characters';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  const phoneRegex = /^\+380\d{9}$/;
  if (!data.phone) {
    errors.phone = 'Phone is required';
  } else if (!phoneRegex.test(data.phone)) {
    errors.phone = 'Phone must start with +380 and have 9 digits';
  }

  if (!data.position) {
    errors.position = 'Please select a position';
  }

  if (!data.photo) {
    errors.photo = 'Please upload a photo';
  } else if (data.photo && data.photo.size > 5 * 1024 * 1024) {
    errors.photo = 'Photo size must not exceed 5MB';
  }

  return errors;
};