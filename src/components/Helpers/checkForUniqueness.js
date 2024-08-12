const checkForUniqueness=(array)=>{
  const checkSet = new Set(array);

  // Strict equality
  // Return boolean value
  return checkSet.size === array.length;
}
export default checkForUniqueness;