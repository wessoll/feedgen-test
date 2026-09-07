import dotenv from 'dotenv'
import { FeedGenerator } from './server'
import { readConfig } from './config'

const run = async () => {
  dotenv.config()
  const cfg = readConfig()
  const server = FeedGenerator.create(cfg)
  await server.start()
  console.log(
    `🤖 running feed generator at http://${cfg.listenhost}:${cfg.port}`,
  )
}

run()
