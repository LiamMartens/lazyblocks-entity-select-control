import { useSelect } from '@wordpress/data';
import { Post } from '../types';

export const useCurrentPost = () => {
  return useSelect((select) => (
    select('core/editor').getCurrentPost() as Post<string>
  ));
}