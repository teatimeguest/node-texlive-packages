export const Iterator: GlobalIteratorConstructor = getIteratorConstructor();

export interface GlobalIteratorConstructor {
  new<
    T,
    TReturn = unknown,
    TNext = unknown,
  >(): IteratorObject<T, TReturn, TNext>;
}

function getIteratorConstructor(): GlobalIteratorConstructor {
  if ('Iterator' in globalThis) {
    return Reflect.get(globalThis, 'Iterator') as GlobalIteratorConstructor;
  }
  const Prototype = Reflect.getPrototypeOf(Reflect.getPrototypeOf([].keys())!)!;
  return Reflect.get(Prototype, 'constructor') as GlobalIteratorConstructor;
}
