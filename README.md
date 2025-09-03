# Iana Samoilova - Personal Academic Website

A modern academic portfolio website built with Hugo and enhanced with TinaCMS for content management. Features comprehensive Hugo Blox integration with all 15 available block types and a powerful visual editing experience.

## 🎯 Purpose

This website serves as Iana's professional academic portfolio, showcasing:
- Professional background and personal interests
- Experience and skills development
- Educational projects and assignments
- CV and biographical information

Built for the Special Education Added Endorsement Program (SPDA-CERG) at UCCS, with dedicated sections for tracking coursework and assignments.

## 🛠️ Tech Stack

- **Static Site Generator:** [Hugo](https://gohugo.io/) v0.149.0 (Extended)
- **Theme:** [Hugo Blox Academic CV](https://github.com/HugoBlox/theme-academic-cv)
- **CSS Framework:** [Tailwind CSS](https://tailwindcss.com/) v4.1.12
- **Content Management:** [TinaCMS](https://tina.io/) v2.8.2
- **Package Manager:** pnpm v10.14.0
- **Deployment:** GitHub Actions → GitHub Pages

## 🚀 Development

### Prerequisites

- [Hugo Extended](https://gohugo.io/installation/) v0.149.0+
- [Node.js](https://nodejs.org/) v18+
- [pnpm](https://pnpm.io/) (recommended) or npm

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd ianasamoilova.com
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Start development server:**
   ```bash
   pnpm dev
   ```
   Site will be available at `http://localhost:1313`

### Development Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start Hugo development server |
| `pnpm tina` | Start TinaCMS with Hugo (recommended for content editing) |
| `pnpm tina-audit` | Validate TinaCMS schema and content |
| `pnpm build` | Build production site |

### TinaCMS Development Mode

For content editing with a visual interface:

```bash
pnpm tina
```

This command:
- Starts Hugo server on port 1313
- Launches TinaCMS admin interface on port 4001
- Enables live preview and visual editing
- Access admin at `http://localhost:4001/admin`

### Content Structure

```
content/
├── _index.md              # Homepage (landing page)
├── authors/
│   └── admin/_index.md    # Author profile
├── experience.md          # Experience page
└── projects/
    ├── _index.md         # Projects overview
    └── uccss-special-education-endorsement/
        ├── _index.md     # Project landing page
        └── assignments-curr-5170/
            ├── week1-*/index.md
            ├── week4-*/index.md
            └── week5-*/index.md
```

## 📝 Content Management

### TinaCMS Collections

- **Homepage:** Main landing page with Hugo Blox sections
- **Project Pages:** Project overview and landing pages
- **Project Assignments:** Individual assignment documents
- **Author Profiles:** Personal and professional information

## 🔧 Configuration

### TinaCMS Schema

The TinaCMS configuration (`tina/config.ts`) features:
- **Shared field definitions** - DRY principle implementation
- **Template-based collections** - Reusable schema components
- **Comprehensive Hugo Blox support** - All 15 block types
- **Type-safe configuration** - TypeScript with const assertions

### Hugo Configuration

Key configuration files:
- `hugo.yaml` - Hugo site configuration
- `go.mod` - Hugo modules and theme
- `package.json` - Node.js dependencies and scripts

## 🚀 Deployment

Automated deployment via GitHub Actions:
1. Create a feature branch from `main`
2. Make changes and commit
3. Push branch and create Pull Request to `main`
4. After PR merge, GitHub Actions builds the site
5. Deploys to GitHub Pages
6. Available at the configured domain

## 🤝 Contributing

This is a personal academic website. For technical issues or suggestions:
1. Open an issue
2. Describe the problem or enhancement
3. Include steps to reproduce (if applicable)

## 📄 License

© 2025 Iana Samoilova. Personal content and custom configurations are proprietary.