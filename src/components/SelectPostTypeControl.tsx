import React from 'react';
import { __ } from '@wordpress/i18n';
import { ControlOptions, SelectOption } from '../types';
import { BaseControl, SelectControl } from '@wordpress/components';
import { useCurrentPost, usePostTypes } from '../hooks';
import { forceArray, forceSingularValue, getMultiSelectHeight } from '../utils';

type Props = {
  value: string | string[] | number | number[];
  data: ControlOptions;
  onChange: (value: string | string[]) => void;
}

export const SelectPostTypeControl: React.FC<Props> = ({ value, data, onChange }) => {
  const currentPost = useCurrentPost();
  const postTypes = usePostTypes();
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
    const options = postTypes?.filter((entry) => {
      if (data.select_filter) {
        return !!eval(data.select_filter);
      }
      return true;
    }).map<SelectOption>(type => ({
      disabled: false,
      label: type.label,
      value: type.name,
    })) ?? [];
    if (!data.multiple) {
      options.splice(0, 0, {
        disabled: !data.allow_null,
        label: __('None', '@@text_domain'),
        value: '',
      });
    }
    return options;
  }, [data.allow_null, data.select_filter, postTypes, currentPost]);

  return (
    <BaseControl
      id={data.name ?? ''}
      label={data.label}
    >
      {(!!data.multiple) ? (
        <SelectControl<string[]>
          multiple
          style={{
            height: getMultiSelectHeight(Math.min(10, options.length)),
          }}
          value={forceArray(normalizedValue)}
          options={options}
          onChange={onChange}
        />
      ) : (
        <SelectControl<string>
          value={forceSingularValue(normalizedValue)}
          options={options}
          onChange={onChange}
        />
      )}
    </BaseControl>
  );
}