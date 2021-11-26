# FFI Sugar
This library provides two function, `load` and `signature`. These functions serves as thin wrappers around `Deno.dlopn` and the former takes the same arguments and returns an object with functions based on the signature.

## How to use
To understand how this library works, you must first familirise yourself with [`Deno.dlopen`](https://deno.land/manual@v1.16.3/runtime/ffi_api). To load in a function, you need to do something like following:

```ts
// First set the pathname. `load` is a curried function.
const libAdd = load(`./libadd.so`)
// Open library and define exported symbols
const {add} = libAdd({
  "add": { parameters: ["isize", "isize"], result: "isize" },
})
```

And now we have a function with the signature `(arg:number,arg: number) => number`. (Please note in the actual code, there'll be a bunch of optional parameters of type `undefined`, this is how the mapped types works.).

The signatures of all functions being loaded unfortunately has to match, if you need multiple different signatures, you'll have to load multiple times.

If you for whatever reason need to save the signature of the function, before passing it into a library, you ca use the `signature` function. All it does it take an object and returns that object. But the returned object will be type checked to conform to the signature expected by `load`.