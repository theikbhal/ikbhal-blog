## Xcode Build Failed: The fmt Pod Strikes Again

Tried to build Little Wins for the iPhone simulator today.

New icon. UI improvements. TypeScript clean. Ready to see it.

### What Happened

```
❌  call to consteval function ... is not a constant expression
```

5 errors, all in `Pods/fmt/include/fmt/format-inl.h`.

The `fmt` C++ library. A transitive dependency of React Native's Hermes engine. Breaking because my Xcode version is newer than what the pod expects.

### The Real Problem

This is the React Native tax. Every time you set up a project on a new machine or update Xcode, something breaks in the native build chain.

Not the JS code. Not the TypeScript. The native pods that you never touch and barely understand.

### The Stack

- Expo SDK 54 / React Native 0.79.2
- Xcode 17 with iOS 26.4 SDK
- CocoaPods 1.17.0
- `fmt` pod compiled with C++20 consteval rules that the older pod doesn't handle

### What I'll Try

- Update `react-native` to 0.81.5 (the version Expo SDK 54 recommends)
- Or pin the `fmt` pod version
- Or switch to Expo dev client with a newer template
- Or just accept that every build has friction and move on

### The Feeling

This is the stuff that makes me close the laptop.

I had momentum. New icon was ready. UI looked better. TypeScript compiled with zero errors. Then the native build chain says no.

Building software is 20% making things and 80% convincing the toolchain to cooperate.

---

*One failed build. Not a failed day.*
