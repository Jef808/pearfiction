import {Container, Graphics} from 'pixi.js';
import {REELS_GAP, REELS_HEIGHT, REELS_WIDTH, SYMBOL_SIZE} from './constants';

const createBevelledEdge = (height: number, width: number, orientation: 'h' | 'v', inverted: boolean = false) => {
  let innerColor = 0x0c7a95;
  const middleColor = 0x0e89a8;
  let outerColor = 0x096177;

  if (inverted) {
    [innerColor, outerColor] = [outerColor, innerColor];
  }

  if (orientation === 'v') {
    return new Graphics()
      .rect(0, 0, width / 3, height)
      .fill(innerColor)
      .rect(width / 3, 0, width / 3, height)
      .fill(middleColor)
      .rect(2 * width / 3, 0, width / 3, height)
      .fill(outerColor);
  }

  else if (orientation === 'h') {
    return new Graphics()
      .rect(0, 0, width, height / 3)
      .fill(innerColor)
      .rect(0, height / 3, width, height / 3)
      .fill(middleColor)
      .rect(0, 2 * height / 3, width, height / 3)
      .fill(outerColor);
  }

  return new Graphics();
}

export const createReelsFrame = () => {
  const container = new Container();

  for (let i = 0; i < 6; ++i) {
    const edge = createBevelledEdge(REELS_HEIGHT, REELS_GAP, 'v', i === 5);
    edge.position = {
      x: i * SYMBOL_SIZE + (i-1) * REELS_GAP,
      y: -edge.height / 2
    };
    container.addChild(edge);
  }

  for (let i = 0; i < 2; ++i) {
    const edge = createBevelledEdge(REELS_GAP, REELS_WIDTH + 2 * REELS_GAP, 'h', i === 1);
    edge.position = {
      x: -REELS_GAP,
      y: (2 * i - 1) * (REELS_HEIGHT / 2) + (i - 1) * REELS_GAP
    }
    container.addChild(edge);
  }

  return {
    container
  };
}
