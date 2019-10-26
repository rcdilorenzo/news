import { getFoldableComposition } from "fp-ts/lib/Foldable";
import { array } from "fp-ts/lib/Array";
import { option, Option } from "fp-ts/lib/Option";

const F = getFoldableComposition(array, option);

const append = <T>(collection: T[], item: T): T[] =>
  [...collection, item];

const compactOptions = <T>(options: Option<T>[]): T[] =>
  F.reduce(options, [] as T[], append);

export default compactOptions;
