// AssemblyScript
class Foo {
  constructor(public str: string) {
    this.str = str
  }
  getString(): string {
    return this.str
  }
}

export function getFoo(): Foo { // this one
  return new Foo("Hello world!")
}