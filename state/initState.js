export const initState = {
  root: {
    loading: true,
    status: null,
    error: null,
  },
  ovdpList: [],
  single: {
    bond: null,
    loading: false,
    error: null,
    actionError: null,
  },
  brokerList: [
    {
      id: 1,
      name: 'Фридом Финанс',
      logo: ''
    },
    {
      id: 2,
      name: 'Универ Капитал',
      logo: ''
    },
  ],
  auth: {
    loading: false,
    phoneRequest: false,
    authLoading: false,
    requestLoading: false,
    token: null,
    phone: null,
    name: null,
    brokerId: null,
    brokerStatus: 'REQUEST',
    brokerAccount: 0,
    bankIdAccount: null,
    faceIdActive: false,
    localPinCodeActive: false,
    pinCode: null,
    error: null
  },
  orders: {
    list: [],
    error: null,
    loading: false,
  }
};
