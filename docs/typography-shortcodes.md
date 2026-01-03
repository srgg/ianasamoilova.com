# Typography Shortcodes

Hugo shortcodes for narrative typography. Terminology from journalism, print design, and screenwriting.

- **Shortcode templates:** `layouts/_shortcodes/typo/`
- **CSS styles:** `assets/css/typography.css`

---

## Quick Reference

| Shortcode                   | Type   | When to Use                                                                       |
|-----------------------------|--------|-----------------------------------------------------------------------------------|
| [`lede`](#lede)             | block  | First paragraph that hooks the reader with tension, surprise, or stakes           |
| [`pull-quote`](#pull-quote) | block  | Standalone statement pulled from text to catch eye and break up long copy         |
| [`kicker`](#kicker)         | inline | Brief intro phrase before a list, verse, or key point ("Here's the thing:")       |
| [`nutgraf`](#nutgraf)       | block  | The paragraph explaining why this story matters—personal stakes, universal truth  |
| [`aside`](#aside)           | block  | Author steps back to reflect—philosophy, commentary, or parenthetical thought     |
| [`verse`](#verse)           | block  | Lyrical content with deliberate line breaks; source linebreaks preserved          |
| [`sign-off`](#sign-off)     | block  | Elegant closing that echoes theme; often includes location and date               |
| [`accent`](#accent)         | inline | Gentle mid-sentence emphasis—subtler than bold, guides the eye to insight         |
| [`slug`](#slug)             | inline | Small-caps label for category or section (1-3 words: "Opinion", "From the Field") |
| [`callout`](#callout)       | block  | Boxed highlight for statistics, key findings, or facts readers shouldn't miss     |
| [`beat`](#beat)             | empty  | White space signaling shift in tone/topic; optional rule (horizontal line)        |
| [`runaround`](#runaround)   | block  | Image with text flowing beside it; supports lightbox and wrap modes               |
| [`grid`](#grid)             | block  | Responsive columns using pipe syntax; stacks on mobile, side-by-side on desktop   |

---
## lede

**Origin:** Journalism misspelling of "lead" to distinguish from a lead type in printing.

**What it is:** The opening hook—first paragraph that draws readers in.

**Element:** `<p class="lede">`

```markdown
{{< typo/lede >}}Your opening paragraph.{{< /typo/lede >}}
```

### Examples

**Great:**
> *Every year, schools host a holiday poster contest—one that the SPED department is usually expected to skip, not because students can't participate, but because it's assumed they shouldn't.*

Creates tension through contradiction. Reader wants to know what happened next.

**Mediocre:**
> *This is an article about a school art project.*

States topic without intrigue. **Fix:** Add conflict, surprise, or stakes.

**Bad:**
> *In this essay I will discuss the importance of inclusive education.*

Announces intent instead of demonstrating it. **Fix:** Show, don't tell. Start with a scene or moment.

---

## pull-quote

**Origin:** Print term for a quote "pulled" from body text and displayed prominently.

**What it is:** An impactful statement displayed with visual emphasis to catch the eye and break up text.

**Element:** `<p class="pull-quote">`

```markdown
{{< typo/pull-quote >}}Key statement here.{{< /typo/pull-quote >}}
```

### Examples

**Great:**
> *What mattered most wasn't the final poster. It was the **process**—hand by hand, moment by moment.*

Emotionally resonant. Works standalone. Reveals deeper meaning.

**Mediocre:**
> *The project was successful and students enjoyed it.*

Forgettable summary. **Fix:** Find the emotional core—what made it meaningful?

**Bad:**
> *According to research, 73% of participants reported satisfaction.*

Data belongs in a callout, not a pull-quote. **Fix:** Use `typo/callout` for statistics. Pull-quotes are for human moments.

---

## kicker

**Origin:** Journalism term for short line above/before a headline.

**What it is:** A brief phrase that sets up what follows. The "Here's the thing..." before your point.

**Element:** `<span class="kicker">`

**Smart pairing:** When followed by a list (`ul`/`ol`), the gap between kicker and list is automatically removed, and list items render compact—creating a tight visual unit. Works whether the kicker is inline or on its own line.

```markdown
{{< typo/kicker >}}Setup phrase:{{< /typo/kicker >}}
```

### Examples

**Great:**
> *Hands tell stories before words do:*

Poetic, creates anticipation. Colon signals something follows.

**Mediocre:**
> *Here are some things hands do:*

Functional but flat. **Fix:** Add metaphor or emotional weight.

**Bad:**
> *The following list describes hand behaviors:*

Technical documentation tone. **Fix:** Write for humans, not forms. Remove "the following."

---

## nutgraf

**Origin:** Journalism slang: "nut" (core/essence) + "graf" (paragraph).

**What it is:** The paragraph answering "so what?"—why this story matters.

**Element:** `<p class="nutgraf">`

```markdown
{{< typo/nutgraf >}}Why this matters.{{< /typo/nutgraf >}}
```

### Examples

**Great:**
> *I'm sharing this project as part of my professional reflection as a future SPED teacher. Not because it was extraordinary, but because it was ordinary—and still so often withheld.*

Personal stakes + universal truth. The twist ("ordinary...withheld") lands.

**Mediocre:**
> *This project matters because inclusion is important.*

States the obvious. **Fix:** Be specific. What makes THIS matter? To whom?

**Bad:**
> *The purpose of this article is to inform readers about inclusive education practices.*

Academic abstract tone. **Fix:** Remove "the purpose of" and speak directly.

---

## aside

**Origin:** Theater term—actor speaks to the audience, breaking from a scene.

**What it is:** Author steps back to offer personal reflection or commentary. Related but apart from main narrative.

**Element:** `<p class="aside">`

```markdown
{{< typo/aside >}}Personal reflection here.{{< /typo/aside >}}
```

### Examples

**Great:**
> ***That is how I understand special education:** not as a system that tries to make everyone the same, but as a space where differences are recognized—and allowed to belong.*

Authentic voice. Philosophy revealed through contrast. Bold lead-in works.

**Mediocre:**
> *I think special education is important.*

Opinion without depth. **Fix:** Show your worldview, don't just state an opinion.

**Bad:**
> *Note: Special education refers to educational programs designed for students with disabilities.*

Footnote tone. **Fix:** Use actual footnotes for definitions. Asides are for voice, not glossary.

---

## verse

**Origin:** Latin "versus"—a turn of the plow, a line of writing.

**What it is:** Poetic content with deliberate line breaks. Source line breaks preserved automatically.

**Element:** `<p class="verse">`

```markdown
{{< typo/verse >}}
Line one...
Line two...
{{< /typo/verse >}}
```

### Examples

**Great:**
> *They fidget, flap, hesitate, reach out, pull back...*
> *They explore before they explain...*
> *They communicate...*
> *They learn...*

Rhythm and progression. Each line builds. Verbs carry meaning.

**Mediocre:**
> *Hands move*
> *Hands touch*
> *Hands feel*

Repetitive structure without progression. **Fix:** Vary rhythm. Add development between lines.

**Bad:**
> *Step 1: Dip hand in paint*
> *Step 2: Press on paper*

Instructions, not poetry. **Fix:** Use a numbered list. Verse is for lyrical content, not procedures.

---

## sign-off

**Origin:** Broadcasting/journalism term for closing. Also "valediction."

**What it is:** Elegant closing—author's farewell that leaves lasting impression.

**Element:** `<p class="sign-off">`

```markdown
{{< typo/sign-off >}}
Closing line<br/>
Location, Date
{{< /typo/sign-off >}}
```

### Examples

**Great:**
> *Different hands. One shared miracle.*
> *Colorado Springs, 2025*

Echoes the title/theme. Simple. Memorable.

**Mediocre:**
> *Thank you for reading.*
> *The Author*

Polite but generic. **Fix:** Connect to the piece's core idea.

**Bad:**
> *In conclusion, this article has discussed the importance of inclusion in special education.*

Summarizes instead of resonates. **Fix:** Delete "in conclusion." End with an image or echo, not a recap.

---

## accent

**Origin:** Latin "accentus"—song added to speech.

**What it is:** Subtle inline emphasis. A whisper, not a shout.

**Element:** `<span class="accent">`

```markdown
{{< typo/accent >}}Emphasized phrase.{{< /typo/accent >}} Rest of sentence.
```

### Examples

**Great:**
> *{{< typo/accent >}}Inclusion doesn't always look big.{{< /typo/accent >}} Sometimes it looks like paint on small hands.*

Draws eye to insight. Second sentence delivers.

**Mediocre:**
> *{{< typo/accent >}}This is important.{{< /typo/accent >}} Please remember it.*

Emphasis on vague claim. **Fix:** Be specific about what's important.

**Bad:**
> *{{< typo/accent >}}Click here to learn more.{{< /typo/accent >}}*

Wrong use case. **Fix:** Use a button or link for CTAs. Accent is for meaning, not navigation.

---

## slug

**Origin:** Metal "slugs" identified stories in newspaper production.

**What it is:** Short small-caps label—category, section, or article type marker.

**Element:** `<span class="slug">`

**Smart pairing:** Like kicker, when followed by a list, the gap is removed and items render compact.

```markdown
{{< typo/slug >}}Category{{< /typo/slug >}}
```

### Examples

**Great:**
> *{{< typo/slug >}}From the Classroom{{< /typo/slug >}}*

Contextualizes content. 3 words. Specific.

**Mediocre:**
> *{{< typo/slug >}}Article{{< /typo/slug >}}*

Too generic. **Fix:** What kind of article? Be specific.

**Bad:**
> *{{< typo/slug >}}Click Here For More Information About This Topic{{< /typo/slug >}}*

Way too long. **Fix:** Slugs are 1-3 words maximum. This is a link, not a slug.

---

## callout

**Origin:** Design term for box that "calls out" key information.

**What it is:** Highlighted box for crucial data, findings, or quotes readers shouldn't miss.

**Element:** `<div class="callout">`

```markdown
{{< typo/callout >}}
**Key finding:** Data or insight here.
{{< /typo/callout >}}
```

### Examples

**Great:**
> ***Key finding:** 73% of students showed improvement after participating in inclusive art projects, compared to 45% in traditional settings.*

Specific data. Comparison adds meaning. Bold label guides eye.

**Mediocre:**
> *This is an important point to remember.*

Tells you it's important without showing. **Fix:** What's the actual point? State it.

**Bad:**
> *Warning: Please read the following information carefully before proceeding.*

Software dialog tone. **Fix:** Callouts highlight content, not meta-instructions.

---

## beat

**Origin:** Screenwriting "(beat)" indicates actor should pause. "Rule" is traditional typography term for a horizontal line.

**What it is:** Visual breathing room. Pause between sections signaling shift in tone or topic. Optionally includes a rule (horizontal separator line).

**Element:** `<div class="beat">` (self-closing, no content)

**Parameters:**
- `size`: sm (1em), md (1.5em), lg (2em), xl (2.5em, default)
- `rule`: horizontal line—`rule` alone for full-width; `rule="left"`, `rule="center"`, or `rule="right"` for positioned
- `width`: line width for positioned rules (e.g., "3em", "50%")

```markdown
{{< typo/beat >}}                              {{/* spacing only */}}
{{< typo/beat size="md" >}}                    {{/* smaller spacing */}}
{{< typo/beat rule >}}                         {{/* full-width rule (replaces ---) */}}
{{< typo/beat rule="center" width="3em" >}}    {{/* centered short rule */}}
{{< typo/beat size="md" rule="true" >}}        {{/* with other params, use rule="true" */}}
```

**Note:** Use `rule` alone for simple cases. When combining with other parameters like `size`, use `rule="true"` (Hugo doesn't allow mixing positional and named parameters).

### Examples

**Great:**
Used after emotional climax, before reflection. `{{< typo/beat rule >}}` replaces separate beat + `---`.

**Mediocre:**
Used between every paragraph. **Fix:** Reserve for genuine transitions. Overuse dilutes impact.

**Bad:**
Multiple beats in succession for "drama." **Fix:** One beat = one pause. Stack them and they mean nothing.

---

## runaround

**Origin:** Typesetting term for text that "runs around" an image.

**What it is:** Image-text layout with content flowing beside (and optionally below) a positioned image.

**Element:** `<div class="runaround-{side}">` or `<div class="runaround-wrap-{side}">`

```markdown
{{< typo/runaround side="left" image="photo.jpg" alt="Description" caption="*Caption*" >}}
Text beside the image.
{{< /typo/runaround >}}
```

**Parameters:** `side` (left/right), `flow` (column/wrap), `image`, `alt`, `caption`, `width`, `style`, `id` (custom lightbox ID, auto-generated if omitted)

**Flow modes:**

| Mode                      | Vertical Centering      | Text Below Image       |
|---------------------------|-------------------------|------------------------|
| `flow="column"` (default) | ✓ Yes - flexbox centers | ✗ No - stays in column |
| `flow="wrap"`             | ✗ No - starts at top    | ✓ Yes - wraps below    |

### Examples

**Great:**
Image and text tell complementary parts of the story. Image referenced in text. Alt text describes content.

**Mediocre:**
Image is decorative filler. Text doesn't mention it. **Fix:** Either integrate the image into narrative or remove it.

**Bad:**
No alt text. Caption is "Image 1." **Fix:** Alt text is required for accessibility. Captions should inform or enhance.

---

## grid

**Origin:** Design/typography term for the underlying structure organizing content on a page. Every newspaper and magazine layout is built on a grid system.

**What it is:** Responsive column layout—content displays side-by-side on desktop, stacks vertically on mobile. Uses pipe `|` syntax for familiar column definition.

**Element:** `<div class="typo-grid">`

**Parameters:**
- `widths`: column ratio like "2:1" or "1:2:1" (default: equal widths)
- `gap`: sm, md (default), lg—spacing between columns
- `debug`: true to show parsing debug info (default: false)

```markdown
{{< typo/grid >}}
| Column 1 | Column 2 |
{{< /typo/grid >}}

{{< typo/grid widths="2:1" gap="lg" >}}
| Wide column | Narrow column |
{{< /typo/grid >}}

{{< typo/grid >}}
| A | B | C |
{{< /typo/grid >}}
```

**Note:** Currently supports single-row column layouts. Multi-row grid support may be added later if needed. Content inside cells supports markdown and nested shortcodes.

### Examples

**Great:**
> ```
> {{< typo/grid >}}
> | {{< typo/slug >}}**Professional Focus**{{< /typo/slug >}}{{< collection ... >}} | {{< typo/slug >}}**Education**{{< /typo/slug >}}{{< collection ... >}} |
> {{< /typo/grid >}}
> ```

Related content grouped logically. Headers label each column. Responsive—reads well on both mobile and desktop.

**Mediocre:**
> ```
> {{< typo/grid >}}
> | Some text | More text | Even more | And more |
> {{< /typo/grid >}}
> ```

Too many columns—becomes unreadable on smaller screens. **Fix:** Limit to 2-3 columns. Consider if grid is the right tool.

**Bad:**
> ```
> {{< typo/grid >}}
> | Click here | Buy now | Subscribe |
> {{< /typo/grid >}}
> ```

Grid used for navigation buttons. **Fix:** Use proper navigation elements. Grid is for content layout, not UI components.

---

## For LLMs

When generating content:
1. **Match tone to purpose** — Lede hooks, nutgraf contextualizes, aside reflects
2. **Avoid meta-language** — No "In this article..." or "The following section..."
3. **Use sparingly** — Plain text is also typography
4. **Test inline shortcodes** — Accent and slug must work grammatically mid-sentence

When analyzing content:
- Pull-quotes: emotionally resonant sentences
- Nutgrafs: "so what" moments
- Beats: natural pause points
- Runarounds: image-text relationships
- Grids: parallel or comparative content needing side-by-side layout
- Kicker/slug + list: use kicker or slug to introduce bulleted/numbered lists (compact styling applied automatically)