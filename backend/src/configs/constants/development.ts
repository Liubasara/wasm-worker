import type { CONSTANTS_TYPE } from './types'
import path from 'path'

const ROOT_PATH = path.resolve(__dirname, '..', '..', '..', '..')

const SERVER_ROOT_PATH = path.resolve(ROOT_PATH, 'backend')

const production: CONSTANTS_TYPE = {
  ENV: 'development',
  PORT: 9000,
  ENV_FILE_PATH: path.resolve(SERVER_ROOT_PATH, '.env'),
  ENV_LOCAL_FILE_PATH: path.resolve(SERVER_ROOT_PATH, '.env.local'),
  ROOT_PATH,
  ALLOW_CORS: '*'
}

export default production
