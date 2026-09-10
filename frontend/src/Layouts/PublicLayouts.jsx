import React from 'react'
import { Outlet } from 'react-router-dom'

const PublicLayouts = () => {
  return (
    <div>
        <Outlet/>
    </div>
  )
}

export default PublicLayouts