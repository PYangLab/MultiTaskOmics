# Multi-Task Omics

[![Deploy site](https://github.com/PYangLab/multi-task-omics/actions/workflows/deploy.yml/badge.svg)](https://github.com/PYangLab/multi-task-omics/actions/workflows/deploy.yml)

Landing site for **Multi-Task Omics** — an ecosystem of methods for multimodal,
multibatch, multi-condition single-cell analysis.

**Live site:** https://pyanglab.github.io/multi-task-omics/

The site is built with [MkDocs](https://www.mkdocs.org/) and the
[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/) theme, with a
custom full-width landing page and a hero canvas animation.

## The ecosystem

| Tool | What it does | Docs |
|---|---|---|
| **M3** | Condition-aware deep factor learning: multimodal integration, patient-level inference, multi-resolution interpretation | https://pyanglab.github.io/M3/ |
| **scMultiBench** | Benchmarking of single-cell multimodal integration methods with scIB metrics | *in preparation* |
| **Matilda** | One multi-task network — classification, dimension reduction, feature selection, simulation | https://pyanglab.github.io/Matilda/ |

## Project structure

```
.
├── docs/
│   ├── index.md            # Landing page (portal)
│   ├── methods.md          # "Which tool do I need?" guide
│   ├── assets/             # Logos and images
│   ├── javascripts/        # Hero sphere + scroll animations
│   ├── stylesheets/        # extra.css (theme overrides)
│   └── includes/           # Abbreviations snippet
├── overrides/              # Custom Material theme templates
│   ├── home.html           # Full-width landing template
│   └── 404.html            # Custom 404 page
├── mkdocs.yml              # Site configuration
├── requirements.txt        # Python dependencies
└── .github/workflows/      # GitHub Actions (build + deploy)
```

## Local development

Requires Python 3.9+.

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
mkdocs serve
```

Then open http://127.0.0.1:8000/.

To produce a production build (fails on warnings) into `site/`:

```bash
mkdocs build --strict
```

## Deployment

Every push to `main` builds and deploys the site to GitHub Pages via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

**One-time setup:** in the repository, go to **Settings → Pages → Build and
deployment** and set **Source** to **GitHub Actions**. The next push to `main`
publishes to https://pyanglab.github.io/multi-task-omics/.

### Using a custom domain

To serve the site from your own domain instead:

1. Create `docs/CNAME` containing the domain (e.g. `multitask-omics.org`).
2. Set `site_url` in `mkdocs.yml` to `https://your-domain/`.
3. Point the domain's DNS at GitHub Pages and set the custom domain under
   **Settings → Pages**.

## License

Released under the [MIT License](LICENSE).
