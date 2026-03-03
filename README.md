# GitHub Bluesky Banner

Automatically sets your Bluesky profile banner to your GitHub contribution graph. Runs daily via a GitHub Action.

## How it works

1. Fetches your GitHub contribution graph as an SVG from [ghchart.rshah.org](https://ghchart.rshah.org)
2. Converts and resizes it to a 1500x500 PNG using sharp
3. Uploads it as your Bluesky profile banner

## Setup

### Prerequisites

- Node.js >= 20
- pnpm

### Installation

```bash
pnpm install
```

### Environment variables

| Variable | Description |
| --- | --- |
| `X_BSKY_USERNAME` | Your Bluesky handle (e.g. `user.bsky.social`) |
| `X_BSKY_PASSWORD` | Your Bluesky app password |
| `X_GITHUB_USER` | Your GitHub username |

### Running locally

```bash
X_BSKY_USERNAME=... X_BSKY_PASSWORD=... X_GITHUB_USER=... pnpm exec tsx index.ts
```

### GitHub Action

The included workflow runs daily at 4 AM UTC and can also be triggered manually via `workflow_dispatch`.

Add the following secrets to your repository (Settings > Secrets and variables > Actions):

- `X_BSKY_USERNAME`
- `X_BSKY_PASSWORD`
- `X_GITHUB_USER`
