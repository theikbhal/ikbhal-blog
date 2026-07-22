## Current Status: Not Done Yet

I've been saying "submitting to the App Store soon" for a while now. Here's exactly where things stand — and what's left.

## What's Done

- [x] Apple Developer account (`theikbhal@gmail.com`) — active
- [x] App built with Expo SDK 54 / React Native
- [x] `app.json` configured with production bundle ID `com.littlewins.app`
- [x] App icon — 1024x1024 PNG in `assets/`
- [x] Privacy policy created and deployed
- [x] App Store metadata written (title, description, keywords)
- [x] EAS CLI installed
- [x] `eas.json` configured with production build profile
- [x] `usesNonExemptEncryption: false` set (no encryption)
- [x] TypeScript compiles with zero errors

## What's Left

- [ ] Generate iOS certificates and provisioning profiles in Apple Developer Portal
- [ ] Create app entry in App Store Connect
- [ ] Take proper screenshots (6.5" and 5.5" displays)
- [ ] Run `eas build --platform ios --profile production`
- [ ] Fix any build errors
- [ ] Submit via `eas submit` or Transporter
- [ ] Wait for review (and inevitably fix rejections)

## The Blockers

**Screenshots.** The app is functional but the UI isn't polished enough for screenshots I'm happy with. The icon could be better. A few spacing issues. Nothing major, but enough to make me procrastinate.

**Certificates.** Every time I deal with Apple Developer Portal certificates, provisioning profiles, and signing, I lose at least an afternoon to confusing error messages. I know the flow — create a certificate, download it, configure it in EAS — but I keep putting it off.

**Perfectionism.** The app works. People could use it. But putting it on the App Store feels final in a way that running it locally doesn't. Once it's out there, strangers can download it and judge it. That's the whole point of building in public, but it's still uncomfortable.

## What I'm Doing About It

1. Ship the screenshots this week — even if they're not perfect
2. Follow the EAS build guide step by step
3. Submit. If it gets rejected, I'll fix it and resubmit.
4. Write the next post about the actual submission experience

The goal is to have Little Wins live on the App Store by end of this week. No more "soon."

---

*Will update this post once it's actually submitted. Accountability works.*
