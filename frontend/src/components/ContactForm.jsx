import React, { useState } from 'react';
import { motion } from 'framer-motion';
import api from '../services/api';

const ContactForm = ({ isQuick = false, onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    message_type: 'general'
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let response;
      if (isQuick) {
        response = await api.contact.sendQuickContact(formData);
      } else {
        response = await api.contact.sendMessage(formData);
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        message_type: 'general'
      });

      if (onSuccess) {
        onSuccess(response);
      }

      // Hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);

    } catch (err) {
      const errorMessage = err.message || 'Failed to send message. Please try again.';
      setError(errorMessage);
      
      if (onError) {
        onError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        className="success-message"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="success-icon">✓</div>
        <h3>Message Sent Successfully!</h3>
        <p>Thank you for contacting us. We'll get back to you within 24 hours.</p>
      </motion.div>
    );
  }

  return (
    <motion.form
      className="contact-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
      </div>

      {!isQuick && (
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label htmlFor="message_type">Message Type</label>
            <select
              id="message_type"
              name="message_type"
              value={formData.message_type}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="general">General Inquiry</option>
              <option value="project">Project Request</option>
              <option value="support">Support</option>
              <option value="partnership">Partnership</option>
            </select>
          </div>
        </div>
      )}

      <div className="form-group">
        <label htmlFor="subject">Subject *</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
          disabled={loading}
        />
      </div>

      {error && (
        <motion.div
          className="error-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {error}
        </motion.div>
      )}

      <motion.button
        type="submit"
        className={`submit-btn ${loading ? 'loading' : ''}`}
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.05 }}
        whileTap={{ scale: loading ? 1 : 0.95 }}
      >
        {loading ? (
          <>
            <div className="spinner"></div>
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </motion.button>

      <style jsx>{`
        .contact-form {
          max-width: 600px;
          margin: 0 auto;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          color: #ffffff;
          font-size: 0.9rem;
          font-weight: 500;
          margin-bottom: 8px;
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          background: rgba(20, 20, 20, 0.8);
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 8px;
          padding: 12px 16px;
          color: #ffffff;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: rgba(0, 245, 255, 0.6);
          box-shadow: 0 0 20px rgba(0, 245, 255, 0.2);
        }

        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: #666;
        }

        .form-group input:disabled,
        .form-group select:disabled,
        .form-group textarea:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #00f5ff, #0066ff);
          border: none;
          border-radius: 8px;
          padding: 15px 20px;
          color: #ffffff;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .submit-btn:not(:disabled):hover {
          box-shadow: 0 0 30px rgba(0, 245, 255, 0.4);
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid #ffffff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .success-message {
          text-align: center;
          padding: 60px 40px;
          background: rgba(0, 245, 255, 0.1);
          border: 1px solid rgba(0, 245, 255, 0.3);
          border-radius: 20px;
          backdrop-filter: blur(10px);
        }

        .success-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #00f5ff, #0066ff);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
          font-weight: bold;
          color: #ffffff;
          margin: 0 auto 20px;
        }

        .success-message h3 {
          color: #00f5ff;
          font-size: 1.5rem;
          margin-bottom: 10px;
        }

        .success-message p {
          color: #b0b0b0;
          line-height: 1.6;
        }

        .error-message {
          background: rgba(255, 71, 87, 0.1);
          border: 1px solid rgba(255, 71, 87, 0.3);
          border-radius: 8px;
          padding: 12px 16px;
          color: #ff4757;
          font-size: 0.9rem;
          margin-bottom: 20px;
        }

        @media (max-width: 480px) {
          .contact-form {
            padding: 0 10px;
          }
          
          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
            margin-bottom: 15px;
          }
          
          .form-group {
            margin-bottom: 15px;
          }
          
          .form-group label {
            font-size: 0.85rem;
            margin-bottom: 6px;
          }
          
          .form-group input,
          .form-group select,
          .form-group textarea {
            padding: 10px 14px;
            font-size: 0.85rem;
          }
          
          .submit-btn {
            padding: 12px 16px;
            font-size: 0.9rem;
          }

          .success-message {
            padding: 30px 15px;
          }

          .success-icon {
            width: 50px;
            height: 50px;
            font-size: 1.3rem;
            margin-bottom: 15px;
          }
          
          .success-message h3 {
            font-size: 1.3rem;
            margin-bottom: 8px;
          }
          
          .success-message p {
            font-size: 0.9rem;
          }
        }
        
        @media (max-width: 360px) {
          .contact-form {
            padding: 0 5px;
          }
          
          .form-row {
            margin-bottom: 12px;
          }
          
          .form-group {
            margin-bottom: 12px;
          }
          
          .form-group label {
            font-size: 0.8rem;
            margin-bottom: 5px;
          }
          
          .form-group input,
          .form-group select,
          .form-group textarea {
            padding: 8px 12px;
            font-size: 0.8rem;
          }
          
          .submit-btn {
            padding: 10px 14px;
            font-size: 0.85rem;
          }

          .success-message {
            padding: 25px 12px;
          }

          .success-icon {
            width: 45px;
            height: 45px;
            font-size: 1.2rem;
            margin-bottom: 12px;
          }
          
          .success-message h3 {
            font-size: 1.2rem;
            margin-bottom: 6px;
          }
          
          .success-message p {
            font-size: 0.85rem;
          }
          
          .error-message {
            padding: 10px 12px;
            font-size: 0.8rem;
            margin-bottom: 15px;
          }
        }
      `}</style>
    </motion.form>
  );
};

export default ContactForm;