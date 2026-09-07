import express from 'express'
import http from 'http'
import { AppContext, Config } from './config'
import wellKnown from './well-known'
import describeGenerator from './describe-generator'
import feedGeneration from './feed-generation'

export class FeedGenerator {
  public app: express.Application
  public server?: http.Server
  public ctx: AppContext

  constructor(app: express.Application, ctx: AppContext) {
    this.app = app
    this.ctx = ctx
  }

  static create(cfg: Config) {
    const app = express()
    const ctx: AppContext = { cfg }

    app.use(wellKnown(ctx))
    app.use(describeGenerator(ctx))
    app.use(feedGeneration(ctx))

    app.get('/', (_req, res) => {
      res.json({ message: 'This is an atproto feed generator. See /xrpc/app.bsky.feed.describeFeedGenerator' })
    })

    return new FeedGenerator(app, ctx)
  }

  async start(): Promise<http.Server> {
    this.server = this.app.listen(this.ctx.cfg.port, this.ctx.cfg.listenhost)
    await new Promise((resolve) => this.server?.once('listening', resolve))
    return this.server
  }
}

export default FeedGenerator
