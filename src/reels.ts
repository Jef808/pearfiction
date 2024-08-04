import {
  Container,
  Graphics,
  Sprite,
  Texture
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
  spin: () => Promise<number>,
};

function createReel(assets: Record<string, Texture>, index: number): Reel {
  const container = new Container();
  const symbols = [] as Sprite[];
  let position = 0;

  const band = REELSET[index];
  band.forEach((key, idx) => {
    const symbol = Sprite.from(assets[key]);
    symbol.y = idx * (SYMBOL_SIZE - 1);
    symbol.setSize(SYMBOL_SIZE);
    container.addChild(symbol);
    symbols.push(symbol);
  });

  container.x = index * (SYMBOL_SIZE + REELS_GAP);

  const spin = async () => {
    position = Math.floor(Math.random() * SYMBOLS_PER_REEL);
    symbols.forEach((symbol, index) => {
      symbol.y = (index - position + SYMBOLS_PER_REEL) % SYMBOLS_PER_REEL * (SYMBOL_SIZE - 1);
    });
    return position;
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

  const spin = async () => Promise.all(
    reels.map(reel => reel.spin())
  );

  return {
    container,
    spin
  };
}
