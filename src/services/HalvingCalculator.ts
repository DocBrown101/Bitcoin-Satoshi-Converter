const HALVING_EPOCH = 210000; // halving is at 210000 block
const DIFFICULTY_EPOCH = 2016; // at
const TARGET_BLOCK_TIME = 600000; // ms, 10 min
const MS_IN_SECOND = 1000;
const MS_IN_MINUTE = MS_IN_SECOND * 60;
const MS_IN_HOUR = MS_IN_MINUTE * 60;
const MS_IN_DAY = MS_IN_HOUR * 24;

export interface HalvingData {
  blocksToNextHalving: number;
  timeToHalving: number;
  estimatedDate: Date;
  estimatedDays: number;
  estimatedHours: number;
  estimatedMinutes: number;
}

function calculateBlocksToHalving(lastBlockHeight: number): number {
  const blocksInCurrentHalving = lastBlockHeight % HALVING_EPOCH;

  return HALVING_EPOCH - blocksInCurrentHalving;
}

function calculateBlocksToDifficultyAdjustment(lastBlockHeight: number): number {
  const blocksInCurrentDifficulty = lastBlockHeight % DIFFICULTY_EPOCH;

  return DIFFICULTY_EPOCH - blocksInCurrentDifficulty;
}

function splitDuration(ms: number): [number, number, number] {
  const d = Math.floor(ms / MS_IN_DAY);
  const h = Math.floor((ms - MS_IN_DAY * d) / MS_IN_HOUR);
  const m = Math.floor((ms - MS_IN_DAY * d - MS_IN_HOUR * h) / MS_IN_MINUTE);

  return [d, h, m];
}

function calculateHalvingData(currentAverageBlockTime: number, lastBlockHeight: number): HalvingData {
  if (!Number.isFinite(currentAverageBlockTime) || currentAverageBlockTime <= 0 || !Number.isSafeInteger(lastBlockHeight) || lastBlockHeight < 0) {
    throw new RangeError('Invalid block time or height');
  }
  const blocksToNextHalving = calculateBlocksToHalving(lastBlockHeight);

  const blocksInCurrentDifficulty = Math.min(
    blocksToNextHalving,
    calculateBlocksToDifficultyAdjustment(lastBlockHeight)
  );

  const estimatedAverageForCurrentDifficulty = Math.round(
    ((DIFFICULTY_EPOCH - blocksInCurrentDifficulty) *
      currentAverageBlockTime +
      blocksInCurrentDifficulty * TARGET_BLOCK_TIME) /
    DIFFICULTY_EPOCH
  );

  const otherBlocks = blocksToNextHalving - blocksInCurrentDifficulty;

  const timeToHalving =
    blocksInCurrentDifficulty * estimatedAverageForCurrentDifficulty +
    otherBlocks * TARGET_BLOCK_TIME;

  const estimatedDate = new Date(Date.now() + timeToHalving);
  const [estimatedDays, estimatedHours, estimatedMinutes] = splitDuration(timeToHalving);

  const data: HalvingData = {
    blocksToNextHalving,
    timeToHalving,
    estimatedDate,
    estimatedDays,
    estimatedHours,
    estimatedMinutes,
  };

  return data;
}

export default calculateHalvingData;
