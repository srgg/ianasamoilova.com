---
title: "Reveal.js Features Demo"
summary: "Demonstrating all reveal.js plugins and features"
date: 2025-01-12
outputs: ["Reveal"]
reveal_hugo:
  theme: white
  transition: slide
  controls: true
  progress: true
  history: true
  center: true
  highlight_theme: monokai
---

# Reveal.js Features Demo

All plugins working inline!

---

## Markdown Support

This slide is written in **Markdown**!

- Bullet points work
- *Italic* and **bold** text
- [Links](https://revealjs.com) too

---

## Code Highlighting

JavaScript example:

```javascript
function greet(name) {
  const message = `Hello, ${name}!`;
  console.log(message);
  return message;
}

greet("World");
```

---

## More Code Examples

Python:

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print([fibonacci(i) for i in range(10)])
```

---

## Fragment Animations

Press → to reveal items one by one:

{{% fragment %}}First item appears{{% /fragment %}}

{{% fragment %}}Then this one{{% /fragment %}}

{{% fragment %}}And finally this!{{% /fragment %}}

---

## Speaker Notes

This slide has speaker notes!

Press **S** to open the speaker view.

{{< note >}}
These are speaker notes that only the presenter sees.

You can include:
- Talking points
- Reminders
- Additional context
{{< /note >}}

---

{{< slide id="vertical-start" >}}

## Vertical Slides

Press ↓ to go down

---

{{< slide >}}

### Vertical Slide 1

You navigated down!

Press ↓ again...

---

{{< slide >}}

### Vertical Slide 2

One more...

---

{{< slide >}}

### Vertical Slide 3

Press → to continue to the next section

---

## Zoom Feature

Hold **Alt** and **click** on any element to zoom in.

Try it on this text or the code below:

```html
<div class="container">
  <h1>Zoom me!</h1>
</div>
```

---

## Overview Mode

Press **O** to see all slides at once.

This helps navigate large presentations quickly.

---

## Transitions

This presentation uses the **slide** transition.

Available transitions:
- none
- fade
- slide
- convex
- concave
- zoom

---

{{< slide background-color="#4a86e8" >}}

## Background Colors

Slides can have custom background colors!

---

{{< slide background-color="#2d2d2d" class="has-dark-background" >}}

## Dark Background

With proper text contrast

---

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| ← → | Navigate |
| ↑ ↓ | Vertical slides |
| F | Fullscreen |
| O | Overview |
| S | Speaker notes |
| Esc | Exit mode |

---

# The End

All plugins are working!
