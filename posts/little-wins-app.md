## What is Little Wins?

Little Wins is a tiny iPhone app for ADHD brains. Log small achievements, celebrate with confetti, set one focus at a time, quick-capture thoughts — no accounts, no cloud, no tracking.

But the app is just the latest version of an idea I've been circling for years.

## The Backstory

Back in my PHP days, I built a website where I'd log my daily wins. It was ugly, barely functional, and only I used it. But it worked. Every evening I'd dump whatever I accomplished that day — sent an email, finished a task, woke up on time — and somehow it made me feel better.

The habit stuck. I've been logging wins in various forms ever since. Notes app, spreadsheets, random text files. Nothing ever felt right.

Then I built the [Mac menu bar version](https://github.com/theikbhal/little-wins) (Electron, tray-based, opens with a click). Used it daily. The dopamine hit of tapping "celebrate" and seeing confetti was real. I wanted that on my phone.

So I built the iPhone version.

## Tech Stack

```
Expo SDK 54
React Native 0.79
TypeScript
@react-navigation/bottom-tabs
@react-native-async-storage/async-storage
```

All data is stored locally using `AsyncStorage` — a simple key-value store that lives on the device. When you delete the app, the data goes with it.

### Why Expo over bare RN?

- Faster iteration. No Xcode project fiddling until the very end.
- OTA updates if I ever need them.
- Same codebase could go to Android if I wanted.

### Why AsyncStorage over SQLite / WatermelonDB?

The data model is tiny. Wins, focus, notes — all flat arrays. No relations, no joins. AsyncStorage's JSON-in-string-out model is a perfect fit. No need to pull in a database for what amounts to a few KB of JSON.

## How the UI Looks

Four tabs, bottom navigation, no headers:

| Tab | Icon | What it does |
|-----|------|-------------|
| Wins | 🎉 | Scrollable list of wins. Tap to celebrate (confetti + haptic). Swipe/long-press to delete. |
| Focus | 🎯 | Set ONE focus item. Large card display. Complete it to clear. No lists. |
| ParNotes | 📝 | Quick-capture scratchpad. Long-press to delete. |
| Settings | ⚙️ | Theme toggle (dark/light/system), stats, help, clear data. |

Dark black background (`#000`), green accent (`#00FF87`), minimal borders. Light mode is white with green accents. Follows system theme by default.

## What's Missing (By Design)

- **No login.** Open the app, start logging. That's it.
- **No cloud sync.** Your wins stay on your phone.
- **No analytics.** No tracking pixels, no crash reporters.
- **No notifications.** The app doesn't ask for permission to ping you.
- **No account deletion emails.** Just delete the app.

## Screenshots

Coming soon — still finalizing the icon and tweaking a few screens before the App Store submission.

## What's Next

1. Submit to the App Store (theikbhal@gmail.com Apple Developer account is ready)
2. Fix any rejection issues
3. Ship a few polish updates
4. Maybe Android if there's demand

---

*Little win logged 🎉 — first App Store-bound app shipped to beta.*
