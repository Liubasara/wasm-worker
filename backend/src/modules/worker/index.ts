/**
 * 包含以下基础模块（不涉及业务路由）:
 *  - cors
 *  - request
 */
import { useStaticMiddleWare } from './middleware/static'

export const createWorkerModule: createServerModuleFnType = ({ server }) => {
  const start = () => {
    useStaticMiddleWare(server)
    return server
  }
  return {
    start
  }
}
