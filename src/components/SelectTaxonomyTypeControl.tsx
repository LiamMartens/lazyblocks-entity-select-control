import React from 'react';
import { __ } from '@wordpress/i18n';
import { ControlOptions, SelectOption, Value } from '../types';
import { BaseControl, SelectControl } from '@wordpress/components';
import { useTaxonomyTypes } from '../hooks';
import { forceArray, forceSingularValue, getMultiSelectHeight } from '../utils';

type Props = {
  value: Value;
  data: ControlOptions;
  onChange: (value: string | string[]) => void;
}

export const SelectTaxonomyTypeControl: React.FC<Props> = ({ value, data, onChange }) => {
  const taxonomies = useTaxonomyTypes();
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
    const options = taxonomies?.map<SelectOption>(type => ({
      disabled: false,
      label: type.name,
      value: type.slug,
    })) ?? [];
    if (!data.multiple) {
      options.splice(0, 0, {
        disabled: !data.allow_null,
        label: __('None', '@@text_domain'),
        value: '',
      });
    }
    return options;
  }, [data.allow_null, taxonomies]);

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