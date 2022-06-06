type S = string;
type P = string;

interface SlidingWindow {
  leftIndex: number;
  rightIndex: number;
}

type CharFreqMap = Map<string, number>;

export default function findAnagrams(fullString: S, targetSubstr: P): number[] {
  // Similar to finding permutations of a potential substring within a string
  const baseCaseResults = handleBaseCases(fullString, targetSubstr);
  if (baseCaseResults.length > 0) return baseCaseResults;

  const targetSubstrCharFreqMap = generateCharFreqMapForStrUsingAlphabets(targetSubstr);
  let currentSubstrCharFreqMap = generateAlphabetsMap();

  const slidingWindow = {
    leftIndex: 0,
    rightIndex: 0,
  };

  let anagramStartingIndArr: number[] = [];
  let numberOfCharsFromTargetSubstringLeftToMatch = targetSubstr.length;

  for (; slidingWindow.rightIndex < fullString.length; slidingWindow.rightIndex++) {
    const currentChar = fullString[slidingWindow.rightIndex];
    currentSubstrCharFreqMap = incrementMapKeyVal(currentSubstrCharFreqMap, currentChar);

    const freqOfCurrentCharInTargetSubstr = targetSubstrCharFreqMap.get(currentChar)!;
    const freqOfCurrentCharInCurrentCharFreqMap =
      currentSubstrCharFreqMap.get(currentChar)!;

    const doesCurrentCharExistInTargetSubstr = freqOfCurrentCharInTargetSubstr > 0;
    const areFrequenciesOfCurrentCharInBothFreqMapsYetToMatch =
      freqOfCurrentCharInCurrentCharFreqMap <= freqOfCurrentCharInTargetSubstr;

    if (
      doesCurrentCharExistInTargetSubstr &&
      areFrequenciesOfCurrentCharInBothFreqMapsYetToMatch
    ) {
      numberOfCharsFromTargetSubstringLeftToMatch--;
    }

    while (calculateWindowSize(slidingWindow) > targetSubstr.length) {
      const currentCharAtLeftIndex = fullString[slidingWindow.leftIndex];

      currentSubstrCharFreqMap = decrementMapKeyVal(
        currentSubstrCharFreqMap,
        currentCharAtLeftIndex
      );

      const freqOfCurrentCharAtLeftIndInTargetSubstr =
        targetSubstrCharFreqMap.get(currentCharAtLeftIndex)!;

      const freqOfCurrentCharAtLeftIndInCurrentCharFreqMap =
        currentSubstrCharFreqMap.get(currentCharAtLeftIndex)!;

      const didCurrentCharAtLeftIndExistInTargetSubstr =
        freqOfCurrentCharAtLeftIndInTargetSubstr > 0;

      const areFrequenciesOfCurrentCharInLeftIndInBothFreqMapsDifferent =
        freqOfCurrentCharAtLeftIndInCurrentCharFreqMap <
        freqOfCurrentCharAtLeftIndInTargetSubstr;

      if (
        didCurrentCharAtLeftIndExistInTargetSubstr &&
        areFrequenciesOfCurrentCharInLeftIndInBothFreqMapsDifferent
      ) {
        numberOfCharsFromTargetSubstringLeftToMatch++;
      }

      slidingWindow.leftIndex++;
    }

    if (numberOfCharsFromTargetSubstringLeftToMatch === 0) {
      const { leftIndex: startingIndOfAnagram } = slidingWindow;
      anagramStartingIndArr = arrSet(anagramStartingIndArr, startingIndOfAnagram);
    }
  }

  return anagramStartingIndArr;
}

function handleBaseCases(fullString: S, targetSubstr: P): number[] {
  if (targetSubstr === fullString) return [0];
  if (targetSubstr === '') return [0];
  // if (targetSubstr.length > fullString.length) return [];
  // if (fullString === '') return [];
  return [];
}

function generateCharFreqMapForStrUsingAlphabets(str: string): CharFreqMap {
  let strCharFreqMap: CharFreqMap = generateAlphabetsMap();
  const strArr = strToArray(str);

  strArr.forEach(char => {
    strCharFreqMap = incrementMapKeyVal(strCharFreqMap, char);
  });

  return strCharFreqMap;
}

function generateAlphabetsMap(): CharFreqMap {
  const alphabetsArr = generateAlphabetsArr();
  const flatAlphabetsCharMap = alphabetsArr.map(letter => [letter, 0]) as [
    string,
    number
  ][];

  const alphabetsMap = new Map<string, number>(flatAlphabetsCharMap);
  return alphabetsMap;
}

function generateAlphabetsArr(): string[] {
  const TOTAL_NUM_ALPHABETS = 26;
  const CHAR_CODE_OF_LETTER_A = 97;

  const alphabets = Array.from({ length: TOTAL_NUM_ALPHABETS }, (_, ind) =>
    String.fromCharCode(ind + CHAR_CODE_OF_LETTER_A)
  );

  return alphabets;
}

function strToArray(str: string): string[] {
  return str.split('');
}

function incrementMapKeyVal(map: CharFreqMap, key: string): CharFreqMap {
  const currentKeyVal = map.get(key) ?? 0;
  const updatedMap = map.set(key, currentKeyVal + 1);
  return updatedMap;
}

function calculateWindowSize(slidingWindow: SlidingWindow): number {
  const { leftIndex, rightIndex } = slidingWindow;
  return rightIndex - leftIndex + 1;
}

function decrementMapKeyVal(map: CharFreqMap, key: string): CharFreqMap {
  const currentKeyVal = map.get(key)!;
  const updatedMap = map.set(key, currentKeyVal - 1);
  return updatedMap;
}

function arrSet<T, R>(arr: T[], newArrElement: R) {
  return [...arr, newArrElement];
}
