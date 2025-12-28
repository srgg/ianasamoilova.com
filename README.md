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

#### Upgrading Hugo

To upgrade Hugo on OS X, follow these steps:
`brew upgrade hugo`

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
   pnpm run dev
   ```
   Site will be available at `http://localhost:1313`

### Development Commands

| Command               | Description |
|-----------------------|-------------|
| `pnpm run dev`        | Start Hugo development server |
| `pnpm run tina`       | Start TinaCMS with Hugo (recommended for content editing) |
| `pnpm run tina-audit` | Validate TinaCMS schema and content |
| `pnpm run build`      | Build production site (includes slide conversion) |
| `pnpm run slides`     | Convert PDFs to WebP slides |

### TinaCMS Development Mode

For content editing with a visual interface:

```bash
pnpm run tina
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
├── projects/
│   ├── _index.md          # Projects overview
│   └── para-welcome-kit/  # Project with embedded slides
│       └── _index.md
└── slides/
    └── para-welcome-kit/  # Reveal.js slide deck
        └── _index.md
```

## PDF to Slides Conversion

Convert PDF presentations to WebP images for embedded Reveal.js slides.

### Workflow

```
assets/slides-sources/<name>.pdf         → Source PDF (committed)
       ↓ pnpm run slides
assets/generated/slides/<name>/          → WebP images (gitignored)
       ↓ Hugo Pipes (via images_path)
public/generated/slides/<name>/          → Published images
```

### Commands

| Command | Description |
|---------|-------------|
| `pnpm run slides` | Convert all PDFs in `assets/slides-sources/` |
| `pnpm run slides <name>` | Convert specific PDF |
| `pnpm run slides:clean` | Remove generated images |

### Setup

```shell
# Install dependencies (macOS)
brew install poppler webp

# Place PDF in source directory
cp ~/Downloads/my-presentation.pdf assets/slides-sources/

# Create slide content directory with _index.md (see below)
mkdir -p content/slides/my-presentation

# Convert to WebP slides
pnpm run slides
```

The script validates that:
- Content directory `content/slides/<name>/` exists
- `_index.md` has `reveal_hugo.width` and `reveal_hugo.height` matching PDF dimensions at 200 DPI

Output: `assets/generated/slides/my-presentation/page-01.webp`, `page-02.webp`, etc.

### Configuration

Edit `scripts/convert-slides.sh` to adjust:
- `DPI=200` — Resolution (200 DPI optimal for retina displays)
- `WEBP_QUALITY=85` — Compression quality (0-100)

## Embedded Slides Shortcode

Embed Reveal.js slides directly in any page using the `slides` shortcode.

### Usage

```markdown
{{< slides src="slides/para-welcome-kit" >}}
{{< slides src="slides/para-welcome-kit" height="660px" >}}
{{< slides src="slides/para-welcome-kit" overview="false" notes="false" >}}
```

### Parameters

| Parameter | Default | Description |
|-----------|---------|-------------|
| `src` | required | Path to slide page (e.g., `slides/para-welcome-kit`) |
| `height` | responsive | Fixed container height (e.g., `600px`). If omitted, uses responsive aspect-ratio with max-height per breakpoint |
| `overview` | `true` | Enable O key for slide overview |
| `notes` | `true` | Enable S key for speaker notes |

### Slide Page Front Matter

Create `content/slides/<name>/_index.md`:

```yaml
---
title: "My Presentation"
outputs: ["Reveal"]
images_path: "generated/slides/my-presentation"  # Hugo Pipes loads from assets/
reveal_hugo:
  theme: white
  transition: slide
  width: 1700      # Must match PDF width at DPI
  height: 2200     # Must match PDF height at DPI
  margin: 0
  controls: true
  progress: true
---

{{< slide background-image="page-01.webp" background-size="cover" background-color="#f0f0f0" >}}

---

{{< slide background-image="page-02.webp" background-size="cover" background-color="#f0f0f0" visibility="hidden" >}}

---

{{< slide background-image="page-03.webp" background-size="cover" background-color="#f0f0f0" >}}
```

### Skipping Slides

Add `visibility="hidden"` to any slide to skip it during navigation:

```markdown
{{< slide background-image="page-02.webp" ... visibility="hidden" >}}
```

### Responsive Behavior

- **Mobile (<640px):** Scroll view with swipe navigation, edge-to-edge
- **Desktop (≥640px):** Classic view with arrow controls + keyboard

Container heights by breakpoint (when no fixed `height` specified):

| Breakpoint | Max Height |
|------------|------------|
| sm (640px) | 500px |
| md (768px) | 600px |
| lg (1024px) | 700px |
| xl (1280px) | 800px |
| 2xl (1536px) | 900px |

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

### Analytics & Tracking

For a comprehensive website analytics setup with Google Tag Manager and Google Analytics 4:
- **[GTM Setup Guide](docs/GTM_SETUP_GUIDE.md)** - Complete implementation guide for professional portfolio tracking

### Tailwind CSS Breakpoints

The site uses Tailwind CSS v4 with default breakpoints:

| Breakpoint | Value | Pixels |
|------------|-------|--------|
| **sm** | 40rem | 640px |
| **md** | 48rem | 768px |
| **lg** | 64rem | 1024px |
| **xl** | 80rem | 1280px |
| **2xl** | 96rem | 1536px |

To verify actual breakpoints from compiled CSS:

```shell
# Build and extract breakpoint values from compiled CSS
hugo --environment production && \
  grep -oh "@media[^{]*min-width:[^{]*{" public/css/*.css 2>/dev/null | \
  grep -oE "min-width:\s*[0-9]+[a-z]+" | sort -u
```

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