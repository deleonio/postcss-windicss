import { WindiPluginUtils } from '@windicss/plugin-utils'
import _debug from 'debug'

export interface Context {
  entry?: string
  utils?: WindiPluginUtils
}

export const context: Context = {

}

export const debug = _debug('postcss-windicss')
