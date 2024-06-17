import React, { Children } from 'react'
import Navbar from './pages/Navigation Bar/Navbar'

function Layout(props) {
  return (
    <main>
        <Navbar />
        {props.children}
    </main>
  )
}

export default Layout