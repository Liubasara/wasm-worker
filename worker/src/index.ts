import * as loader from '@assemblyscript/loader'

async function fetchAndStartWasm() {
  const res = await fetch('http://localhost:9000/wasm/release.wasm', {
    method: 'GET'
  })
  const bytes = await res.arrayBuffer()
  const results = await loader.instantiate(bytes)
  const { exports } = results.instance
  console.log('exports', exports)
  console.log(
    'getReturn:',
    (exports as { getReturn: () => unknown })?.getReturn?.()
  )
}

fetchAndStartWasm()