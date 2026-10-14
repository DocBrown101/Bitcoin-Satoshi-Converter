export interface FeeData {
  fastestFee: number;
  hourFee: number;
  minimumFee: number;
}

export interface BlockData {
  height: number;
}

interface MempoolData {
  timeAvg?: number;
  fees?: FeeData;
  block?: BlockData;
}

export function parseMempoolMessage(payload: string): MempoolData {
  try {
    const data = JSON.parse(payload);
    const result: MempoolData = {};
    const timeAvg = data?.da?.timeAvg;
    if (typeof timeAvg === 'number' && Number.isFinite(timeAvg) && timeAvg > 0) result.timeAvg = timeAvg;

    const fees = data?.fees;
    if (fees && ['fastestFee', 'hourFee', 'minimumFee'].every(key =>
      typeof fees[key] === 'number' && Number.isFinite(fees[key]) && fees[key] >= 0)) {
      result.fees = {fastestFee: fees.fastestFee, hourFee: fees.hourFee, minimumFee: fees.minimumFee};
    }

    const blocks = Array.isArray(data?.blocks) ? data.blocks : [];
    for (const block of [...blocks, data?.block]) {
      if (Number.isSafeInteger(block?.height) && block.height >= 0 && (!result.block || block.height > result.block.height)) {
        result.block = {height: block.height};
      }
    }
    return result;
  } catch {
    return {};
  }
}
