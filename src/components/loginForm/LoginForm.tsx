import { useState } from 'react';
import { useAlert } from 'customhooks/useAlert';
import { useAuth } from 'contexts/AuthContext';
import './LoginForm.css';

type LoginProps = {
  onSuccess: () => void;
};

export default function LoginForm({ onSuccess }: LoginProps) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { showAlert, AlertComponent } = useAlert();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      onSuccess();
    } catch (error) {
      showAlert('Failed to login. Please try again later.', 'error');
    } finally {
    }
  };

  return (
    <div className="login-form">
      {AlertComponent}
      <input
        placeholder="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Login</button>
    </div>
  );
}
