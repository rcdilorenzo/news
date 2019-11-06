import { Option } from "fp-ts/lib/Option";
import fromEmptyNullable from "./fromEmptyNullable";
import { pipe } from "fp-ts/lib/pipeable";

export const hasTrailing = (value: string, character: string) => {
  if (value.length < character.length) {
    return false;
  }

  return value.slice(-1 * character.length) === character;
}

export const trimStart = (character: string) => (value: string) => {
  return value.slice(0, character.length) === character ?
    value.slice(character.length) :
    value;
}

export const trimTrailing = (character: string) => (value: string) => {
  return hasTrailing(value, character) ?
    value.slice(-1 * character.length) :
    value;
}

const trimSlash = (value: string) => pipe(
  value,
  trimStart('/'),
  trimTrailing('/'),
  fromEmptyNullable
);

export default trimSlash;
