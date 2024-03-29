import { Audio } from 'expo-av';
import SoundLibrary from 'database/sounds/SoundLibrary';

const SOUNDS: {
  [key: string]: Audio.Sound;
} = {};

export async function initAudio() {
  await Audio.setIsEnabledAsync(true);
  await Audio.setAudioModeAsync({
    playsInSilentModeIOS: true,
    shouldDuckAndroid: true,
  });
}

export async function playSound(name: string) {
  if (!SOUNDS[name]) {
    SOUNDS[name] = new Audio.Sound();
    await SOUNDS[name].loadAsync(SoundLibrary[name]);
  }
  if (SOUNDS[name]) {
    await SOUNDS[name].replayAsync();
  }
}
