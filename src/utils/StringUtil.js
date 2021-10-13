/**
 * 인자로 받은 문자열의 null 여부를 판별 (문자열이 아닌 경우 undefined를 반환)
 * @param {string} str null 여부를 판별할 문자열
 * @returns null 여부
 */
const isNull = str => {
  if (typeof str !== 'string') {
    return undefined;
  } else {
    return str === undefined || str === null || str === '';
  }
};

export default { isNull };
