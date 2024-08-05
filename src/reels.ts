import {
  BlurFilter,
  Container,
  Graphics,
  Sprite,
  Texture,
  Ticker
} from 'pixi.js';
import {
  REELSET,
  REELS_GAP,
  REELS_WIDTH,
  REELS_HEIGHT,
  SYMBOL_SIZE,
  NUM_REELS,
  SYMBOLS_PER_REEL
} from './constants';

type Reel = {
  container: Container,
  spin: (ticker: Ticker) => Promise<number>,
};

const ease = (t: number) => --t * t * (1.5 * t + 0.5) + 1;
const lerp = (a1: number, a2: number, t: number) => a1 * (1 - t) + a2 * t;

function createReel(assets: Record<string, Texture>, index: number): Reel {
  const container = new Container();
  const symbols = [] as Sprite[];
  const blur = new BlurFilter();
  blur.blurX = 0;
  blur.blurY = 0;
  container.filters = blur;
  let position = 0;
  let prevPosition = 0;

  const band = REELSET[index];
  band.forEach((key, idx) => {
    const symbol = Sprite.from(assets[key]);
    symbol.y = idx * (SYMBOL_SIZE - 1);
    symbol.setSize(SYMBOL_SIZE);
    container.addChild(symbol);
    symbols.push(symbol);
  });

  container.x = index * (SYMBOL_SIZE + REELS_GAP);

  const spin = async (ticker: Ticker) => {
    const spinDuration = 1200 + 400 * index;
    const startTime = Date.now();
    const targetPosition = Math.floor(Math.random() * SYMBOLS_PER_REEL);
    const currentPosition = targetPosition + SYMBOLS_PER_REEL / 2 % SYMBOLS_PER_REEL;

    const animateSpin = () => {
      const now = Date.now();
      const elapsed = now - startTime;

      const spinProgress = Math.min(elapsed / spinDuration, 1);
      const easeProgress = ease(spinProgress);

      position = lerp(currentPosition, targetPosition, easeProgress);
      blur.blurY = (position - prevPosition) * 8;
      prevPosition = position;

      symbols.forEach((symbol, j) => {
        const positionOnScreen = ((j - position + SYMBOLS_PER_REEL) % SYMBOLS_PER_REEL);
        if (positionOnScreen > SYMBOLS_PER_REEL - 1) {
          symbol.y = (positionOnScreen - SYMBOLS_PER_REEL) * (SYMBOL_SIZE - 1);
        } else {
          symbol.y = positionOnScreen * (SYMBOL_SIZE - 1);
        }
      });

      if (elapsed >= spinDuration) {
        ticker.remove(animateSpin);
      }
    };

    ticker.add(animateSpin);

    await new Promise(resolve => setTimeout(resolve, spinDuration));
    return Math.round(position);
  }

  return {
    container,
    spin
  };
}

export function createReels(assets: Record<string, Texture>) {
  const container = new Container();
  const reels = [] as Reel[];

  for (let i = 0; i < NUM_REELS; ++i) {
    const reel = createReel(assets, i);
    container.addChild(reel.container);
    reels.push(reel);
  }

  const mask = new Graphics()
    .rect(0, 0, REELS_WIDTH, REELS_HEIGHT)
    .fill(0xffffff);

  container.addChild(mask);
  container.mask = mask;

  const spin = async (ticker: Ticker) => Promise.all(
    reels.map(reel => reel.spin(ticker))
  );

  return {
    container,
    spin
  };
}
