import * as t from 'io-ts';
import { getOrElse, either } from 'fp-ts/lib/Either';

const decodeResult = <T extends t.Props, U extends t.Props>(
  successType: t.TypeC<T>,
  errorType: t.TypeC<U>,
  toErrorType: (errors: t.Errors) => t.TypeOf<t.TypeC<U>>,
  data: any
) => {
  return either.mapLeft(
    successType.decode(data),
    errors => getOrElse(
      () => toErrorType(errors)
    )(errorType.decode(data))
  );
}

export default decodeResult;
