import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
  
}

const Nav: React.FC<Props> = () => (
  <div>
    <div>
      <Link to='/'>Home</Link>
    </div> 
    <div>
      <Link to='/login'>Login</Link>
    </div> 
    <div>
      <Link to='/register'>Register</Link>
    </div> 
    <div>
      <Link to='/details'>User Details</Link>
    </div> 
  </div>
)

export default Nav
