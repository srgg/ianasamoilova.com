# Hugo Blox System Guide

## Overview
Hugo Blox is a modular system for Hugo that provides pre-built content blocks and templates. This project uses the Academic CV theme with Tailwind CSS integration.

## Module Configuration (`config/_default/module.yaml`)
- **Netlify Plugin:** `github.com/HugoBlox/hugo-blox-builder/modules/blox-plugin-netlify`
- **Tailwind CSS:** `github.com/HugoBlox/hugo-blox-builder/modules/blox-tailwind`
- **Block Mounts:** Community and all-access blocks mounted from `hugo-blox/blox/`

## Available Blocks (from TinaCMS config)
1. **collection** - Display collections of content
2. **cta-button-list** - Call-to-action with multiple buttons
3. **cta-card** - Call-to-action card
4. **cta-image-paragraph** - CTA with image and text
5. **features** - Feature list with icons and descriptions
6. **hero** - Hero/banner section
7. **markdown** - Custom markdown content
8. **resume-awards** - Awards section
9. **resume-biography** - Biography section
10. **resume-biography-3** - Alternative biography layout
11. **resume-experience** - Experience/work history
12. **resume-languages** - Language skills
13. **resume-skills** - Skills with progress bars
14. **stats** - Statistics display
15. **testimonials** - User testimonials

## Icon System
Hugo Blox uses multiple icon systems:

### Working Icon Formats:
1. **Heroicons** (social links): `at-symbol`, `brands/linkedin`, `brands/github`
2. **Brand Icons**: `brands/x`, `brands/instagram`, `academicons/google-scholar`
3. **Academic Icons**: `academicons/orcid`

### Problematic Icons (causing warnings):
- Skills section icons: `fa-universal-access`, `laptop-code`, `circle-stack`
- Hobbies section icons: `person-simple-walk`, `cat`, `camera`

### Icon Resolution:
- Hugo Blox looks for SVG icons in `assets/media/icons/hero/` directory
- Missing icons generate warnings but don't break the site
- Icons should be in SVG format with `.svg` extension

## Favicon
- **Location**: `assetperfects/media/icon.png` (exact filename required)
- **Size**: 512x512 PNG, transparent background
- **Convert**: `magick favicon.svg -background transparent assets/media/icon.png`
- **Note**: Hugo Blox auto-generates all other favicon sizes

## Content Structure Patterns

### Page Types:
- **Landing pages** (`type: landing`): Use sections with blocks
- **Regular pages**: Standard markdown with frontmatter
- **Author profiles**: Special structure in `content/authors/admin/`

### Section Configuration:
```yaml
sections:
  - block: [block-type]
    content:
      title: "Section Title"
      text: "Section content"
      # Block-specific fields
    design:
      css_class: "custom-class"
      background:
        color: "background-color"
        image:
          filename: "image.svg"
```

### Skills Configuration:
```yaml
skills:
  - name: "Skill Category"
    items:
      - name: "Skill Name"
        description: "Description"
        percent: 80
        icon: icon-name  # Expects SVG in assets/media/icons/hero/
```

### Social Profiles:
```yaml
profiles:
  - icon: at-symbol  # Works - built-in Heroicon
    url: "mailto:email"
  - icon: brands/linkedin  # Works - brand icon
    url: "https://linkedin.com/profile"
```

## TinaCMS Integration
- **Schema Location**: `tina/config.ts`
- **Comprehensive Fields**: All Hugo Blox blocks supported
- **Visual Editor**: Available at `http://localhost:4001/admin`
- **Real-time Preview**: Works with Hugo dev server

## Common Issues & Solutions

### Icon Warnings:
- **Problem**: `The icon 'icon-name.svg' was not found in assets/media/icons/hero/`
- **Solution**: Either create SVG files or use built-in icon names

### Background Images:
- **Location**: Place in `assets/media/`
- **Reference**: Use filename only (e.g., `stacked-peaks.svg`)
- **Supported**: SVG, PNG, JPG formats

### CSS Classes:
- **Tailwind**: Available through blox-tailwind module
- **Custom**: Can add custom CSS in `assets/css/custom.css`
- **Theme**: Use built-in classes like `dark` for dark backgrounds