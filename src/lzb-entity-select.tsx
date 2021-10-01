import React from 'react';
import { addFilter } from '@wordpress/hooks';
import { Settings } from './components/Settings';
import { Control } from './components/Control';
import { asBoolean } from './utils';

addFilter('lzb.editor.control.entity-select.render', 'lzb.editor', (render, { data, getValue, onChange }: React.ComponentProps<typeof Control>) => {
  return (
    <Control
      getValue={getValue}
      onChange={onChange}
      data={{
        ...data,
        allow_null: asBoolean(data.allow_null),
        multiple: asBoolean(data.multiple),
      }}
    />
  )
});

addFilter('lzb.constructor.control.entity-select.settings', 'lzb.constructor', (render, { data, updateData }: React.ComponentProps<typeof Settings>) => {
  return (
    <Settings
      updateData={updateData}
      data={{
        ...data,
        allow_null: asBoolean(data.allow_null),
        multiple: asBoolean(data.multiple),
      }}
    />
  );
});