from typing import List, Set


class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        if len(nums) == 0:
            return 0

        nums_set: Set[int] = set(nums)

        longest_consecutive_sequence_count: int = 1

        for num in nums:
            current_num = num
            is_not_beginning_of_sequence: bool = (num - 1) in nums_set

            if is_not_beginning_of_sequence:
                continue

            current_sequence_count: int = 1

            while (current_num + 1) in nums_set:
                current_sequence_count += 1
                current_num += 1

            longest_consecutive_sequence_count = max(
                current_sequence_count, longest_consecutive_sequence_count
            )

        return longest_consecutive_sequence_count
