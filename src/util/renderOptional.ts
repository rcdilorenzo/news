import { Option, fold } from "fp-ts/lib/Option";

const renderOptional = <T>(
  option: Option<T>,
  func: (value: T) => JSX.Element,
  onNone: () => any = () => null
) => fold(onNone, func)(option);

export default renderOptional;
