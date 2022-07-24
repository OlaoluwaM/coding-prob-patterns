from typing import Dict, Set, TypeAlias, List, Literal
from collections import Counter

NumFreqMap: TypeAlias = Dict[int, int]
NumSet: TypeAlias = Set[int]
FreqBucket: TypeAlias = List[List[int]]

class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        num_freq_map: NumFreqMap = Counter(nums)
        filled_freq_bucket_list: FreqBucket = self.fill_freq_bucket_list(nums, num_freq_map)
        top_k_freq_elem: List[int] = self.get_top_k_freq_elems_from_bucket(filled_freq_bucket_list, k)

        return top_k_freq_elem



    def get_top_k_freq_elems_from_bucket(self, freq_bucket_list: FreqBucket, output_limit: int):
        NULL_FREQ: Literal[0] = 0
        output: List[int] = []

        for freq_bucket in reversed(freq_bucket_list):
            if (len(freq_bucket) == NULL_FREQ): continue
            if (len(output) == output_limit): break
            
            output = output + freq_bucket

        return output

    def fill_freq_bucket_list(self, nums: List[int], num_freq_map: NumFreqMap) -> FreqBucket:
        freq_bucket = self.initialize_freq_bucket(nums)

        for (num, num_freq) in num_freq_map.items():
            freq_bucket[num_freq] = freq_bucket[num_freq] + [num]

        return freq_bucket

    def initialize_freq_bucket(self, nums: List[int]) -> FreqBucket:
        # We add 1 to the length so we do not need to manipulate num freqs later
        # When putting them in the bucket
        # To allow num freqs (1 based) to match freq bucket list index without needing to subtract
        bucket: FreqBucket = [[]] * (len(nums) + 1)
        return bucket      
