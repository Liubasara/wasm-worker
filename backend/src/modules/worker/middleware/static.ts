import koaStatic from 'koa-static'
import koaMount from 'koa-mount'
import path from 'path'
import { getCurrentConstants } from '@server/src/configs/envs'

export const useStaticMiddleWare: UseMiddleWareFnType = (server) => {
  const constants = getCurrentConstants()
  server.use(
    koaMount(
      '/wasm',
      koaStatic(path.resolve(constants.ROOT_PATH, 'wasm', 'build'), {
        // 若为 true，将在中间件的 next 后调用
        defer: false
      })
    )
  )
  server.use(koaMount('/worker', koaStatic(path.resolve(constants.ROOT_PATH, 'worker', 'dist'), {
    // 若为 true，将在中间件的 next 后调用
    defer: false
  })))
  return server
}
