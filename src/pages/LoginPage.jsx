import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from '@emotion/styled';
import { FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';
import { SiNaver } from 'react-icons/si';
import { ClipLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { authAPIService } from '../services/authApi';

const LoginContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
  font-size: 1.75rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #555;
`;

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
  
  &.error {
    border-color: #ff4757;
  }
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: #333;
  }
`;

const ErrorMessage = styled.span`
  color: #ff4757;
  font-size: 0.875rem;
  margin-top: 0.25rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s;
  margin-top: 1rem;
  
  &:hover:not(:disabled) {
    transform: scale(1.02);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;
  
  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e0e0e0;
  }
  
  span {
    margin: 0 1rem;
    color: #666;
    font-size: 0.875rem;
  }
`;

const SocialButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  background: white;
  color: #333;
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s;
  margin-bottom: 0.75rem;
  
  &:hover {
    border-color: #667eea;
    background: #f8f9ff;
  }
  
  &.google {
    &:hover {
      border-color: #db4437;
      background: #fff5f5;
    }
  }
  
  &.naver {
    &:hover {
      border-color: #03c75a;
      background: #f0f9f0;
    }
  }
  
`;

const LinkText = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
  
  a {
    color: #667eea;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const AlertMessage = styled.div`
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  
  &.error {
    background: #ffe6e6;
    color: #d63031;
    border: 1px solid #fab1a0;
  }
`;

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  // 이미 로그인된 경우 리다이렉트
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // URL 쿼리 파라미터에서 에러 메시지 확인
  const errorFromUrl = searchParams.get('error');

  const onSubmit = async (data) => {
    const result = await login(data);
    
    if (result.success) {
      toast.success(result.message);
      navigate('/dashboard', { replace: true });
    } else {
      toast.error(result.message);
    }
  };

  return (
    <LoginContainer>
      <Title>로그인</Title>
      
      {errorFromUrl && (
        <AlertMessage className="error">
          {errorFromUrl === 'server_error' && '서버 오류가 발생했습니다.'}
          {errorFromUrl === 'login_error' && '로그인 처리 중 오류가 발생했습니다.'}
          {errorFromUrl !== 'server_error' && errorFromUrl !== 'login_error' && decodeURIComponent(errorFromUrl)}
        </AlertMessage>
      )}
      
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            type="email"
            className={errors.email ? 'error' : ''}
            {...register('email', {
              required: '이메일을 입력해주세요.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '올바른 이메일 형식이 아닙니다.',
              },
            })}
            placeholder="example@email.com"
          />
          {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
        </FormGroup>

        <FormGroup>
          <Label htmlFor="password">비밀번호</Label>
          <InputContainer>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              className={errors.password ? 'error' : ''}
              {...register('password', {
                required: '비밀번호를 입력해주세요.',
                minLength: {
                  value: 6,
                  message: '비밀번호는 최소 6자 이상이어야 합니다.',
                },
              })}
              placeholder="비밀번호를 입력하세요"
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </PasswordToggle>
          </InputContainer>
          {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
        </FormGroup>

        <SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <ClipLoader size={20} color="white" />
              <span style={{ marginLeft: '0.5rem' }}>로그인 중...</span>
            </>
          ) : (
            '로그인'
          )}
        </SubmitButton>
      </Form>

      <Divider>
        <span>또는</span>
      </Divider>

      <SocialButton href={authAPIService.getGoogleLoginUrl()} className="google">
        <FaGoogle /> 구글로 로그인
      </SocialButton>

      <SocialButton href={authAPIService.getNaverLoginUrl()} className="naver">
        <SiNaver /> 네이버로 로그인
      </SocialButton>

      <LinkText>
        아직 계정이 없으신가요?{' '}
        <Link to="/register">회원가입하기</Link>
      </LinkText>
    </LoginContainer>
  );
}

export default LoginPage;