type S = string;
type T = string;
type CharFreqMap = Map<string, number>;

interface SlidingWindow {
  leftIndex: number;
  rightIndex: number;
}

export function minWindow(fullString: S, targetSubstr: T): string {
  const baseCaseValue = handleBaseCases(fullString, targetSubstr);
  if (baseCaseValue !== undefined) return baseCaseValue;

  let currentSubstrCharFreqMap = generateAlphabetsMap();
  const targetSubstrCharFreqMap = generateCharFreqMapForStrUsingAlphabets(targetSubstr);

  const slidingWindow: SlidingWindow = {
    leftIndex: 0,
    rightIndex: 0,
  };

  let numberOfCharsFromTargetSubstringLeftToMatch = targetSubstr.length;
  let minSubstrWithAllElementsOfTargetSubstr = '';

  for (; slidingWindow.rightIndex < fullString.length; slidingWindow.rightIndex++) {
    const currentChar = fullString[slidingWindow.rightIndex];
    currentSubstrCharFreqMap = incrementMapKeyVal(currentSubstrCharFreqMap, currentChar);

    // This can be extracted from here
    const currentFreqOfChar = currentSubstrCharFreqMap.get(currentChar)!;
    const freqOfCurrentCharInTargetSubstr = targetSubstrCharFreqMap.get(currentChar)!;

    const isCharInTargetSubstr = targetSubstrCharFreqMap.get(currentChar)! > 0;
    const areFreqsOfCharInCurrSubstrAndTargetSubstrYetToMatch =
      currentFreqOfChar <= freqOfCurrentCharInTargetSubstr;
    // This can be extracted to here

    if (isCharInTargetSubstr && areFreqsOfCharInCurrSubstrAndTargetSubstrYetToMatch) {
      numberOfCharsFromTargetSubstringLeftToMatch--;
    }

    while (numberOfCharsFromTargetSubstringLeftToMatch === 0) {
      const currentSubstring = generateCurrentSubstrBetweenIndices(
        fullString,
        slidingWindow
      );

      minSubstrWithAllElementsOfTargetSubstr = determineSmallestStr(
        minSubstrWithAllElementsOfTargetSubstr,
        currentSubstring
      );

      const charAtLeftIndex = fullString[slidingWindow.leftIndex];

      currentSubstrCharFreqMap = decrementMapKeyVal(
        currentSubstrCharFreqMap,
        charAtLeftIndex
      );

      // This can be extracted from here
      const doesCharAtLeftIndExistInTargetSubstr = targetSubstrCharFreqMap.get(charAtLeftIndex)! > 0;
      const freqOfCharAtLeftIndexInTargetSubstr = targetSubstrCharFreqMap.get(charAtLeftIndex)!;

      const currentFreqOfCharAtLeftIndex = currentSubstrCharFreqMap.get(charAtLeftIndex)!;

      const isCharFreqInCurrSubstrLessThanCharFreqInTargetSubstr =
        currentFreqOfCharAtLeftIndex < freqOfCharAtLeftIndexInTargetSubstr;
      // This can be extracted to here

      if (doesCharAtLeftIndExistInTargetSubstr && isCharFreqInCurrSubstrLessThanCharFreqInTargetSubstr) {
        numberOfCharsFromTargetSubstringLeftToMatch++;
      }

      slidingWindow.leftIndex++;
    }
  }
  return minSubstrWithAllElementsOfTargetSubstr;
}

function handleBaseCases(fullString: S, targetSubstr: T): string | undefined {
  if (targetSubstr.length > fullString.length) return '';
  if (fullString === targetSubstr) return fullString;
  if (fullString === '') return '';
  if (targetSubstr === '') return fullString;
  return undefined;
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
  const lowerCaseAlphabetsArr = generateAlphabetsArr();
  const upperCaseAlphabetsArr = lowerCaseAlphabetsArr.map(letter =>
    letter.toLocaleUpperCase()
  );

  const alphabetsArr = [...lowerCaseAlphabetsArr, ...upperCaseAlphabetsArr];
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

function decrementMapKeyVal(map: CharFreqMap, key: string): CharFreqMap {
  const currentKeyVal = map.get(key);
  let updatedValue = !currentKeyVal ? 0 : currentKeyVal - 1;

  const updatedMap = map.set(key, updatedValue);
  return updatedMap;
}

function calculateWindowSize(slidingWindow: SlidingWindow): number {
  const windowSize = slidingWindow.rightIndex - slidingWindow.leftIndex + 1;
  return windowSize;
}

function generateCurrentSubstrBetweenIndices(
  str: string,
  slidingWindow: SlidingWindow
): string {
  const { leftIndex, rightIndex } = slidingWindow;
  const currentSubstr = str.slice(leftIndex, rightIndex + 1);

  return currentSubstr;
}

function determineSmallestStr(...args: string[]): string {
  const strArr = args.filter(str => !!str !== false);
  const { 0: smallestStr } = strArr.sort((a, b) => a.length - b.length);
  return smallestStr;
}
