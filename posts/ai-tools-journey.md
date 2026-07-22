## My AI Coding Tool Journey (and Why I'm on DeepSeek V4 Flash Free)

I don't have money for AI credits. No $20/month subscriptions. No API bills. So I've spent a lot of time finding tools that actually work for free.

Here's the path I took.

## Phase 1: ChatGPT

Started with ChatGPT. The free version. It worked for answering questions, generating snippets, and helping me think through problems. But the context window is small, it doesn't know my codebase, and copy-pasting code back and forth gets old fast.

## Phase 2: Windsurf (Paid)

Bought the paid version of Windsurf. It's an AI IDE with deep codebase understanding — one of the best coding experiences I've had. The autocomplete is incredible. The agent can navigate your project, edit files, run commands. It felt like the future.

But it's expensive. When the subscription ran out, I couldn't justify renewing. No budget.

## Phase 3: Antigravity (Free → Paid)

Tried Antigravity's free version. It's good. Different approach — less IDE integration, more agent-based. The free tier was usable but limited. Upgraded to paid briefly. Again, good product, but the cost adds up.

I need something sustainable. Free. Permanent.

## Phase 4: OpenCode + DeepSeek V4 Flash Free

This is what I'm using now. OpenCode is an open-source AI coding assistant. You bring your own model.

DeepSeek V4 Flash is free. No credits. No usage limits. No hidden paywalls. It's fast enough for most tasks, understands code context, and works directly in the terminal.

Is it as good as Windsurf or Claude? No. But it's free. And for the kind of work I do — building small apps, fixing bugs, writing scripts — it's more than enough.

The trade-off I made:
- Free, unlimited → I can use it as much as I want
- Good enough → it gets things done, just slower than premium models
- Terminal-based → less fancy than a GUI IDE, but I've gotten used to it

## What I Found: Omnirouter

Just recently discovered Omnirouter. Haven't fully explored it yet. It looks like it routes requests across multiple free AI models — basically a load balancer for free tiers. If it works, it could be a game changer.

Need to test it more.

## The Pattern

Every few months, a new AI tool comes out. I try it. It's amazing. The free tier runs out. I move on.

The ones that stick are the ones that stay free without crippling limits. OpenCode + DeepSeek V4 Flash is the first setup that's lasted more than a month.

## Bonus: Project Tracker — The App I Built Because I Forget Everything

I have a problem: I build things and then forget where I put them.

I've got projects scattered across `~/Desktop/apps/`, `~/workspace/`, and random folders everywhere. I'd open a terminal, want to work on something, and spend 10 minutes trying to remember where the project lives, how to start it, and what I was even doing.

So I built **Project Tracker** — a local macOS desktop app (Deno-based) that keeps track of every project I've ever started.

### Where It Lives

```
/Users/ikbhal/workspace/dyno_desktop_workspace/v2local_projects/Project Tracker.app
```

### How I Use It

Every project gets an entry with:
- **Name** — what it's called
- **Type** — website, script, android, ios, daemon, other
- **Local path** — where to find it on disk
- **Status** — active, paused, completed, archived
- **How to start / stop** — so I don't have to remember the command
- **GitHub repo** — link
- **Vercel URL** — if deployed
- **Notes** — why I started it, how it works, main goal

Data is stored at `~/.project-tracker/projects.json`.

### Quick Open

```bash
open "/Users/ikbhal/workspace/dyno_desktop_workspace/v2local_projects/Project Tracker.app"
```

### Why This Matters for ADHD

The "what was I working on?" loop is one of the biggest time wasters. Every time I context-switch, I lose momentum trying to find where I left off. Project Tracker removes that friction — open the app, see all projects, pick one, the path and commands are right there.

I still forget to update it sometimes. But when I remember, it saves me minutes of searching.

---

*If you know other free setups that work well for coding, reach out. Always looking.*
