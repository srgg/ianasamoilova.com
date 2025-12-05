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
      title: Projects
#      text: I enjoy making things. Here is a selection of projects that I have worked on over the years.
      sort_by: 'Weight'
      sort_ascending: true
      filters:
#        subdirs: '*'
#        page_type: landing
        folders:
            - projects    
    design:
      view: article-grid
      fill_image: false
      columns: 2
      show_date: false
      show_read_time: false
      show_read_more: false
---

