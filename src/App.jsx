import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/auth.provider'
import LoginView from './pages/LoginView/LoginView'
import SignupView from './pages/SignupView/SignupView'
import HomeView from './pages/HomeView/HomeView'

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomeView />}/>
            <Route path='/login' element={ <LoginView  /> }/>
            <Route path='/signup' element={ <SignupView /> }/>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
