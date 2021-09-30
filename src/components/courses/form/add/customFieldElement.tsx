import { CustomFieldRender } from './render'
import { useTaxonomies } from '../../../categories/hooks/useTaxonomies'
import { Options } from '../../../../types/taxonomy'

export const CustomFieldElement = ({
  taxonomyWatch,
  taxonomyType,
  ...defaultOptions
}: {
  taxonomyWatch: Options
  taxonomyType: string
}) => {
  const { taxonomies } = useTaxonomies({
    category: taxonomyType,
    parentId: parseInt(taxonomyWatch?.value, 10)
  })

  return (
    <>
      {(taxonomies || []).map((item) => {
        return (
          <CustomFieldRender
            {...defaultOptions}
            input={item?.custom_fields?.input}
            inputType={item?.custom_fields?.inputType}
            key={item?.id}
            label={item?.custom_fields?.label}
            name={`custom_fields.${item.name}`}
            options={item?.custom_fields?.options}
          />
        )
      })}
    </>
  )
}
