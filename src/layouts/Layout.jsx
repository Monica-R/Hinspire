import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer';

function Layout() {
  const location = useLocation();
  const hiddenRoutes = ["/login", "/signup"];
  return (
    <>
      {!hiddenRoutes.includes(location.pathname) && <Header />}
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout