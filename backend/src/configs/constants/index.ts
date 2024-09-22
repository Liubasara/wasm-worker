import development from './development'
import production from './production'
import { CONSTANTS_TYPE } from './types'
import { ENV_TYPES } from '@server/src/configs/envs'

export const CONSTANTS: {
  [key in ENV_TYPES]: CONSTANTS_TYPE
} = { development, production }

