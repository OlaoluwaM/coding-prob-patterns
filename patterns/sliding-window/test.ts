// https://leetcode.com/problems/fruit-into-baskets/

type FruitTree = number[];
type FruitType = FruitTree[number];
type MaxFruitPicked = number;

function totalFruit(fruitTree: FruitTree): MaxFruitPicked {
  const MAX_TREES_TO_PICK_FROM = 2 as const;
  if (fruitTree.length <= MAX_TREES_TO_PICK_FROM) return fruitTree.length;

  const slidingWindow = {
    leftIndex: 0,
    rightIndex: 0,
  };

  type FruitTypeCount = number;
  const fruitFreqMap: Map<FruitType, FruitTypeCount> = new Map();

  let maxFruitThatCanBePicked: MaxFruitPicked = 0;

  for (; slidingWindow.rightIndex < fruitTree.length; slidingWindow.rightIndex++) {
    const currFruitType = fruitTree[slidingWindow.rightIndex];

    const currentFruitTypeFreq = fruitFreqMap.get(currFruitType) ?? 0;
    fruitFreqMap.set(currFruitType, currentFruitTypeFreq + 1);

    while (fruitFreqMap.size > MAX_TREES_TO_PICK_FROM) {
      const fruitTypeAtLeftIndex = fruitTree[slidingWindow.leftIndex];
      let leftIndexFruitTypeFreq = fruitFreqMap.get(fruitTypeAtLeftIndex)!;

      fruitFreqMap.set(fruitTypeAtLeftIndex, leftIndexFruitTypeFreq - 1);
      leftIndexFruitTypeFreq = fruitFreqMap.get(fruitTypeAtLeftIndex)!;

      if (leftIndexFruitTypeFreq === 0) fruitFreqMap.delete(fruitTypeAtLeftIndex);
      slidingWindow.leftIndex++;
    }

    const currWindowSize = slidingWindow.rightIndex - slidingWindow.leftIndex + 1;
    maxFruitThatCanBePicked = Math.max(maxFruitThatCanBePicked, currWindowSize);
  }

  return maxFruitThatCanBePicked;
}

interface SlidingWindow {
  leftIndex: number;
  rightIndex: number;
}

function lengthOfLongestSubstring(targetString: string): number {
  let maxSubstringLen: number = 0;

  const slW: SlidingWindow = {
    leftIndex: 0,
    rightIndex: 0,
  };

  const letterIndMap = new Map<string, number>();

  for (; slW.rightIndex < targetString.length; slW.rightIndex++) {
    const currentLetter = targetString[slW.rightIndex];
    const currentLetterIndex = slW.rightIndex;

    if (letterIndMap.has(currentLetter)) {
      slW.leftIndex = Math.max(letterIndMap.get(currentLetter)!, slW.leftIndex);
    }

    const currentSubstrLen = slW.rightIndex - slW.leftIndex + 1;
    maxSubstringLen = Math.max(currentSubstrLen, maxSubstringLen);

    // We do this, so if we assign leftIndex to letterIndMap.get(currentLetter), leftIndex will be at the index of a non-duplicate
    // Which would keep the calculation of the currentSubstrLen correct
    const indexOfNextLetter = currentLetterIndex + 1;
    letterIndMap.set(currentLetter, indexOfNextLetter);
  }

  return maxSubstringLen;
}

const ans = lengthOfLongestSubstring('abba');
console.log(ans === 2);

type S = string;
type K = number;

function characterReplacement(inpString: S, replacementCount: K): number {
  let maxNumOfDupesInSubstr = 0;
  let currentSubStringLen = 0;
  let maxRepeatingCharWithReplacement = 0;

  const slidingWindow = {
    leftIndex: 0,
    rightIndex: 0,
  };

  const charFreqMap = new Map<string, number>();

  for (; slidingWindow.rightIndex < inpString.length; slidingWindow.rightIndex++) {
    const currentChar = inpString[slidingWindow.rightIndex];
    const currentCharFreqCount = charFreqMap.get(currentChar) ?? 0;

    const newFreqCountForCurrentChar = currentCharFreqCount + 1;
    charFreqMap.set(currentChar, newFreqCountForCurrentChar);

    maxNumOfDupesInSubstr = Math.max(maxNumOfDupesInSubstr, newFreqCountForCurrentChar);
    currentSubStringLen = slidingWindow.rightIndex - slidingWindow.leftIndex + 1;

    const numOfNonDupesWithinCurrSubstring = currentSubStringLen - maxNumOfDupesInSubstr;
    const allNonDupeCharsCanBeReplacedByDuplicateChars =
      numOfNonDupesWithinCurrSubstring <= replacementCount;

    if (allNonDupeCharsCanBeReplacedByDuplicateChars) {
      maxRepeatingCharWithReplacement = currentSubStringLen;
      continue;
    }

    const charAtLeftIndex = inpString[slidingWindow.leftIndex];
    const frequencyCountForCharAtLeftIndex = charFreqMap.get(charAtLeftIndex)!;

    const newFrequencyCountForCharAtLeftIndex = frequencyCountForCharAtLeftIndex - 1;
    charFreqMap.set(charAtLeftIndex, newFrequencyCountForCharAtLeftIndex);

    slidingWindow.leftIndex++;
  }

  return maxRepeatingCharWithReplacement;
}

const bar = characterReplacement('AABABBA', 1);
console.log(bar, bar === 4);

function longestOnes(nums: number[], k: number): number {
  let maxNumOfOnesInSubset = 0;
  let currSubsetLen = 0;
  let lenOfSubsetWithMaxNumOfRepeatingOnes = 0;

  const slidingWindow = {
    leftIndex: 0,
    rightIndex: 0,
  };

  // nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
  // I chose the word 'bit' here because a 'bit' represents either a one or a zero
  const bitFreqMap = new Map<number, number>();

  for (; slidingWindow.rightIndex < nums.length; slidingWindow.rightIndex++) {
    const currentBit = nums[slidingWindow.rightIndex];
    const frequencyCountOfCurrBit = bitFreqMap.get(currentBit) ?? 0;

    const newFreqCountForCurrentBit = frequencyCountOfCurrBit + 1;
    bitFreqMap.set(currentBit, newFreqCountForCurrentBit);

    maxNumOfOnesInSubset = Math.max(maxNumOfOnesInSubset, newFreqCountForCurrentBit);
    currSubsetLen = slidingWindow.rightIndex - slidingWindow.leftIndex + 1;

    const numOfZerosInSubset = currSubsetLen - maxNumOfOnesInSubset;
    const allZerosCanBeReplacedByOnes = numOfZerosInSubset <= k;

    if (allZerosCanBeReplacedByOnes) {
      lenOfSubsetWithMaxNumOfRepeatingOnes = currSubsetLen;
      continue;
    }

    const bitAtLeftIndex = nums[slidingWindow.leftIndex];
    const frequencyCountOfLeftIndexBit = bitFreqMap.get(bitAtLeftIndex)!;

    const newFrequencyCountForBitAtLeftIndex = frequencyCountOfLeftIndexBit - 1;
    bitFreqMap.set(bitAtLeftIndex, newFrequencyCountForBitAtLeftIndex);

    slidingWindow.leftIndex++;
  }

  return lenOfSubsetWithMaxNumOfRepeatingOnes;
}
