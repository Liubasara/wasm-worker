async function fetchAndStartWasm() {
  const res = await fetch('http://localhost:9000/wasm/release.wasm', {
    method: 'GET'
  })
  const bytes = await res.arrayBuffer()
  const results = await WebAssembly.instantiate(bytes, {
    console: {
      log: console.log
    }
  })
  const { exports } = results.instance
  console.log('exports', exports)
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
