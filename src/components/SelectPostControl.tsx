import React from 'react';
import { __ } from '@wordpress/i18n';
import { ControlOptions, SelectOption } from '../types';
import { BaseControl, SelectControl } from '@wordpress/components';
import { useCurrentPost, usePosts } from '../hooks';
import { forceArray, forceSingularValue, getMultiSelectHeight } from '../utils';

type Props = {
  value: number | number[] | string | string[];
  data: ControlOptions;
  onChange: (value: number | number[]) => void;
}

export const SelectPostControl: React.FC<Props> = ({ value, data, onChange }) => {
  const currentPost = useCurrentPost();
  const posts = usePosts(data.select_type ?? 'post');
  const normalizedValue = React.useMemo(() => {
    if (value) {
      if (Array.isArray(value)) {
        return value.map(v => typeof v === 'string' ? v : String(v));
      }
      return String(value);
    }
    return '';
  }, [value]);
  const options = React.useMemo(() => {
    const options = posts?.filter((entry) => {
      if (data.select_filter) {
        return eval(data.select_filter);
      }
      return true;
    }).map<SelectOption>(post => ({
      disabled: false,
      label: post.title.rendered,
      value: String(post.id),
    })) ?? [];
    if (!data.multiple) {
      options.splice(0, 0, {
        disabled: !data.allow_null,
        label: __('None', '@@text_domain'),
        value: '',
      });
    }
    return options;
  }, [data.allow_null, data.select_filter, posts, currentPost]);

  const onSingleValueChange = React.useCallback((value: string) => {
    onChange(value ? parseInt(value, 10) : -1);
  }, [onChange]);

  const onMultipleValueChange = React.useCallback((value: string[]) => {
    onChange(value.map(v => parseInt(v, 10)));
  }, [onChange]);

  return (
    <BaseControl
      id={data.name ?? ''}
      label={data.label}
    >
      {(!!data.multiple) ? (
        <SelectControl<string[]>
          multiple
          style={{
            height: getMultiSelectHeight(Math.min(10, options.length))
          }}
          placeholder={__('Select posts', '@@text_domain')}
          value={forceArray(normalizedValue)}
          options={options}
          onChange={onMultipleValueChange}
        />
      ) : (
        <SelectControl<string>
          placeholder={__('Select post', '@@text_domain')}
          value={forceSingularValue(normalizedValue)}
          options={options}
          onChange={onSingleValueChange}
        />
      )}
    </BaseControl>
  );
}