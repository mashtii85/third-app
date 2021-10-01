/**
 * Components - Taxonomies - CustomField - Types.d
 */

import { CustomFieldRender } from './render'

import { Options, TAXONOMY_TYPE } from '../../../types/taxonomy'
import { useTaxonomies } from '../hooks'

export const CustomFieldElement = ({
  taxonomyWatch,
  type,
  ...defaultOptions
}: {
  taxonomyWatch: Options
  type: TAXONOMY_TYPE
}) => {
  const { taxonomies } = useTaxonomies({
    category: type,
    parentId: parseInt(taxonomyWatch?.value, 10)
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
        />
      ))}
    </>
  )
}
