## Testing Little Wins on iPhone Simulator — Screenshots & Screen Recording

Yes, you can screen record and take screenshots from the iOS Simulator on Mac. No extra tools needed.

### Screenshots

```bash
xcrun simctl io booted screenshot screenshot.png
```

That's it. One command. Saves a PNG at the device's native resolution.

I used this to grab screenshots of Little Wins running on the iPhone 17 simulator (iOS 26.4).

### Screen Recording

```bash
xcrun simctl io booted recordVideo --codec=h264 output.mp4
```

Press Ctrl+C to stop recording. Outputs H.264 MP4 — ready for Instagram Reels or upload.

### Why This Matters

Testing on a real iPhone is ideal. But:

- I don't have an iPhone
- Simulator is free and fast
- Screenshots are pixel-perfect for App Store listing
- Screen recordings can be turned into Reels or demo videos

The App Store requires screenshots at specific sizes (6.7", 6.5", 5.5" displays). Simulator lets me generate them without a physical device.

### What I'm Testing

Little Wins is running on the simulator right now:

- Home screen layout → looks clean
- Adding a win → works
- Delete/edit → needs polish
- Dark mode → renders correctly

The icon needs App Store verification still, and the launch is pending. But the app works.

### Today's Status

- [x] iPhone Simulator booted
- [x] App installed & running
- [x] Screenshots captured
- [ ] App icon verified
- [ ] App Store launch done

Getting there.

---

*Screenshots saved to /tmp/. Ready for App Store upload.*
