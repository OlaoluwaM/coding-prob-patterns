function maxArea(heights: number[]): number {    
    let maxAmountOfWaterStorable: number = 0;
    
    let leftInd = 0;
    let rightInd = heights.length - 1;
    
    while (leftInd < rightInd) {
        let leftNum = heights[leftInd];
        let rightNum = heights[rightInd];
        
        const distanceBetweenHeights = rightInd - leftInd
        
        const smallerNumOfPair = Math.min(leftNum, rightNum)
        const currentAreaOfContainer = multiply(smallerNumOfPair, distanceBetweenHeights);
        
        maxAmountOfWaterStorable = Math.max(maxAmountOfWaterStorable, currentAreaOfContainer);
        
        if (leftNum < rightNum) {
            leftInd++
        } else rightInd--
    }
    
    return maxAmountOfWaterStorable
};
    
function multiply(numOne: number, numTwo: number) {
    return numOne * numTwo
}
