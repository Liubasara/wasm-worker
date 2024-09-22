// The entry file of your WebAssembly module.

export function add(a: i32, b: i32): i32 {
  log(a + b === 3 ? 1 : 0)
  return a + b
}

declare function log(s: number): void
