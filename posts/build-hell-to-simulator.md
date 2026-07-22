## From Build Hell to Running on Simulator

Took 4 tries to get Little Wins running on the iPhone simulator today.

### Round 1: fmt Pod

```
call to consteval function ... is not a constant expression
```

The `fmt` C++ library. A transitive dependency of React Native's Hermes engine. Breaking because Xcode 17 uses a newer C++ standard.

Fix: Patched the Podfile to force C++17 on the `fmt` target.

### Round 2: RCTReleaseLevel

```
cannot find 'RCTReleaseLevel' in scope
```

The React Native version in package.json (0.79.2) was too old for the Expo SDK 54 Swift code. Expo expected RN 0.81.5 but was pinned to 0.79.2.

Fix: Updated all deps — RN, types, TypeScript — to match what Expo SDK 54 expects.

### Round 3: Blank Screen

Finally builds, installs on simulator, opens... blank screen.

Not a code bug. The Metro bundler had been killed when the build process timed out. The app launched with no JS server to connect to.

Fix: Kill the app, restart Metro, re-launch.

### What It Feels Like

Three rounds of fighting the toolchain before writing a single line of app code.

Each error is logical in isolation. But together they create a wall. Most people hit this wall and close the laptop.

I almost did. Three times.

### The Meta

Writing this post instead of working on the app. Classic avoidance pattern. But at least now the simulator is running.

---

*Build hell is part of the process. Not a sign to stop.*
