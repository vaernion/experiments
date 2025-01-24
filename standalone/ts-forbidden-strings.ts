type BannedStrings = "abc" | "def";
type Abc<T> = T extends `${string}${BannedStrings}${string}` ? never : T;

const doStuff = <T extends string>(event: Abc<T>) => {};

// The type becomes 'never', so this is not allowed
doStuff("abc");
doStuff("123");
doStuff("abc123");
doStuff("defabc123");
