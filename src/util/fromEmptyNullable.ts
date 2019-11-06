import { some, none, Option } from "fp-ts/lib/Option"

const fromEmptyNullable = (value: string): Option<string> => {
  return value.length > 0 ? some(value) : none;
}

export default fromEmptyNullable;
