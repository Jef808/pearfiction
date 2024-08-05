export const SYMBOL_SIZE = 150;
export const NUM_REELS = 5;
export const REELS_GAP = 12;
export const REELS_WIDTH = NUM_REELS * SYMBOL_SIZE + (NUM_REELS - 1) * REELS_GAP;
export const REELS_HEIGHT = 3 * (SYMBOL_SIZE - 1);
export const SYMBOLS_PER_REEL = 20;
export const BUTTON_SIZE = 120;

export const SYMBOLS = ['hv1', 'hv2', 'hv3', 'hv4', 'lv1', 'lv2', 'lv3', 'lv4']

export const REELSET = [
    ['hv2', 'lv3', 'lv3', 'hv1', 'hv1', 'lv1', 'hv1', 'hv4', 'lv1', 'hv3', 'hv2', 'hv3', 'lv4', 'hv4', 'lv1', 'hv2', 'lv4', 'lv1', 'lv3', 'hv2'],
    ['hv1', 'lv2', 'lv3', 'lv2', 'lv1', 'lv1', 'lv4', 'lv1', 'lv1', 'hv4', 'lv3', 'hv2', 'lv1', 'lv3', 'hv1', 'lv1', 'lv2', 'lv4', 'lv3', 'lv2'],
    ['lv1', 'hv2', 'lv3', 'lv4', 'hv3', 'hv2', 'lv2', 'hv2', 'hv2', 'lv1', 'hv3', 'lv1', 'hv1', 'lv2', 'hv3', 'hv2', 'hv4', 'hv1', 'lv2', 'lv4'],
    ['hv2', 'lv2', 'hv3', 'lv2', 'lv4', 'lv4', 'hv3', 'lv2', 'lv4', 'hv1', 'lv1', 'hv1', 'lv2', 'hv3', 'lv2', 'lv3', 'hv2', 'lv1', 'hv3', 'lv2'],
    ['lv3', 'lv4', 'hv2', 'hv3', 'hv4', 'hv1', 'hv3', 'hv2', 'hv2', 'hv4', 'hv4', 'hv2', 'lv2', 'hv4', 'hv1', 'lv2', 'hv1', 'lv2', 'hv4', 'lv4']
];

export const PAYLINES = [
  {
    id: 1,
    indices: [ 5,  6,  7,  8,  9]
  },
  {
    id: 2,
    indices: [ 0,  1,  2,  3,  4]
  },
  {
    id: 3,
    indices: [10, 11, 12, 13, 14]
  },
  {
    id: 4,
    indices: [ 0,  1,  7, 13, 14]
  },
  {
    id: 5,
    indices: [ 3,  4,  7, 10, 11]
  },
  {
    id: 6,
    indices: [ 0,  4,  6,  8, 12]
  },
  {
    id: 7,
    indices: [ 2,  6,  8, 10, 14]
  }
];

export const PAYTABLE = {
  hv1: [0, 0, 0, 10, 20, 50],
  hv2: [0, 0, 0,  5, 10, 20],
  hv3: [0, 0, 0,  5, 10, 15],
  hv4: [0, 0, 0,  5, 10, 15],
  lv1: [0, 0, 0,  2,  5, 10],
  lv2: [0, 0, 0,  1,  2,  5],
  lv3: [0, 0, 0,  1,  2,  3],
  lv4: [0, 0, 0,  1,  2,  3]
} as Record<typeof SYMBOLS[number], number[]>;
