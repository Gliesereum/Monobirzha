const getDate = ({ date, separator = '-' }) => {
  if (!date) return '-';
  const data = new Date(date.toString());
  const Month = `0${data.getMonth() + 1}`.slice(-2);
  const Year = `0${data.getFullYear()}`.slice(-2);
  const Day = `0${data.getDate()}`.slice(-2);

  return `${Day}${separator}${Month}${separator}${Year}`;
};

export {
  getDate,
}
