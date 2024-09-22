import type Koa from 'koa'
import axios from 'axios'
import http from 'http'
import https from 'https'
import {
  useCsrfTokenRequestInterceptors,
  useCookieRequestInterceptors
} from './interceptors'

const bindApi: ControllerFnType = (ctx, next) => {
  // 绑定服务端使用的 axios 实例, 应用内通过 ctx.state.$http 调用
  const httpAgent = new http.Agent({
    keepAlive: true,
    keepAliveMsecs: 1000 // 长连接存活时长10s
  })

  const httpsAgent = new https.Agent({
    keepAlive: true,
    keepAliveMsecs: 1000 // 长连接存活时长10s
  })
  const instance = axios.create({
    httpAgent,
    httpsAgent,
    timeout: 10000
  })
  instance.interceptors.request.use(useCookieRequestInterceptors(ctx))
  instance.interceptors.request.use(useCsrfTokenRequestInterceptors(ctx))

  ctx.state.$http = instance
  ctx.state.requestErrors = []
  return next()
}

// 绑定 request 属性到 ctx.state 上
const useRequestMiddleware: (server: Koa) => Koa = (server) => {
  server.use(bindApi)
  return server
}

export default useRequestMiddleware
