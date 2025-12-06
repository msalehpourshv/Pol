import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@pol/ui-react';
import { login } from '@pol/auth-core';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    login('/app/base/customers');
    navigate('/app/base/customers');
  };
  return (
    <div style={{ padding: '24px' }}>
      <h2>Login</h2>
      <p>Use the mock login to continue.</p>
      <Button onClick={handleLogin}>Login</Button>
    </div>
  );
};

export default LoginPage;
