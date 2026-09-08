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
      const feedUris = [
        ctx.cfg.feedRecordName,
        ctx.cfg.newsFeedRecordName,
      ].map(
        (recordName) =>
          `at://${ctx.cfg.publisherDid}/app.bsky.feed.generator/${recordName}`,
      )
      res.json({
        did: ctx.cfg.serviceDid,
        feeds: feedUris.map((uri) => ({ uri })),
      })
    },
  )

  return router
}

export default makeRouter
