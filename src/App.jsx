import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/auth.provider'
import LoginView from './pages/LoginView/LoginView'
import SignupView from './pages/SignupView/SignupView'
import HomeView from './pages/HomeView/HomeView'
import ProfileView from './pages/ProfileView/ProfileView'
import Admin from './pages/Admin/Admin'
import NotFound from './pages/NotFound/NotFound'

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<HomeView />}/>
            <Route path='/login' element={ <LoginView  /> }/>
            <Route path='/signup' element={ <SignupView /> }/>
            <Route path='/profile' element={ <ProfileView /> } />
            <Route path='/admin' element={ <Admin /> } />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
