export default function addComma(amount) {
  if (typeof amount === 'number') {
    return amount.toLocaleString();
  } else if (typeof amount === 'string') {
    return parseInt(amount).toLocaleString();
  } else {
    return '';
  }
}
