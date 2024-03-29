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

    START_LIST: "START_LIST/orders",
    SUCCESS_LIST: "SUCCESS_LIST/orders",
    FINISH_LIST: "FINISH_LIST/orders",
    ERROR_LIST: "ERROR_LIST/orders",
  }
};
