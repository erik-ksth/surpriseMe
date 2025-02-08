import cardFlipSound from "../assets/sounds/flipcard.mp3";
import successSound from "../assets/sounds/success.mp3";
import transitionSound from "../assets/sounds/transition.mp3";

// Sound effect URLs
const SOUND_EFFECTS = {
  cardFlip: cardFlipSound,
  success: successSound,
  transition: transitionSound,
};

class SoundManager {
  private static audioElements: { [key: string]: HTMLAudioElement } = {};

  static preloadSounds() {
    Object.entries(SOUND_EFFECTS).forEach(([key, url]) => {
      const audio = new Audio(url);
      audio.volume = 0.8; // Set volume to 50%
      audio.preload = "auto";
      this.audioElements[key] = audio;
    });
  }

  static playSound(soundName: keyof typeof SOUND_EFFECTS) {
    const audio = this.audioElements[soundName];
    if (audio) {
      audio.currentTime = 0; // Reset to start
      audio.play().catch((err) => console.log("Audio playback failed:", err));
    }
  }
}

// Preload sounds when the file is imported
SoundManager.preloadSounds();

export default SoundManager;
