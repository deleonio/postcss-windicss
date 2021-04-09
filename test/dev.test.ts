import { FSWatcher } from 'chokidar'
// import { context } from '../src/context'
import { startDevWatcher } from '../src/dev'
import plugin from '../src/index'

// Initialize plugin
plugin()

// Initialize context
// const utils = context.utils!

// Initialize spies
// const spyInit = jest.spyOn(utils, 'ensureInit')

describe('Test watcher', () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  describe('Test closing', () => {
    let watcher: FSWatcher | undefined

    beforeEach(async() => {
      jest.resetAllMocks()
      watcher = await startDevWatcher()
    })

    it('Debug called', () => {
      // expect(spyInit).toHaveBeenCalled()
      console.log(watcher)
    })
  })
})
