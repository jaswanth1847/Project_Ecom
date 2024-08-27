import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Ct from './Ct'

const Nav = () => {
  let obj=useContext(Ct)
  return (
    <div className='nav'>
        <Link to="/">Products</Link>
     <Link to="/login">Login</Link>
     <Link to="/reg">Register</Link> 
     <Link to="/addprod">Addprod</Link>
     <Link to="/cart">Cart <button>{obj.usercon.nofitems}</button></Link>
      <Link to="/logout">Logout</Link>
      <div>{obj.usercon.name}</div>
    </div>
  )
}

export default Nav
