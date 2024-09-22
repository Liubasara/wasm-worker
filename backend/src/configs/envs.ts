import { consola } from 'consola'
import { CONSTANTS } from './constants'
import dotenv from 'dotenv'

export const bootstrapEnv = async (): Promise<dotenv.DotenvConfigOutput> => {
  let parsedResult: dotenv.DotenvConfigOutput = {}
  const result = dotenv.config({
    path: getCurrentConstants().ENV_FILE_PATH
  })
  if (result.error) {
    consola.error('Environment variable not loaded: not found ".env" file.')
  } else {
    parsedResult = result.parsed
  }

  const localResult = dotenv.config({
    path: getCurrentConstants().ENV_LOCAL_FILE_PATH,
    override: true
  })
  if (localResult.error) {
    consola.error(
      'Environment variable not loaded: not found ".env.local" file.'
    )
  } else {
    parsedResult = {
      ...parsedResult,
      ...localResult.parsed
    }
  }
  return parsedResult
}
export const ALL_ENVS = ['development', 'production'] as const

export type ENV_TYPES = (typeof ALL_ENVS)[number]

export const getCurrentConstants = () => {
  const env = process.env?.NODE_ENV as ENV_TYPES | void
  if (typeof env === 'undefined' || !ALL_ENVS.includes(env)) {
    consola.warn(`/n> ENV is not set, fallback to development.`)
    return CONSTANTS.development
  }
  return CONSTANTS[env]
}
