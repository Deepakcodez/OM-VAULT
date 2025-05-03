import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {
  Clients,
  Dashboard,
  Home,
  Login,
  Profile,
  Purchase,
  Register,
  Sale,
  Transaction
} from '../screens'
import UserLayout from '../layout/UserLayout'
import Installments from '@renderer/screens/installments/Installments'

const Router: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<UserLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/installments" element={<Installments />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/transactions" element={<Transaction />} />
          <Route path="/purchase" element={<Purchase />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  )
}

export default Router
