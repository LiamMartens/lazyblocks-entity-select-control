import { useSelect } from '@wordpress/data';

type TaxonomyType = {
  name: string;
  slug: string;
}

export const useTaxonomyTypes = () => {
  const types = useSelect(select => (
    select('core').getEntityRecords('root', 'taxonomy', { per_page: -1 }) as (TaxonomyType[] | null)
  ));
  return types;
}