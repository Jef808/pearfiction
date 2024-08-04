import {
  Application,
  Container,
  Texture
} from 'pixi.js';
import {createReels} from './reels';
import {createSpinButton} from './button';
import {createWinningsDisplay} from './winnings';
import {REELS_HEIGHT, REELS_WIDTH} from './constants';

export const initGame = (app: Application, assets: Record<string, Texture>) => {
  const container = new Container();

  const reels = createReels(assets);
  const spinButton = createSpinButton(assets, () => handleSpin());
  const winnings = createWinningsDisplay();

  container.addChild(reels.container);
  container.addChild(spinButton.sprite);

  reels.container.position = {
    x: (app.screen.width - REELS_WIDTH) / 2,
    y: (app.screen.height - REELS_HEIGHT) / 2
  };

  spinButton.sprite.position = {
    x: (app.screen.width + REELS_WIDTH - 4 * spinButton.sprite.width) / 2,
    y: (app.screen.height + REELS_HEIGHT + spinButton.sprite.height) / 2
  };

  let isSpinning = false;

  const handleSpin = async () => {
    if (isSpinning) {
      return;
    }

    isSpinning = true;
    spinButton.disable();

    const reelPositions = await reels.spin();
    console.log(JSON.stringify(reelPositions));

    winnings.update(reelPositions);

    isSpinning = false;
    spinButton.enable();
  }

  return {
    container
  }
}
