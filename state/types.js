export const Types = {
  start: {
    START: "START/app",
    SUCCESS: "SUCCESS/app",
    FINISH: "FINISH/app",
    ERROR: "ERROR/app",
    LEGAL: "LEGAL/app"
  },
  auth: {
    START_CHECK_PHONE: "START_CHECK_PHONE/auth",
    SUCCESS_CHECK_PHONE: "SUCCESS_CHECK_PHONE/auth",
    FINISH_CHECK_PHONE: "FINISH_CHECK_PHONE/auth",
    ERROR_CHECK_PHONE: "ERROR_CHECK_PHONE/auth",
    RESET_CHECK_PHONE: "RESET_CHECK_PHONE/auth",
    //---------------------------------------------//
    START_VERIFY_CODE: "START_VERIFY_CODE/auth",
    SUCCESS_VERIFY_CODE: "SUCCESS_VERIFY_CODE/auth",
    FINISH_VERIFY_CODE: "FINISH_VERIFY_CODE/auth",
    ERROR_VERIFY_CODE: "ERROR_VERIFY_CODE/auth",
    //---------------------------------------------//
    ACCOUNT: "ACCOUNT/auth",
    LOG_OUT: "LOG_OUT/auth",
    //---------------------------------------------//
    START_BROKER_ACCOUNT: "START_BROKER_ACCOUNT/auth",
    SUCCESS_BROKER_ACCOUNT: "SUCCESS_BROKER_ACCOUNT/auth",
    FINISH_BROKER_ACCOUNT: "FINISH_BROKER_ACCOUNT/auth",
    ERROR_BROKER_ACCOUNT: "ERROR_BROKER_ACCOUNT/auth",
  },
  single: {
    START: "START/single",
    SUCCESS: "SUCCESS/single",
    FINISH: "FINISH/single",
    ERROR: "ERROR/single",
  },
  orders: {
    START_ACTION: "START_ACTION/orders",
    SUCCESS_ACTION: "SUCCESS_ACTION/orders",
    FINISH_ACTION: "FINISH_ACTION/orders",
    ERROR_ACTION: "ERROR_ACTION/orders",

    // full list
    START_FULL_LIST: "START_FULL_LIST/orders",
    SUCCESS_FULL_LIST: "SUCCESS_FULL_LIST/orders",
    FINISH_FULL_LIST: "FINISH_FULL_LIST/orders",
    ERROR_FULL_LIST: "ERROR_FULL_LIST/orders",

    // success list
    START_SUCCESS_LIST: "START_SUCCESS_LIST/orders",
    SUCCESS_SUCCESS_LIST: "SUCCESS_SUCCESS_LIST/orders",
    FINISH_SUCCESS_LIST: "FINISH_SUCCESS_LIST/orders",
    ERROR_SUCCESS_LIST: "ERROR_SUCCESS_LIST/orders",

    // pending list
    START_PENDING_LIST: "START_PENDING_LIST/orders",
    SUCCESS_PENDING_LIST: "SUCCESS_PENDING_LIST/orders",
    FINISH_PENDING_LIST: "FINISH_PENDING_LIST/orders",
    ERROR_PENDING_LIST: "ERROR_PENDING_LIST/orders",

    // canceled list
    START_CANCELED_LIST: "START_CANCELED_LIST/orders",
    SUCCESS_CANCELED_LIST: "SUCCESS_CANCELED_LIST/orders",
    FINISH_CANCELED_LIST: "FINISH_CANCELED_LIST/orders",
    ERROR_CANCELED_LIST: "ERROR_CANCELED_LIST/orders",
  },
  portfolio: {
    START_LIST: "START_LIST/portfolio",
    SUCCESS_LIST: "SUCCESS_LIST/portfolio",
    FINISH_LIST: "FINISH_LIST/portfolio",
    ERROR_LIST: "ERROR_LIST/portfolio",
  }
};
