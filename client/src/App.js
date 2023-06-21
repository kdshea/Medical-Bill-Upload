import './styles/main.scss'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Login from './components/Login'
import Register from './components/Register'
import UserProfile from './components/UserProfile'
import Landing from './components/Landing'
import BillIndex from './components/BillIndex'
import AddBill from './components/AddBill'
import Bill from './components/Bill'
import EditBill from './components/EditBill'
import Legal from './components/Legal'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="footer-flex">
          <NavBar /> 
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/profile/:userId' element={<UserProfile />} />
            <Route path='/bills' element={<BillIndex />} />
            <Route path='/add-bill' element={<AddBill />} />
            <Route path='/bills/:billId' element={<Bill />} />
            <Route path='/edit-bill/:billId' element={<EditBill />} />
            <Route path='/privacy' element={<Legal />} />
            <Route path='/terms' element={<Legal />} />
            
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  )
}

export default App
