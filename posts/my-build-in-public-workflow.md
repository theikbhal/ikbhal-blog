## How I Build in Public — OpenCode + Desktop/Aichats Workflow

I don't sit down and "write a blog post." I have conversations with OpenCode (my AI coding tool), and at the end I say "save this as a blog post." Here's how it actually works.

### The Flow

Every session goes like this:

1. **I ask a question** or work through a problem in OpenCode terminal
2. OpenCode researches, suggests tools, we go back and forth
3. At some point I say **"create a blog post about this"**
4. OpenCode writes the markdown, saves it, updates the manifest, commits and pushes

I never open a text editor to write. I never think about formatting. I just talk through what I'm doing and the post comes out the other end.

### Where Content Lives

The raw notes go into `~/Desktop/aichats/`. This is my ADHD catch-all for useful conversations:

```
~/Desktop/aichats/
├── ig-reels-tools-mac.md   # CapCut, VN, Canva notes + steps
├── thamil-payil.md          # earlier chat
└── thamil-textbook/         # earlier chat
```

When a conversation has useful info, I tell OpenCode to save it as an `.md` file there. Later, if it's blog-worthy, I say "turn this into a blog post" and OpenCode creates the file in `~/Desktop/ikbhal-blog/posts/` and adds it to manifest.

### The Build-in-Public Skill

OpenCode has a **build-in-public skill** (`~/.config/opencode/skills/build-in-public/SKILL.md`) that knows:

- Blog repo: `~/Desktop/ikbhal-blog`
- Deploy: Vercel, auto-deploys from GitHub
- Post format: markdown + manifest.json entry
- Templates, snippet styles, emoji rules

When I say "use the build-in-public skill," OpenCode loads those instructions and follows them — correct path, correct format, commit & push. No me remembering steps.

### Why This Works for ADHD

- **No context switch** — I'm already in terminal talking to OpenCode
- **No blank page** — the post is a byproduct of a conversation, not a writing task
- **No remembering** — the skill has all the paths and rules
- **One command deploy** — "commit and push" and Vercel does the rest

The blog grows without me feeling like I'm writing. I'm just solving problems out loud.

### The Chain

```
Terminal session → OpenCode conversation
  → saved to ~/Desktop/aichats/*.md
    → turned into ikbhal-blog/posts/*.md
      → manifest.json updated
        → git commit + push
          → Vercel deploys
```

Seven steps, zero friction, all from one terminal.

---

*Skill file: ~/.config/opencode/skills/build-in-public/SKILL.md*
*Blog repo: ~/Desktop/ikbhal-blog*
*Live at: ikbhal-blog.vercel.app*
