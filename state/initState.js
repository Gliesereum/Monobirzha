export const initState = {
  root: {
    loading: true,
    status: null,
    error: null,
  },
  ovdpList: [],
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
    token: null,
    phone: null,
    name: null,
    brokerId: null,
    brokerStatus: 'REQUEST',
    brokerAccount: null,
    bankIdAccount: null,
    faceIdActive: false,
    localPinCodeActive: false,
    pinCode: null,
    error: null
  },
};
