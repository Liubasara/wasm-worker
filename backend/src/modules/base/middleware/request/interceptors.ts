import type { ParameterizedContext } from 'koa'
import type { InternalAxiosRequestConfig } from 'axios'
import { parse, serialize } from 'cookie'

/**
 * https://gist.github.com/kindfarmer/5ca590e3232faf1fdac0eb498c73720d
 *
 * @param value
 * @returns
 */

const isPlainObject: (value?: unknown) => boolean = (obj) => {
  if (typeof obj !== 'object' || obj === null) return false

  let proto = obj
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto)
  }

  return Object.getPrototypeOf(obj) === proto
}

const isEmpty: <T extends { __trapAny: unknown }>(value?: T) => boolean = (
  obj
) => {
  if (typeof obj !== 'object') return true

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) return false
  }
  return true
}

function csrfToken(rawCookie: Record<string, string>) {
  let token = rawCookie.csrf || ''
  let noNeedSetCsrfToken = true
  if (!token) {
    const $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
    const maxPos = $chars.length

    for (let i = 0; i < 32; i++) {
      token += $chars.charAt(Math.floor(Math.random() * maxPos))
    }
    noNeedSetCsrfToken = false
  }

  return { token, noNeedSetCsrfToken }
}

export const useCsrfTokenRequestInterceptors = (ctx: ParameterizedContext) => {
  const interceptor = (config: InternalAxiosRequestConfig) => {
    const { data, method = '', headers } = config
    if (method === 'options') {
      return config
    }
    const { token, noNeedSetCsrfToken } = csrfToken(
      parse(ctx.request.headers.cookie || '')
    )
    if (!noNeedSetCsrfToken) {
      try {
        const csrfCookie = serialize('csrf', token, {
          path: '/',
          domain: ctx.host.match(/[\w]+\.[\w]+$/)
            ? '.' + ctx.host.match(/[\w]+\.[\w]+$/)?.[0]
            : ctx.host
        })
        ctx.cookies.set(csrfCookie)
        config.headers.cookie += `;${csrfCookie};`
      } catch (e) {
        // app 内部可能提前返回, csrf cookie set 失败是正常的
      }
    }
    setCsrfWhenPost()
    return config

    function setCsrfWhenPost() {
      if (~['post', 'put', 'delete'].indexOf(method)) {
        if (isPlainObject(data)) {
          data.csrfmiddlewaretoken = token
        } else if (
          typeof FormData !== 'undefined' &&
          data &&
          typeof data === 'object' &&
          data instanceof FormData
        ) {
          headers && (headers['X-CSRFToken'] = token)
        } else if (isEmpty(data)) {
          config.data = { csrfmiddlewaretoken: token }
        } else {
          headers && (headers['X-CSRFToken'] = token)
        }
      }
    }
  }
  return interceptor
}

export const useCookieRequestInterceptors = (ctx: ParameterizedContext) => {
  const interceptor = (config: InternalAxiosRequestConfig) => {
    if (config?.headers && ctx.header?.cookie) {
      // 合并当前上下文的 cookie 和请求中的 cookie
      ;(!config.headers.Cookie || typeof config.headers.Cookie !== 'string') &&
        (config.headers.Cookie = '')
      const configHeadersCookie = parse(config.headers.Cookie as string)
      const ctxHeaderCookie = parse(ctx.header.cookie)
      const theNewCookie = Object.assign(
        {},
        configHeadersCookie,
        ctxHeaderCookie
      )
      const theNewCookieStr = Object.entries(theNewCookie).reduce(
        (pre, [key, value]) => {
          pre += `${serialize(key, value, { encode: (str) => str })};`
          return pre
        },
        ''
      )
      config.headers.Cookie = theNewCookieStr
    }
    return config
  }

  return interceptor
}
