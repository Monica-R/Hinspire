import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/auth.provider'
import LoginView from './pages/LoginView/LoginView'
import SignupView from './pages/SignupView/SignupView'
import HomeView from './pages/HomeView/HomeView'
import ProfileView from './pages/ProfileView/ProfileView'
import Admin from './pages/Admin/Admin'
import NotFound from './pages/NotFound/NotFound'
import AllStoriesView from './pages/AllStoriesView/AllStoriesView'
import MyStoriesView from './pages/MyStoriesView/MyStoriesView'
import EditProfileView from './pages/EditProfileView/EditProfileView'
import Layout from './layouts/Layout'
import StoryDetailsView from './pages/StoryDetailsView/StoryDetailsView'

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={ <Layout /> }>
              <Route index element={ <HomeView /> } />
              <Route path='/login' element={ <LoginView  /> }/>
              <Route path='/signup' element={ <SignupView /> }/>
              <Route path='/profile' element={ <ProfileView /> } />
              <Route path='/admin' element={ <Admin /> } />
              <Route path='/stories' element={ <AllStoriesView /> } />
              <Route path='/stories/:id' element={ <StoryDetailsView /> } />
              <Route path='/stories/user' element={ <MyStoriesView /> } />
              <Route path='/edit-profile' element={ <EditProfileView /> } />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
