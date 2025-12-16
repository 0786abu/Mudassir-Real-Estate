export function formatPK(num) {
  if(!num) return "0";
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

export function formatKK(num) {
  if (!num) return 0;   // 0 ka special case

  const absNum = Math.abs(num);

  if (absNum >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B"; // Billion
  } else if (absNum >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M"; // Million
  } else if (absNum >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K"; // Thousand
  } else {
    return num.toString(); // 0–999 normal
  }
}