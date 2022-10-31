import React from 'react';
import { __ } from '@wordpress/i18n';
import { ControlOptions, Value } from '../types';
import { BaseControl } from '@wordpress/components';
import { useCurrentPost, useTaxonomyTypes } from '../hooks';
import { SelectControl } from './SelectControl';

type Props = {
  value: Value;
  data: ControlOptions;
  onChange: (value: Value) => void;
}

export const SelectTaxonomyTypeControl: React.FC<Props> = ({ value, data, onChange }) => {
  const currentPost = useCurrentPost();
  const taxonomies = useTaxonomyTypes();

  const options = React.useMemo(() => {
    const options = taxonomies?.filter((entry) => {
      if (data.select_filter) {
        return !!eval(data.select_filter);
      }
      return true;
    }).map(type => ({
      label: type.name,
      value: type.slug,
    })) ?? [];
    return options;
  }, [data.allow_null, data.select_filter, taxonomies, currentPost]);

  const handleChange = React.useCallback((value: Value) => {
    onChange(value)
  }, [data.multiple, onChange])

  return (
    <BaseControl
      id={data.name ?? ''}
      label={data.label}
    >
      <SelectControl
        label={__('Select type', '@@text_domain')}
        allowNull={!!data.allow_null}
        multiple={!!data.multiple}
        value={value}
        options={options}
        onChange={handleChange}
      />
    </BaseControl>
  );
}