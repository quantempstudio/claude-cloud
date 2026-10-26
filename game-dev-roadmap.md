# Mobile Game Dev Roadmap: 1 Hour a Day, 12 Weeks

**Engine:** Godot 4 (free, small, exports to Android and iOS, simple GDScript language).
**Daily rule:** 1 hour. About 40 min learning, 20 min building. Days 6–7 of each week are for practice.
**Goal:** by week 12, a small finished mobile game on itch.io or Google Play.

## Tools to install (all free)
- Godot 4: https://godotengine.org/download
- Art: Krita https://krita.org or LibreSprite (pixel art) https://libresprite.github.io
- Sound: jsfxr https://sfxr.me · Audacity https://www.audacityteam.org
- Free assets: Kenney https://kenney.nl/assets · OpenGameArt https://opengameart.org · Freesound https://freesound.org

---

## Week 1 — Game design basics (no code yet)
| Day | Topic | Resource |
|---|---|---|
| 1 | What makes a game fun | Game Maker's Toolkit (YouTube): https://www.youtube.com/@GMTK |
| 2 | Core loop: action → reward → repeat | GMTK videos on game loops / "What makes good level design" |
| 3 | What makes mobile different (short sessions, touch, one hand) | Search YouTube: "hyper casual game design" |
| 4 | Play 5 top free mobile games and write down their core loops | Google Play / App Store top charts |
| 5 | Write a 1-page idea for a tiny game | Template: name, core loop, controls, win/lose |
| 6–7 | Practice: make a paper prototype of your idea | Paper + pen |

## Week 2 — Godot editor
| Day | Topic | Resource |
|---|---|---|
| 1 | Install Godot, tour the editor | Docs, Getting Started: https://docs.godotengine.org/en/stable/getting_started/introduction/index.html |
| 2 | Nodes and scenes | Docs: "Nodes and Scenes" |
| 3 | Scene instancing | Docs: "Creating instances" |
| 4 | Your first script | Docs: "Scripting languages" + "Creating your first script" |
| 5 | Input and moving a sprite | Docs: "Listening to player input" |
| 6–7 | Practice: a sprite you move with the arrow keys | — |

## Week 3 — GDScript programming
| Day | Topic | Resource |
|---|---|---|
| 1 | Variables, types, if/else | GDQuest "Learn GDScript From Zero" (free, in the browser): https://gdquest.github.io/learn-gdscript/ |
| 2 | Loops and functions | Same app, next lessons |
| 3 | Arrays and dictionaries | Same app |
| 4 | Signals (how nodes talk to each other) | Docs: "Using signals" |
| 5 | _process vs _physics_process, delta time | Docs: "Idle and Physics Processing" |
| 6–7 | Practice: finish the GDQuest app | — |

## Week 4 — First complete game
| Day | Topic | Resource |
|---|---|---|
| 1 | Set up the project and the player | Docs, "Your first 2D game": https://docs.godotengine.org/en/stable/getting_started/first_2d_game/index.html |
| 2 | Coding the player | Same tutorial |
| 3 | Creating the enemy | Same tutorial |
| 4 | The main game scene | Same tutorial |
| 5 | HUD and score | Same tutorial |
| 6–7 | Practice: change the art, speed and rules so it feels like your game | — |

## Week 5 — 2D physics and collisions
| Day | Topic | Resource |
|---|---|---|
| 1 | CharacterBody2D, gravity, jumping | Brackeys, "How to make a Video Game – Godot Beginner Tutorial": https://www.youtube.com/@Brackeys |
| 2 | TileMaps (building levels) | Same video + docs "Using TileMaps" |
| 3 | Collision layers and masks | Docs: "Physics introduction" |
| 4 | Area2D: pickups, coins, hazards | Brackeys video (coins section) |
| 5 | Camera2D follow and limits | Docs: Camera2D |
| 6–7 | Practice: a 1-level platformer | — |

## Week 6 — Touch controls (the mobile part)
| Day | Topic | Resource |
|---|---|---|
| 1 | Touch input events | Docs: "InputEventScreenTouch / ScreenDrag" (Input examples page) |
| 2 | On-screen buttons | Docs: TouchScreenButton |
| 3 | Swipe and tap gestures | Search: "Godot 4 swipe detection" |
| 4 | Screen sizes and stretch mode (portrait) | Docs: "Multiple resolutions" |
| 5 | Test on your phone with Remote Debug | Docs: "Exporting for Android" (one-click deploy) |
| 6–7 | Practice: make your week 4 or 5 game playable with touch | — |

## Week 7 — UI and game flow
| Day | Topic | Resource |
|---|---|---|
| 1 | Control nodes and containers | Docs: "Size and anchors" + "Using Containers" |
| 2 | Main menu, pause menu | GDQuest YouTube: https://www.youtube.com/@Gdquest |
| 3 | Changing scenes | Docs: "Change scenes manually" |
| 4 | Autoloads (global game state) | Docs: "Singletons (Autoload)" |
| 5 | Saving high score and settings | Docs: "Saving games" |
| 6–7 | Practice: menu → game → game over → retry | — |

## Week 8 — Art and animation
| Day | Topic | Resource |
|---|---|---|
| 1 | Pixel art basics | MortMort (YouTube): https://www.youtube.com/@MortMort |
| 2 | Draw a character + 4-frame walk cycle | Same + LibreSprite |
| 3 | AnimatedSprite2D and AnimationPlayer | Docs: "2D sprite animation" |
| 4 | Tweens for "juice" (bounce, shake, fade) | Docs: Tween |
| 5 | Particles | Docs: "2D particle systems" |
| 6–7 | Practice: watch "Juice it or lose it" (YouTube) and add juice to your game | — |

## Week 9 — Sound
| Day | Topic | Resource |
|---|---|---|
| 1 | AudioStreamPlayer, playing sound effects | Docs: "Audio streams" |
| 2 | Make SFX | jsfxr https://sfxr.me |
| 3 | Music loops and audio buses | Docs: "Audio buses" |
| 4 | Volume settings saved to file | Your week 7 save code |
| 5 | Haptics (phone vibration) | Docs: Input.vibrate_handheld |
| 6–7 | Practice: every action in your game has a sound | — |

## Week 10 — Build YOUR game (the week 1 idea)
| Day | Topic | Resource |
|---|---|---|
| 1 | Scope down: list the must-have features only | GMTK: "How to make your first game" style videos |
| 2–5 | Build the core loop | Everything from weeks 2–9 |
| 6–7 | Give it to 3 people to play. Watch them, don't explain | — |

## Week 11 — Polish and performance
| Day | Topic | Resource |
|---|---|---|
| 1 | Fix the top 3 problems testers had | Your notes |
| 2 | Profiler and FPS on mobile | Docs: "The Profiler" + "Performance" |
| 3 | Optimize: object pooling, smaller textures | Game Programming Patterns, "Object Pool": https://gameprogrammingpatterns.com/object-pool.html |
| 4 | App icon and splash screen | Docs: Project Settings → Application |
| 5 | Onboarding: teach the controls without text | GMTK on tutorials |
| 6–7 | Practice: second round of playtesting | — |

## Week 12 — Publish
| Day | Topic | Resource |
|---|---|---|
| 1 | Export an Android build (AAB/APK) | Docs: "Exporting for Android" |
| 2 | Publish free on itch.io (fastest first release) | https://itch.io/docs/creators/getting-started |
| 3 | Google Play Console account and store listing | https://play.google.com/console (one-time $25 fee) |
| 4 | Screenshots, short video, description | Use Canva/your design skills |
| 5 | (Optional) Ads or in-app purchases | Search: "Godot 4 AdMob plugin" |
| 6–7 | Launch, share on your social media, collect feedback | — |

---

## After week 12
- Join game jams to make many small games fast: https://itch.io/jams (try GMTK Game Jam, Ludum Dare).
- Book: *The Art of Game Design* by Jesse Schell.
- Book (free online): *Game Programming Patterns*, https://gameprogrammingpatterns.com
- iOS publishing needs a Mac and an Apple Developer account ($99/year). Start with Android.
