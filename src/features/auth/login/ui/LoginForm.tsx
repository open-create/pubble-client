'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Input,
  Button,
  markUserAuthenticated,
  validateEmail,
  validateLoginPassword,
} from '@/shared';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
}

export function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [touched, setTouched] = useState<Record<keyof LoginFormData, boolean>>({
    email: false,
    password: false,
  });
  const [authError, setAuthError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange =
    (field: keyof LoginFormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
      setAuthError(null);

      if (touched[field]) {
        validateField(field, value);
      }
    };

  const handleBlur = (field: keyof LoginFormData) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  const validateField = (field: keyof LoginFormData, value: string) => {
    let result;

    switch (field) {
      case 'email':
        result = validateEmail(value);
        break;
      case 'password':
        result = validateLoginPassword(value);
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: result?.error }));
  };

  const validateAllFields = () => {
    const emailResult = validateEmail(formData.email);
    const passwordResult = validateLoginPassword(formData.password);

    setErrors({
      email: emailResult.error,
      password: passwordResult.error,
    });

    setTouched({
      email: true,
      password: true,
    });

    return emailResult.isValid && passwordResult.isValid;
  };

  const mockLogin = async (email: string, password: string) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const isDemoUser = email === 'demo@pubble.com' && password === 'password123';

    return { success: isDemoUser };
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!validateAllFields()) {
      return;
    }

    setIsSubmitting(true);
    setAuthError(null);

    try {
      const result = await mockLogin(formData.email, formData.password);

      if (result.success) {
        markUserAuthenticated();
        router.push('/');
      } else {
        setAuthError('이메일 또는 비밀번호가 올바르지 않습니다.');
      }
    } finally {
      setIsSubmitting(false);
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
        placeholder="비밀번호"
        value={formData.password}
        onChange={handleChange('password')}
        onBlur={handleBlur('password')}
        error={touched.password ? errors.password : undefined}
        maxLength={20}
      />

      {authError && <p className="text-sm text-red-500">{authError}</p>}

      <Button type="submit" fullWidth disabled={isSubmitting}>
        {isSubmitting ? '로그인 중...' : '로그인'}
      </Button>
    </form>
  );
}
