import { SelectKind } from './SelectKind';

export type ControlOptions = {
  name?: string;
  label?: string;
  allow_null?: boolean;
  multiple?: boolean;
  select_kind?: SelectKind;
  select_type?: string;
  select_filter?: string;
  default?: string;
  help?: string;
}