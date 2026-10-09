# CodeBox2GO

Codebox editor with Shiki highlighting, a 1920 × 1080 preview, and transparent PNG exports at 2× resolution.

## Run

`npm install` then `npm run dev`. `npm run build` creates the production build;
`npm run lint` checks the source.

## Themes

- **Midnight Grid** (default): saved preset with #0c1218 background, #10171e codebox, #6f729b dots.
- **Blue Grid**: #20295b background, #242e63 codebox, #7584c5 dots.
- **Classic Dark**: original neutral codebox colors with a matching dark grid.
- **Classic Purple**: original #191a2d purple codebox with a coordinated purple background.

Selecting a theme applies its full visual preset without discarding the code, language,
title, or export filename. Background and
codebox controls allow custom colors, animation, border, opacity, font size, and line numbers.

The saved Midnight Grid personal template is independent of this project and remains unchanged.
Its exact 32 × 18 grid positions, 7px dot size, seeded phases, 4/5/6/10 second opacity
cycles and 60-second overall loop are reused. At Full HD, code is 59px Consolas in a
1440px-wide box. Install Consolas for identical typography on another operating system.

## Record and export

Use **Fullscreen** to display only the slide, with no application overlay or cursor.
Press **Esc** to return. A 16:9 screen fills completely; other shapes preserve the
slide proportions with matching-color margins. Browsers may briefly show their own
standard fullscreen notice when entering; wait for it to disappear before recording.

**CodeBox Only** exports the codebox with its current theme, title, and code on a
transparent canvas, without the slide background. The PNG uses twice the codebox's
native width and height, independent of the editor preview size.

The live preview is static markup with no editable fields inside the recording frame.
Use the Code and Title (optional) fields in the sidebar to edit it.
