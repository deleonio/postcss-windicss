import fs from 'fs'
import chokidar, { FSWatcher } from 'chokidar'
import { context, debug } from './context'

let watcher: FSWatcher | undefined

export function shutdownWatcher() {
  if (watcher) {
    debug('shutting down watcher')
    watcher.close()
    watcher = undefined
  }
}

const TOUCH_STR = 'WindiCSS-Dev-Touch'
const TOUCH_REG = new RegExp(`\\/\\* ${TOUCH_STR}: \\d+ \\*\\/\n*`)
function touch(file: string) {
  let css = fs.readFileSync(file, 'utf-8')
  css = css.replace(TOUCH_REG, '')
  css = `/* ${TOUCH_STR}: ${Date.now()} */\n${css}`
  fs.writeFileSync(file, css, 'utf-8')
}

export async function startDevWatcher() {
  shutdownWatcher()

  debug('starting dev watcher')
  const utils = context.utils!
  await utils.ensureInit()

  watcher = chokidar
    .watch(utils.options.scanOptions.include, {
      ignored: utils.options.scanOptions.exclude,
      ignoreInitial: true,
    })

  if (utils.configFilePath)
    watcher.add(utils.configFilePath)

  watcher
    .on('change', async(path) => {
      if (path === utils.configFilePath) {
        debug('reload config', utils.configFilePath)
        utils.init()
        return
      }

      debug('update from', path)
      await utils!.extractFile(fs.readFileSync(path, 'utf-8'))
      if (context.entry)
        touch(context.entry)
    })

  if (context.entry)
    touch(context.entry)
}
