type FreqMap = Map<number, number>;
type Buckets = number[][];

export function topKFrequent(nums: number[], k: number): number[] {
  const buckets = spreadArrValuesIntoBuckets(nums);
  return getKElementsByFreqFromBucketsArr(buckets, k);
}

function spreadArrValuesIntoBuckets(nums: number[]): Buckets {
  const numsFreqMap = generateFreqMap(nums);

  const bucketsArr = Array.from({ length: nums.length }, () => []) as Buckets;
  const uniqueInpArrElements = Array.from(numsFreqMap.keys());

  uniqueInpArrElements.forEach(elem => {
    const targetBucketIndex = numsFreqMap.get(elem)! - 1;
    bucketsArr[targetBucketIndex] = [...bucketsArr[targetBucketIndex], elem];
  });

  return bucketsArr;
}

function generateFreqMap(arr: number[]): FreqMap {
  const freqMap = new Map<number, number>();

  return arr.reduce((currFreqMap, currNum) => {
    const prevFreqForCurrNum = currFreqMap.get(currNum) ?? 0;
    currFreqMap.set(currNum, prevFreqForCurrNum + 1);
    return currFreqMap;
  }, freqMap);
}

function getKElementsByFreqFromBucketsArr(bucketsArr: Buckets, k: number): number[] {
  return bucketsArr.reduceRight((outputArr, bucket) => {
    return outputArr.length < k ? outputArr.concat(bucket) : outputArr;
  }, []);
}
