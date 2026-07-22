## I Tried Flutter, Came Back to React Native, and Here's Why

I built one Android app in Flutter. Never published it. Then I switched back to React Native + Expo for Little Wins.

Here's what happened.

## The Flutter Experiment

A while ago I decided to try Flutter. Everyone was talking about it. Single codebase, native performance, beautiful widgets, Google-backed. Sounded great.

I built an Android app — a simple utility thing. Learned Dart along the way. The hot reload was nice. The widget system is well designed. Material Design 3 looks clean out of the box.

But something felt off.

### What Didn't Click

- **Dart** — It's fine. But it's not JavaScript. I know JS deeply. Every time I wanted to do something simple, I had to look up Dart syntax. Not hard, just friction.
- **Ecosystem** — Need a package? `pub.dev` has most things. But the quality is inconsistent and the community is smaller. For React Native, if there's a problem, someone has already solved it on Stack Overflow, GitHub, or a blog.
- **Tooling** — Android Studio is heavy. Xcode is required for iOS anyway. Flutter adds another layer. With Expo, I just need VS Code and a terminal.
- **Publishing** — Google Play Console felt hostile. I never shipped. The barrier felt higher than it needed to be for a solo dev building small things.

The app worked. It compiled. It ran. But I wasn't excited to open the project.

## Why I Came Back to React Native + Expo

When I started Little Wins, I didn't even think about it. React Native was the default.

### Expo SDK 54

Expo has changed dramatically. No more ejecting. No more native module pain for 90% of apps. `expo-dev-client` if you need custom native code. EAS Build handles certificates and builds. `expo go` for instant testing on device.

For an app that stores everything locally (AsyncStorage), no login, no cloud — Expo is perfect. I don't need native modules. I don't need to touch Xcode except for screenshots.

### Developer Experience

- Hot reload is instant
- TypeScript first class
- Same language (JS/TS) for frontend, backend (if any), and tooling
- VS Code extensions work great
- Terminal + browser-based workflow suits my ADHD brain better than a heavy IDE

### Comparison

| | Flutter | React Native + Expo |
|---|---|---|
| Language | Dart (learn new) | JavaScript/TypeScript (already know) |
| Hot reload | Yes | Yes |
| Package mgr | pub.dev | npm + expo |
| Dev setup | Android Studio + Xcode | VS Code + terminal |
| Build | Manual | EAS (cloud) |
| Community | Smaller | Massive |
| App Store friction | Same for iOS | Same for iOS |
| Play Store friction | High (never shipped) | Same (haven't tried) |

## Was Flutter Bad? No.

Flutter is a good framework. The rendering model is better than React Native's bridge (soon to be replaced by the new architecture anyway). The widget system is more consistent. The performance is great.

But "better" doesn't matter if it doesn't fit how you work.

For me:
- JS/TS is home
- Expo removes almost all native pain
- The RN community is bigger, which means more answers, more packages, more examples
- I can ship faster with fewer tools open

## Would I Try Flutter Again?

Maybe. For a specific kind of app — something that needs heavy animation, custom rendering, or where the RN bridge would be a bottleneck — Flutter would be the better technical choice.

But for the apps I build: small, local-first, little tools that solve one problem well — React Native + Expo is the right fit. It lets me focus on the app, not the framework.

---

*Sticking with what works. Little win.*
