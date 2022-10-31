import { Post } from '../types';
import { useSelect } from '@wordpress/data';
import { store } from '@wordpress/core-data';

export function usePosts<T extends string, P extends Post<T>>(type: T) {
  const posts = useSelect((select) => (
    select(store).getEntityRecords('postType', type, {
      per_page: -1,
      status: 'publish',
    }) as (P[] | null)
  ), [type]);
  return posts;
}
