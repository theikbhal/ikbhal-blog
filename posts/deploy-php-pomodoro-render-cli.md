## How I Deployed My PHP Pomodoro App to Render Using the Render CLI

Recently, I deployed my PHP Pomodoro application to Render using the latest Render CLI from my Mac mini. Along the way I encountered a few issues, including changes in the CLI syntax and workspace configuration. This guide documents the complete workflow I followed — from installing the CLI to creating a live web service.

### Environment

- **Computer:** Mac mini
- **Operating System:** macOS
- **Local Project Path:** `~/Desktop/render/pomdoro/`
- **Source Code:** [theikbhal/php-pomodoro-app](https://github.com/theikbhal/php-pomodoro-app)
- **Hosting Platform:** Render
- **Application:** PHP Pomodoro Timer
- **Authentication:** Google SSO

### Step 1: Install the Render CLI

```bash
brew install render
```

```bash
render --version
# Render CLI v2.22.0
```

To update:

```bash
brew update && brew upgrade render
```

### Step 2: Authenticate with Render

```bash
render login
```

Opens your browser automatically. I signed in with Google SSO.

### Step 3: Find Your Workspace ID

Open [Render Dashboard](https://dashboard.render.com) → **Workspace Settings** → copy your **Workspace ID**.

Example: `tea-d955qcpoagis738hhs60`

### Step 4: Set the Active Workspace

```bash
render workspace set tea-d955qcpoagis738hhs60
render workspace current
```

If you skip this step, you get:

```
Error:
no workspace set
```

### Step 5: Create the Web Service

```bash
cd ~/Desktop/render/pomdoro/

render services create \
  --type web_service \
  --name php-pomodoro-app \
  --repo https://github.com/theikbhal/php-pomodoro-app \
  --branch main \
  --runtime docker
```

Render auto-connects GitHub, clones the repo, builds the Docker image, and deploys.

### Step 6: Verify

```bash
render services list

# Name                php-pomodoro-app
# Type                Web Service
# ID                  srv-d9h05a84n6ts739ur89g
```

Dashboard: [https://dashboard.render.com/web/srv-d9h05a84n6ts739ur89g](https://dashboard.render.com/web/srv-d9h05a84n6ts739ur89g)

### Useful CLI Commands

```bash
render workspace current
render services list
render services show srv-d9h05a84n6ts739ur89g
render logs srv-d9h05a84n6ts739ur89g
```

### Common Errors

**Error: `invalid argument "web" for "--type"`**

Solution: Use `--type web_service` instead of `--type web`. The latest CLI changed this option.

**Error: `no workspace set`**

Solution: `render workspace set <your-workspace-id>`

### Why I Chose Render

Free Hobby workspace, Docker support, GitHub integration, automatic HTTPS, continuous deployment, easy CLI.

### Key Lessons

- Install the latest Render CLI
- Authenticate with `render login`
- Sign in with Google SSO
- Set your active workspace before creating services
- Use `--type web_service` (not `--type web`)
- One command to create, Render handles the rest

---

*Deploying PHP Pomodoro — logged 🎉*
