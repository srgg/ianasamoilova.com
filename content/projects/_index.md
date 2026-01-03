---
title: 'Projects'
date: '2024-05-19'
type: landing
_build:
  list: never

#draft: true  
cascade:
  show_subtitle: true
  
#design:
  # Section spacing
#  spacing: '5rem'

# Page sections
sections:
  - block: collection
    content:
      title: Things Taking Shape
      text: A glimpse of what I'm working on
      sort_by: 'Weight'
      sort_ascending: true
      filters:
        folders:
            - projects    
    design:
      css_class: projects-collection
      view: article-grid
      fill_image: true
      columns: 3
      show_date: false
      show_read_time: false
      show_read_more: true
---

