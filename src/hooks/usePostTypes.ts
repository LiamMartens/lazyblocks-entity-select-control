import { useSelect } from '@wordpress/data';

type PostTypeKind = {
  kind: 'postType';
  label: string;
  name: string;
}

export const usePostTypes = () => {
  const entities = useSelect(select => (
    select('core').getEntitiesByKind('postType') as (PostTypeKind[] | null)
  ));
  return entities;
}