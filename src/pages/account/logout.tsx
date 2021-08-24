/**
 * Account - Logout
 */

// React
import { useContext, useEffect } from 'react'

// Next
import type { NextPage } from 'next'
import Router from 'next/router'

// UI
import { UserContext } from '@drykiss/industry-ui'

const PageLogout: NextPage = () => {
  const { signOut } = useContext(UserContext)

  useEffect(() => {
    const logout = async () => {
      await signOut()

      Router.push('/account/sign-in')
    }
    logout()
  }, [])

  return null
}

export default PageLogout
