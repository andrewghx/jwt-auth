import React from 'react'
import { useUserDetailsQuery, useLogoutMutation } from '../generated/graphql'
import Nav from '../components/nav'
import { setAccessToken } from '../accessToken'

interface Props {}

const UserDetails: React.FC<Props> = () => {
  const {data, loading, error} = useUserDetailsQuery()
  const [logout, { client }] = useLogoutMutation()

  if (error) return <h1>Not authorised</h1>
  if (loading || !data) return <h1>loading...</h1>
  return (
    <>
      <Nav />
      <h1>Your email: {data.userDetails.email}</h1>
      <h1>Your user ID: {data.userDetails.id}</h1>
      <button onClick={async () => {
        await logout()
        setAccessToken('')
        await client!.resetStore()
      }}>Logout</button>
    </>
  )
}

export default UserDetails
