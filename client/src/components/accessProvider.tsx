import React, { useState, PropsWithChildren, useEffect } from 'react'
import { setAccessToken } from '../accessToken'

interface Props {}

const AccessProvider: React.FC<PropsWithChildren<Props>> = ({ children }) => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:4000/renew_token', {
      method: 'POST',
      credentials: 'include'
    }).then(async res => {
      const data = await res.json()
      setLoading(false)
      setAccessToken(data.accessToken)
    }).catch(err => console.error(err))
  })

  if (loading) return <div>Loading...</div>

  return <>{children}</>
}

export default AccessProvider
