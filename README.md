# ✨ A Special Day for You — Premium Birthday Surprise Experience 🌸

A magical, interactive birthday surprise website built with **React**, **Vite**, **Tailwind CSS**, and **Framer Motion**. Designed with an elegant pastel pink and lavender aesthetic, floating balloons, golden sparkles, fluttering butterflies, gentle flower petals, cute teddy bears, candles, gift box, and celebratory fireworks.

> 🔒 **Strict Design Compliance**: Per requirements, **zero** heart symbols, heart shapes, heart emojis, or heart animations are used anywhere in the website. Flowers (sakura, roses, daisies), butterflies, golden stars, sparkles, balloons, cakes, and gifts are used throughout.

---

## 🌟 The 7 Magical Scenes

1. **Scene 1: Secret Password 🔐**
   - Soft pink welcome screen with animated twinkling stars and floating balloons.
   - Heading: *"A Little Surprise Awaits You!"*
   - Subtitle: *"Someone has prepared something special for you."*
   - Interactive 6-digit PIN code inputs with auto-focus and shake feedback on incorrect entries.
   - Default passcode: **`011126`** (or customized code).
   - Unlocking triggers a lock-break animation, chime fanfare, and confetti burst.

2. **Scene 2: Birthday Reveal 🎂**
   - Animated birthday greeting: *"HAPPY BIRTHDAY, [NAME]!"* with shimmering gradient typography.
   - Multi-tier vector birthday cake with glowing candles, floating balloons, cute teddy bear greeting, and fluttering butterflies.
   - Button: *"Start Your Surprise ✨"*.

3. **Scene 3: Pop the Balloons 🎈**
   - 4 colorful floating balloons swaying with ribbons.
   - Tapping any balloon pops it with realistic audio pop effect, particle burst, and reveals a surprise wish:
     - **Balloon 1**: *"You make every day special!"*
     - **Balloon 2**: *"May all your dreams come true!"*
     - **Balloon 3**: *"Keep smiling and shining!"*
     - **Balloon 4**: *"Your happiness matters every day!"*
   - Once all balloons are popped, congratulatory fanfare plays and unlocks the next scene.

4. **Scene 4: Birthday Cake & Wish 🕯️**
   - Heading: *"Make a Wish!"*
   - Realistic flickering candle flames on an elegant birthday cake.
   - Button: *"Blow Out the Candles 🎂"*.
   - Extinguishes flames with gentle puff sound, animated rising smoke swirls, golden sparkles, and celebratory message.

5. **Scene 5: Personal Letter ✉️**
   - Animated pink envelope with delicate floral wax seal and surrounding blossoms.
   - Heading: *"A Special Message for You"*.
   - Button: *"Open Your Letter ✉️"*.
   - Flap opens to reveal a textured letter paper with an authentic typewriter animation and sound effects, plus an instant "Read Instantly" option.

6. **Scene 6: Open Your Gift & Photo Gallery 🎁**
   - 3D gift box with purple and golden satin ribbon.
   - Heading: *"One Last Surprise!"*.
   - Clicking opens the box with golden star sparkles and celebratory cannons.
   - Reveals customizable surprise message and an interactive photo gallery with Polaroid cards, fullscreen lightbox view, and an **Add Photos** upload button.

7. **Scene 7: Grand Final Celebration 🎆**
   - Heading: *"HAPPY BIRTHDAY ONCE AGAIN!"*.
   - Continuous animated fireworks canvas loop, confetti cannons, floating butterflies, balloons, and sweet blessings.
   - Button: *"Replay the Surprise 🔄"* to experience the celebration again.

---

## 🎵 Audio Features

- Floating audio controller in the top-right corner.
- Dual-mode sound system:
  1. Plays background music track (royalty-free lofi/celebration melody).
  2. Built-in **Web Audio API synthesizer** (celestial music box arpeggios + interactive sound effects for popping balloons, blowing candles, typing letters, and unlocking codes) requiring zero external files.
- Play, pause, and mute toggles with audio state persistence.

---

## 🛠️ Project Structure

```text
website/
├── index.html                   # HTML template with Google Fonts (Outfit, Playfair Display, Caveat)
├── vercel.json                  # Ready-to-deploy Vercel configuration
├── vite.config.js               # Vite config with @tailwindcss/vite
├── package.json
└── src/
    ├── config.js                # Primary configuration file for all texts, names, PIN, photos & music
    ├── index.css                # Tailwind base, glassmorphism tokens, and keyframe animations
    ├── main.jsx                 # React root mount
    ├── App.jsx                  # Main application orchestrator & scene state management
    ├── components/
    │   ├── BackgroundElements.jsx # Floating petals, butterflies, and sparkling stars
    │   ├── AudioPlayer.jsx        # Floating music widget
    │   ├── CustomizerModal.jsx    # Live in-app settings & photo upload drawer
    │   └── scenes/
    │       ├── Scene1Password.jsx     # Scene 1: Secret PIN unlock
    │       ├── Scene2Reveal.jsx       # Scene 2: Birthday Greeting reveal
    │       ├── Scene3Balloons.jsx     # Scene 3: Interactive balloon pop
    │       ├── Scene4Cake.jsx         # Scene 4: Candle blowout & wish
    │       ├── Scene5Letter.jsx       # Scene 5: Typewriter letter reveal
    │       ├── Scene6Gift.jsx         # Scene 6: Gift box & photo gallery
    │       └── Scene7Celebration.jsx  # Scene 7: Grand fireworks finale
    └── utils/
        ├── confetti.js          # Confetti cannons, fireworks & star showers
        └── soundEffects.js      # Zero-dependency Web Audio sound synthesizer
```

---

## ⚙️ How to Customize

### Option 1: Live In-Browser Customizer (Fastest & Easiest)
1. Open the website.
2. Click the floating **Settings / Gear icon (⚙️)** in the bottom-right corner.
3. Edit the Birthday Person's Name, Sender Name, 4-digit Passcode, or Letter.
4. Upload personal photos directly from your device.
5. Click **Save Changes** — they persist immediately in `localStorage`!

### Option 2: Edit `src/config.js`
Open `src/config.js` to modify the default settings directly:
```javascript
export const DEFAULT_CONFIG = {
  siteTitle: "A Special Day for You",
  recipientName: "Fawzia Banu",          // Change recipient name
  senderName: "With warmest thoughts",   // Change sender name
  secretPin: "011126",                   // Change 6-digit passcode
  pinHint: "Hint: Enter 0 1 1 1 2 6",
  // Customize any of the 7 scenes, letter text, or photos
};
```

---

## 🚀 Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build for production
npm run build
```

---

## ☁️ Deploy to Vercel

### Method 1: Via Vercel Dashboard
1. Push this project to your GitHub/GitLab repository.
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Import your repository. The included `vercel.json` and Vite presets configure everything automatically.
4. Click **Deploy**.

### Method 2: Via Vercel CLI
```bash
npm install -g vercel
vercel
```
