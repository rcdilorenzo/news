import foldr from "../util/foldr";
import trimSlash from "../util/trimSlash";

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
  mappend: (left, right) => `${trimSlash(left)}/${trimSlash(right)}`
});
