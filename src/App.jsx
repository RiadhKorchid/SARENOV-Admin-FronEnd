import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import AuthLayout from './Layouts/authLayout'
import PrivateLayout from './Layouts/privateLayout'
import LoginPage from './pages/auth/Login'
import { ContextProvider } from './contexts/authContext'
import Computers from './pages/Computers/Computers'
import Realisation from './pages/Realisation/Realisation'
import Service from './pages/Services/Services'
import Orders from './pages/orders/Orders'

function App() {

 
  return (
    <>
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Navigate replace to="/login" />} />
            <Route path='/' element={<AuthLayout />}>
              <Route path='/login' element={<LoginPage />} />
            </Route>
            <Route element={<PrivateLayout />}>
              <Route path='/realisations' element={<Realisation />} />
              <Route path='/services' element={<Service />} />
              <Route path='/orders' element={<Orders />} />
              <Route />
            </Route>
          </Routes>
        </BrowserRouter>

      </ContextProvider>

    </>
  )
}

export default App
