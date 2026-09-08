import express from 'express'
import { AppContext } from './config'
import { HARDCODED_POSTS_SPORTS } from './hardcoded-posts'
import { HARDCODED_POSTS_NEWS } from './hardcoded-posts'

/**
 * app.bsky.feed.getFeedSkeleton
 * Returns a page of post URIs for the feed. Since the posts here are
 * hardcoded, this simply paginates through the static list using a
 * numeric-offset cursor.
 */
export const makeRouter = (ctx: AppContext) => {
  const router = express.Router()

  router.get('/xrpc/app.bsky.feed.getFeedSkeleton', (req, res) => {
    const feedUri = `at://${ctx.cfg.publisherDid}/app.bsky.feed.generator/${ctx.cfg.feedRecordName}`
    const newsFeedUri = `at://${ctx.cfg.publisherDid}/app.bsky.feed.generator/${ctx.cfg.newsFeedRecordName}`
    const requestedFeed = req.query.feed
    const posts =
      requestedFeed === newsFeedUri
        ? HARDCODED_POSTS_NEWS
        : requestedFeed === feedUri
          ? HARDCODED_POSTS_SPORTS
          : undefined

    if (!posts) {
      return res.status(400).json({
        error: 'UnsupportedAlgorithm',
        message: `Unsupported algorithm: ${requestedFeed}`,
      })
    }
    // if (requestedFeed !== feedUri) {
    //   return res.status(400).json({
    //     error: 'UnsupportedAlgorithm',
    //     message: `Unsupported algorithm: ${requestedFeed}`,
    //   })
    // }

    const limit = Math.min(parseInt(String(req.query.limit ?? '50'), 10) || 50, 100)
    const cursor = parseInt(String(req.query.cursor ?? '0'), 10) || 0

    const page = posts.slice(cursor, cursor + limit)
    const nextCursor =
      cursor + page.length < posts.length
        ? String(cursor + page.length)
        : undefined

    res.json({
      cursor: nextCursor,
      feed: page.map((uri) => ({ post: uri })),
    })
  })

  return router
}

export default makeRouter
