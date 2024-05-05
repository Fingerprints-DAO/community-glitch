import { createFrames } from 'frames.js/next'
import { appURL } from '../page'

export const frames = createFrames({
  basePath: '/frame',
  baseUrl: appURL(),
})
