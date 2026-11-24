# Multi-Task Omics

[![Deploy site](https://github.com/PYangLab/MultiTaskOmics/actions/workflows/deploy.yml/badge.svg)](https://github.com/PYangLab/MultiTaskOmics/actions/workflows/deploy.yml)

Landing site for **Multi-Task Omics** — an ecosystem of methods for multimodal,
multibatch, multi-condition single-cell analysis.

**Live site:** https://pyanglab.github.io/MultiTaskOmics/



## The ecosystem

| Tool | What it does | Documentation | Repository |
|---|---|---|---|
| **M3** | Condition-aware deep factor learning: multimodal integration, patient-level inference, multi-resolution interpretation | [Documentation](https://pyanglab.github.io/M3/) | [PYangLab/M3](https://github.com/PYangLab/M3) |
| **scMultiBench** | Benchmarking of single-cell multimodal integration methods with scIB metrics | [Documentation](https://dsichang.github.io/scMultiBench/) | [PYangLab/scMultiBench](https://github.com/PYangLab/scMultiBench) |
| **Matilda** | One multi-task network — classification, dimension reduction, feature selection, simulation | [Documentation](https://pyanglab.github.io/Matilda/) | [PYangLab/Matilda](https://github.com/PYangLab/Matilda) |

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


## License

Released under the [MIT License](LICENSE).
