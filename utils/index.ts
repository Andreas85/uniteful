export const ROUTE_CONSTANTS = {
  HOME: '/',
  PRODUCTS: '/products',
  EVENTS: '/events',
  LOGIN: '/login',
  SIGN_UP: '/signup',
  GROUPS: '/groups',
  SETTINGS: '/settings',
  PROFILE: '/profile',
  GROUP_OWNER: '/groups/owner',
  GROUP_MEMBER: '/groups/member'
}

export const UNITED_COOKIE = {
  TOKEN: 'UNITED_COOKIE_TOKEN',
  USER_DATA: 'UNITED_USER_DATA'
}

export const ENDPOINTS = {
  TODOS: '/todos',
  SIGN_UP: '/auth/signup',
  SIGN_OTP: '/auth/signin-using-otp',
  SEND_SIGNIN_OTP: '/auth/send-signin-otp',
  GROUPS: '/group',
  GROUPS_MEMBERSHIP: '/group/membership',
  GROUPS_OWNERSHIP: '/group/ownership',
  AWS_SIGNED_URL: '/file/s3url',
  USER_SEARCH_AUTO_COMPLETE: '/user/search'
}

export const NUXT_ASYNC_DATA_KEY = {
  OWNER_GROUP: 'owner-group',
  HOME_PAGE_GROUP: 'home-page-group'
}

export const STRING_DATA = {
  GROUPS: 'Groups',
  CANCEL: 'Cancel',
  EDIT: 'Edit',
  UPDATE_GROUP_INFORMATION: 'Update group information',
  YOUR_MEMBERS: 'Your members',
  UPDATE: 'Update',
  ADD_GROUP: 'Add group',
  LOGOUT: 'Logout',
  ADD: 'Add',
  CLOSE: 'Close',
  ADD_EVENT: 'Add Event',
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  LOGIN: 'Login',
  BRAND_NAME: 'Uniteful',
  SIGN_UP: 'Signup',
  COMING_SOON: 'Coming Soon',
  SIGN_IN_ACCOUNT: 'Sign in to your account',
  FORGET_PASSWORD: 'Forgot password?',
  NOT_REGISTERED: 'Not registered?',
  CREATE_ACCOUNT: 'Create an account',
  ALREADY_HAVE_ACCOUNT: 'Already have an account?',
  YOUR_GROUPS: 'Your groups',
  CREATE_GROUP: 'Create group',
  YOUR_EVENTS: 'Your events',
  CREATE_EVENT: 'Create event',
  REGISTER: 'Create account',
  LOGIN_USING_OTP: 'Login using otp',
  SETTINGS: 'Settings',
  HOME: 'Home',
  BACK_TO_HOME: 'Back to home page',
  VERIFY_EMAIL_MESSAGE: 'Verify your email',
  CHANGE: 'Change',
  MEMBERS: 'Members',
  EMAIL_OTP_SUCCESS_MESSAGE: 'We have send an OTP on your email',
  PROFILE: 'Profile'
}

export const ERROR_MESSAGE = {
  FIRST_NAME_REQ: 'Firstname is required',
  LAST_NAME_REQ: 'Lastname is required',
  USER_REQ: 'Username is required',
  EMAIL_REQ: 'Email is required',
  PASSWORD_REQ: 'Password is required',
  CONFIRM_PASSWORD_REQ: 'Confirm password is required',
  INVALID_EMAIL: 'Please enter a valid email (Eg: abc@xyz.com)',
  WHITE_SPACE: 'White space is not allowed',
  NO_DATA_FOUND: 'No data is avaliable',
  PASSWORD_MIN_LENGTH: 'Password must be at least 8 characters long',
  PASSWORDS_MUST_MATCH: 'Passwords must match',
  MIN_2: 'Please enter a name with at least 2 characters',
  MIN_6: 'Your password must be at least 6 characters',
  MAX_PASS_30: 'Password length should not exceed 30 characters',
  MAX_USERNAME_30: 'Username should not exceed 30 characters',
  REGEX_PASS:
    'Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 6 characters long.',
  PHONE_REQ: 'Phone number is required',
  OTP_REQ: 'OTP is required',
  OTP_EXP: 'Invalid or Expired OTP',
  NO_RESULT_FOUND: 'No result found',
  SOMETHING_WENT_WRONG: 'Something went wrong',
  EXERCISE_REQ: 'Exercise is required',
  DURATION_REQ: 'Duration is required',
  REPS_REQ: 'Reps is required',
  LOCATION_REQ: 'Location is required',
  GROUP_NAME_REQ: 'Group name is required',
  EVENT_REQ: 'Event name is required'
}

export const MESSAGES = {
  DELETE_EVENT: 'Are you sure you want to delete this event?'
}

export const URL_ROUTES = [
  {
    label: STRING_DATA.HOME,
    path: ROUTE_CONSTANTS.HOME,
    icon: 'material-symbols:home-outline'
  },
  {
    label: STRING_DATA.YOUR_EVENTS,
    path: ROUTE_CONSTANTS.EVENTS,
    icon: 'ic:outline-emoji-events',
    isAuthenticatedRoute: true
  },
  {
    label: STRING_DATA.YOUR_GROUPS,
    path: ROUTE_CONSTANTS.GROUP_OWNER,
    icon: 'material-symbols:groups-outline',
    isAuthenticatedRoute: true
  },
  {
    label: STRING_DATA.PROFILE,
    path: ROUTE_CONSTANTS.PROFILE,
    icon: 'material-symbols:settings-outline',
    isAuthenticatedRoute: true
  },
  {
    label: STRING_DATA.LOGIN,
    path: ROUTE_CONSTANTS.LOGIN,
    icon: 'material-symbols:login',
    isAuthenticatedRoute: false
  },
  {
    label: STRING_DATA.SIGN_UP,
    path: ROUTE_CONSTANTS.SIGN_UP,
    icon: 'mdi:register-outline',
    isAuthenticatedRoute: false
  }
]

export const DUMMY_DATA = [
  {
    id: 1,
    name: 'Sheku Verma',
    createdAt: 'Joined Mar 18, 2024'
  },
  {
    id: 2,
    name: 'John Doe',
    createdAt: 'Joined Mar 19, 2024'
  },
  {
    id: 3,
    name: 'Alice Smith',
    createdAt: 'Joined Mar 20, 2024'
  },
  {
    id: 4,
    name: 'Bob Johnson',
    createdAt: 'Joined Mar 21, 2024'
  },
  {
    id: 5,
    name: 'Emma Brown',
    createdAt: 'Joined Mar 22, 2024'
  },
  {
    id: 6,
    name: 'Michael Lee',
    createdAt: 'Joined Mar 23, 2024'
  },
  {
    id: 7,
    name: 'Sara Williams',
    createdAt: 'Joined Mar 24, 2024'
  },
  {
    id: 8,
    name: 'David Martinez',
    createdAt: 'Joined Mar 25, 2024'
  },
  {
    id: 9,
    name: 'Jennifer Wilson',
    createdAt: 'Joined Mar 26, 2024'
  },
  {
    id: 10,
    name: 'Daniel Taylor',
    createdAt: 'Joined Mar 27, 2024'
  }
]

export const OTP_EXPIRED_TIME = 180 // 3 minutes
export const HAST_ID = {
  OWNER: '#owner',
  MEMBER: '#member',
  GROUPS: '#groups',
  EVENTS: '#events'
}

export const GROUPS_TAB = [
  { id: 1, label: 'Owner', sectionId: HAST_ID.OWNER },
  {
    id: 2,
    label: 'Member',
    sectionId: HAST_ID.MEMBER
  }
]

export const DASHBOARD_TAB = [
  { id: 1, label: 'Groups', sectionId: HAST_ID.GROUPS },
  {
    id: 2,
    label: 'Events',
    sectionId: HAST_ID.EVENTS
  }
]

export const VISIBILITY = {
  EVERYONE: 'everyone',
  CHERRY_PICKED: 'cherry_picked'
}

export const GROUP_ADMISSION = {
  MANUAL: 'manual',
  AUTOMATIC: 'automatic'
}
export const REGISTRATION = {
  EVERYONE: 'everyone',
  EVERYONE_IN_GROUP: 'everyone_in_group',
  CHERRY_PICKED: 'cherry_picked',
  CRITERIA: 'criteria'
}

export const VISIBILITY_TYPE = [
  { id: 1, name: 'Everyone', code: VISIBILITY.EVERYONE },
  {
    id: 2,
    name: 'Cherry picker',
    code: VISIBILITY.CHERRY_PICKED
  }
]

export const REGISTRATION_POLICY = [
  { id: 1, name: 'Everyone', code: REGISTRATION.EVERYONE },
  {
    id: 2,
    name: 'Everyone in group',
    code: REGISTRATION.EVERYONE_IN_GROUP
  },
  {
    id: 3,
    name: 'Cherry picker',
    code: REGISTRATION.CHERRY_PICKED
  },
  {
    id: 4,
    name: 'Criteria',
    code: REGISTRATION.CRITERIA
  }
]

export const GROUP_ADMISSION_POLICY = [
  { id: 1, name: 'Manual', code: GROUP_ADMISSION.MANUAL },
  {
    id: 2,
    name: 'Automatic',
    code: GROUP_ADMISSION.AUTOMATIC
  }
]
