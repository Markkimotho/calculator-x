# Calculator X

**There's an X for That.** Calculator X is a static, dependency-free platform of 17 independent calculators for time, money, work, shopping, and everyday life. Each tool has its own directly accessible URL, inputs, calculation module, explanation, and test coverage. The original arithmetic calculator is preserved at `/arithmetic/`.

## Run locally

```sh
python3 -m http.server 8000 --directory site
```

Open `http://localhost:8000`. Run `npm test` for the calculator and arithmetic tests. No install, database, account, or paid API is required. GitHub Actions tests on pull requests and publishes `site/` to GitHub Pages on `main`.

## Architecture

- `site/registry.js`: typed-by-convention catalogue used for search, categories, cards, related tools, and routes.
- `site/features/<slug>.js`: each tool's documented fields, methodology, and pure calculation function.
- `site/lib/helpers.js`: formatting, rounding, and integer-cent allocation.
- `site/app.js`: shared discovery, form, result, saved-scenario, sharing, and theme UI.
- `site/calculators/<slug>/index.html`: dedicated static route with unique title, description, and canonical URL.
- `site/sitemap.xml`: published calculator routes.
- `test/`: engine and edge-case tests.

To add a calculator, create a feature module exporting `fields`, `methodology`, and `calculate`; add it to `registry.js`; create its route `index.html`; add tests and the route to the sitemap. `calculate(values)` returns `{primary, summary, breakdown, notes, chart}`. Use integer cents for bill reconciliation.

## Privacy and limits

Scenarios save in browser local storage only when a user chooses Save. Sensitive text and wellness tools do not offer saving or input-bearing share links. Shareable links for other tools encode inputs in the URL, so they should not be used for private information. Currency selection changes formatting, not exchange rates. Subjective tools are user-assumption planning aids, not diagnoses or scientific predictions. The furniture turn check is a simplified 2D model. Food guidance is conservative and cannot verify actual handling conditions.

Food-storage rules reference [FoodSafety.gov's cold storage chart](https://www.foodsafety.gov/food-safety-charts/cold-food-storage-charts) and [FDA refrigerator guidance](https://www.fda.gov/food/buy-store-serve-safe-food/refrigerator-thermometers-cold-facts-about-food-safety).
