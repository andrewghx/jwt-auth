import React, { useState, FormEvent } from 'react'
import Nav from '../components/nav'
import { useRegisterMutation } from '../generated/graphql'
import { RouteComponentProps } from 'react-router-dom'

const Register: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [register] = useRegisterMutation()
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await register({
      variables: {
        email,
        password
      }
    })
    history.push('/')
  }
  
  return (
    <div>
      <Nav />
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <input placeholder='Email' name='email' onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <input placeholder='Password' name='password' type='password' onChange={e => setPassword(e.target.value)} />
        </div>
        <button type='submit'>Register</button>
      </form>
    </div>
  ) 
}

export default Register
