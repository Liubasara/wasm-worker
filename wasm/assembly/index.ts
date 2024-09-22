// The entry file of your WebAssembly module.

declare class returnTarget {
  hello: string;
}

export function getReturn(): returnTarget {
  return {
    hello: 'hi'
  }
}
