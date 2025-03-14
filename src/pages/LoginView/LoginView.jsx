import React from 'react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/auth.context';
import { login } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import './LoginView.css';

function LoginView() {

  const { setAuthToken, user, isLoading, startLoading, stopLoading } = useAuth();
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
      // Llamamos a la función login del servicio
      const data = await login({ email, password });

      if (data && data.authToken) {
        setAuthToken(data.authToken);
      } else {
        console.error("Login failed", data);
      }
    } catch (error) {
      console.error(error)
    }  finally {
      stopLoading();
    }  

  }


  return (
    <div className='login-layer'>
      { isLoading ? (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
          <ClipLoader color="#36d7b7" size={100}/>
        </div>
      ) : (
       <>
        <div className="login-item">
          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="email">
              Email
              <input id="email" type="email" required onChange={(e) => setEmail(e.target.value)}/>
            </label>
            <label htmlFor="pass">
              Password
              <input id="pass" type="password" required onChange={(e) => setPassword(e.target.value)}/>
            </label>
            <input id="submit-button" type="submit" value="Send" />
          </form>
        </div>
       </> 
      )}
    </div>
  )
}

export default LoginView