---
name: Abyss Launcher
description: The launcher's own dark world, driven like its Ctrl+K command palette.
colors:
  abyss-ground: "#0b0b12"
  abyss-ground-2: "#101019"
  card: "#15151f"
  card-hover: "#1a1a28"
  raised: "#1e1e2e"
  hairline: "rgba(255, 255, 255, 0.055)"
  hairline-strong: "rgba(255, 255, 255, 0.09)"
  text: "#eaeaf6"
  text-2: "#b9b9d3"
  text-3: "#8a8ab3"
  accent: "#1d6fff"
  accent-dim: "#1450cc"
  accent-bright: "#60a5fa"
  on-accent: "#ffffff"
  on-accent-pill: "rgba(0, 0, 0, 0.28)"
  fill: "#1c6bf5"
  marine-snow: "#b4acff"
  scrollbar: "#2a2a3e"
typography:
  display:
    fontFamily: "Pixelify Sans, Qrafty, system-ui, sans-serif"
    fontSize: "clamp(2rem, 0.9rem + 5vw, 5.75rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Pixelify Sans, Qrafty, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 1.1rem + 2.9vw, 3.5rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.005em"
  title:
    fontFamily: "Pixelify Sans, Qrafty, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 0.95rem + 2.1vw, 2.6rem)"
    fontWeight: 600
    lineHeight: 1.08
  command:
    fontFamily: "Pixelify Sans, Qrafty, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 500
    lineHeight: 1
  body-lead:
    fontFamily: "Onest, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)"
    fontWeight: 400
    lineHeight: 1.65
  body:
    fontFamily: "Onest, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Pixelify Sans, Qrafty, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.08em"
  key:
    fontFamily: "Qrafty, Pixelify Sans, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.02em"
  wordmark:
    fontFamily: "Qrafty, Pixelify Sans, system-ui, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.08em"
rounded:
  key: "6px"
  sm: "8px"
  cmd: "10px"
  btn: "12px"
  menu: "14px"
  row: "16px"
  palette: "18px"
  round: "50%"
spacing:
  hair: "6px"
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "clamp(28px, 4.5vw, 72px)"
  section: "clamp(80px, 11vw, 150px)"
  wrap: "1200px"
  bar-h: "64px"
components:
  cmd:
    textColor: "{colors.text-3}"
    typography: "{typography.command}"
    rounded: "{rounded.cmd}"
    padding: "0 12px"
    height: "42px"
  cmd-active:
    backgroundColor: "{colors.fill}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.cmd}"
  palette:
    backgroundColor: "rgba(21, 21, 31, 0.84)"
    rounded: "{rounded.palette}"
    width: "min(100%, 640px)"
  row:
    backgroundColor: "rgba(16, 16, 25, 0.72)"
    textColor: "{colors.text}"
    typography: "{typography.title}"
    rounded: "{rounded.row}"
    padding: "10px clamp(16px, 2.2vw, 30px)"
  row-selected:
    backgroundColor: "{colors.fill}"
    textColor: "{colors.on-accent}"
    rounded: "{rounded.row}"
  close-band:
    backgroundColor: "{colors.fill}"
    textColor: "{colors.on-accent}"
    typography: "{typography.display}"
    padding: "clamp(30px, 5.5vw, 76px) var(--gutter)"
  close-band-hover:
    backgroundColor: "{colors.accent-dim}"
    textColor: "{colors.on-accent}"
  key:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.text-2}"
    typography: "{typography.key}"
    rounded: "{rounded.key}"
    padding: "0 6px"
    height: "22px"
  button:
    backgroundColor: "{colors.card}"
    textColor: "{colors.text}"
    rounded: "{rounded.btn}"
    padding: "0 12px 0 16px"
    height: "48px"
  button-hover:
    backgroundColor: "{colors.card-hover}"
  pill:
    backgroundColor: "rgba(255, 255, 255, 0.03)"
    textColor: "{colors.text-3}"
    rounded: "{rounded.cmd}"
    padding: "0 8px 0 12px"
    height: "38px"
  lang-button:
    backgroundColor: "rgba(255, 255, 255, 0.03)"
    rounded: "{rounded.round}"
    size: "38px"
  lang-menu:
    backgroundColor: "rgba(21, 21, 31, 0.96)"
    rounded: "{rounded.menu}"
    padding: "6px"
  swatch:
    rounded: "{rounded.round}"
    size: "34px"
  toast:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.text-2}"
    rounded: "{rounded.btn}"
    padding: "14px 16px"
---

# Design System: Abyss Launcher

## Overview

**Creative North Star: "The Selected Row"**

The site is the launcher, seen from outside. Every surface is a near-black ground under slow falling particles and a 2.8% grain, and the one thing that ever lights up is a selection: a command row filled solid with the accent, exactly as it looks inside the app's Ctrl+K palette. Section headings are palette rows that fill as they reach the reading line, the hero is a working palette with the download row already selected, and the page ends on one full-bleed selected row. If something on the page is blue, it is selected or it is interactive; nothing else earns the color.

Density is calm and dark: large pixel-type headings over a quiet grotesk for reading, generous vertical rhythm between sections, real screenshots of the launcher that dim when they are not the current section. Depth comes from translucency and blur (frosted palette, frosted bar, soft long shadows), never from bright surfaces. The whole page recolors live with the launcher's 15 accent presets, so every accent-bearing rule is written against tokens, never literal blue.

**Key Characteristics:**
- Four stepped near-black grounds, hairline borders, three text greys.
- One accent family (accent / dim / bright) plus a contrast-derived selection fill; all runtime-swappable.
- Pixel type for headings, commands, keys and numerals; Onest for reading.
- Selection is the only emphasis: solid fill, white (or dark) text, a quiet pill for the hint.
- Frosted, translucent containers with long soft shadows; no bright cards.
- Motion is a single ease-out curve; the signature move is a left-to-right fill sweep.

## Colors

A nocturnal, blue-violet-tinted greyscale with a single swappable accent that appears only as selection and interactive signal.

### Primary
- **Abyss Blue** (accent): the launcher's default accent. Source of the whole accent family; used for the skip link, text selection tint (55% mix), and as the base the selection fill is derived from.
- **Selection Fill** (fill): the accent deepened just far enough that small white text clears 4.5:1. Every "selected" surface uses it: active command row, selected section row, close band. Never use raw accent as a fill behind small text.
- **Deep Abyss** (accent-dim): the close band's hover sweep, the one place a second accent tone fills a surface.
- **Surface Glint** (accent-bright): the accent as it reads on the dark ground: links, focus outline (2px, 3px offset), caret, icons inside buttons and toasts, the wordmark, the active language check, the lang button's open border, the current accent name.
- **On Accent** (on-accent) and **Hint Pill** (on-accent-pill): text on any fill, and the darkened (or lightened) pill behind a hint inside a selected row.

### Neutral
- **Abyss Ground** (abyss-ground): page, html, scrollbar track, the 404, the theme-color. Also the ring gap around a checked swatch.
- **Abyss Ground 2** (abyss-ground-2): the base under the resting section row (applied at 72% alpha).
- **Card** (card) / **Card Hover** (card-hover): buttons and the screenshot placeholder; the palette and language menu are this card tone at 84 to 96% alpha.
- **Raised** (raised): keycaps and toasts, the brightest opaque surface.
- **Hairline** (hairline): dividers inside the palette, resting row border, footer rule, requirement rules, scrolled bar edge.
- **Hairline Strong** (hairline-strong): borders on interactive or floating things: keys, pill, lang button and menu, palette, screenshots, buttons, toast, row hints. Hover lifts a border to rgba(255,255,255,0.16).
- **Text** (text): headings, command labels, input text, hovered controls.
- **Text 2** (text-2): body copy, facts, key legends.
- **Text 3** (text-3): hints, meta lines, palette group labels, captions, resting icons.
- **Marine Snow** (marine-snow): the falling particles only, drawn on canvas at 0.18 to 0.73 alpha.

### Accent presets
The page ships the launcher's 15 presets (accent / dim / bright), applied at runtime by swatch and persisted; an inline head script restores the saved set before first paint so the page never flashes the default. Order: Abyss #1d6fff, Blue #3b82f6, Cobalt #0ea5e9, Indigo #6366f1, Navy #1e40af, Violet #7c6af7, Cyan #06b6d4, Green #22c55e, Emerald #10b981, Pink #ec4899, Fuchsia #d946ef, Orange #f97316, Gold #eab308, Red #ef4444, White #e2e8f0. Full triples live in the sidecar.

Contrast logic, computed per preset with WCAG luminance:
1. If the accent reaches less than 3:1 against white it is a *light* accent (Cobalt, Cyan, Green, Emerald, Orange, Gold, White): on-accent becomes Abyss Ground, the hint pill becomes rgba(255,255,255,0.4), and the fill is the accent itself.
2. Otherwise on-accent is white, the pill is rgba(0,0,0,0.28), and the fill is the accent mixed toward black in growing steps (4%, 8%, 12%...) until white reaches 4.6:1. The default preset yields the fill token above (4.70:1).
3. All six values (accent, dim, bright, on-accent, pill, fill) are written together as custom properties; nothing downstream picks its own text color.

### Named Rules
**The Selection-Only Rule.** Accent fills mean "selected" and nothing else: active command, section row in view, the close band. No accent backgrounds on badges, cards, dividers or decoration.

**The Derived Fill Rule.** Any new surface that carries text on the accent uses the fill token with on-accent text, never the raw accent, so every preset keeps small text at 4.5:1 or better.

**The Token-Only Accent Rule.** Accent-bearing CSS references the six accent custom properties, never a literal blue; a hard-coded hex breaks the live swatches.

## Typography

**Display Font:** Pixelify Sans (with Qrafty, system-ui)
**Body Font:** Onest (with system-ui, -apple-system, Segoe UI)
**Label/Mono Font:** Qrafty (with Pixelify Sans, system-ui), for the wordmark, keys and numerals

**Character:** A blocky pixel face with Cyrillic coverage carries every heading and command so all seven languages keep the launcher's voice; Qrafty, the app's own pixel face, is reserved for ASCII-only moments (wordmark, keycaps, version numbers); Onest stays out of the way for reading.

### Hierarchy
- **Display** (700, clamp(2rem, 0.9rem + 5vw, 5.75rem), 1): the close band title only.
- **Headline** (600, clamp(2.1rem, 1.1rem + 2.9vw, 3.5rem), 1.04): the hero H1. Script splits it into sentence spans so it breaks between sentences, never inside one.
- **Title** (600, clamp(1.5rem, 0.95rem + 2.1vw, 2.6rem), 1.08): section row headings.
- **Command** (500, 1.0625rem, 1): command labels in the palette; also the button face (500, 1rem) and the current accent name (600, 1rem).
- **Body lead** (400, clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem), 1.65): section intro paragraphs, max 44ch (52ch in split layouts, 60ch under 960px). Hero sub: same family, 62ch.
- **Body** (400, 1rem, 1.6): facts (1.45 line-height), requirements (1.0625rem, 1.55).
- **Small** (Onest, 0.8125 to 0.9375rem): hints, meta lines, captions, palette foot, toast. Row hints use Onest 500, 0.875rem.
- **Label** (Pixelify 500, 0.75rem, 0.08em, uppercase): palette group names ("Start", "What it does"), inside the palette only.
- **Key** (Qrafty 400, 0.75rem, 0.02em): keycaps and the `.q` numeral span (version strings).

### Named Rules
**The ASCII Gate Rule.** Qrafty is declared with unicode-range U+0020-007E and only ships ASCII. Anything that may be translated falls to Pixelify Sans or Onest automatically; never put Qrafty first on a translated string that could carry accents or Cyrillic unless the fallback is acceptable glyph by glyph (the localized "Ctrl"/"Strg" key label is ASCII in every locale).

**The Pixel-Heads, Grotesk-Reads Rule.** Pixel faces for anything you scan or press (headings, commands, keys, buttons); Onest for anything you read as a sentence.

## Layout

Single column of stacked feature sections inside a 1200px wrap (`min(100% - 32px, 1200px)`). The top bar is sticky, 64px (58px under 640px), frosted, and gains a hairline bottom edge once scrolled past 8px. Page gutter is `max(16px, (100vw - 1200px) / 2)`; screenshots may bleed past the wrap into the gutter by up to (gutter - 28px) on their outer side.

- **Hero:** fills the viewport under the bar, centered; the Home screenshot sits behind at ~1240px, 34% opacity, blurred 1.5px, radial-masked. Palette is 640px max.
- **Feature section:** top padding clamp(80px, 11vw, 150px); a full-width section row, then a two-column body 5fr / 7fr (text / shot), flipped 7fr / 5fr on alternating sections, gap clamp(28px, 4.5vw, 72px). Variants: full-width wide (text split 6fr / 5fr above the shot), palette section 6fr / 5fr centered, requirements as a two-column hairline-ruled list.
- **Close:** full-bleed band after clamp(110px, 14vw, 190px), meta row below inside the wrap.
- **Rhythm:** small steps of 6, 8, 10, 12, 16px inside components; fluid clamps between blocks.

Responsive:
- **At 960px:** every feature body and split collapses to one column, flipped sections return text first, bleeds are removed, requirements go single column, the palette screenshot caps at 560px.
- **At 640px:** bar height 58px; the search pill becomes a 38px icon button; hero drops min-height; palette radius 16px, foot and Ctrl K key hidden; command rows grow to 48px, lose their hints and Enter glyph except the primary download row, which wraps its label and drops its hint to a second line; section rows go to 14px radius and lose their hint; close band 34px vertical padding and no Enter glyph; close meta stacks; footer single column; toast spans the width with 12px insets.

## Elevation & Depth

Depth is tonal and atmospheric: translucent card tones over the particle field, backdrop blur (14px on the bar, 18px on palette and menus, 8px on the dialog backdrop), and long, soft, low-opacity black shadows with large negative spread. There are no hard or offset shadows and no glows.

### Shadow Vocabulary
- **Palette lift** (`box-shadow: 0 40px 90px -30px rgba(0,0,0,0.85), 0 8px 24px -8px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)`): the command palette, hero and overlay.
- **Screenshot** (`box-shadow: 0 50px 90px -40px rgba(0,0,0,0.9), 0 12px 30px -12px rgba(0,0,0,0.55)`): every feature screenshot.
- **Menu** (`box-shadow: 0 24px 60px -16px rgba(0,0,0,0.7), 0 2px 8px rgba(0,0,0,0.35)`): the language menu.
- **Toast** (`box-shadow: 0 24px 50px -18px rgba(0,0,0,0.8), 0 4px 12px rgba(0,0,0,0.35)`): notifications.

### Named Rules
**The Frosted Glass Rule.** Anything that floats over content is a translucent card tone with backdrop blur and a strong hairline; opaque bright panels do not exist.

**The Spotlight Rule.** Feature screenshots rest dimmed (brightness 0.74, saturate 0.8) and return to full color when their section is current, over 0.9s on the house ease. Only applied when JS is running.

## Shapes

Soft rounded rectangles on a stepped radius scale that grows with the element: keys 6px, small buttons 8px, command rows and the pill 10px, buttons and toasts 12px, screenshots and menus 14px, section rows 16px, the palette 18px. Round (50%) only for the flag button, flags and swatches; the hero meta line is a 999px capsule. The close band is the lone square-edged surface, running edge to edge. Separators are 3px squares with 1px radius, never bullets or pipes. Icons are 1.75px-stroke line icons from one inline SVG sprite, round caps and joins.

## Components

### Command Palette
The signature: one real palette element used in the hero and lifted into a modal dialog (Ctrl+K or /) anywhere on the page.
- **Container:** card tone at 84% (94% in the dialog), 18px radius, strong hairline, palette-lift shadow, 18px blur. Border tints to accent-bright at 45% when focused within.
- **Search:** 14px 16px padding, hairline under it; input Onest 500 1.0625rem, caret accent-bright; a Ctrl K keycap at the right (hidden in the dialog, which shows a close button instead).
- **Groups:** uppercase pixel label, 9px 12px 5px padding.
- **Foot:** hairline above, keycaps with "move / run / close" legends in text-3.
- **Dialog:** 640px wide, min(12vh, 120px) from the top, backdrop rgba(6,6,12,0.62) with 8px blur; enters with a 10px drop and 0.98 scale over 0.26s. Extra commands stay hidden in the hero until a search asks for them.

### Command Row
- **Shape:** 42px tall grid (icon 20px, label, hint, Enter glyph 18px), 12px gap, 10px radius.
- **Rest:** pixel label in text, icon and hint in text-3.
- **Active:** fill background, everything on-accent, the hint gains the on-accent pill (3px 8px, 6px radius), the Enter glyph fades in. Transitions 0.12s.
- **Primary row:** the download command, pre-selected; carries version (Qrafty) and size separated by a square dot.

### Section Row
A section heading built as a palette row.
- **Rest:** 72% ground-2 translucent, hairline border, 16px radius, min-height clamp(64px, 6.6vw, 92px); icon, title, bordered hint (8px radius) and a masked Enter glyph in text-3.
- **Selected (in view):** a fill layer sweeps in from the left (scaleX 0 to 1, 0.7s, house ease); border goes transparent; icon, title and glyph turn on-accent over 0.35s; hint gains the on-accent pill. Exactly one row is selected at a time: the section crossing 42% of the viewport height.

### Close Band
One enormous selected row: full-bleed fill, display-size pixel title, large download icon and Enter glyph. Hover sweeps accent-dim in from the left (0.6s) and nudges the Enter glyph 6px left. Focus: 3px text-color outline inset 6px.

### Keys
- **Style:** raised background, strong hairline with a 2px bottom border (a keycap edge, not a shadow), 6px radius, 22px tall, 6px side padding, Qrafty 0.75rem. Icon keys: 3px padding, 13px arrow icon at 2.2 stroke. In the palette foot, paired keys sit 2px closer.

### Buttons and Top Bar Controls
- **Button:** card background, strong hairline, 12px radius, 48px tall, pixel 500 1rem label, accent-bright icon. Hover: card-hover plus lifted border; active: 1px press.
- **Search pill:** 38px, 3% white, strong hairline, 10px radius, text-3 label plus keycap; hover to text, 5% white.
- **Icon button:** 38px, 10px radius, transparent; hover 5% white and text color.

### Language Flag Menu
- **Button:** 38px round, 3% white, strong hairline, 30px circular flag. Hover or open: accent-bright border; active: scale 0.94.
- **Menu:** anchored top right, 212px min, 6px padding, card at 96% with 18px blur, 14px radius, menu shadow; enters with a 6px drop and 0.97 scale (0.22s). Items 42px, 9px radius, 24px flag with a 1px white-12% ring, Onest 500 0.95rem native language name; hover/focus 6% white; checked item shows an accent-bright check. Full keyboard: arrows, Home, End, Escape.

### Swatches
34px circles in a wrapping row (10px gap, 360px max) filled with each preset, 1px inner white-12% ring. Hover scales 1.1. Checked: 3px ground gap then a 2px ring in the swatch color. Radio group with roving tabindex and arrow keys; the current preset name shows below in accent-bright pixel type.

### Toast
The launcher's notification: fixed bottom right (20px), raised surface, strong hairline, 12px radius, 14px 16px padding, toast shadow, accent-bright leading icon, Onest 0.9375rem. Rises 12px over 0.4s; auto-hides after 7s.

### Screenshots
Real launcher captures at 14px radius (18px for the palette capture), strong hairline, card placeholder, screenshot shadow, 0.8125rem text-3 caption. Dimmed until their section is current (see The Spotlight Rule).

### Internationalization
Seven locales in menu order: es-419 (Latino), es-ES (Español), en (English, default and fallback for any missing key), it, fr, de, ru. Strings live in one table; markup carries `data-i18n`, `data-i18n-placeholder`, `data-i18n-aria` and `data-i18n-alt`. Choice comes from `?lang=`, then storage, then English; `html[lang]`, title and description update with it. Numbers and dates use `Intl` in the active locale. Layout must tolerate the longest locale (German, Russian) without fixed widths: command labels ellipsize, the pill label has a 5.5em minimum.

## Do's and Don'ts

### Do:
- **Do** express emphasis by selecting: fill background with on-accent text and the on-accent pill for secondary text.
- **Do** reference the six accent custom properties for every accent use so the 15 presets recolor it.
- **Do** keep Qrafty to ASCII content (wordmark, keycaps, versions) and let Pixelify Sans carry translated headings.
- **Do** use the house ease cubic-bezier(0.16, 1, 0.3, 1) for sweeps, entrances and presses; keep the fill sweep left to right.
- **Do** float things as frosted translucent card tones with a strong hairline and long soft shadow.
- **Do** honor reduced motion: transitions and animations collapse to near zero and the particles render one still frame.

### Don't:
- **Don't** fill any surface with the accent unless it is selected or is the close band.
- **Don't** put small white text on the raw accent; use the derived fill.
- **Don't** add hard offset shadows or glows; depth is blur and long soft shadow.
- **Don't** lift the uppercase palette group label out of the palette as a label above headings.
- **Don't** hard-code a locale string in markup without a data-i18n key and an English entry.
