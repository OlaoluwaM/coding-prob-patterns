export function groupAnagrams(wordArr: string[]): string[][] {
  const arrOfHashMapCharFreqStrs = wordArr.map(toHashMapCharFreqStr);

  const anagramGrpObj = arrOfHashMapCharFreqStrs.reduce(
    (initialAnagramGrpObj, hashMapCharFreqStr, hashMapCharFreqStrInd) => {
      const anagramSubGrpExists = !!initialAnagramGrpObj?.[hashMapCharFreqStr];
      const originalStr = wordArr[hashMapCharFreqStrInd];

      if (anagramSubGrpExists) {
        initialAnagramGrpObj[hashMapCharFreqStr].push(originalStr);
      } else initialAnagramGrpObj[hashMapCharFreqStr] = [originalStr];

      return initialAnagramGrpObj;
    },
    {} as Record<string, string[]>
  );

  const anagramGrpArr: string[][] = Object.values(anagramGrpObj);
  return anagramGrpArr;
}

function toHashMapCharFreqStr(str: string): string {
  const NUMBER_OF_LETTERS_IN_ALPHABET = 26;
  const CHAR_CODE_OF_FIRST_LETTER_IN_ALPHABET = 'a'.charCodeAt(0);

  let hashMapCharFreqArr = Array.from({ length: NUMBER_OF_LETTERS_IN_ALPHABET }, () => 0);
  const strArr = str.split('');

  strArr.forEach(char => {
    const charIndex = char.charCodeAt(0) - CHAR_CODE_OF_FIRST_LETTER_IN_ALPHABET;
    const freqOfCurrentChar = hashMapCharFreqArr[charIndex];

    const newCharFreq = freqOfCurrentChar + 1;
    hashMapCharFreqArr[charIndex] = newCharFreq;
  });

  const CHAR_FREQ_DELIMITER = '#';
  return hashMapCharFreqArr.join(CHAR_FREQ_DELIMITER);
}


// Other Solution
function groupAnagramsTwo(words: string[]): string[][] {
  const arrOfSortedWords = words.map(sortWord);

  const anagramGrpObj = arrOfSortedWords.reduce(
    (initialAnagramGrpObj, sortedStr, sortedStrInd) => {
      const anagramSubGrpExists = !!initialAnagramGrpObj?.[sortedStr];
      const unsortedStr = words[sortedStrInd];

      if (anagramSubGrpExists) {
        initialAnagramGrpObj[sortedStr].push(unsortedStr);
      } else initialAnagramGrpObj[sortedStr] = [unsortedStr];

      return initialAnagramGrpObj;
    },
    {} as Record<string, string[]>
  );

  const anagramGrpArr: string[][] = Object.values(anagramGrpObj);
  return anagramGrpArr;
}

function sortWord(str: string): string {
  const strArr: string[] = str.split('');
  const sortedStrArr = strArr.sort();
  const sortedStr = sortedStrArr.join('');

  return sortedStr;
}
