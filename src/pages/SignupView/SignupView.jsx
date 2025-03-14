import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signup } from '../../services/auth';
import { useAuth,  } from '../../context/auth.context';
import './SignupView.css';

function SignupView() {

  const { setAuthToken, user, isLoading, startLoading, stopLoading } = useAuth();
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
      startLoading();
      // Llamamos a la función signup del servicio
      const data = await signup({ email, password, username });

      if (data && data.authToken) {
        setAuthToken(data.authToken);
      } else {
        console.error("Signup failed", data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      stopLoading();
    }
  }

  return (
    <div className='signup-layer'>
      { isLoading ? (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
          <ClipLoader color="#da667b" size={100}/>
        </div>
      ) : (
        <>
          <div className="signup-item">
            <form onSubmit={handleSubmit} className="signup-form">
              <h2 className='signup__h2'>Sign up</h2>
              <label htmlFor="username">
              </label>
                <input id="username" type="text" placeholder='Your name' required onChange={(e) => setUsername(e.target.value)}/>
              <label htmlFor="email">
              </label>
                <input id="email" type="email" placeholder='Your email' required onChange={(e) => setEmail(e.target.value)}/>
              <label htmlFor="pass">
              </label>
                <input id="pass" type="password" placeholder='Your password' required onChange={(e) => setPassword(e.target.value)}/>
              <input id="submit-button" className='signup-button' type="submit" value="Send" />
              <Link className='signup-link' to="/login">Already have an account? Sign in</Link>
              <Link className='signup-link' to="/">Back</Link>
            </form>
          </div>
        </>
      )}
    </div>
  )
}

export default SignupView