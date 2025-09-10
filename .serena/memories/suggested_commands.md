# Suggested Commands

## Development Commands
- `npm install` - Install dependencies
- `npm run dev` - Start Hugo development server (port 1313)
- `npm run tina` - Start TinaCMS with Hugo (recommended for content editing)
- `npm run tina-audit` - Validate TinaCMS schema and content
- `npm run build` - Build production site

## TinaCMS Development
- `npm run tina` starts both Hugo server and TinaCMS admin interface
- Hugo server runs on port 1313
- TinaCMS admin interface runs on port 4001
- Access admin at `http://localhost:4001/admin`

## System Commands (Darwin/macOS)
- `hugo server --disableFastRender` - Direct Hugo development server
- `hugo --minify` - Build minified production site
- `git status` - Check git status
- `git log --oneline -10` - View recent commits
- `ls -la` - List files with details
- `find . -name "*.md"` - Find markdown files
- `grep -r "pattern" content/` - Search in content files

## Testing & Validation
- `npm run tina-audit` - Validate TinaCMS configuration and content
- Check build locally with `npm run build` before deploying

## Deployment
- Push to `main` branch triggers automatic deployment via GitHub Actions
- Manual deployment can be triggered from GitHub Actions tab
- Site deploys to GitHub Pages at https://ianasamoilova.com/