/**
 * Components - Address - Form - Schema
 */

// Yup
import { object, string, number, mixed, SchemaOf } from 'yup'

// Types
import { AddressFormType, STATUS_ACTIVE } from '@availabletowork/types'

const r1 = `^([Gg][Ii][Rr] 0[Aa]{2})`
const r2 = '|((([A-Za-z][0-9]{1,2})'
const r3 = '|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])'
const r4 = '|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\\s?[0-9][A-Za-z]{2})$'

export const postcodeString = r1 + r2 + r3 + r4

export const addressSchema: SchemaOf<AddressFormType> = object()
  .shape({
    id: number(),
    name: string().required(),
    line1: string().required(),
    line2: string(),
    line3: string(),
    city: string().required(),
    postcode: string().matches(new RegExp(postcodeString)).required(),
    county: string(),
    status: mixed().oneOf(Object.values(STATUS_ACTIVE))
  })
  .required()
