/**
 * 包含以下基础模块（不涉及业务路由）:
 *  - cors
 *  - request
 */
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import useRequestMiddleware from './middleware/request'
import { useCorsMiddleWare } from './middleware/cors'
import * as Controller from './controller'

export const createBaseModule: createServerModuleFnType = ({ server, addRoutes }) => {
  const useRoutes = () => {
    addRoutes(target => {
      target.get('/healthy', Controller.healthyCheck)
      return target
    })
  }
  const start = () => {
    server.use(logger())
    useCorsMiddleWare(server)
    server.use(bodyParser())
    useRequestMiddleware(server)
    useRoutes()
    return server
  }
  return {
    start
  }
}
