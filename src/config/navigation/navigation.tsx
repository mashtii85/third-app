/**
 * Navigation
 */

// UI
import { Navbar } from '@drykiss/industry-ui'
import { Default } from './data/default'
import { Config } from '../config'

export const Navigation = () => {
  const links = Default

  return <Navbar brand={Config.Brand.logo} widgets={links} />
}
