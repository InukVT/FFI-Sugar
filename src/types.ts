export type NativeType = Deno.NativeType | "buffer"

export type FFIForeignFunction<
    Parameters extends NativeType[], 
    Result extends Deno.NativeType,
    Nonblock extends boolean = false,
> = {
    parameters: [...Parameters],
    result: Result,
    nonblocking?: Nonblock
} 

type BlockPromise<Block extends (boolean | undefined), Result> = Block extends true ? Promise<Result> : Result 

type NativeToType<Type extends NativeType | undefined = undefined> =
    Type extends undefined ? [arg?: never] 
    : Type extends "buffer"
    ? [arg: Uint8Array]
    : Type extends "void"
    ? [arg: void]
    : [arg:number]


type NativeArrayToTypes<Types extends NativeType[]> = [
    ...NativeToType<Types[0]>, 
    ...NativeToType<Types[1]>,
    ...NativeToType<Types[2]>,
    ...NativeToType<Types[3]>,
    ...NativeToType<Types[4]>,
    ...NativeToType<Types[5]>,
    ...NativeToType<Types[6]>,
    ...NativeToType<Types[7]>,
    ...NativeToType<Types[8]>,
]

export type ForeignFunctionSignature<
    Parameters extends NativeType[], 
    Result extends Deno.NativeType,
    Nonblock extends (boolean | undefined)
> = (...arg: NativeArrayToTypes<Parameters>) => BlockPromise<Nonblock, NativeToType<Result>[0]>

export type OpenFunction<Path,S extends Record<string, Deno.ForeignFunction>> = (
    filename: Path,
    symbols: S,
  ) => Deno.DynamicLibrary<S>

export type ForeignSignature<
    Key extends string, 
    Parameters extends NativeType[], 
    Result extends Deno.NativeType, 
    Nonblock extends boolean = false 
> = {[P in Key]: FFIForeignFunction<
    Parameters,
    Result,
    Nonblock
>}