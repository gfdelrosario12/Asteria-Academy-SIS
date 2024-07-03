import React from 'react';
import Navbar from './pages/Navigation Bar/Navbar';

function Layout(props) {
  return (
    <main>
      <Navbar />
      <div className="content"> {/* Adjust this wrapper as needed */}
        {props.children}
      </div>
    </main>
  );
}

export default Layout;
