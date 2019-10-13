import { Unwrapped } from './util/Unwrapped';
import foldr from './util/foldr';
import trimSlash, { hasTrailing, trimStart } from './util/trimSlash';

interface MonoidType<T> {
  mempty: T;
  mappend: (value: T, next: T) => T;
  mconcat?: (values: T[]) => T;
}

const Monoid = <T>({ mempty, mappend, mconcat }: MonoidType<T>) => ({
  mempty,
  mappend,
  mconcat: mconcat || ((values: T[]) => foldr(mappend, mempty, values))
});

export const StringCT = Monoid({
  mempty: '',
  mappend: (value, next) => value + next
});

export const UrlCT = Monoid({
  mempty: StringCT.mempty,
  mappend: (left, right) => {
    const value = trimSlash(left);
    return value === StringCT.mempty ?
      trimSlash(right) :
      `${value}/${trimSlash(right)}`;
  }
});

const trimMark = (value: string) => trimStart(value, '?');

export const UrlParamsCT = Monoid({
  mempty: '?',
  mappend: (left, right) => {
    if (left === '?') {
      return `?${trimMark(right)}`;
    }
    return `?${trimMark(left)}&${trimMark(right)}`;
  }
});
