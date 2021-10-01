import { useSelect } from '@wordpress/data';
import { Post } from '../types';

export function usePosts<T extends string, P extends Post<T>>(type: T) {
  const posts = useSelect((select) => (
    select('core').getEntityRecords('postType', type, {
      per_page: -1,
      status: 'publish',
    }) as (P[] | null)
  ));
  return posts;
}
