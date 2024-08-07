
const bubbleSort = (array,sortByLength=false) => {
    const arr = Array.from(array); // avoid side effects
    for (let i = 1; i < arr.length; i++) {
      for (let j = 0; j < arr.length - i; j++) {
        if ((arr[j] > arr[j + 1] || (sortByLength & arr[j].length > arr[j + 1].length ) )) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    return arr;
  };
  export default bubbleSort;