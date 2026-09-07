# fediverse-gen

A very basic atproto (Bluesky) feed generator, based on the structure of
[bluesky-social/feed-generator](https://github.com/bluesky-social/feed-generator).

Unlike the full starter kit, this version does **not** subscribe to the
firehose or use a database — it simply serves a **hardcoded list of posts**
via the standard feed generator XRPC endpoints.

## Endpoints

- `GET /.well-known/did.json` — DID document for the feed generator service.
- `GET /xrpc/app.bsky.feed.describeFeedGenerator` — describes the feed(s) served.
- `GET /xrpc/app.bsky.feed.getFeedSkeleton?feed=<at-uri>` — returns the
  (paginated) list of hardcoded post URIs.

## Setup

```bash
npm install
cp .env.example .env
```

Edit `.env`:

- `FEEDGEN_HOSTNAME` — the public hostname you'll deploy this under.
- `FEEDGEN_PUBLISHER_DID` — the DID of the Bluesky account that will publish
  (own) this feed record.
- `FEEDGEN_SERVICE_DID` — defaults to `did:web:<hostname>`.
- `FEEDGEN_FEED_RECORD_NAME` — the rkey used when you publish the feed
  generator record (e.g. `hardcoded-feed`).

Edit `src/hardcoded-posts.ts` and replace the example AT-URIs with real
`app.bsky.feed.post` URIs you want the feed to serve.

## Run

```bash
npm start
```

Server listens on `FEEDGEN_PORT` (default `3000`).

## Verify

```bash
curl http://localhost:3000/xrpc/app.bsky.feed.describeFeedGenerator
curl "http://localhost:3000/xrpc/app.bsky.feed.getFeedSkeleton?feed=at://<publisher-did>/app.bsky.feed.generator/hardcoded-feed"
```

## Publishing

To make the feed visible in the Bluesky app, you still need to publish an
`app.bsky.feed.generator` record pointing at this server's public URL, and
host it at a public HTTPS hostname matching `FEEDGEN_HOSTNAME`/`FEEDGEN_SERVICE_DID`.
See the [official starter kit docs](https://github.com/bluesky-social/feed-generator#publishing-your-feed)
for the `publishFeedGen` script and instructions — that part is unchanged
from the original project and was intentionally left out here to keep this
generator minimal.
