function productExceptSelf(nums: number[]): number[] {
    const prefixArr: number[] = generatePrefixArr(nums)
    const postfixArr: number[] = generatePostFixArr(nums)
    
    const answer: number[] = nums.map((_, ind) => {
        const PRODUCT_IDENTITY_VAL = 1;
        
        const prefixProduct = prefixArr[ind - 1] ?? PRODUCT_IDENTITY_VAL;
        const postfixProduct = postfixArr[ind + 1] ?? PRODUCT_IDENTITY_VAL
        
        return prefixProduct * postfixProduct
    })
    
    return answer
};

function generatePrefixArr(arr: number[]): number[] {
    let prevValue: number = 1;
    
    const prefixArr: number[] = arr.map((num, ind, originalArr) => {
        const product: number = num * prevValue
        prevValue = product
        return product
    })
    
    return prefixArr
}

function generatePostFixArr(arr: number[]): number[] {
    const partialPostfixArr: number[] = generatePrefixArr(arr.reverse())
    return partialPostfixArr.reverse()
}
