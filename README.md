# reinfo

`reinfo` is a land research tool for evaluating candidate sites for a
detached house in Japan.

The first product goal is narrow: given one candidate land listing, shorten
the repeated research needed to understand what the place is like before
deciding whether to visit, ask follow-up questions, or move on.

## MVP

The MVP focuses on a single candidate site at a time.

Input:

- Address or latitude/longitude
- Listing price
- Land area
- Listing URL
- Notes

Initial report areas:

- Buildability: zoning, building coverage ratio, floor area ratio, fire
  prevention constraints, and planning items that need follow-up
- Hazards: flood, landslide, large-scale embankment, liquefaction, and
  regionally relevant tsunami or storm surge information
- Daily life: school districts, nearby childcare, medical, park, library, and
  public facility information
- Population: nearby future population mesh data as supporting context
- Price context: listing price per tsubo, nearby transaction references, and
  nearby official land price references
- Map: candidate pin and switchable layers for the above research

The MVP should summarize research results and keep explicit follow-up notes.
Public datasets and API responses are inputs to investigation, not a final
purchase or construction judgement.

## Stack

The project uses a Cloudflare-first stack:

- React
- Vite
- TypeScript
- Cloudflare Workers
- Hono for Worker API routes
- Cloudflare D1
- Drizzle ORM
- MapLibre GL JS
- Zod
- Vitest
- Playwright

## Monorepo

The repository is a monorepo.

The expected shape is:

```text
apps/
  web/        React + Vite application and map UI
  worker/     Hono API deployed to Cloudflare Workers
packages/
  shared/     Shared schemas, domain types, and utilities
```

The exact package boundaries can evolve while the first vertical slice is
built. Shared code should move into `packages/shared` only when both the web
app and Worker need it.

## Architecture

The browser talks to the project API, not directly to the Real Estate
Information Library API.

```text
React web app
  -> Hono Worker API
    -> Real Estate Information Library API
    -> Cloudflare D1
```

The Worker owns:

- API key handling through Cloudflare secrets
- Calls to the Real Estate Information Library API
- Response shaping for the UI
- Candidate site persistence
- Report and API response caching

D1 initially stores candidate sites, notes, generated report data, and cached
API responses. The first version should avoid building a heavy spatial data
platform before the single-site research workflow is useful.

## Initial Non-Goals

- Automatic land listing collection
- Broad area discovery and comparison dashboards
- Precise appraisal or automated purchase recommendations
- Childcare availability or admission difficulty modelling
- A full spatial analytics database from day one
- Authentication until the product needs it

## Work Tracking

The MVP is tracked from
[#1](https://github.com/wato787/reinfo/issues/1).
