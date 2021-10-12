const path = {
  home: '/',
  account: {
    signIn: '/account/sign-in',
    logout: '/account/logout'
  },
  dashboard: {
    root: '/dashboard',
    categories: {
      view: '/dashboard/categories'
    },
    account: {
      clients: '/dashboard/account/clients',
      settings: '/dashboard/account/settings',
      users: '/dashboard/account/users',
      view: '/dashboard/account'
    },
    accounts: {
      list: '/dashboard/accounts',
      create: '/dashboard/accounts/create',
      view: '/dashboard/accounts/view'
    },
    coursesAccount: {
      started: '/dashboard/courses?show=started',
      completed: '/dashboard/courses?show=completed',
      all: '/dashboard/courses?show=all',
      view_by_id: '/dashboard/courses/view?id='
    },
    coursesClient: {
      root: '/dashboard/courses',
      manage: '/dashboard/courses/manage',
      view_by_id: '/dashboard/courses/view'
    },
    enrollments: {
      root: '/dashboard/enrollments'
    },
    locations: {
      list: '/dashboard/locations'
    },
    events: {
      list: '/dashboard/events'
    },
    playground: '/dashboard/playground',
    profile: '/dashboard/profile'
  }
}

export default path
