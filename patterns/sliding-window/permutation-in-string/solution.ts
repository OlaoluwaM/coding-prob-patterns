// For the auxilary DS for determining whether a substring is a permutation of another, use a bloom filter (bit vector map)
// https://leetcode.com/problems/permutation-in-string/

type S1 = string;
type S2 = string;
type CharFreqMap = Map<string, number>;

export default function checkInclusion(potentialSubstring: S1, fullString: S2): boolean {
  const exitedOnBaseCase = handleBaseCases(potentialSubstring, fullString);
  if (exitedOnBaseCase !== undefined) return exitedOnBaseCase;

  const potentialSubstringCharFreqMap: CharFreqMap =
    generateCharFreqMapForStrUsingAlphabets(potentialSubstring);

  let currentSubstrCharFreqMap: CharFreqMap = generateAlphabetsMap();
  let numberOfCharFrequenciesFromPossibleSubstrLeftToMatch = potentialSubstring.length;

  const slidingWindow = {
    leftIndex: 0,
    rightIndex: 0,
  };

  let includesSubset = false;

  for (; slidingWindow.rightIndex < fullString.length; slidingWindow.rightIndex++) {
    const currentChar = fullString[slidingWindow.rightIndex];
    currentSubstrCharFreqMap = incrementMapKeyVal(currentSubstrCharFreqMap, currentChar);

    // This can be extracted from here
    const currentFreqOfChar = currentSubstrCharFreqMap.get(currentChar)!;
    const freqOfCurrentCharInSubset = potentialSubstringCharFreqMap.get(currentChar)!;

    const charIsInSubset = potentialSubstringCharFreqMap.get(currentChar)! > 0;
    const charFreqInCurrSubstrAndCharFreqInPossibleSubstrAreYetToMatch =
      currentFreqOfChar <= freqOfCurrentCharInSubset;
    // This can be extracted to here

    if (charIsInSubset && charFreqInCurrSubstrAndCharFreqInPossibleSubstrAreYetToMatch) {
      numberOfCharFrequenciesFromPossibleSubstrLeftToMatch--;
    }

    const windowSizeIsGreaterThanPossibleSubstrLen = () => {
      return (
        slidingWindow.rightIndex - slidingWindow.leftIndex + 1 > potentialSubstring.length
      );
    };

    while (windowSizeIsGreaterThanPossibleSubstrLen()) {
      const charAtLeftIndex = fullString[slidingWindow.leftIndex];

      currentSubstrCharFreqMap = decrementMapKeyVal(
        currentSubstrCharFreqMap,
        charAtLeftIndex
      );

      // This can be extracted from here
      const characterExistsInSubset =
        potentialSubstringCharFreqMap.get(charAtLeftIndex)! > 0;

      const freqOfCharAtLeftIndexInSubset =
        potentialSubstringCharFreqMap.get(charAtLeftIndex)!;

      const currentFreqOfCharAtLeftIndex = currentSubstrCharFreqMap.get(charAtLeftIndex)!;

      const charFreqIsLessInCurrSubstring =
        currentFreqOfCharAtLeftIndex < freqOfCharAtLeftIndexInSubset;
      // This can be extracted to here

      if (characterExistsInSubset && charFreqIsLessInCurrSubstring) {
        numberOfCharFrequenciesFromPossibleSubstrLeftToMatch++;
      }

      slidingWindow.leftIndex++;
    }

    const subsetExistsInFullString =
      numberOfCharFrequenciesFromPossibleSubstrLeftToMatch === 0;

    if (subsetExistsInFullString) {
      includesSubset = true;
      break;
    }
  }

  return includesSubset;
}

function handleBaseCases(potentialSubstring: S1, fullString: S2): boolean | undefined {
  if (potentialSubstring.length > fullString.length) return false;
  if (potentialSubstring === fullString) return true;
  if (fullString === '') return false;
  if (potentialSubstring === '') return true;
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

function decrementMapKeyVal(map: CharFreqMap, key: string): CharFreqMap {
  const currentKeyVal = map.get(key)!;
  const updatedMap = map.set(key, currentKeyVal - 1);
  return updatedMap;
}
