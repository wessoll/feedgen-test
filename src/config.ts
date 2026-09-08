export type Config = {
  port: number
  listenhost: string
  hostname: string
  publisherDid: string
  serviceDid: string
  feedRecordName: string
  newsFeedRecordName: string
}

export type AppContext = {
  cfg: Config
}

export function readConfig(): Config {
  const hostname = maybeStr(process.env.FEEDGEN_HOSTNAME) ?? ''
  const serviceDid = maybeStr(process.env.FEEDGEN_SERVICE_DID) ?? ''

  return {
    port: maybeInt(process.env.FEEDGEN_PORT) ?? 3000,
    listenhost: maybeStr(process.env.FEEDGEN_LISTENHOST) ?? '',
    hostname,
    publisherDid: maybeStr(process.env.FEEDGEN_PUBLISHER_DID) ?? '',
    serviceDid,
    feedRecordName: maybeStr(process.env.FEEDGEN_FEED_RECORD_NAME) ?? '',
    newsFeedRecordName: maybeStr(process.env.FEEDGEN_NEWS_FEED_RECORD_NAME) ?? 'latest-news-test',
  }
}

function maybeStr(val?: string): string | undefined {
  if (!val) return undefined
  return val
}

function maybeInt(val?: string): number | undefined {
  if (!val) return undefined
  const int = parseInt(val, 10)
  if (isNaN(int)) return undefined
  return int
}
