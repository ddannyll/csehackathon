export function applyFn<Input, Output>([fn, input]: [fn: (arg0: Input) => Output, input: Input]) {
    return fn(input)
}
