import React from 'react';
import { __ } from '@wordpress/i18n';
import { ControlOptions, SelectOption, Value } from '../types';
import { BaseControl, ComboboxControl, Button } from '@wordpress/components';
import { useCurrentPost, usePosts } from '../hooks';
import { forceArray, forceSingularValue, getMultiSelectHeight } from '../utils';
import { SelectControl } from './SelectControl';

type Props = {
  allowReset?: boolean
  value?: Value
  data: ControlOptions;
  onChange: (value: Value) => void;
}

export const SelectPostControl: React.FC<Props> = ({ allowReset, value, data, onChange }) => {
  const currentPost = useCurrentPost();
  const posts = usePosts(data.select_type ?? 'post');
  const options = React.useMemo(() => {
    const options = posts?.filter((entry) => {
      if (data.select_filter) {
        return !!eval(data.select_filter);
      }
      return true;
    }).map(post => ({
      label: post.title.rendered,
      value: post.id,
    })) ?? [];
    return options;
  }, [data.allow_null, data.select_filter, posts, currentPost]);

  const handleChange = React.useCallback((value: Value) => {
    onChange(value)
  }, [data.multiple, onChange])

  const handleEdit = React.useCallback((value: Value) => {
    window.open(`/wp-admin/post.php?post=${value}&action=edit`)
  }, [data.select_kind, data.select_type])

  return (
    <BaseControl
      id={data.name ?? ''}
      label={data.label}
    >
      <SelectControl
        numeric
        canEdit
        label={__('Select post', '@@text_domain')}
        allowNull={!!data.allow_null}
        multiple={!!data.multiple}
        createLink={`/wp-admin/post-new.php?post_type=${data.select_type}`}
        value={value}
        options={options}
        onChange={handleChange}
        onEdit={handleEdit}
      />
    </BaseControl>
  );
}