import React from 'react';
import { __ } from '@wordpress/i18n';
import { PanelBody, BaseControl, ToggleControl, SelectControl, TextControl, TextareaControl } from '@wordpress/components';
import { usePostTypes, useTaxonomyTypes } from '../hooks';
import { ControlOptions, SelectKind } from '../types';

type Props = {
  updateData: (data: Partial<ControlOptions>) => void;
  data: ControlOptions;
}

export const Settings: React.FC<Props> = ({ updateData, data }) => {
  const postTypes = usePostTypes();
  const taxonomies = useTaxonomyTypes();
  const selectTypeOptions = React.useMemo(() => {
    if (data.select_kind === 'post') {
      return postTypes?.map((type) => ({
        label: type.label,
        value: type.name,
      }));
    }

    if (data.select_kind === 'taxonomy') {
      return taxonomies?.map((type) => ({
        label: type.name,
        value: type.slug,
      }));
    }
  }, [postTypes, taxonomies, data.select_kind]);

  const onKindChange = React.useCallback((value: SelectKind) => {
    updateData({ select_kind: value });
  }, [data.select_kind]);

  const onTypeChange = React.useCallback((value: string) => {
    updateData({ select_type: value });
  }, [data.select_type]);

  const onFilterChange = React.useCallback((value: string) => {
    updateData({ select_filter: value });
  }, [data.select_filter]);

  const onAllowNullChange = React.useCallback((value: boolean) => {
    updateData({ allow_null: value });
  }, [data.allow_null]);

  const onMultipleChange = React.useCallback((value: boolean) => {
    updateData({ multiple: value });
  }, [data.multiple]);

  React.useEffect(() => {
    if (!!selectTypeOptions?.length) {
      const firstOption = selectTypeOptions[0];
      if (firstOption.value !== data.select_type) {
        updateData({ select_type: firstOption.value });
      }
    } else if (!!data.select_type) {
      updateData({ select_type: '' });
    }
  }, [selectTypeOptions, data.select_type]);

  return (
    <>
      <PanelBody>
        <BaseControl
          id="lzb-entity-select-kind"
          label={__('Selection Kind', '@@text_domain')}
          help={__('Defines what can be selected')}
        >
          <SelectControl<SelectKind>
            value={data.select_kind}
            options={[
              { label: __('Post Type', '@@text_domain'), value: 'post-type' },
              { label: __('Taxonomy Type', '@@text_domain'), value: 'taxonomy-type' },
              { label: __('Post', '@@text_domain'), value: 'post' },
              { label: __('Taxonomy', '@@text_domain'), value: 'taxonomy' }
            ]}
            onChange={onKindChange}
          />
        </BaseControl>

        {(!!selectTypeOptions) && (
          <BaseControl
            id="lzb-entity-select-type"
            label={__('Selection Type', '@@text_domain')}
            help={__('Defines the type of selection')}
          >
            <SelectControl<string>
              value={data.select_type}
              options={selectTypeOptions}
              onChange={onTypeChange}
            />
          </BaseControl>
        )}

        <BaseControl
          id="lzb-entity-select-filter"
          label={__('Selection Filter', '@@text_domain')}
          help={__('Define a custom JS filter for the fetched items')}
        >
          <TextareaControl
            value={data.select_filter ?? ''}
            onChange={onFilterChange}
          />
        </BaseControl>

        <BaseControl
          id="lzb-entity-select-allow-null"
          label={__('Allow Null', '@@text_domain')}
          help={__('Allows you to reset selected option value to null')}
        >
          <ToggleControl
            label={__('Yes', '@@text_domain')}
            checked={!!data.allow_null}
            onChange={onAllowNullChange}
          />
        </BaseControl>

        <BaseControl
          id="lzb-entity-select-multiple"
          label={__('Multiple', '@@text_domain')}
          help={__('Allows you to select multiple values', '@@text_domain')}
        >
          <ToggleControl
            label={__('Yes', '@@text_domain')}
            checked={!!data.multiple}
            onChange={onMultipleChange}
          />
        </BaseControl>
      </PanelBody>
    </>
  )
}