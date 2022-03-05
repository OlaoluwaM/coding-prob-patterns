function slidingWindow(arr: unknown[] | string, windowSize = 2) {
  if (typeof arr === 'string') arr = convertStringToArray(arr);
  let windowStart = 0;

  for (; windowStart <= arr.length - windowSize; windowStart++) {
    const windowStop = windowStart + windowSize;
    const subset = arr.slice(windowStart, windowStop);

    // Do whatever computation here
  }
}

function convertStringToArray(str: string): string[] {
  return str.split('');
}
