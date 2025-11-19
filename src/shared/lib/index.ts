// validation
export type { ValidationResult } from './validation';
export {
  validateEmail,
  validatePassword,
  validateLoginPassword,
  validatePasswordConfirm,
  validateNickname,
  validateRoomPassword,
} from './validation';

// auth
export {
  AUTH_STORAGE_KEY,
  AUTH_CHANGE_EVENT,
  markUserAuthenticated,
  clearAuthState,
  isUserAuthenticated,
} from './auth';

// share
export { copyToClipboard, shareToKakao, shareToSMS, shareToEmail } from './share';
