export const onCompleted = console.log('completed')

export const locations = [
  {
    id: 4,
    name: 'North field11',
    status: 'active',
    created_at: '2021-10-27T20:22:24.1679+00:00',
    custom_fields: null,
    __typename: 'location',
    taxonomy: {
      id: 11,
      entity: null,
      entity_id: null,
      name: 'Training fields',
      type: 'locations',
      status: 'active',
      custom_fields: null,
      meta: null,
      __typename: 'taxonomy'
    }
  },
  {
    id: 5,
    name: 'Al Nahyan Stadium',
    status: 'active',
    created_at: '2021-10-27T20:23:25.435648+00:00',
    custom_fields: {
      capacity: '12000'
    },
    __typename: 'location',

    taxonomy: {
      id: 12,
      entity: null,
      entity_id: null,
      name: 'Stadiums',
      type: 'locations',
      status: 'active',
      custom_fields: null,
      meta: null,
      __typename: 'taxonomy'
    }
  }
]

export const location = {
  id: 4,
  name: 'North field11',
  status: 'inactive',
  created_at: '2021-10-27T20:22:24.1679+00:00',
  custom_fields: null,
  __typename: 'location',
  taxonomy: {
    id: 11,
    entity: null,
    entity_id: null,
    name: 'Training fields',
    type: 'locations',
    status: 'active',
    custom_fields: null,
    meta: null,
    __typename: 'taxonomy'
  }
}

export const createLocationVariables = {
  object: {
    name: 'North field11',
    status: 'inactive',
    created_at: '2021-10-27T20:22:24.1679+00:00',
    custom_fields: null,
    __typename: 'location',
    taxonomy_id: 11
  }
}

export const updateLocationVariables = {
  set: {
    name: 'North field11',
    status: 'inactive',
    taxonomy_id: 11
  },
  locationId: 4
}

export const deleteLocationVariable = {
  locationId: 4
}
