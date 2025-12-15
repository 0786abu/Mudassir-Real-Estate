export function formatPK(num) {
  if(!num) return;
  const absNum = Math.abs(num);

  if (absNum >= 1000000000) {
    return (num / 1000000000).toFixed(2).replace(/\.00$/, "") + " Arab";
  } else if (absNum >= 10000000) {
    return (num / 10000000).toFixed(2).replace(/\.00$/, "") + " Crore";
  } else if (absNum >= 100000) {
    return (num / 100000).toFixed(2).replace(/\.00$/, "") + " Lakh";
  } else {
    return num.toLocaleString("en-IN");
  }
}
