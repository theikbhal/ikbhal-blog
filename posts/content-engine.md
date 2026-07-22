## Content Engine — PHP + SQLite Tracker for Daily Content Sprint

Built a minimalistic, mobile-first, dark mode PHP app today to track my daily content creation workflow. No framework, no auth, just SQLite and plain PHP.

[theikbhal/content-engine](https://github.com/theikbhal/content-engine)

### The Problem

Every day I need to hit: 50 DMs, 10 Reels, 1 YT Long, 10–25 Shorts. Two fixed blocks — content sprint (2pm–4pm) and planning (7pm–9pm, 1–2 pomodoros). My brain leaks progress across the day. I needed something dead simple to tap a button and see where I stand.

### What I Built

```
desktop backend/
  php backend/
    index.php          # router
    database.php       # SQLite init
    api/               # REST endpoints
    public/            # SPA frontend
    docs/help.html     # help page
```

- **4 counter buttons** — DM, Reel, YT Long, Shorts. Tap to increment, optionally add details (who you DM'd, reel title, URL, platform)
- **Calendar views** — daily stats grid, weekly bar chart, monthly grid with dots. Tap any date to jump there
- **Focus sessions** — pomodoro tracking for sprint/plan blocks
- **Dark mode** — minimalistic, mobile-first CSS with no dependencies
- **No auth** — it's just me

### API

All JSON, all simple:

```
GET  /api/activities?date=YYYY-MM-DD
POST /api/activities  {"increment":true,"type":"dm","details":{}}
GET  /api/stats?date=YYYY-MM-DD
GET  /api/focus?date=YYYY-MM-DD
POST /api/focus
GET  /api/goals?date=YYYY-MM-DD
PUT  /api/goals
```

The most satisfying endpoint is the increment — merge an existing activity row or create one, attach JSON details for context.

### Tech

- PHP 8.5 (plain), SQLite 3, HTML/CSS/JS (vanilla)
- `php -S localhost:8080 -t . index.php`
- Hosted on InfinityFree (free PHP hosting, MySQL + SQLite)
- ~15 files, ~2000 lines total

### What's Next

- Set up the InfinityFree deployment
- Actually use it tomorrow during the 2pm sprint
- Maybe add a quick counter on the lock screen (progressive web app)

---

*Built in one afternoon. Shipped to GitHub. Blogged it. Little win.*
