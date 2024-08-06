function sortFromMid(arr) {
  let res = [];
  for (let i = Math.ceil(arr.length / 2); i >= 0; i--) {
    res.push(arr[i]);
    res.push(arr[arr.length - i + 1]);
  }
  return res.filter((x) => x !== undefined);
}
export default sortFromMid;