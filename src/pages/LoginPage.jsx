import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { authAPIService } from '../services/authApi';
import styled from '@emotion/styled';
import { FaEye, FaEyeSlash, FaGoogle, FaUser, FaLock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { ClipLoader } from 'react-spinners';

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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
`;

const PasswordToggle = styled.button`
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  padding: 0.25rem;
`;

const ErrorMessage = styled.span`
  color: #ff4757;
  font-size: 0.875rem;
  margin-top: 0.25rem;
  display: block;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s;
  
  &:hover {
    transform: scale(1.02);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SocialLoginContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const SocialButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  background: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-size: 1rem;
  transition: all 0.3s;
  
  &:hover {
    border-color: #667eea;
    background: #f8f9ff;
  }
`;

const Divider = styled.div`
  text-align: center;
  margin: 1.5rem 0;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #e0e0e0;
  }
  
  span {
    background: white;
    padding: 0 1rem;
    color: #666;
  }
`;

const SignupLink = styled.div`
  text-align: center;
  margin-top: 1.5rem;
  
  a {
    color: #667eea;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const { register, handleSubmit, formState: { errors } } = useForm();

  const from = location.state?.from?.pathname || '/dashboard';

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const result = await login(data.email, data.password);
      if (result.success) {
        toast.success('로그인 성공!');
        navigate(from, { replace: true });
      } else {
        toast.error(result.message || '로그인에 실패했습니다.');
      }
    } catch (error) {
      toast.error('로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const response = await authAPIService.getGoogleAuthUrl();
      window.location.href = response.data.url;
    } catch (error) {
      toast.error('Google 로그인 설정에 문제가 있습니다.');
    }
  };

  const handleNaverLogin = async () => {
    try {
      const response = await authAPIService.getNaverAuthUrl();
      window.location.href = response.data.url;
    } catch (error) {
      toast.error('Naver 로그인 설정에 문제가 있습니다.');
    }
  };

  return (
    <LoginContainer>
      <Title>로그인</Title>
      
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputGroup>
          <InputIcon>
            <FaUser />
          </InputIcon>
          <Input
            type="email"
            placeholder="이메일"
            {...register('email', {
              required: '이메일은 필수입니다',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: '올바른 이메일 형식이 아닙니다'
              }
            })}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </InputGroup>

        <InputGroup>
          <InputIcon>
            <FaLock />
          </InputIcon>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호"
            {...register('password', {
              required: '비밀번호는 필수입니다',
              minLength: {
                value: 6,
                message: '비밀번호는 최소 6자 이상이어야 합니다'
              }
            })}
          />
          <PasswordToggle
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </PasswordToggle>
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </InputGroup>

        <SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? <ClipLoader size={20} color="white" /> : '로그인'}
        </SubmitButton>
      </Form>

      <Divider>
        <span>또는</span>
      </Divider>

      <SocialLoginContainer>
        <SocialButton type="button" onClick={handleGoogleLogin}>
          <FaGoogle color="#4285F4" />
          Google로 로그인
        </SocialButton>
        
        <SocialButton type="button" onClick={handleNaverLogin}>
          <span style={{ color: '#03C75A', fontWeight: 'bold' }}>N</span>
          Naver로 로그인
        </SocialButton>
      </SocialLoginContainer>

      <SignupLink>
        계정이 없으신가요? <Link to="/register">회원가입</Link>
      </SignupLink>
    </LoginContainer>
  );
}

export default LoginPage;