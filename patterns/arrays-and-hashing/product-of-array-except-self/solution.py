from typing import List


class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        output: List[int] = self.multiply_prefix_by_postfix(
            self.generate_prefix_list(nums), nums
        )

        return output

    def generate_prefix_list(self, initial_nums: List[int]) -> List[int]:
        curr_prefix: int = 1
        prefix_list: List[int] = []

        for ind in range(len(initial_nums)):
            prefix_list.extend([curr_prefix])

            curr_num = initial_nums[ind]
            next_prefix = curr_prefix * curr_num

            curr_prefix = next_prefix

        return prefix_list

    def multiply_prefix_by_postfix(
        self, prefix_list: List[int], initial_nums: List[int]
    ) -> List[int]:
        print(f"prefix_list: {prefix_list}")
        postfix_list: List[int] = prefix_list
        curr_postfix: int = 1

        for ind in range(len(postfix_list) - 1, -1, -1):
            postfix_list[ind] *= curr_postfix

            num_from_initial_nums = initial_nums[ind]
            curr_postfix *= num_from_initial_nums

        print(f"postfix_list: {postfix_list}")
        return postfix_list


# [5, 2, 3, 4]
# [1, 5, 10, 30]
# [24, 60, 40, 30]

new_solution_dict = Solution()
print(new_solution_dict.productExceptSelf([5, 2, 3, 4]))
