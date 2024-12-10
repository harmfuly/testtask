import React from 'react';
import './POSTBlock.scss';

const POSTBlock = () => {
  return (
      <div className="POSTBlock">
        <div className="POSTBlock_container">
            <h1 className="POSTBlock_title">Working with POST request</h1>
            <form className="POSTBlock_form">
          <input
            type="text"
            name="name"
            placeholder="Your name"
            className="POSTBlock_input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="POSTBlock_input"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            className="POSTBlock_input"
          />
          <small className="POSTBlock_input-example">
            +38 (XXX) XXX - XX - XX
          </small>
          <p className="POSTBlock_label">Select your position</p>
          <div className="POSTBlock_radio-group">
            <label className="POSTBlock_radio">
              <input type="radio" name="position" value="frontend" />
              Frontend developer
            </label>
            <label className="POSTBlock_radio">
              <input type="radio" name="position" value="backend" />
              Backend developer
            </label>
            <label className="POSTBlock_radio">
              <input type="radio" name="position" value="designer" />
              Designer
            </label>
            <label className="POSTBlock_radio">
              <input type="radio" name="position" value="qa" />
              QA
            </label>
          </div>
          <div className="POSTBlock_upload">
            <button className="POSTBlock_upload-btn">Upload</button>
            <span className="POSTBlock_upload-text">Upload your photo</span>
          </div>
          <button type="submit" className="POSTBlock_submit-btn" disabled>
            Sign up
          </button>
        </form>
        </div>
      </div>
      );
    };

export default POSTBlock;