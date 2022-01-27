/**
 * Components - Taxonomies - CustomField - Types.d
 */
import { CustomFieldRender } from './render'

import { Options, TAXONOMY_TYPE } from '@availabletowork/types'

// Hooks
import { useTaxonomies } from '../hooks'

export const CustomFieldElement = ({
  taxonomyWatch,
  ...defaultOptions
}: {
  taxonomyWatch: Options
}) => {
  const { taxonomies } = useTaxonomies({
    type: TAXONOMY_TYPE.CustomFields,
    parentId: parseInt(taxonomyWatch.value.toString(), 10)
  })

  return (
    <>
      {(taxonomies || []).map((item) => (
        <CustomFieldRender
          {...defaultOptions}
          input={item?.custom_fields?.input}
          inputType={item?.custom_fields?.inputType}
          key={item?.id}
          label={item?.custom_fields?.label}
          name={`custom_fields.${item.name}`}
          options={item?.custom_fields?.options}
          withTime={item?.custom_fields?.withTime}
        />
      ))}
    </>
  )
}
