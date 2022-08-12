function trap(heights: number[]): number {
    let [leftInd, rightInd] = [0, heights.length - 1];
    let [leftMax, rightMax] = [heights[leftInd], heights[rightInd]];
    
    let ans = 0;
    
    while (leftInd < rightInd) {
        const [leftHeight, rightHeight] = [heights[leftInd], heights[rightInd]]
        
        if (leftHeight <= rightHeight) {
            ans += leftMax > leftHeight ? leftMax - leftHeight : 0
            leftMax = Math.max(leftHeight, leftMax) 
            leftInd++
        } else {
            ans += rightMax > rightHeight ? rightMax - rightHeight : 0
            rightMax = Math.max(rightMax, rightHeight)
            rightInd--
        }
        
        
    }
    
    return ans
}
