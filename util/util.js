export function findIndex(data, keyfield, value) {
    return data.indexOf(data.find(function (el, index) {
      return el[keyfield] === value;
    }));
}

export function findIndexInStringArray(data, value) {
  return data.indexOf(data.find(function (el, index) {
    return el === value;
  }));
}