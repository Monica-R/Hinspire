import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../../services/auth';
import { useAuth } from '../../context/auth.context';
import './SignupView.css';

function SignupView() {

  const { setAuthToken, user } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Redirigir después de login según qué tipo de usuario es
  useEffect(() => {
    if (user) {
      navigate(user.role === "admin" ? "/admin" : "/profile");
    }
  }, [user, navigate]);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // Llamamos a la función signup del servicio
      const data = await signup({ email, password, username });

      if (data && data.authToken) {
        setAuthToken(data.authToken);
      } else {
        console.error("Signup failed", data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='signup-layer'>
      <div className="signup-item">
        <form onSubmit={handleSubmit} className="signup-form">
          <label htmlFor="username">
            <input id="username" type="text" placeholder='Your name' required onChange={(e) => setUsername(e.target.value)}/>
          </label>
          <label htmlFor="email">
            <input id="email" type="email" placeholder='Your email' required onChange={(e) => setEmail(e.target.value)}/>
          </label>
          <label htmlFor="pass">
            <input id="pass" type="password" placeholder='Your password' required onChange={(e) => setPassword(e.target.value)}/>
          </label>
          <input id="submit-button" type="submit" value="Send" />
        </form>
      </div>
    </div>
  )
}

export default SignupView