import React from 'react';
import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../../context/auth.context';
import { login } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import './LoginView.css';

function LoginView() {

  const { setAuthToken } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      // Llamamos a la función login del servicio
      const data = await login({ email, password });

      if (data && data.authToken) {
        setAuthToken(data.authToken);

        // Decodificamos el token para obtener el payload, que tiene la propiedad "role"
        const decoded = jwtDecode(data.authToken);

        if(decoded.role === "admin") {
          console.log("Bienvenido, admin");
          navigate("/admin");
        } else {
          console.log("Bienvenido, usuario");
          navigate("/profile");
        }
      } else {
        console.error("Login failed", data);
      }
    } catch (error) {
      console.error(error)
    }    

  }

  return (
    <div className='login-layer'>
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
    </div>
  )
}

export default LoginView