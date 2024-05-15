import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Components/HomePage'

const AllRoute = () => {
  return (
    <BrowserRouter>
    <Routes>
        <Route>

            <Route path='/' element={<Home/>} />
        </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default AllRoute 