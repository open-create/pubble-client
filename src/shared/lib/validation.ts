export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * 이메일 유효성 검사
 * - 이메일 형식
 * - 최대 50자
 */
export function validateEmail(email: string): ValidationResult {
  if (!email) {
    return { isValid: false, error: '이메일을 입력해주세요.' };
  }

  if (email.length > 50) {
    return { isValid: false, error: '이메일은 최대 50자까지 입력 가능합니다.' };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, error: '올바른 이메일 형식이 아닙니다.' };
  }

  return { isValid: true };
}

/**
 * 비밀번호 유효성 검사
 * - 8~20자
 * - 영어·숫자·특수문자 2종류 이상
 */
export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return { isValid: false, error: '비밀번호를 입력해주세요.' };
  }

  if (password.length < 8 || password.length > 20) {
    return { isValid: false, error: '비밀번호는 8~20자로 입력해주세요.' };
  }

  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const typesCount = [hasLetter, hasNumber, hasSpecial].filter(Boolean).length;

  if (typesCount < 2) {
    return { isValid: false, error: '영어, 숫자, 특수문자 중 2종류 이상을 포함해야 합니다.' };
  }

  return { isValid: true };
}

/**
 * 로그인 비밀번호 검사
 * - 필수 입력
 * - 최대 20자
 */
export function validateLoginPassword(password: string): ValidationResult {
  if (!password) {
    return { isValid: false, error: '비밀번호를 입력해주세요.' };
  }

  if (password.length > 20) {
    return { isValid: false, error: '비밀번호는 최대 20자까지 입력 가능합니다.' };
  }

  return { isValid: true };
}

/**
 * 비밀번호 확인 검사
 */
export function validatePasswordConfirm(
  password: string,
  passwordConfirm: string
): ValidationResult {
  if (!passwordConfirm) {
    return { isValid: false, error: '비밀번호 확인을 입력해주세요.' };
  }

  if (password !== passwordConfirm) {
    return { isValid: false, error: '비밀번호가 일치하지 않습니다.' };
  }

  return { isValid: true };
}

/**
 * 닉네임 유효성 검사
 * - 2~12자
 * - 한글/영문/숫자
 */
export function validateNickname(nickname: string): ValidationResult {
  if (!nickname) {
    return { isValid: false, error: '닉네임을 입력해주세요.' };
  }

  if (nickname.length < 2 || nickname.length > 12) {
    return { isValid: false, error: '닉네임은 2~12자로 입력해주세요.' };
  }

  const nicknameRegex = /^[가-힣a-zA-Z0-9]+$/;
  if (!nicknameRegex.test(nickname)) {
    return { isValid: false, error: '닉네임은 한글, 영문, 숫자만 사용 가능합니다.' };
  }

  return { isValid: true };
}
