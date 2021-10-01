import { useSelect } from '@wordpress/data';

export type Taxonomy<T extends string = 'category'> = {
  id: number;
  slug: string;
  taxonomy: T;
  parent: number;
  name: string;
  description: string;
}

export function useTerms<T extends string, X extends Taxonomy<T>>(type: T) {
  const taxonomies = useSelect((select) => (
    select('core').getEntityRecords('taxonomy', type, {
      per_page: -1,
    }) as (X[] | null)
  ));
  return taxonomies;
}