'use client';

import { useState, FormEvent } from 'react';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import {
  validateEmail,
  validatePassword,
  validatePasswordConfirm,
  validateNickname,
} from '@/shared/lib/validation';

interface SignupFormData {
  email: string;
  password: string;
  passwordConfirm: string;
  nickname: string;
}

interface SignupFormErrors {
  email?: string;
  password?: string;
  passwordConfirm?: string;
  nickname?: string;
}

export function SignupForm() {
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    password: '',
    passwordConfirm: '',
    nickname: '',
  });

  const [errors, setErrors] = useState<SignupFormErrors>({});
  const [touched, setTouched] = useState<Record<keyof SignupFormData, boolean>>({
    email: false,
    password: false,
    passwordConfirm: false,
    nickname: false,
  });

  const handleChange =
    (field: keyof SignupFormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));

      // 입력 중에는 에러를 실시간으로 업데이트
      if (touched[field]) {
        validateField(field, value);
      }
    };

  const handleBlur = (field: keyof SignupFormData) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const validateField = (field: keyof SignupFormData, value: string) => {
    let result;

    switch (field) {
      case 'email':
        result = validateEmail(value);
        break;
      case 'password':
        result = validatePassword(value);
        // 비밀번호가 변경되면 비밀번호 확인도 재검증
        if (formData.passwordConfirm && touched.passwordConfirm) {
          const confirmResult = validatePasswordConfirm(value, formData.passwordConfirm);
          setErrors((prev) => ({ ...prev, passwordConfirm: confirmResult.error }));
        }
        break;
      case 'passwordConfirm':
        result = validatePasswordConfirm(formData.password, value);
        break;
      case 'nickname':
        result = validateNickname(value);
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: result?.error }));
  };

  const validateAllFields = (): boolean => {
    const emailResult = validateEmail(formData.email);
    const passwordResult = validatePassword(formData.password);
    const passwordConfirmResult = validatePasswordConfirm(
      formData.password,
      formData.passwordConfirm
    );
    const nicknameResult = validateNickname(formData.nickname);

    const newErrors: SignupFormErrors = {
      email: emailResult.error,
      password: passwordResult.error,
      passwordConfirm: passwordConfirmResult.error,
      nickname: nicknameResult.error,
    };

    setErrors(newErrors);

    // 모든 필드를 touched로 표시
    setTouched({
      email: true,
      password: true,
      passwordConfirm: true,
      nickname: true,
    });

    return (
      emailResult.isValid &&
      passwordResult.isValid &&
      passwordConfirmResult.isValid &&
      nicknameResult.isValid
    );
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validateAllFields()) {
      // TODO: 실제 API 호출 로직은 나중에 추가
      console.log('회원가입 데이터:', formData);
      alert('회원가입이 완료되었습니다! (UI만 구현됨)');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="이메일"
        type="email"
        placeholder="example@email.com"
        value={formData.email}
        onChange={handleChange('email')}
        onBlur={handleBlur('email')}
        error={touched.email ? errors.email : undefined}
        maxLength={50}
      />

      <Input
        label="비밀번호"
        type="password"
        placeholder="8~20자, 영어·숫자·특수문자 2종류 이상"
        value={formData.password}
        onChange={handleChange('password')}
        onBlur={handleBlur('password')}
        error={touched.password ? errors.password : undefined}
        maxLength={20}
      />

      <Input
        label="비밀번호 확인"
        type="password"
        placeholder="비밀번호를 다시 입력하세요"
        value={formData.passwordConfirm}
        onChange={handleChange('passwordConfirm')}
        onBlur={handleBlur('passwordConfirm')}
        error={touched.passwordConfirm ? errors.passwordConfirm : undefined}
        maxLength={20}
      />

      <Input
        label="닉네임"
        type="text"
        placeholder="2~12자, 한글/영문/숫자"
        value={formData.nickname}
        onChange={handleChange('nickname')}
        onBlur={handleBlur('nickname')}
        error={touched.nickname ? errors.nickname : undefined}
        maxLength={12}
      />

      <Button type="submit" fullWidth>
        회원가입
      </Button>
    </form>
  );
}
