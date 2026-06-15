---
title: The anatomy of a buttery smooth scroll
date: 2026-04-12
tag: Craft
excerpt: Smooth scrolling looks simple and is anything but. A short tour of the easing, interpolation and restraint behind a scroll that feels right.
---

"Smooth scroll" is one of those things you only notice when it's done badly.
Get it right and visitors just feel that the site is *expensive*.

## It starts with interpolation

Native scrolling snaps to wherever the wheel says. Smooth scrolling instead
chases a target value every frame, easing toward it. The gap between where you
are and where you're going is what creates that liquid sense of momentum.

## Easing is taste, not maths

There's no single correct curve. Too slow and the page feels seasick; too fast
and you lose the effect entirely. We tune the easing by feel, on real hardware,
until it disappears.

## Restraint is the hard part

The temptation is to animate everything. The discipline is knowing when a
section should simply *arrive* — quietly, once — and then get out of the way of
the content.

Want a site that feels like this? [Start a project](/contact/).
