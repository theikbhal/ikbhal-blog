## 1000 Things — The Gamified Collection Tracker I Built in One Session

ADHD brain needed a new container. Something that could hold ideas, links, videos, counters, checkboxes — all the scattered stuff that lives in my tabs, notes, and DMs. I wanted to fill 1000 slots and level up while doing it.

So I built it.

### Why 1000?

100 is too easy. 300 is still low. 500 is getting there. 700 is real effort. 1000 is Legend.

I wanted a grid I could look at and feel the weight of what I'd collected. Each cell is a decision, a memory, a resource I thought was worth keeping.

### The Grid

25 rows × 40 columns = exactly 1000 cells. Each cell can be one of 13 types:

- **Text** — short notes, ideas
- **Link** — URLs with optional labels
- **Counter** — a number that goes up
- **Checkbox** — checked or unchecked
- **Image** — displays from a URL
- **YouTube / YouTube Short** — video links
- **Instagram Reel / Instagram Profile** — IG content
- **Twitter/X** — tweets and profiles
- **Pinterest** — pins and boards
- **Input** — editable text field

[GitHub: theikbhal/1000things](https://github.com/theikbhal/1000things) — [live demo](https://1000things.vercel.app)

### Building It

Next.js 16, Tailwind CSS v4, Supabase for storage, Vercel for deployment. Lucide for icons, Sonner for toasts, react-confetti for the celebrations.

I used OpenCode + DeepSeek V4 Flash Free (my current AI coding setup). One session from `create-next-app` to a fully working grid. The chat is saved to `~/Desktop/aichat/` — that's my publishing workflow now.

```bash
npx create-next-app@latest 1000things --typescript --tailwind --eslint --app --src-dir
npm install @supabase/supabase-js lucide-react date-fns sonner react-confetti
```

### The Level System

| Level | Milestone | Color |
|-------|-----------|-------|
| Starter | 0 cells | Gray |
| Collector | 100 cells | Green |
| Curator | 300 cells | Blue |
| Architect | 500 cells | Purple |
| Master | 700 cells | Amber |
| Legend | 1000 cells | Red |

Fill enough cells, you level up. Confetti fires, toast pops, progress bar fills. The ADHD dopamine loop — small rewards for sustained attention.

### Bulk Operations

Select multiple cells (Shift/Ctrl+click or Select All) and:

- Change all their types at once
- Fill from text (one line per cell)
- Export selected or all cells as JSON
- Import previous exports

This matters when you want to restructure a section without clicking 100 times.

### Demo Mode

Hit the Demo button and the grid fills intelligently:
- 0–100: checkboxes
- 100–300: counters
- 300–500: text notes
- 500–700: YouTube Shorts
- 700–1000: Instagram profiles

Instantly see what a full grid looks like. Then reset and start your own.

### Calendar View

Not everything needs a grid. Switch to calendar view to see your cells organized by date. Color-coded dots show which type is dominant on each day.

### What's Next

- Supabase Auth so you can save grids per user
- Drag and drop reordering
- More cell types (maps, audio, files)
- Shareable grid snapshots
- Mobile app (this wants to be in your pocket)

### The Real Win

I shipped a working app in one session. Every feature I wanted is there. The code is clean, the UI is dark and colorful, the interactions feel good. That's the ADHD superpower — hyperfocus on the right thing, and you get a 1000-cell gamified collection tracker before lunch.

---

*Little win logged 🎉*

`~/Desktop/websites/1000things` — Next.js, Supabase, Vercel
