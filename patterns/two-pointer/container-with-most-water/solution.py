from typing import List


class Solution:
    def maxArea(self, heights: List[int]) -> int:
        max_amount_of_water_storable: int = 0
        
        left_ind: int = 0
        right_ind: int = len(heights) - 1
        
        while (left_ind < right_ind):
            left_num: int = heights[left_ind]
            right_num: int = heights[right_ind]
            
            distance_between_heights: int = right_ind - left_ind
            
            smallest_height_of_pair: int = min(left_num, right_num)
            current_area: int = smallest_height_of_pair * distance_between_heights
            
            max_amount_of_water_storable = max(max_amount_of_water_storable, current_area)
            
            if (left_num < right_num):
                left_ind += 1
            else: right_ind -= 1
            
        return max_amount_of_water_storable
