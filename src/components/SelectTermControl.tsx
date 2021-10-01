import React from 'react';
import { __ } from '@wordpress/i18n';
import { ControlOptions, SelectOption } from '../types';
import { BaseControl, SelectControl } from '@wordpress/components';
import { useTerms } from '../hooks';
import { forceArray, forceSingularValue, getMultiSelectHeight } from '../utils';

type Props = {
  value: number | number[] | string | string[];
  data: ControlOptions;
  onChange: (value: number | number[]) => void;
}

export const SelectTermControl: React.FC<Props> = ({ value, data, onChange }) => {
  const terms = useTerms(data.select_type ?? 'category');
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
    const options = terms?.map<SelectOption>(term => ({
      disabled: false,
      label: term.name,
      value: String(term.id),
    })) ?? [];
    if (!data.multiple) {
      options.splice(0, 0, {
        disabled: !data.allow_null,
        label: __('None', '@@text_domain'),
        value: '',
      });
    }
    return options;
  }, [data.allow_null, terms]);

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
          value={forceArray(normalizedValue)}
          style={{
            height: getMultiSelectHeight(Math.min(10, options.length)),
          }}
          options={options}
          onChange={onMultipleValueChange}
        />
      ) : (
        <SelectControl<string>
          value={forceSingularValue(normalizedValue)}
          options={options}
          onChange={onSingleValueChange}
        />
      )}
    </BaseControl>
  );
}