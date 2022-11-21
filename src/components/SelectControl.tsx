import React, { useCallback, useMemo, useState } from 'react'
import { Button, ComboboxControl, Flex } from '@wordpress/components'
import { forceArray } from '../utils'
import { __ } from '@wordpress/i18n'
import type { Value } from '../types'

type Props = {
  numeric?: boolean
  allowNull?: boolean
  createLink?: string
  multiple?: boolean
  label?: string
  value?: Value
  options: {
    label: string
    value: number | string
  }[]
  onChange: (value: Value) => void
}

export const SelectControl = ({
  numeric,
  allowNull,
  createLink,
  multiple,
  label,
  value,
  options,
  onChange
}: Props) => {
  const EMPTY_VALUE = useMemo(() => numeric ? -1 : '', [numeric])
  const normalizedValue = useMemo(() => {
    const arr = typeof value === 'undefined' ? [] : forceArray(value)
    if (numeric) {
      return arr.map((val) => typeof val === 'string' ? parseInt(val, 10) : val)
    }
    return arr.map((val) => typeof val !== 'string' ? String(val) : val)
  }, [value])

  const comboboxOptions = useMemo(() => (
    options.map((opt) => ({
      label: opt.label,
      value: String(opt.value),
    }))
  ), [options])

  const handleChange = useCallback((value: string | null, index: number) => {
    if (!multiple) {
      onChange(typeof value === 'string' ? parseInt(value, 10) : EMPTY_VALUE)
    } else {
      const nextValue = [...normalizedValue]
      nextValue[index] = typeof value === 'string' ? parseInt(value, 10) : EMPTY_VALUE
      onChange(nextValue)
    }
  }, [multiple, normalizedValue, onChange])

  const handleAdd = useCallback(() => {
    onChange([...normalizedValue, EMPTY_VALUE]);
  }, [onChange])

  const handleRemove = useCallback((index: number) => {
    const nextValue = [...normalizedValue]
    nextValue.splice(index, 1)
    onChange(nextValue)
  }, [onChange])

  return (
    <Flex direction="column">
      {normalizedValue.map((value, index) => (
        <div
          key={index}
          style={{
            display: 'grid',
            gap: '0.5rem',
            gridTemplateColumns: 'minmax(0, 1fr) auto',
            alignItems: 'flex-end',
          }}
        >
          <ComboboxControl
            label={label}
            value={typeof value === 'number' ? String(value) : ''}
            allowReset={allowNull}
            options={comboboxOptions}
            onChange={v => handleChange(v, index)}
          />
          {multiple && (
            <Button
              isDestructive
              isSmall
              style={{ marginBottom: '0.7rem' }}
              variant="secondary"
              onClick={() => handleRemove(index)}
            >
              {__('Remove', '@@text_domain')}
            </Button>
          )}
        </div>
      ))}
      <Flex gap={2}>
        {(!!multiple || normalizedValue.length === 0) && (
          <Button variant="primary" isSmall onClick={handleAdd}>{__('Add', '@@text_domain')}</Button>
        )}
        {!!createLink && (
          <Button variant="secondary" isSmall href={createLink}>{__('Create new', '@@text_domain')}</Button>
        )}
      </Flex>
    </Flex>
  )
}