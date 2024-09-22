import type Koa from 'koa'
import Router from 'koa-router'
import { createBaseModule } from './base'
import { createWorkerModule } from './worker'

const allModules: createServerModuleFnType[] = [createBaseModule, createWorkerModule]

export const useModules = async (server: Koa) => {
  const addRoutes = async (
    fn: (target: Router) => Router | Promise<Router>
  ) => {
    const router = new Router()
    await fn(router)
    server.use(router.routes()).use(router.allowedMethods())
    return {
      router
    }
  }
  for (const createModule of allModules) {
    createModule({ server, addRoutes }).start()
  }
  return server
}
