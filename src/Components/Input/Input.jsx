import React, { useState } from 'react';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'; // Import the icons
import './style.css';

function Input({ label, state = "", setState, placeholder, type }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className='input-wrapper'>
      <label htmlFor={label} className='label-input'>{label}</label>
      <div className='input-container'>
        <input
          type={type === 'password' && !isPasswordVisible ? 'password' : 'text'} // Toggle input type
          value={state}
          placeholder={placeholder}
          onChange={(e) => setState(e.target.value)}
          className='custom-input'
          style={{ padding: '0.5rem 0 3px' }}
          id={label}
        />
        {type === 'password' && ( // Show icon only for password type
          <span className='toggle-password' onClick={togglePasswordVisibility}>
            {isPasswordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />} {/* Toggle icon */}
          </span>
        )}
      </div>
    </div>
  );
}

export default Input;
