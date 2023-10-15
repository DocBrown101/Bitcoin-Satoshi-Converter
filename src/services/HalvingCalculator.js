const HALVING_EPOCH = 210000; // halving is at 210000 block
const DIFFICULTY_EPOCH = 2016; // at
const TARGET_BLOCK_TIME = 600000; // ms, 10 min
const MS_IN_SECOND = 1000;
const MS_IN_MINUTE = MS_IN_SECOND * 60;
const MS_IN_HOUR = MS_IN_MINUTE * 60;
const MS_IN_DAY = MS_IN_HOUR * 24;

function calculateBlocksToHalving(lastBlockHeight) {
  const blocksInCurrentHalving = lastBlockHeight % HALVING_EPOCH;

  return HALVING_EPOCH - blocksInCurrentHalving;
}

function calculateBlocksToDifficultyAdjustment(lastBlockHeight) {
  const blocksInCurrentDifficulty = lastBlockHeight % DIFFICULTY_EPOCH;

  return DIFFICULTY_EPOCH - blocksInCurrentDifficulty;
}

function splitDuration(ms) {
  const d = Math.floor(ms / MS_IN_DAY);
  const h = Math.floor((ms - MS_IN_DAY * d) / MS_IN_HOUR);
  const m = Math.floor((ms - MS_IN_DAY * d - MS_IN_HOUR * h) / MS_IN_MINUTE);

  let days = undefined;
  let houres = undefined;

  if (d > 0) {
    days = d;
  }

  if (d > 0 || h > 0) {
    houres = h;
  }

  return [days, houres, m];
}

function calculateHalvingData(currentAverageBlockTime, lastBlockHeight) {
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
  const [estimatedDays, estimatedHoures, estimatedMinutes] = splitDuration(timeToHalving);

  const data = {
    blocksToNextHalving,
    timeToHalving,
    estimatedDate,
    estimatedDays,
    estimatedHoures,
    estimatedMinutes,
    estimatedAverageForCurrentDifficulty,
  };

  return data;
}

export default calculateHalvingData;
