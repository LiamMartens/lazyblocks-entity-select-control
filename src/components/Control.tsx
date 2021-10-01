import React from 'react';
import { ControlOptions, Value } from '../types';
import { SelectPostControl } from './SelectPostControl';
import { SelectPostTypeControl } from './SelectPostTypeControl';
import { SelectTaxonomyTypeControl } from './SelectTaxonomyTypeControl';
import { SelectTermControl } from './SelectTermControl';

type Props = {
  data: ControlOptions;
  getValue: () => Value;
  onChange: (value: Value) => void;
}

export const Control: React.FC<Props> = ({ data, getValue, onChange }) => {
  const value = getValue() as Value;
  if (data.select_kind === 'post-type') return <SelectPostTypeControl value={value} data={data} onChange={onChange} />;
  if (data.select_kind === 'taxonomy-type') return <SelectTaxonomyTypeControl value={value} data={data} onChange={onChange} />;
  if (data.select_kind === 'post') return <SelectPostControl value={value} data={data} onChange={onChange} />
  if (data.select_kind === 'taxonomy') return <SelectTermControl value={value} data={data} onChange={onChange} />
  return null;
}
