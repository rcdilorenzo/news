const foldr = <T, U>(f: (acc: U, value: T) => U, acc: U, collection: T[]): U => {
  if (collection.length === 0) {
    return acc;
  }
  const [x, ...xs] = collection;
  return f(foldr(f, acc, xs), x);
};

export default foldr;
