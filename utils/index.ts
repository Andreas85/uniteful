export const ROUTE_CONSTANTS = {
  HOME: "/",
  PRODUCTS: "/products",
  EVENTS: "/events",
  LOGIN: "/login",
  SIGN_UP: "/signup",
  GROUPS: "/groups",
  SETTINGS: "/settings",
};

export const UNITED_COOKIE = {
  TOKEN: "UNITED_COOKIE_TOKEN",
  USER_DATA: "UNITED_USER_DATA",
};

export const ENDPOINTS = {
  TODOS: "/todos",
  SIGN_UP: "/auth/signup",
  SIGN_OTP: "/auth/signin-using-otp",
  SEND_SIGNIN_OTP: "/auth/send-signin-otp",
  GROUPS: "/group",
};

export const STRING_DATA = {
  ADD_GROUP: "Add group",
  LOGOUT: "Logout",
  ADD: "Add",
  CLOSE: "Close",
  ADD_EVENT: "Add Event",
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
  LOGIN: "Login",
  BRAND_NAME: "United",
  SIGN_UP: "Signup",
  COMING_SOON: "Coming Soon",
  SIGN_IN_ACCOUNT: "Sign in to your account",
  FORGET_PASSWORD: "Forgot password?",
  NOT_REGISTERED: "Not registered?",
  CREATE_ACCOUNT: "Create an account",
  ALREADY_HAVE_ACCOUNT: "Already have an account?",
  YOUR_GROUPS: "Your groups",
  CREATE_GROUP: "Create group",
  YOUR_EVENTS: "Your events",
  CREATE_EVENT: "Create event",
  REGISTER: "Create account",
  LOGIN_USING_OTP: "Login using otp",
  SETTINGS: "Settings",
  HOME: "Home",
  BACK_TO_HOME: "Back to home page",
  VERIFY_EMAIL_MESSAGE: "Verify your email",
  CHANGE: "Change",
};

export const ERROR_MESSAGE = {
  FIRST_NAME_REQ: "Firstname is required",
  LAST_NAME_REQ: "Lastname is required",
  USER_REQ: "Username is required",
  EMAIL_REQ: "Email is required",
  PASSWORD_REQ: "Password is required",
  CONFIRM_PASSWORD_REQ: "Confirm password is required",
  INVALID_EMAIL: "Please enter a valid email (Eg: abc@xyz.com)",
  WHITE_SPACE: "White space is not allowed",
  NO_DATA_FOUND: "No data is avaliable",
  PASSWORD_MIN_LENGTH: "Password must be at least 8 characters long",
  PASSWORDS_MUST_MATCH: "Passwords must match",
  MIN_2: "Please enter a name with at least 2 characters",
  MIN_6: "Your password must be at least 6 characters",
  MAX_PASS_30: "Password length should not exceed 30 characters",
  MAX_USERNAME_30: "Username should not exceed 30 characters",
  REGEX_PASS:
    "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 6 characters long.",
  PHONE_REQ: "Phone number is required",
  OTP_REQ: "OTP is required",
  OTP_EXP: "Invalid or Expired OTP",
  NO_RESULT_FOUND: "No result found",
  SOMETHING_WENT_WRONG: "Something went wrong",
  EXERCISE_REQ: "Exercise is required",
  DURATION_REQ: "Duration is required",
  REPS_REQ: "Reps is required",
  LOCATION_REQ: "Location is required",
  GROUP_NAME_REQ: "Group name is required",
};

export const MESSAGES = {
  DELETE_EVENT: "Are you sure you want to delete this event?",
};

export const URL_ROUTES = [
  {
    label: STRING_DATA.HOME,
    path: ROUTE_CONSTANTS.HOME,
    icon: "material-symbols:home-outline",
  },
  {
    label: STRING_DATA.YOUR_EVENTS,
    path: ROUTE_CONSTANTS.EVENTS,
    icon: "ic:outline-emoji-events",
    isAuthenticatedRoute: true,
  },
  {
    label: STRING_DATA.YOUR_GROUPS,
    path: ROUTE_CONSTANTS.GROUPS,
    icon: "material-symbols:groups-outline",
    isAuthenticatedRoute: true,
  },
  {
    label: STRING_DATA.LOGIN,
    path: ROUTE_CONSTANTS.LOGIN,
    icon: "material-symbols:login",
    isAuthenticatedRoute: false,
  },
  {
    label: STRING_DATA.SIGN_UP,
    path: ROUTE_CONSTANTS.SIGN_UP,
    icon: "mdi:register-outline",
    isAuthenticatedRoute: false,
  },
];

export const DUMMY_DATA = [
  { id: 1, location: "Agra" },
  { id: 2, location: "Agra" },
  { id: 3, location: "Agra" },
  { id: 4, location: "Agra" },
  { id: 5, location: "Agra" },
  { id: 6, location: "Agra" },
];

export const OTP_EXPIRED_TIME = 180; // 3 minutes
