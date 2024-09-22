async function fetchAndStartWasm() {
  const res = await fetch('http://localhost:9000/wasm/release.wasm', {
    method: 'GET'
  })
  const bytes = await res.arrayBuffer()
  const transObj = {
    index: {
      log: console.log
    }
  }
  const results = await WebAssembly.instantiate(bytes, transObj)
  const { exports } = results.instance
  console.log('exports', exports)
  console.log(
    'addResult',
    (exports as { add: (a: number, b: number) => number })?.add?.(1, 3)
  )
}

export const createWroker = () => {
  const blob = new Blob(
    [fetchAndStartWasm.toString() + ' ;fetchAndStartWasm()'],
    {
      type: 'text/javascript'
    }
  )
  const worker = new Worker(URL.createObjectURL(blob))
  return worker
}
