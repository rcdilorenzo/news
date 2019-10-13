import { UrlParamsCT } from '../category/Monoid';

export interface Param<Key, Value> {
  _type: Key;
  value: Value;
}

export type Params = Record<string, string | undefined>;
