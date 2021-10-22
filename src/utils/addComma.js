export default function addComma(amount) {
  const numberlized = parseInt(amount);
  if (isNaN(numberlized) || numberlized < 0) return;
  return numberlized.toLocaleString();
}
