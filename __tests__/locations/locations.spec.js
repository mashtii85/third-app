import { act, renderHook } from '@testing-library/react-hooks'
import {
  useCreateLocation,
  useDeleteLocation,
  useLocations,
  useUpdateLocation
} from '../../src/components/locations/hooks'
import { MockedProvider } from '@apollo/react-testing'
import {
  createLocationVariables,
  deleteLocationVariable,
  location,
  locations,
  onCompleted,
  updateLocationVariables
} from '../../__mocks__/locations/locations'
import { prepareMocks } from '../../__helpers__/locations/locations'
import { InMemoryCache } from '@apollo/client'
import { onError } from '../../__helpers__/helpers'

describe('Locations Hooks', () => {
  const mocks = prepareMocks
  const cache = new InMemoryCache().restore({
    locations
  })
  const wrapper = ({ children }) => {
    return (
      <MockedProvider cache={cache} mocks={mocks} addTypename={true}>
        {children}
      </MockedProvider>
    )
  }
  describe('happy path', () => {
    it('should get Locations', async () => {
      // use renderHook to render hook only and test result
      const { result, waitForNextUpdate } = renderHook(
        () =>
          useLocations({
            filters: {
              accountId: 2,
              limit: 20,
              offset: 0,
              orderBy: { created_at: 'desc' }
            }
          }),
        { wrapper }
      )

      expect(result.current.loading).toBe(true)

      // for async result
      await waitForNextUpdate()
      expect(result.current.loading).toBe(false)
      expect(result.current.locationList).toEqual(locations)
      expect(result.current.locationList.length).toEqual(locations.length)
    })
  })

  it('should update Location', async () => {
    // use renderHook to render hook only and test result
    const { result, waitForNextUpdate } = renderHook(
      () =>
        useUpdateLocation({
          onCompleted: onCompleted,
          onError: onError
        }),
      { wrapper }
    )

    const { updateLocation } = result.current
    act(() => {
      updateLocation({
        variables: updateLocationVariables
      })
    })

    expect(result.current.loading).toBe(true)
    // for async result
    await waitForNextUpdate()
    expect(result.current.loading).toBe(false)
    expect(result.current?.data?.location).toEqual(expect.objectContaining(location))
  })

  it('should delete a Location', async () => {
    // use renderHook to render hook only and test result
    const { result, waitForNextUpdate } = renderHook(
      () =>
        useDeleteLocation({
          onCompleted: onCompleted,
          onError: onError
        }),
      { wrapper }
    )

    const { deleteLocation } = result.current
    act(() => {
      deleteLocation({
        variables: deleteLocationVariable
      })
    })

    expect(result.current.loading).toBe(true)
    // for async result
    await waitForNextUpdate()
    expect(result.current.loading).toBe(false)

    expect(result.current?.data?.location).toEqual(expect.objectContaining(location))
  })
  it('should create a Location', async () => {
    // use renderHook to render hook only and test result
    const { result, waitForNextUpdate } = renderHook(
      () =>
        useCreateLocation({
          onCompleted: onCompleted,
          onError: onError
        }),
      { wrapper }
    )

    const { createLocation } = result.current
    act(() => {
      createLocation({
        variables: createLocationVariables
      })
    })

    expect(result.current.loading).toBe(true)
    // for async result
    await waitForNextUpdate()
    expect(result.current.loading).toBe(false)
    expect(result.current?.data?.location).toEqual(expect.objectContaining(location))
  })
})
