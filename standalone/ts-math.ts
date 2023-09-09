const x = [1, "a", null] as const;
const y = [1, 2, 3];

type CreateArray<
  T extends number,
  U extends unknown[] = []
> = U["length"] extends T ? U : CreateArray<T, [...U, 0]>;

type Length<T extends readonly unknown[]> = T["length"];
type Concat<T extends readonly unknown[], U extends readonly unknown[]> = [
  ...T,
  ...U
];
type Add<T extends number, U extends number> = Length<
  Concat<CreateArray<T>, CreateArray<U>>
>;

type xLength = Length<typeof x>;
type yLength = Length<typeof y>;

type a1 = Add<2, 5>;
type a2 = Add<0, 0>;
type a3 = Add<Add<1, 2>, Add<3, 4>>;

type Multiply<
  T extends number,
  U extends number,
  V extends number[] = [T]
> = U extends 0
  ? 0
  : Length<V> extends U
  ? T
  : // @ts-expect-error - TS doesn't like the recursive type here, even though it works
    // Type 'Add<T, V[0]>' does not satisfy the constraint 'number'.ts(2344)
    Multiply<Add<T, V[0]>, U, [...V, 0]>;

type m1 = Multiply<3, 7>; // correctly typed as 21
type m2 = [Multiply<0, 1>, Multiply<1, 0>, Multiply<0, 0>];

type Squared<T extends number> = Multiply<T, T>;

type s1 = Squared<3>; // correctly typed as 9
