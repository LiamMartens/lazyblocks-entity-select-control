import { useSelect } from '@wordpress/data';
import { store } from '@wordpress/core-data';

type PostTypeKind = {
  kind: 'postType';
  label: string;
  name: string;
}

export const usePostTypes = () => {
  const entities = useSelect(select => (
    select(store).getEntitiesByKind('postType') as (PostTypeKind[] | null)
  ), []);
  return entities;
}