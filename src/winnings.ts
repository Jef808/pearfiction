import {Container, Text} from 'pixi.js';
import {
  NUM_REELS,
  REELSET,
  PAYLINES,
  PAYTABLE,
  SYMBOLS,
  SYMBOLS_PER_REEL
} from './constants';

type WinningsData = {
  payline: number,
  symbol: string,
  symbolCount: number,
  payout: number
};

const stringify = ({payline, symbol, symbolCount, payout}: WinningsData) =>
  `- payline ${payline}, ${symbol} x${symbolCount}, ${payout}`

export const createWinningsDisplay = () => {
  const container = new Container();

  const winningsText = new Text({
    text: '',
    style: {
      fontFamily: 'Arial',
      fontSize: 22,
      fontWeight: 'bold',
    }
  });
  winningsText.position = {x: 30, y: 30}
  container.addChild(winningsText);

  const updateWinningsDisplay = (winningsData: WinningsData[]) => {
    const textPaylines = winningsData.map(stringify);
    const totalWin = winningsData.reduce((sum, {payout}) => sum + payout, 0);
    const text = [`Total wins: ${totalWin}`, ...textPaylines].join('\n');
    winningsText.text = text;
  }

  const update = (reelPositions: number[]) => {
    const winningsData = calculateWinnings(reelPositions);
    winningsData && updateWinningsDisplay(winningsData);
    return winningsData;
  }

  const clear = () => {
    winningsText.text = '';
  }

  return {
    container,
    update,
    clear
  };
}

const calculateWinnings = (reelPositions: number[]) => {
  const symbolsOnScreen = new Array({length: 15});
  reelPositions.forEach((pos, i) => {
    for (let j = 0; j < 3; ++j) {
      symbolsOnScreen[i + j * NUM_REELS] = REELSET[i][(pos + j) % SYMBOLS_PER_REEL]
    }
  });

  return PAYLINES.map((payline) => {
    const paylineValues = payline.indices.map(idx => symbolsOnScreen[idx]);
      for (const symbol of SYMBOLS) {
        const symbolCount = paylineValues.filter(x => x == symbol).length;
        if (symbolCount >= 3) {
          const payout = PAYTABLE[symbol][symbolCount];
          return {
            payline: payline.id,
            symbol,
            symbolCount,
            payout
          };
        }
      }
  }).filter(el => el) as WinningsData[];
};
