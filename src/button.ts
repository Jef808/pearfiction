import {
  Sprite,
  Texture
} from 'pixi.js';
import {BUTTON_SIZE} from './constants';

export const createSpinButton = (assets: Record<string, Texture>, onClick: () => void) => {
  const sprite = Sprite.from(assets.spinBtn);

  sprite.setSize(BUTTON_SIZE);
  sprite.eventMode = 'static';
  sprite.cursor = 'pointer';
  sprite.on('pointerdown', onClick);

  const enable = () => {
    sprite.interactive = true;
  }

  const disable = () => {
    sprite.interactive = false;
  }

  return {
    sprite,
    enable,
    disable
  };
}
