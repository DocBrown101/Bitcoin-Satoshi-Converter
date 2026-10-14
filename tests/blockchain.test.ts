import assert from 'node:assert/strict';
import {test} from 'node:test';
import {parseMempoolMessage} from '../src/services/MempoolData.ts';
import calculateHalvingData from '../src/services/HalvingCalculator.ts';

test('mempool updates are independent and select the newest valid block', () => {
  assert.deepEqual(parseMempoolMessage(JSON.stringify({fees: {fastestFee: 2, hourFee: 1, minimumFee: 0}})), {
    fees: {fastestFee: 2, hourFee: 1, minimumFee: 0},
  });
  assert.deepEqual(parseMempoolMessage(JSON.stringify({da: {timeAvg: 600_000}, blocks: [{height: 900_000}, null, {height: '900002'}, {height: 900_001}], block: {height: 900_003}})), {
    timeAvg: 600_000, block: {height: 900_003},
  });
});

test('malformed messages and invalid network values are ignored', () => {
  for (const payload of ['not JSON', 'null', '{}', JSON.stringify({da: {timeAvg: 0}, fees: {fastestFee: -1, hourFee: 1, minimumFee: 1}, block: {height: -1}})]) {
    assert.deepEqual(parseMempoolMessage(payload), {});
  }
});

test('halving boundaries and short durations use concrete numbers', () => {
  const nearHalving = calculateHalvingData(600_000, 839_999);
  assert.equal(nearHalving.blocksToNextHalving, 1);
  assert.equal(nearHalving.timeToHalving, 600_000);
  assert.deepEqual([nearHalving.estimatedDays, nearHalving.estimatedHours, nearHalving.estimatedMinutes], [0, 0, 10]);
  assert.equal(calculateHalvingData(600_000, 840_000).blocksToNextHalving, 210_000);
  assert.throws(() => calculateHalvingData(NaN, 840_000), RangeError);
  assert.throws(() => calculateHalvingData(600_000, -1), RangeError);
});
