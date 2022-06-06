type S = string;
type Words = string[];

interface SlidingWindow {
  leftIndex: number;
  rightIndex: number;
  targetWindowSize: number;
}

type WordFreqMap = Map<string, number>;
type Indices = number[];

type Primitive = string | number | boolean | symbol;
interface AnyObject {
  [key: Exclude<Primitive, boolean>]: unknown;
}

export default function findSubstring(fullString: S, wordsArr: Words): Indices {
  // NOTE: All words within the words array are the same length
  // NOTE: Here we assume that fullString.length % LENGTH_INTERVAL === 0

  if (isEmpty.array(wordsArr)) return [0];

  const LENGTH_INTERVAL = wordsArr[0].length;
  const fullStringArr = splitStringIntoArrBasedOnLength(fullString, LENGTH_INTERVAL);

  const wordArrWordFreqMap = generateWordFreqMap(wordsArr);
  let fullStringWordFreqMap = generateWordFreqMap();

  let numberOfWordsFromWordArrLeftToMatch = wordsArr.length;
  let indicesArr: Indices = [];

  const slidingWindow: SlidingWindow = {
    leftIndex: 0,
    rightIndex: 0,
    targetWindowSize: wordsArr.length,
  };

  for (; slidingWindow.rightIndex < fullStringArr.length; slidingWindow.rightIndex++) {
    const currentWord = fullStringArr[slidingWindow.rightIndex];
    fullStringWordFreqMap = incrementMapKeyVal(fullStringWordFreqMap, currentWord);

    const currentFreqOfCurrentWord = fullStringWordFreqMap.get(currentWord)!;
    const freqOfCurrentWordInWordsArr = wordArrWordFreqMap.get(currentWord)!;

    const doesCurrentWordExistInWordArr = freqOfCurrentWordInWordsArr > 0;
    const isFreqOfCurrWordYetToMatchFreqOfCurrentWordInWordArr =
      currentFreqOfCurrentWord <= freqOfCurrentWordInWordsArr;

    if (
      doesCurrentWordExistInWordArr &&
      isFreqOfCurrWordYetToMatchFreqOfCurrentWordInWordArr
    ) {
      numberOfWordsFromWordArrLeftToMatch--;
    }

    while (isWindowSizeOutsideRange(slidingWindow)) {
      const currentWordAtLeftIndex = fullStringArr[slidingWindow.leftIndex];
      fullStringWordFreqMap = decrementMapKeyVal(
        fullStringWordFreqMap,
        currentWordAtLeftIndex
      );

      const newFreqOfCurrentWordAtLeftIndex =
        fullStringWordFreqMap.get(currentWordAtLeftIndex)!;
      const freqOfCurrentWordAtLeftIndexInWordsArr =
        wordArrWordFreqMap.get(currentWordAtLeftIndex)!;

      const doesCurrentWordAtLeftIndexExistInWordsArr =
        freqOfCurrentWordAtLeftIndexInWordsArr > 0;
      const doTheFrequenciesOfCurrentWordAtLeftIndexInBothWordFreqMapsDiffer =
        newFreqOfCurrentWordAtLeftIndex < freqOfCurrentWordAtLeftIndexInWordsArr;

      if (
        doesCurrentWordAtLeftIndexExistInWordsArr &&
        doTheFrequenciesOfCurrentWordAtLeftIndexInBothWordFreqMapsDiffer
      ) {
        numberOfWordsFromWordArrLeftToMatch++;
      }

      slidingWindow.leftIndex++;
    }

    if (numberOfWordsFromWordArrLeftToMatch === 0) {
      const { leftIndex: startingIndOfSubstring } = slidingWindow;
      indicesArr = arrSet(indicesArr, startingIndOfSubstring * LENGTH_INTERVAL);
    }
  }

  return indicesArr;
}

// TODO: We should not assume that the fullstring can be split evenly by a length
function splitStringIntoArrBasedOnLength(str: string, length: number): string[] {
  const LENGTH_REGEX = new RegExp(`(\\w{${length}})`, 'g');

  // We filter Boolean to remove empty strings
  const lengthSplitRegex = str.split(LENGTH_REGEX).filter(Boolean);
  return lengthSplitRegex;
}

function generateWordFreqMap(wordArr: string[] = []): WordFreqMap {
  const emptyWordFreqMap = new Map<string, number>();
  if (wordArr.length === 0) return emptyWordFreqMap;

  let wordFreqMap = emptyWordFreqMap;

  wordArr.forEach(word => {
    wordFreqMap = incrementMapKeyVal(wordFreqMap, word);
  });

  return wordFreqMap;
}

function incrementMapKeyVal(map: WordFreqMap, key: string): WordFreqMap {
  const INITIAL_VALUE = 0;
  const currentKeyVal = map.get(key) ?? INITIAL_VALUE;

  const updatedMap = map.set(key, currentKeyVal + 1);
  return updatedMap;
}

function decrementMapKeyVal(map: WordFreqMap, key: string): WordFreqMap {
  const currentKeyVal = map.get(key)!;
  const updatedMap = map.set(key, currentKeyVal - 1);
  return updatedMap;
}

function isWindowSizeOutsideRange(slidingWindow: SlidingWindow): boolean {
  const { targetWindowSize } = slidingWindow;
  const currentWindowSize = calculateWindowSize(slidingWindow);

  const isWindowSizeOutsideRange = currentWindowSize > targetWindowSize;
  return isWindowSizeOutsideRange;
}

function calculateWindowSize(slidingWindow: SlidingWindow): number {
  const { leftIndex, rightIndex } = slidingWindow;
  return rightIndex - leftIndex + 1;
}

function arrSet<T, R>(arr: T[], newArrElement: R) {
  return [...arr, newArrElement];
}

const isEmpty = {
  obj(possiblyEmptyObj: AnyObject): boolean {
    const hasNoProperties = Object.keys(possiblyEmptyObj).length === 0;
    return hasNoProperties;
  },

  array(possiblyEmptyArr: unknown[]): boolean {
    return possiblyEmptyArr.length === 0;
  },

  string(possiblyEmptyString: string): boolean {
    const EMPTY_STRING = '' as const;
    return possiblyEmptyString === EMPTY_STRING;
  },
};

const ans = findSubstring('lingmindraboofooowingdingbarrwingmonkeypoundcake', [
  'fooo',
  'barr',
  'wing',
  'ding',
  'wing',
]);
console.log(ans[0] === 13);
