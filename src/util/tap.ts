const tap = <T, U>(f: (input: T) => U) => (input: T): U => {
  console.log(input);
  return f(input);
};

export default tap;
