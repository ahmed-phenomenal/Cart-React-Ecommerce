import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Sign-in/Navbar'

export default function () {
  return (
    <div>
        <Outlet/>
    </div>
  )
}
