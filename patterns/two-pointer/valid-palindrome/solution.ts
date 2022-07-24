function isPalindrome(s: string): boolean {
    const NON_ALPHANUMERIC_REGEX = /[_\W]/g

    const normalizedStr = s.toLowerCase().replace(NON_ALPHANUMERIC_REGEX,'');
    const reversedStr = reverseString(normalizedStr);
    
    return normalizedStr === reversedStr
};

function reverseString(str: string): string {
    const strArr = str.split('');
    const reversedStrArr = strArr.map((_, ind, arr) => arr.at(-1 * (ind + 1)))
    return reversedStrArr.join('')
}
