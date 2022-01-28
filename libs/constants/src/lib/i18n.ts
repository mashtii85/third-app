interface Options {
  label: string
  value: string | number
}

export enum LOCALE_NS {
  Home = 'home',
  Common = 'common',
  Navbar = 'navbar',
  Login = 'login',
  Profile = 'profile'
}

export const localesOptions: Options[] = [
  {
    label: 'English',
    value: 'en'
  },

  {
    label: 'Arabic',
    value: 'ar'
  },
  {
    label: 'Spanish',
    value: 'es'
  }
]
