import React from 'react'
import { Link, useLocation } from 'react-router-dom'
function Navbar() {
 
      let location  =useLocation();
      return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <Link className="navbar-brand" to="/">iNotebook</Link>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
     
     
    </ul>
    <form className="form-inline my-2 my-lg-0">
      
   
    </form>
  </div>
</nav>
  )
}

export default Navbar
