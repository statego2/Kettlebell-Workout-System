# Kettlebell Workout System

A premium, static web app for tracking kettlebell progression as a level-based ascent.

## Concept

The app treats kettlebell weights as strength levels. Previous weights become conquered terrain, the current weight is the active climb, and nearby upcoming weights stay visible without overwhelming the user with the full ladder.

Core ladder:

```text
8 -> 12 -> 16 -> 20 -> 24 -> 28 -> 32 -> 36 -> 40 -> 44 -> 48 kg
```

## Current MVP

- Setup current level and highest unlocked kettlebell
- First-run setup with optional demo mode
- Home dashboard with weekly target, level work, and readiness signal
- Nearby level strip instead of a long intimidating ladder
- Mountain-style level map for conquered terrain
- Log Max Level, Medium Kettlebell, and Other workouts
- Edit, delete, and undo workout logs
- Monthly history chart
- Bodyweight stat tracking
- Manual level conquest instead of fixed workout thresholds
- Manual conquest confirmation modal
- Level timeline with active/conquered history
- Local browser persistence
- JSON save and upload backup

## Run Locally

Open `index.html` directly in a browser.

You can also serve the folder with any static server:

```bash
python3 -m http.server 4173
```

Then visit:

```text
http://localhost:4173
```

## GitHub Pages

This app is static and can be hosted with GitHub Pages from the repository root.

Recommended repository:

```text
https://github.com/statego2/Kettlebell-Workout-System
```
