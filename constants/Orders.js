const ORDER_STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  CANCELED: 'canceled',
  ALL: 'all',
};

const ORDER_DIRECTIONS = {
  buy: 'Купівля',
  sell: 'Продаж',
};

const ICON_STATUS = {
  SUCCESS: {
    color: 'black',
    icon: 'check',
  },
  PENDING: {
    color: 'black',
    icon: 'hour-glass',
  },
  CANCELED: {
    color: 'black',
    icon: 'block',
  }
};

export {
  ORDER_STATUS,
  ORDER_DIRECTIONS,
  ICON_STATUS,
}
