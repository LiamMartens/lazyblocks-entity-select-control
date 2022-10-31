import { useSelect } from '@wordpress/data';
import { Post } from '../types';

export const useCurrentPost = () => {
  return useSelect((select) => (
    (select('core/editor') as {
      getCurrentPost: () => Post<string>
    }).getCurrentPost()
  ), []);
}