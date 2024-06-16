import { useState } from 'react';
import LogIn from './components/Site Authentication/Log In/LogIn';

function Landing() {

  return (
    <div className="p-2">
      <h1 className="text-center parent-font">⭐ Welcome to Asteria Academy! ⭐</h1>
      <LogIn/>
    </div>
  );
}

export default Landing;
