from typing import List


class Solution:
    def trap(self, heights: List[int]) -> int:
        left_ind, right_ind = 0, len(heights) - 1
        curr_max_height_to_left, curr_max_height_to_right = (
            heights[left_ind],
            heights[right_ind],
        )

        max_amount_of_water_trappable: int = 0

        while left_ind < right_ind:
            curr_height_at_left_ind = heights[left_ind]
            curr_height_at_right_ind = heights[right_ind]

            if curr_height_at_left_ind <= curr_height_at_right_ind:
                max_amount_of_water_trappable += self.subtract_heights(
                    curr_max_height_to_left, curr_height_at_left_ind
                )
                curr_max_height_to_left = max(
                    curr_max_height_to_left, curr_height_at_left_ind
                )
                left_ind += 1
            else:
                max_amount_of_water_trappable += self.subtract_heights(
                    curr_max_height_to_right, curr_height_at_right_ind
                )
                curr_max_height_to_right = max(
                    curr_max_height_to_right, curr_height_at_right_ind
                )
                right_ind -= 1

        return max_amount_of_water_trappable

    def subtract_heights(self, height_one: int, height_two: int) -> int:
        return height_one - height_two if height_one - height_two > 0 else 0
