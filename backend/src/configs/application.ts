import Koa from 'koa'
import { useModules } from '@server/src/modules'

export const createServer = async (): Promise<Koa> => {
  const app: Koa = new Koa()
  await useModules(app)
  return app
}
