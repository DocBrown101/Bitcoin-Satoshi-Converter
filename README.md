# Bitcoin Satoshi Converter

Easy conversion between BTC, EUR and Satoshi

[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=DocBrown101_Bitcoin-Satoshi-Converter)](https://sonarcloud.io/summary/new_code?id=DocBrown101_Bitcoin-Satoshi-Converter)

[![Docker-Publish](https://github.com/DocBrown101/Bitcoin-Satoshi-Converter/actions/workflows/docker-publish.yml/badge.svg)](https://github.com/DocBrown101/Bitcoin-Satoshi-Converter/actions/workflows/docker-publish.yml)
[![Docker_pulls](https://img.shields.io/docker/pulls/docbrown101/bitcoin-satoshi-converter)](https://hub.docker.com/r/docbrown101/bitcoin-satoshi-converter)
[![Docker Image Size (latest by date)](https://img.shields.io/docker/image-size/docbrown101/bitcoin-satoshi-converter)](https://hub.docker.com/r/docbrown101/bitcoin-satoshi-converter)

[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=DocBrown101_Bitcoin-Satoshi-Converter&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=DocBrown101_Bitcoin-Satoshi-Converter)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=DocBrown101_Bitcoin-Satoshi-Converter&metric=ncloc)](https://sonarcloud.io/dashboard?id=DocBrown101_Bitcoin-Satoshi-Converter)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=DocBrown101_Bitcoin-Satoshi-Converter&metric=security_rating)](https://sonarcloud.io/dashboard?id=DocBrown101_Bitcoin-Satoshi-Converter)

Multi-arch builds for **linux/amd64** and **linux/arm64**

![Preview](https://github.com/DocBrown101/Bitcoin-Satoshi-Converter/blob/main/light_dark.png)

## Docker Image can be found here:

- https://hub.docker.com/r/docbrown101/bitcoin-satoshi-converter

### Docker Compose:

```yaml
services:
  app:
    image: docbrown101/bitcoin-satoshi-converter:latest
    container_name: BTC-converter
    ports:
      - 8080:8080
    user: 1000:1000
    read_only: true
    tmpfs:
      - /tmp:rw,noexec,nosuid,size=16m,uid=1000,gid=1000,mode=1770
```

Run the published image with `docker compose -f docker/docker-compose.yml up -d`.
The app is available at [http://localhost:8080](http://localhost:8080).

To build and run the current source locally:

```sh
docker compose -f docker/docker-compose.dev.yml up --build -d
```

Open [http://localhost:9876](http://localhost:9876). The container runs as UID/GID
1000 on port **8080**, with a read-only filesystem and a writable `/tmp`.
Older published images used container port 80; update existing port mappings
when upgrading to this image.

## Local development

Requires **Node.js 24 or newer** and npm. Browser support: Chrome 117+, Edge 121+,
Firefox 121+, and Safari 17+.

```sh
npm ci
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). Vite reloads the app when source files change.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server. |
| `npm run typecheck` | Check application, tests and Vite configuration with TypeScript. |
| `npm test` | Run conversion, state, API and blockchain regression tests using Node's built-in test runner. |
| `npm run build` | Type-check and build the production app into `build/`. |
| `npm run preview` | Serve the production build locally on port 4173. |
| `npm run check` | Run regression tests, type-check and build. |

Pull requests run checks and a read-only, non-root Docker smoke test. Successful
checks on `main` or a manual workflow run publish the multi-architecture image to Docker Hub.

## Conversion and live data

- Euro amounts support two decimal places, BTC eight, and satoshis whole numbers.
- Amounts are limited to JavaScript's safe integer range in cents or satoshis. Results outside that range remain blank. Euro-to-BTC conversions round once to whole satoshis so both Bitcoin fields agree.
- Changing the live price recalculates results while preserving the last amount entered.
- Choose the price provider and language in Settings. Theme, language and provider preferences are saved locally.
- Kraken is the default provider. Old CryptoCompare selections automatically use Kraken because CryptoCompare now requires authentication.
- Failed price requests can be retried with the refresh button. If a refresh fails after a successful request, the last price remains visible alongside the error.
- Blockchain data reconnects automatically after a dropped connection. Displayed fee estimates assume a transaction size of 140 vB.

### Usable Fiat Price APIs

- https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=eur,usd
- https://api.coinpaprika.com/v1/tickers/btc-bitcoin?quotes=EUR,USD
- https://api.kraken.com/0/public/Ticker?pair=BTCEUR,BTCUSD

#### Default mempool websocket connection

- wss://mempool.space/api/v1/ws
