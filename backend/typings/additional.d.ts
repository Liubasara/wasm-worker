import Koa from 'koa'
import Router from 'koa-router'

declare global {
  declare type UseMiddleWareFnType = (server: Koa) => Koa
  declare type ControllerFnType = Router.IMiddleware<Koa.DefaultState>
  declare type KoaGlobalContext = Koa.ParameterizedContext
  declare type IServerModule = { start(): void }
  declare type createServerModuleFnType<
    InitArgs extends unknown[] = unknown[]
  > = (
    arg0: {
      server: Koa
      addRoutes: (fn: (target: Router) => Router) =>
        | {
            router: Router
          }
        | Promise<{
            router: Router
          }>
    },
    ...args: InitArgs
  ) => IServerModule
}
