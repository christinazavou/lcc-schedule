import { useState } from 'react';
import './contact.css';
import useFormValidation from 'customhooks/useFormValidation';
import apiService from 'services/ContactService';
import { useAlert } from 'customhooks/useAlert';

export default function ContactPage() {
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formMessage, setFormMessage] = useState('');
  const [_, setIsSending] = useState(false);

  // Use the useAlert hook at the top level
  const { showAlert, AlertComponent } = useAlert();

  const isSubmitEnabled = useFormValidation({
    name: formName,
    email: formEmail,
    message: formMessage,
  });

  const handleSubmit = async () => {
    setIsSending(true);
    try {
      await apiService.sendEmail(formName, formEmail, formMessage);
      showAlert('Email sent successfully!', 'success');
      setFormName('');
      setFormEmail('');
      setFormMessage('');
    } catch (error) {
      showAlert('Failed to send email. Please try again later.', 'error');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="contact-container">
      {AlertComponent}

      <div className="contact-form">
        <div className="input-container">
          <label>Full Name</label>
          <textarea
            placeholder="Enter Full Name"
            value={formName}
            onChange={(e) => {
              if (e.target.value.length <= 60) {
                setFormName(e.target.value);
              }
            }}
          ></textarea>

          <label>Email</label>
          <textarea
            placeholder="Enter email"
            value={formEmail}
            onChange={(e) => {
              if (e.target.value.length <= 60) {
                setFormEmail(e.target.value);
              }
            }}
          ></textarea>

          <label>Message</label>
          <textarea
            placeholder="Type your message"
            value={formMessage}
            onChange={(e) => {
              if (e.target.value.length <= 60) {
                setFormMessage(e.target.value);
              }
            }}
          ></textarea>
        </div>
        <div
          className={`button-container ${isSubmitEnabled ? 'enabled' : 'disabled'}`}
        >
          <button onClick={handleSubmit} disabled={!isSubmitEnabled}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
