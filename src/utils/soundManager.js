import { Howl } from 'howler';

// Sound effects for quiz interactions
// Using free sound effects from various sources
const sounds = {
  // Correct answer sound - success chime
  correct: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3'],
    volume: 0.5,
    preload: true
  }),

  // Wrong answer sound - error buzz
  wrong: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/1998/1998-preview.mp3'],
    volume: 0.5,
    preload: true
  }),

  // Click/select sound
  click: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'],
    volume: 0.3,
    preload: true
  }),

  // Time running out - warning tick
  tick: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2874/2874-preview.mp3'],
    volume: 0.4,
    preload: true
  }),

  // Time up sound
  timeUp: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2875/2875-preview.mp3'],
    volume: 0.5,
    preload: true
  }),

  // Quiz complete - victory sound
  complete: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/1435/1435-preview.mp3'],
    volume: 0.6,
    preload: true
  }),

  // Question transition
  transition: new Howl({
    src: ['https://assets.mixkit.co/active_storage/sfx/2569/2569-preview.mp3'],
    volume: 0.3,
    preload: true
  })
};

const MAX_DURATION = {
  correct: null,
  wrong: 500,
  click: null,
  tick: 300,
  timeUp: 800,
  complete: null,
  transition: null
};

class SoundManager {
  constructor() {
    this.isMuted = false;
    this.volume = 0.5;
    this.timers = {};
  }

  play(soundName) {
    if (this.isMuted) return;

    const sound = sounds[soundName];
    if (!sound) return;

    sound.volume(this.volume);
    const id = sound.play();

    if (this.timers[soundName]) {
      clearTimeout(this.timers[soundName]);
    }

    const maxMs = MAX_DURATION[soundName];
    if (maxMs) {
      this.timers[soundName] = setTimeout(() => {
        sound.stop(id);
      }, maxMs);
    }

    return id;
  }

  stop(soundName) {
    const sound = sounds[soundName];
    if (sound) {
      sound.stop();
    }
    if (this.timers[soundName]) {
      clearTimeout(this.timers[soundName]);
      delete this.timers[soundName];
    }
  }

  stopAll() {
    Object.values(sounds).forEach(sound => {
      sound.stop();
    });
    Object.values(this.timers).forEach(t => clearTimeout(t));
    this.timers = {};
  }

  setMute(mute) {
    this.isMuted = mute;
    if (mute) {
      this.stopAll();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAll();
    }
    return this.isMuted;
  }

  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
  }
}

export const soundManager = new SoundManager();

export const SOUNDS = {
  CORRECT: 'correct',
  WRONG: 'wrong',
  CLICK: 'click',
  TICK: 'tick',
  TIME_UP: 'timeUp',
  COMPLETE: 'complete',
  TRANSITION: 'transition'
};

export default soundManager;