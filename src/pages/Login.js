import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Fake login API call function
const fakeLoginApiCall = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: { token: 'fake-jwt-token' } });
      // Uncomment to simulate a login failure
      // reject("Login failed");
    }, 1000); // Simulate network delay
  });
};

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const useFakeApi = false; // Set this to true to use the fake API call

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      let response;
      if (useFakeApi) {
        response = await fakeLoginApiCall();
      } else {
        response = await axios.post('https://localhost:7169/api/auth/login', {
          username,
          password,
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });
      }

      const token = response.data.token;
      localStorage.setItem('token', token);
      alert("login done!!!!!!!");
      navigate('/projects');
    } catch (err) {
      setError('Invalid username or password');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
