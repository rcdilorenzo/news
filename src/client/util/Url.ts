import trimSlash from '../../util/trimSlash';
import { Monoid, monoidString } from 'fp-ts/lib/Monoid';
import { pipe } from 'fp-ts/lib/pipeable';
import fromEmptyNullable from '../../util/fromEmptyNullable';
import { map, compact, array } from 'fp-ts/lib/Array';
import { intercalate } from 'fp-ts/lib/Foldable';

const join = (sep: string) => (items: string[]) =>
  intercalate(monoidString, array)(sep, items);

const Url: Monoid<string> = {
  empty: '',
  concat: (left, right) => pipe(
    [left, right],
    map(trimSlash),
    compact,
    join('/')
  )
};

export default Url;
