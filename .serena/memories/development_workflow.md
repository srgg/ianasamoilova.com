# Development Workflow

## Task Completion Checklist
When a development task is completed, run:
1. `npm run tina-audit` - Validate TinaCMS schema and content integrity
2. `npm run build` - Ensure production build works without errors
3. Test the site locally with `npm run dev` if needed
4. Check git status and commit changes with descriptive messages

## Content Editing Workflow
1. **For visual editing:** Use `npm run tina` and edit via TinaCMS admin at `http://localhost:4001/admin`
2. **For direct editing:** Edit markdown files in `content/` directory
3. **Validate changes:** Run `npm run tina-audit` after content changes

## Deployment Process
1. Create feature branch from `main`
2. Make changes and test locally
3. Commit with descriptive messages
4. Push branch and create Pull Request to `main`
5. After PR merge, GitHub Actions automatically deploys to GitHub Pages
6. Site available at https://ianasamoilova.com/

## Git Workflow
- Main branch: `main`
- Create feature branches for development
- Use descriptive commit messages
- PR reviews recommended for significant changes

## Development Environment
- Hugo Extended v0.148.2 required
- Node.js v18+ required
- npm as package manager (switched from pnpm)