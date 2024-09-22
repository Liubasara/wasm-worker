import { Server } from 'http'
import { consola } from 'consola'
import { createServer } from '@server/src/configs/application'
import { bootstrapEnv, getCurrentConstants } from '@server/src/configs/envs'

;(async (): Promise<Server> => {
  try {
    await bootstrapEnv()
    const app = await createServer()
    const constants = getCurrentConstants()
    return app.listen(constants.PORT, () => {
      consola.start(`server listening on ${constants.PORT}`)
    })
  } catch (e) {
    consola.error('error:', e)
  }
})()
