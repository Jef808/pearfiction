import {
    NUM_REELS,
    REELSET,
    PAYLINES,
    PAYTABLE,
    SYMBOLS
} from './constants';

type WinningsData = {
    payline: number,
    symbol: string,
    symbolCount: number,
    payout: number
};

export const createWinningsDisplay = () => {
    const update = (reelPositions: number[]) => {
        const winningsData = calculateWinnings(reelPositions);
        winningsData && updateWinningsDisplay(winningsData);
    }

    return {
        update
    };
}

const calculateWinnings = (reelPositions: number[]) => {
    const symbolsOnScreen = new Array({length: 15});
    reelPositions.forEach((pos, i) => {
        for (let j = 0; j < 3; ++j) {
            symbolsOnScreen[i + j * NUM_REELS] = REELSET[i][pos + j]
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

function updateWinningsDisplay(winningsData: WinningsData[]) {
    console.log(JSON.stringify(winningsData, null, 2));
}
