import express from 'express'
import { AppContext } from './config'

/**
 * app.bsky.feed.describeFeedGenerator
 * Lets clients discover which feeds this generator serves.
 */
export const makeRouter = (ctx: AppContext) => {
  const router = express.Router()

  router.get(
    '/xrpc/app.bsky.feed.describeFeedGenerator',
    (_req, res) => {
      const feedUri = `at://${ctx.cfg.publisherDid}/app.bsky.feed.generator/${ctx.cfg.feedRecordName}`
      res.json({
        did: ctx.cfg.serviceDid,
        feeds: [{ uri: feedUri }],
      })
    },
  )

  return router
}

export default makeRouter
