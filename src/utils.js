export const detectSums = (input) => {
  if (!Array.isArray(input)) {
    throw new Error('Input is not an array');
  }

  const result = [];
  const cache = {};

  // Loop through each pair of numbers in the array
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      // Calculate the sum of the pair of numbers
      const sum = input[i] + input[j];
      // Check if the sum is in the input array and if the combination
      // has not already been processed
      if (input.includes(sum) && !cache[`${sum}:${i}:${j}`]) {
        // Add the combination to the result array
        result.push({ pA: i, pB: j, sum: input.indexOf(sum) });
        // Add the combination to the cache object to avoid processing
        // the same combination multiple times
        cache[`${sum}:${i}:${j}`] = true;
        cache[`${sum}:${j}:${i}`] = true;
      }
    }
  }

  return result;
};

export function calculateResult(input) {
  const parsedInput = input.split(',').map(i => parseInt(i.trim(), 10));
  let error = null;
  let result = '';
  try {
    result = detectSums(input);
  } catch (e) {
    error = e.message;
  }
  return { input: parsedInput, result, error }
}
