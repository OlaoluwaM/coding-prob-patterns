from typing import List


class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        nums.sort()

        output_list: List[List[int]] = []

        for ind, _ in enumerate(nums):
            current_num: int = nums[ind]

            if ind > 0 and current_num == nums[ind - 1]:
                continue

            left_ind: int = ind + 1
            right_ind: int = len(nums) - 1

            while left_ind < right_ind:
                left_num: int = nums[left_ind]
                right_num: int = nums[right_ind]

                triplet_sum: int = current_num + left_num + right_num

                if triplet_sum == 0:
                    output_list.append([current_num, left_num, right_num])

                    while left_num == nums[left_ind + 1]:
                        left_ind += 1
                        if left_ind + 1 >= len(nums):
                            break

                    left_ind += 1
                elif triplet_sum < 0:
                    left_ind += 1
                else:
                    right_ind -= 1

        return output_list
