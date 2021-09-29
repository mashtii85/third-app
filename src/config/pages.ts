const path = {
  home: '/',
  account: {
    signIn: '/account/sign-in'
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
      view: '/dashboard/account/view'
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
    playground: '/dashboard/playground'
  }
}

export default path
