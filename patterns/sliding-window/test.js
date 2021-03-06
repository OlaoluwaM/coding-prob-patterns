var checkInclusion = function (s1, s2) {
  if (s1 === '' || s2 === '') {
    return false;
  }
  let m = new Map();
  // Record every character of s1 to Hash table with entry being
  // (character, number of occurrences)
  for (let i = 0; i < s1.length; i++) {
    m.set(s1[i], m.get(s1[i]) + 1 || 1);
  }
  let start = 0,
    windowSize = s1.length;
  // number of unique characters to collect
  let counter = m.size;
  for (let end = 0; end < s2.length; end++) {
    let char = s2[end];
    if (m.has(char)) m.set(char, m.get(char) - 1);
    if (m.get(char) === 0) counter--; // we collected all occurrences of this char
    // we collected all occurrences of every character in s1
    while (counter === 0) {
      if (end - start + 1 === windowSize) return true;
      if (m.has(s2[start])) m.set(s2[start], m.get(s2[start]) + 1);
      if (m.get(s2[start]) === 1) counter++; // we should collect one more unique char
      start++;
    }
  }
  return false;
  // T.C: O(M+N), M = length of s1, N = length of s2
  // S.C: O(M)
};

const s1 = 'ab'
const s2 = 'eidbaooo'
const foo = checkInclusion(s1, s2);
console.log(foo === true)
