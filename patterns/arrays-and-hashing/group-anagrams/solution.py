from typing import Dict, List, Literal
from collections import defaultdict


class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        hashed_strs: List[str] = list(map(self.hash_on_char_frequencies, strs))
        anagrams_dict: Dict[str, List[str]] = defaultdict(list)

        for ind, hashed_str in enumerate(hashed_strs):
            valid_anagram: str = strs[ind]
            anagrams_dict[hashed_str].append(valid_anagram)

        anagram_groups: List[List[str]] = list(anagrams_dict.values())
        return anagram_groups

    def hash_on_char_frequencies(self, word: str) -> str:
        NUM_OF_LETTERS_IN_ALPHABET: Literal[26] = 26
        CHAR_CODE_OF_FIRST_LETTERS_IN_ALPHABET: int = ord("a")

        char_freq_list: List[int] = [0] * NUM_OF_LETTERS_IN_ALPHABET

        for letter in word:
            index_of_letter = ord(letter) - CHAR_CODE_OF_FIRST_LETTERS_IN_ALPHABET
            char_freq_list[index_of_letter] += 1

        stringified_char_freq_list: List[str] = list(map(str, char_freq_list))

        return "#".join(stringified_char_freq_list)
