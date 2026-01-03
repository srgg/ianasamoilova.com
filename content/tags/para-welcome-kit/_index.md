---
title: "PARA Welcome Kit"
slug: para-welcome-kit
type: landing
summary: "Explore all PARA Welcome Kit materials — guides, tools, and practical resources to support new paraeducators as they begin their work in Special Education"
description: "Practical PARA Welcome Kit resources, guides, and tools to help new paraeducators feel confident, prepared, and supported in Special Education"
draft: false

spacing:
    padding: ["0", "0", "0", "0"]

sections:
  - block: cta-image-paragraph
    content:
      items:
        - title:
          text: "The PARA Welcome Kit is a set of practical resources, guides, and tools designed to help new paraeducators feel confident, prepared, and supported in Special Education—from day one"
          image: logo-para-welcome-kit.svg
    design:
      css_class: cta-with-divider para-welcome-header
      spacing:
        padding: ["0", "0", "0", "0"]

  - block: collection
    content:
      sort_by: 'Weight'
      sort_ascending: true
      filters:
        folders:
          - projects
        tag: "PARA Welcome Kit"
      count: 0
    design:
      view: article-grid
      fill_image: false
      columns: 2
      css_class: hide-tags
      show_read_time: false
      spacing:
        padding: ["0", "0", "5em", "0"]

  - block: collection
    content:
      title: "Related Posts"
      filters:
        folders:
          - blog
        tag: "PARA Welcome Kit"
      count: 0
    design:
      css_class: related-posts
      spacing:
        padding: ["0", "0", "0", "0"]
      view: date-title-summary
      columns: 1
---