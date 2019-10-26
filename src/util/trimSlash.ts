export const hasTrailing = (value: string, character: string) => {
  if (value.length < character.length) {
    return false;
  }

  return value.slice(-1 * character.length) === character;
}

export const trimStart = (value: string, character: string) => {
  return value.slice(0, character.length) === character ?
    value.slice(character.length) :
    value;
}

export const trimTrailing = (value: string, character: string) => {
  return hasTrailing(value, character) ?
    value.slice(-1 * character.length) :
    value;
}

const trimSlash = (value: string) => trimStart(trimTrailing(value, '/'), '/');

export default trimSlash;
