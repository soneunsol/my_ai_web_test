import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

import BrandLogo from '../components/common/brand-logo';
import PageShell from '../components/ui/page-shell';
import PasswordRuleList from '../components/ui/password-rule-list';
import { checkUsernameAvailable } from '../lib/auth-api';
import { isPasswordValid, validateUsername } from '../utils/validate';
import { useAuth } from '../hooks/auth-context';

/**
 * SignupPage 컴포넌트
 * 아이디 중복확인과 비밀번호 규칙 체크를 포함한 회원가입 화면.
 *
 * Example usage:
 * <Route path="/signup" element={ <SignupPage /> } />
 */
function SignupPage() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [checkResult, setCheckResult] = useState(null);
  const [isChecking, setIsChecking] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const usernameValidation = validateUsername(username.trim());
  const isUsernameConfirmed =
    checkResult?.isAvailable === true && checkResult.username === username.trim();
  const isSubmitDisabled = !isUsernameConfirmed || !isPasswordValid(password) || isSubmitting;

  /** 아이디를 다시 입력하면 이전 중복확인 결과를 초기화한다. */
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setCheckResult(null);
  };

  /** 아이디 중복 여부를 서버에 확인한다. */
  const handleCheckUsername = async () => {
    const trimmed = username.trim();

    if (!usernameValidation.isValid) {
      setCheckResult({ username: trimmed, isAvailable: false, message: usernameValidation.message });

      return;
    }

    setIsChecking(true);

    try {
      const isAvailable = await checkUsernameAvailable(trimmed);

      setCheckResult({
        username: trimmed,
        isAvailable,
        message: isAvailable ? '사용 가능한 아이디예요!' : '이미 사용 중인 아이디예요.',
      });
    } catch (error) {
      setCheckResult({
        username: trimmed,
        isAvailable: false,
        message: `확인에 실패했어요. (${ error.message })`,
      });
    } finally {
      setIsChecking(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      await signUp({ username: username.trim(), nickname: nickname.trim(), password });
      navigate('/posts', { replace: true });
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageShell maxWidth="sm" isCentered>
      <Box
        sx={ { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: { xs: 3, md: 4 } } }
      >
        <BrandLogo size={ 64 } hasTagline={ false } />

        <Paper
          elevation={ 0 }
          sx={ {
            width: '100%',
            p: { xs: 3, md: 4 },
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 18px 40px rgba(28, 24, 48, 0.06)',
          } }
        >
          <Typography
            component="h1"
            sx={ { fontSize: { xs: '1.5rem', md: '1.75rem' }, fontWeight: 800, textAlign: 'center' } }
          >
            회원가입
          </Typography>

          <Typography
            component="p"
            sx={ { mt: 1, mb: 3, textAlign: 'center', fontSize: '0.875rem', color: 'text.secondary' } }
          >
            DEVIGN 에서 나만의 기록을 시작해 보세요.
          </Typography>

          { errorMessage && (
            <Alert severity="error" sx={ { mb: 2 } }>
              { errorMessage }
            </Alert>
          ) }

          <Box
            component="form"
            onSubmit={ handleSubmit }
            sx={ { display: 'flex', flexDirection: 'column', gap: 2.5 } }
          >
            <TextField
              label="아이디"
              value={ username }
              onChange={ handleUsernameChange }
              fullWidth
              autoComplete="username"
              error={ checkResult ? !checkResult.isAvailable : false }
              helperText={ checkResult?.message ?? '영문 소문자·숫자·_ 조합 4~20자' }
              slotProps={ {
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={ handleCheckUsername }
                        disabled={ !username.trim() || isChecking }
                        sx={ { flexShrink: 0, whiteSpace: 'nowrap' } }
                      >
                        { isChecking ? '확인 중' : '중복확인' }
                      </Button>
                    </InputAdornment>
                  ),
                },
              } }
            />

            <TextField
              label="닉네임 (선택)"
              value={ nickname }
              onChange={ (event) => setNickname(event.target.value) }
              fullWidth
              helperText="비워두면 아이디가 닉네임으로 사용돼요."
            />

            <Box sx={ { display: 'flex', flexDirection: 'column', gap: 1.5 } }>
              <TextField
                label="비밀번호"
                type="password"
                value={ password }
                onChange={ (event) => setPassword(event.target.value) }
                fullWidth
                autoComplete="new-password"
              />

              <PasswordRuleList password={ password } />
            </Box>

            <Button type="submit" variant="contained" size="large" disabled={ isSubmitDisabled }>
              { isSubmitting ? '가입 중...' : '가입하기' }
            </Button>
          </Box>

          <Box sx={ { mt: 3, textAlign: 'center' } }>
            <Button
              component={ RouterLink }
              to="/login"
              color="inherit"
              startIcon={ <ArrowBackRoundedIcon /> }
              sx={ { color: 'text.secondary' } }
            >
              로그인으로 돌아가기
            </Button>
          </Box>
        </Paper>
      </Box>
    </PageShell>
  );
}

export default SignupPage;
