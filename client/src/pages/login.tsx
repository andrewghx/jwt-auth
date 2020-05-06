import React, { useState, FormEvent } from 'react'
import Nav from '../components/nav'
import { useLoginMutation, UserDetailsDocument, UserDetailsQuery } from '../generated/graphql'
import { RouteComponentProps } from 'react-router-dom'
import { setAccessToken } from '../accessToken'

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login] = useLoginMutation()
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const response = await login({
      variables: {
        email,
        password
      },
      update: (store, { data }) => {
        if (!data) return null
        store.writeQuery<UserDetailsQuery>({
          query: UserDetailsDocument,
          data: {
            userDetails: data.login.user
          }
        })
      }
    })
    
    if (response && response.data) setAccessToken(response.data.login.accessToken)
    history.push('/details')
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
        <button type='submit'>Login</button>
      </form>
    </div>
  ) 
}

export default Login
