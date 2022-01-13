/**
 * Account - Logout
 */

// React
import { useEffect } from 'react'

// Next
import type { NextPage } from 'next'
import Router from 'next/router'

// Hooks
import { useCurrentUser } from '../../src/utils/useCurrentUser'

const PageLogout: NextPage = () => {
  const { signOut } = useCurrentUser()

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
