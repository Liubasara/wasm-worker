export const createWorker = async () => {
  const workerRes = await fetch('http://localhost:9000/worker/index.js')
  const blob = new Blob(
    [await workerRes.text()],
    {
      type: 'text/javascript'
    }
  )
  const worker = new Worker(URL.createObjectURL(blob), { type: 'module' })
  return worker
}
