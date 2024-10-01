import { getCurrentConstants } from '@server/src/configs/envs'
import type Koa from 'koa'

const ALLOW_HEADERS = ['Accept', 'Content-Type', 'Authorization']
const ALLOW_METHODS = ['POST', 'GET', 'PUT', 'PATCH', 'OPTIONS', 'DELETE']
const MAX_AGE = 3600

export const useCorsMiddleWare: (server: Koa) => Koa = (server) => {
  server.use(async (ctx, next) => {
    const ALLOW_CORS: Array<string> =
      getCurrentConstants().ALLOW_CORS?.split(',') ?? []
    const origin = ctx.request?.header?.origin || ''
    let allowOrigins = ''
    if (origin.length && ALLOW_CORS.length) {
      allowOrigins = ALLOW_CORS.includes(origin) ? origin : ''
      !allowOrigins &&
        ALLOW_CORS.forEach((domain) => {
          if (domain.includes('*') && origin.includes(domain.slice(1))) {
            // *.xxx.com 通配符
            allowOrigins = origin
          }
          if (domain === '*') {
            // * 通配符
            allowOrigins = origin
          }
        })
    }

    const allowMethods = ALLOW_METHODS.join(',')
    const allowHeaders = ALLOW_HEADERS.join(',')

    if (allowOrigins) {
      ctx.set('Access-Control-Allow-Origin', allowOrigins)
      ctx.set('Access-Control-Allow-Headers', allowHeaders)
      ctx.set('Access-Control-Allow-Methods', allowMethods)
      ctx.set('Access-Control-Allow-Credentials', 'true')
      ctx.set('Access-Control-Max-Age', MAX_AGE + '')
    }

    return next()
  })
  return server
}
