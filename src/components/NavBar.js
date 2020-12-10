import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {

  return (
    <div>
      <Link to={ "/login" }>Login</Link>
    </div>
  )
}

export default NavBar