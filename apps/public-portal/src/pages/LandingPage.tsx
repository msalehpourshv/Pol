import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@pol/ui-react';

const LandingPage: React.FC = () => {
  return (
    <div style={{ padding: '24px' }}>
      <h1>Welcome to Pol</h1>
      <p>Explore our products and sales portal.</p>
      <Link to="/login">
        <Button>Login</Button>
      </Link>
    </div>
  );
};

export default LandingPage;
