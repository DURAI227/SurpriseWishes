/**
 * BIRTHDAY SURPRISE CONFIGURATION
 * 
 * You can customize all names, messages, secret passcode, photos, and music here!
 * NOTE: Heart symbols or emojis are strictly excluded per design guidelines.
 */

export const DEFAULT_CONFIG = {
  // Website metadata
  siteTitle: "A Special Day for You",

  // Person being celebrated
  recipientName: "Fawzia Banu",

  // Sender name
  senderName: "Your Best Friend",

  // 6-digit secret passcode to unlock Scene 1
  secretPin: "011126",
  pinHint: "Hint: Enter 0 1 1 1 2 6 to unlock",

  // Scene 1: Secret Password Welcome
  scene1: {
    heading: "A Little Surprise Awaits You!",
    subtitle: "Your friend has prepared something special for you.",
    inputPlaceholder: "Enter 6-digit code",
    unlockSuccessText: "Unlocked! Welcome to your magical day!",
  },

  // Scene 2: Birthday Reveal
  scene2: {
    tagline: "A Celebration of Wonder",
    headingPrefix: "HAPPY BIRTHDAY,",
    subMessage: "Today is all about celebrating you! Having a friend as kind, wonderful, and supportive as you is a true blessing. Wishing you the happiest birthday ever!",
    ctaButton: "Start Your Surprise ✨",
  },

  // Scene 3: Pop the Balloons
  scene3: {
    heading: "Pop the Floating Balloons",
    subheading: "Tap each balloon to discover the sweet wishes floating just for you!",
    balloons: [
      {
        id: 1,
        color: "from-[#D6B56D] via-[#E8D5A3] to-[#B8934A]",
        shadowColor: "rgba(214, 181, 109, 0.45)",
        message: "You're the best friend anyone could ask for!",
        icon: "🌟",
      },
      {
        id: 2,
        color: "from-[#2A3B5C] via-[#1E2D4A] to-[#101827]",
        shadowColor: "rgba(42, 59, 92, 0.6)",
        message: "Cheers to another year of awesome memories together!",
        icon: "✨",
      },
      {
        id: 3,
        color: "from-[#FFF8E7] via-[#F3E8C8] to-[#D6B56D]",
        shadowColor: "rgba(255, 248, 231, 0.45)",
        message: "Your laughter and smile always brighten my day!",
        icon: "🌸",
      },
      {
        id: 4,
        color: "from-[#314161] via-[#D6B56D] to-[#172554]",
        shadowColor: "rgba(214, 181, 109, 0.4)",
        message: "Always here for you, through thick and thin!",
        icon: "🦋",
      },
    ],
    completedButton: "Continue to Birthday Cake 🎂",
  },

  // Scene 4: Birthday Cake
  scene4: {
    heading: "Make a Wish!",
    subtitle: "Close your eyes, think of your sweetest dream, and blow out the candles...",
    blowButton: "Blow Out the Candles 🎂",
    wishGrantedTitle: "Your Wish Has Been Sent to the Stars! ✨",
    wishGrantedSub: "Here's to a year filled with great health, big wins, and endless smiles together!",
    continueButton: "Read Your Special Letter ✉️",
  },

  // Scene 5: Personal Letter
  scene5: {
    heading: "A Special Message for You",
    subtitle: "A sealed letter decorated with soft blossoms awaits your touch.",
    openButton: "Open Your Letter ✉️",
    letterText: `Dear Fawzia Banu,

HAPPY BIRTHDAY! 🎂✨

I wanted to take a moment today to remind you just how special of a friend you are to me. Having you in my life makes every day brighter, more fun, and truly meaningful.

Thank you for all the shared laughs, the honest talks, and for always being someone I can count on. Your kindness, your smile, and your positive energy light up every room you walk into.

Never forget how talented and capable you are. Keep chasing your dreams fearlessly, because you deserve all the greatest things this world has to offer.

May this new year bring you unstoppable success, good health, endless smiles, and unforgettable adventures. I am so lucky to call you my friend, and I will always be cheering for you!

Have the happiest, most amazing birthday celebration!

Always your friend,
Your Best Friend`,
    continueButton: "Discover Your Last Gift 🎁",
  },
  // Scene 6: Final Celebration
  scene6: {
    heading: "HAPPY BIRTHDAY ONCE AGAIN!",
    subheading: "Thank you for being such an incredible friend! Here's to more shared adventures, endless laughter, and a year full of happiness, success, and big dreams coming true!",
    replayButton: "Replay the Surprise 🔄",
  },

  // Background music audio configuration (can be an MP3 URL or built-in synthesizer)
  audio: {
    // Royalty-free sweet ambient lofi / music track
    url: "https://assets.mixkit.co/music/preview/mixkit-game-level-music-689.mp3",
    synthesizerFallbackEnabled: true,
  }
};
