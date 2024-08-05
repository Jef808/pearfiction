import {
  Container,
  Texture,
  Ticker
} from 'pixi.js';
import {createReelsFrame} from './reelsFrame';
import {createReels} from './reels';
import {createSpinButton} from './button';
import {createWinningsDisplay} from './winnings';
import {REELS_HEIGHT, REELS_WIDTH} from './constants';

export const initGame = (ticker: Ticker, assets: Record<string, Texture>) => {
  const container = new Container();

  const reelsFrame = createReelsFrame();
  const reels = createReels(assets);
  const spinButton = createSpinButton(assets, () => handleSpin());
  const winnings = createWinningsDisplay();

  container.addChild(reelsFrame.container);
  container.addChild(reels.container);
  container.addChild(spinButton.sprite);
  container.addChild(winnings.container);

  reelsFrame.container.position = {
    x: -REELS_WIDTH / 2,
    y: 0
  }

  reels.container.position = {
    x: -REELS_WIDTH / 2,
    y: -REELS_HEIGHT / 2
  };

  spinButton.sprite.position = {
    x: (REELS_WIDTH - 4 * spinButton.sprite.width) / 2,
    y: (REELS_HEIGHT + spinButton.sprite.height) / 2
  };

  winnings.container.position = {
    x: -REELS_WIDTH / 2,
    y: REELS_HEIGHT / 2
  }

  let isSpinning = false;

  const handleSpin = async () => {
    if (isSpinning) {
      return;
    }

    isSpinning = true;
    winnings.clear();
    spinButton.disable();

    const reelPositions = await reels.spin(ticker);

    isSpinning = false;
    winnings.update(reelPositions);
    spinButton.enable();
  }

  return {
    container
  }
}
