import React, { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setSubmitStatus('idle');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-form-container">
      <h2 className="contact-title">Get In Touch</h2>
      <p className="contact-subtitle">
        Ready to start your next project? Let's discuss how I can help bring your vision to life.
      </p>
      
      {submitStatus === 'success' && (
        <div className="success-message">
          <i className="fas fa-check-circle"></i>
          <div>
            <p>Thank you! Your message has been sent successfully.</p>
            <p>I'll get back to you soon.</p>
          </div>
          <button onClick={resetForm} className="reset-button">
            Send Another Message
          </button>
        </div>
      )}
      
      {submitStatus === 'error' && (
        <div className="error-message">
          <i className="fas fa-exclamation-circle"></i>
          <div>
            <p>Sorry, there was an error sending your message.</p>
            <p>You can email me directly at: <a href="mailto:rickthewebdev@gmail.com" className="email-link">rickthewebdev@gmail.com</a></p>
          </div>
          <button onClick={resetForm} className="reset-button">
            Try Again
          </button>
        </div>
      )}

      {submitStatus === 'idle' && (
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="form-input"
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
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject *</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="form-input"
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
              rows={5}
              className="form-textarea"
            />
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="submit-button"
          >
            {isSubmitting ? (
              <>
                <i className="fas fa-spinner fa-spin"></i>
                Sending...
              </>
            ) : (
              <>
                <i className="fas fa-paper-plane"></i>
                Send Message
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm; 