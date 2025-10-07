---
# Leave the homepage title empty to use the site title
title: ""
date: '2022-10-24'
type: landing

cascade:
  design:
    spacing: "4rem 1.5rem 0 1.5rem"
    
design:
  spacing: "4rem 1.5rem 0 1.5rem"

  # Default section spacing    
  background:
    color: black
    image:
        filename: stacked-peaks.svg
        filters:
            brightness: 1.0
        size: cover
        position: center
        parallax: false

sections:
  - block: resume-biography-3
    # URL for cross-linking to a detailed experience page
    experience_url: experience/
    skills_url: skills
    content:
      # Choose a user profile to display (a folder name within `content/authors/`)
      username: admin
      text: ""
      # Show a call-to-action button under your biography? (optional)
      button:
        text: Download CV
        url: resume.pdf
    design:
      css_class: dark
      # Avatar customization
      avatar:
        size: medium  # Options: small (150px), medium (200px, default), large (320px), xl (400px), xxl (500px)
        shape: circle # Options: circle (default), square, rounded
---