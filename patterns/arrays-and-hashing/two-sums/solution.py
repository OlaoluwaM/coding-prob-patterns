from typing import Dict, List

class Solution:
    def twoSum(self, number_list: List[int], target_number: int) -> List[int]:
        number_index_map: Dict[int, int] = {}
        
        for index_of_initial_number, initial_number in enumerate(number_list):
            other_number_needed_for_target_sum = target_number - initial_number
            
            if other_number_needed_for_target_sum in number_index_map:
                return [number_index_map[other_number_needed_for_target_sum], index_of_initial_number]
            
            number_index_map[initial_number] = index_of_initial_number
