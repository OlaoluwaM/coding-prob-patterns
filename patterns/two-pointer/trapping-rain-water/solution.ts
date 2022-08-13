function trap(heights: number[]): number {
    let [leftInd, rightInd] = [0, heights.length - 1];
    let [currMaxBoundaryLeft, currMaxBoundaryRight] = [heights[leftInd], heights[rightInd]];

    let maxAmountOfWaterTrapped = 0;

    while (leftInd < rightInd) {
        const [currHeightAtLeftInd, currHeightArrRightInd] = [heights[leftInd], heights[rightInd]]

        if (currHeightAtLeftInd <= currHeightArrRightInd) {
            maxAmountOfWaterTrapped += currMaxBoundaryLeft > currHeightAtLeftInd ? currMaxBoundaryLeft - currHeightAtLeftInd : 0
            currMaxBoundaryLeft = Math.max(currHeightAtLeftInd, currMaxBoundaryLeft)
            leftInd++
        } else {
            maxAmountOfWaterTrapped += currMaxBoundaryRight > currHeightArrRightInd ? currMaxBoundaryRight - currHeightArrRightInd : 0
            currMaxBoundaryRight = Math.max(currMaxBoundaryRight, currHeightArrRightInd)
            rightInd--
        }


    }

    return maxAmountOfWaterTrapped
}
