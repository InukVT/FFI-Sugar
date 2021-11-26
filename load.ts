import { NativeType, FFIForeignFunction, ForeignFunctionSignature } from "./types.ts"

/**
 * Sugary way to load in FFI functions
 * @param path the path to the dynamic library
 * @param {Deno.ForeignFunction} symbol The symbol of the function to be loaded. NOTE: this wil hopefully support multiple types of symbols in the future
 * @returns The function loaded
 */
export const load: (path: string | URL) => <
    Key extends string,
    Parameters extends NativeType[],
    Result extends Deno.NativeType,
    Nonblock extends (boolean | undefined),
>(
    symbol: {[P in Key]: FFIForeignFunction<
        Parameters,
        Result,
        Nonblock
    >},
    // @ts-ignore no way to cast the type
) =>  { [P in Key]: ForeignFunctionSignature<Parameters, Result, Nonblock> } = (path) => (symbol) => {
    const ffi = Deno.dlopen(path,symbol)
    return ffi.symbols
}

/**
 *  A function to save signatures for use multiple times. This does nothing at all, but makes it easy to make sure your signature is typesafe. 
 * @param {Deno.ForeignFunction} symbol The symbol of the function to be loaded.
 * @returns the passed in signature 
 */
export const signature: <
    Key extends string,
    Parameters extends NativeType[],
    Result extends Deno.NativeType,
    Nonblock extends (boolean | undefined),
>(
signature: {[P in Key]: FFIForeignFunction<
    Parameters,
    Result,
    Nonblock
>}
) => {[P in Key]: FFIForeignFunction<
    Parameters,
    Result,
    Nonblock
>} = (symbol) => symbol

