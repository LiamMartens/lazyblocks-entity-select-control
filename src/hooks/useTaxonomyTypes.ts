import { useSelect } from '@wordpress/data';
import { store } from '@wordpress/core-data';

type TaxonomyType = {
  name: string;
  slug: string;
}

export const useTaxonomyTypes = () => {
  const types = useSelect(select => (
    select(store).getEntityRecords('root', 'taxonomy', { per_page: -1 }) as (TaxonomyType[] | null)
  ), []);
  return types;
}