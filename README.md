# Calculator X

**There's an X for That.** Calculator X is a dependency-free web application of 17 independent calculators for time, money, work, shopping, and everyday life. Each tool has its own directly accessible URL, inputs, calculation module, explanation, and test coverage. The original arithmetic calculator is preserved at `/arithmetic/`.

## Run locally

```sh
npm start
```

Open `http://localhost:10000`. The Node server serves the calculator pages and exposes `/api/health` and `/api/catalog`. Run `npm test` and `npm run build` before deployment. No database, account, or paid API is required. GitHub Actions checks tests and the build on pushes and pull requests.

## Architecture

- `server.js`: Node HTTP server, direct-route delivery, API endpoints, and deployment-aware SEO URLs.
- `site/registry.js`: typed-by-convention catalogue used for search, categories, cards, related tools, and routes.
- `site/features/<slug>.js`: each tool's documented fields, methodology, and pure calculation function.
- `site/lib/helpers.js`: formatting, rounding, and integer-cent allocation.
- `site/app.js`: shared discovery, form, result, saved-scenario, sharing, and theme UI.
- `site/calculators/<slug>/index.html`: dedicated static route with unique title, description, and canonical URL.
- `site/sitemap.xml`: published calculator routes.
- `test/`: engine and edge-case tests.

To add a calculator, create a feature module exporting `fields`, `methodology`, and `calculate`; add it to `registry.js`; create its route `index.html`; add tests and the route to the sitemap. `calculate(values)` returns `{primary, summary, breakdown, notes, chart}`. Use integer cents for bill reconciliation.

## Render deployment

Deploy as a **Node web service** from this repository’s `main` branch. Set the build command to `npm test && npm run build`, the start command to `npm start`, and the health check path to `/api/health`. The server binds to Render’s `PORT` on `0.0.0.0`. `PUBLIC_ORIGIN` is optional; when omitted, canonical URLs and the sitemap use the request host. Saved scenarios remain in each user’s browser; the server does not store them.

## Privacy and limits

Scenarios save in browser local storage only when a user chooses Save. Sensitive text and wellness tools do not offer saving or input-bearing share links. Shareable links for other tools encode inputs in the URL, so they should not be used for private information. Currency selection changes formatting, not exchange rates. Subjective tools are user-assumption planning aids, not diagnoses or scientific predictions. The furniture turn check is a simplified 2D model. Food guidance is conservative and cannot verify actual handling conditions.

Food-storage rules reference [FoodSafety.gov's cold storage chart](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts) and [FDA refrigerator guidance](https://www.fda.gov/food/buy-store-serve-safe-food/refrigerator-thermometers-cold-facts-about-food-safety).
