export const convertFloodDate = (threshold: string) => {
  if (!threshold) return { days: 0, hours: 0 };

  const date = new Date(threshold);

  //@ts-ignore
  const time = Math.abs(new Date(Date.now()) - date);
  const hours = Math.ceil(time / (1000 * 60 * 60));

  const days = Math.floor(hours / 24);
  const hours_left = hours % 24;

  if (days === 0) {
    if (hours_left === 1) return `${hours_left} hour`;
    return `${hours_left} hours`;
  } else if (days === 1) {
    if (hours_left === 1) return `${days} day and ${hours_left} hour`;
    return `${days} day and ${hours_left} hours`;
  } else {
    if (hours_left === 1) return `${days} days and ${hours_left} hour`;
    return `${days} days and ${hours_left} hours`;
  }
};
