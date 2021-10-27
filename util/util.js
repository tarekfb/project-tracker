/**
 * Looks inside of a list (data) on a property (keyfield) for a given value (value).
 * @param {*} data
 * @param {*} keyfield
 * @param {*} value
 * @returns The index of the item, or -1 if not found.
 */
export function findIndex(data, keyfield, value) {
  return data.indexOf(
    data.find(function (el, index) {
      return el[keyfield] === value;
    })
  );
}

export function findIndexInStringArray(data, value) {
  return data.indexOf(
    data.find(function (el, index) {
      return el === value;
    })
  );
}
