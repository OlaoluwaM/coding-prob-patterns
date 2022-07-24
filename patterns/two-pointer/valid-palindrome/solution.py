from re import sub

class Solution:
    def isPalindrome(self, s: str) -> bool:
        normalized_str: str = sub(r'[_\W]', '', s.lower())
        reversed_str: str = self.reverse_str(normalized_str)
        
        return normalized_str == reversed_str
    
        # Alt
        # normalized_str: str = ''.join(char for char in s if char.isalnum()).lower()
        # return normalized_str == normalized_str[::-1]
    
    def reverse_str(self, s: str) -> str:
        str_list: List[str] = list(s)
        reversed_str_list: List[str] = list(reversed(str_list))

        return ''.join(reversed_str_list);
