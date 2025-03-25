import React from 'react';
import { useState } from 'react';
import { useAuth } from '../../context/auth.context';
import { login } from '../../services/auth';
import { Link, useNavigate } from 'react-router-dom';
import './LoginView.css';

function LoginView() {

  const { setAuthToken, /*user,*/ isLoading, startLoading, stopLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Redirigir después de login según qué tipo de usuario es
  // useEffect(() => {
  //   if (user) {
  //     navigate(user.role === "admin" ? "/admin" : "/profile");
  //   }
  // }, [user, navigate]);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      startLoading();
      // Llamamos a la función login del servicio
      const data = await login({ email, password });

      if (data && data.authToken) {
        setAuthToken(data.authToken);
        navigate("/profile");
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
          <ClipLoader color="#da667b" size={100}/>
        </div>
      ) : (
       <>
        <div className="login-item">
          <form onSubmit={handleSubmit} className="login-form">
            <h2 className='login__h2'>Login</h2>
            <label htmlFor="email">
              Email
            </label>
              <input id="email" type="email" required onChange={(e) => setEmail(e.target.value)}/>
            <label htmlFor="pass">
              Password
            </label>
              <input id="pass" type="password" required onChange={(e) => setPassword(e.target.value)}/>
            <input id="submit-button" className='login-button' type="submit" value="Send" />
            <Link className='signup-link' to="/signup">Don't have a account? Sign up</Link>
          </form>
        </div>
       </> 
      )}
    </div>
  )
}

export default LoginView