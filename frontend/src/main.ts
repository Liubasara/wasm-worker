import { createWorker } from './createWorker'

window.addEventListener('load', () => {
  const startBtn = document.getElementById('start')
  const stopBtn = document.getElementById('stop')
  let worker: Worker | null = null
  if (startBtn) {
    startBtn.addEventListener('click', async () => {
      if (worker) {
        worker.terminate()
        worker = null
      }
      worker = await createWorker()
    })
  }
  if (stopBtn) {
    stopBtn.addEventListener('click', () => {
      if (worker) {
        worker.terminate()
        worker = null
      }
    })
  }
})
