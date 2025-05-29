import { useState } from 'react';
import LoginForm from 'components/loginForm/LoginForm';
import { useAuth } from 'contexts/AuthContext';
import './LoginToggleButton.css';

export default function LoginToggleButton() {
  const { isLoggedIn, logout } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const handleLoginClick = () => setShowModal(true);
  const handleLogoutClick = () => logout();

  return (
    <>
      <button onClick={isLoggedIn ? handleLogoutClick : handleLoginClick}>
        {isLoggedIn ? 'Logout' : 'Login'}
      </button>

      {showModal && !isLoggedIn && (
        <div className="toggle-modal-container">
          <div className="toggle-modal-content">
            <button
              onClick={() => setShowModal(false)}
              className="tw-absolute tw-top-2 tw-right-2 tw-text-gray-500 hover:tw-text-black tw-text-xl"
            >
              ×
            </button>
            <LoginForm onSuccess={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </>
  );
}
