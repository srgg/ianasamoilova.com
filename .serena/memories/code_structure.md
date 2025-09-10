# Code Structure

## Directory Structure
```
/
├── .github/workflows/          # GitHub Actions deployment workflows
├── assets/                     # Static assets
├── config/_default/            # Hugo configuration files
│   ├── hugo.yaml              # Main Hugo configuration
│   ├── params.yaml            # Site parameters and SEO settings
│   ├── menus.yaml             # Navigation menus
│   ├── languages.yaml         # Language settings
│   └── module.yaml            # Hugo modules
├── content/                   # Site content (Markdown files)
│   ├── _index.md             # Homepage
│   ├── authors/admin/        # Author profile
│   ├── experience.md         # Experience page
│   ├── technology-philosophy.md # Technology philosophy page
│   └── projects/             # Project pages and assignments
├── layouts/                  # Hugo templates (if custom)
├── static/                   # Static files (images, etc.)
├── tina/                     # TinaCMS configuration
│   └── config.ts             # TinaCMS schema and collections
├── docs/                     # Documentation files
├── package.json              # Node.js dependencies and scripts
├── go.mod                    # Hugo modules
├── netlify.toml              # Netlify deployment config
└── hugoblox.yaml             # Hugo Blox configuration
```

## Content Structure
- **Homepage (`_index.md`):** Landing page with Hugo Blox sections
- **Author profiles:** Personal and professional information
- **Experience:** Professional background and skills
- **Projects:** Educational assignments and coursework
- **Technology Philosophy:** Personal technology use vision

## Key Configuration Files
- `config/_default/hugo.yaml` - Main Hugo settings, URLs, build config
- `config/_default/params.yaml` - SEO, analytics, appearance settings
- `tina/config.ts` - TinaCMS schema with all Hugo Blox block types
- `package.json` - Development scripts and dependencies
- `go.mod` - Hugo theme and plugin modules