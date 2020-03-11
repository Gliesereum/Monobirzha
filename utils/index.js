const getDate = ({ date, separator = '-' }) => {
  if (!date) return '-';
  const data = new Date(date.toString());
  const Month = `0${data.getMonth() + 1}`.slice(-2);
  const Year = `0${data.getFullYear()}`.slice(-2);
  const Day = `0${data.getDate()}`.slice(-2);

  return `${Day}${separator}${Month}${separator}${Year}`;
};

const getNcd = (list) => {
  if (list.length < 1) return null;

  function searchNeededType(list, index) {
    if (index < 0) return null;
    const item = list[index];

    if (item.pay_type === '1') {
      const dateElem = item.pay_date.split('.');
      const dateNow = new Date();
      const diffDatesInMS = dateNow - new Date(+dateElem[2], +dateElem[1] - 1, +dateElem[0]);
      const diffDatesInDays = diffDatesInMS / 1000 / 60 / 60 / 24;

      if (diffDatesInDays < 0) return searchNeededType(list, index - 1);

      return (Math.floor(diffDatesInDays) * item.pay_val/(365 / 2)).toFixed(6);
    } else {
      return searchNeededType(list, index - 1)
    }
  }

  return searchNeededType(list, list.length - 1);
};

export {
  getDate,
  getNcd,
}
