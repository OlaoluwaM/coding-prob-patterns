class Solution:
    def validPalindrome(self, s: str) -> bool:
        if self.is_palindrome(s): return True
        return self.attempt_palindrome_conversion(s)
        
    def is_palindrome(self, s: str) -> bool:
        reversed_s: str = s[::-1]
        return s == reversed_s
    
    def attempt_palindrome_conversion(self, s: str) -> bool:
        left_ind, right_ind = 0, len(s) - 1
        
        while left_ind < right_ind:
            left_char: str = s[left_ind]
            right_char: str = s[right_ind]
            
            if left_char != right_char: return self.check_palindrome_eligibility(left_ind, right_ind, s)
            
            left_ind += 1
            right_ind -= 1
    
    def check_palindrome_eligibility(self, left_ind: int, right_ind: int, s) -> bool:
        potential_palindrome_one: str = s[:right_ind] + s[right_ind + 1:]
        potential_palindrome_two: str = s[:left_ind] + s[left_ind + 1:]
            
        potential_palindrome_one_is_palindrome: str = self.is_palindrome(potential_palindrome_one)
        potential_palindrome_two_is_palindrome: str = self.is_palindrome(potential_palindrome_two)
            
        return potential_palindrome_one_is_palindrome or potential_palindrome_two_is_palindrome
            
