import Box from '@mui/material/Box';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';

import { getPasswordRules } from '../../utils/validate';

/**
 * PasswordRuleList 컴포넌트
 * 비밀번호 규칙 4가지를 체크리스트로 보여준다.
 * 아직 입력 전이면 전체를 비활성(흐린) 상태로 표시한다.
 *
 * Props:
 * @param {string} password - 현재 입력된 비밀번호 [Required]
 *
 * Example usage:
 * <PasswordRuleList password={ password } />
 */
function PasswordRuleList({ password }) {
  const rules = getPasswordRules(password);
  const isInactive = !password;

  /** 입력 전에는 회색, 입력 후에는 통과 여부에 따라 색을 정한다. */
  const getRuleColor = (isPassed) => {
    if (isInactive || !isPassed) return 'text.secondary';

    return 'primary.main';
  };

  return (
    <Box
      sx={ {
        display: 'flex',
        flexWrap: 'wrap',
        gap: { xs: 1, md: 1.5 },
        p: { xs: 1.5, md: 2 },
        borderRadius: 2,
        bgcolor: isInactive ? 'rgba(28, 24, 48, 0.03)' : 'rgba(91, 75, 232, 0.05)',
        border: '1px solid',
        borderColor: isInactive ? 'divider' : 'rgba(91, 75, 232, 0.16)',
        opacity: isInactive ? 0.55 : 1,
        transition: 'opacity 0.2s ease, background-color 0.2s ease',
      } }
    >
      { rules.map((rule) => (
        <Box
          key={ rule.key }
          sx={ {
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: getRuleColor(rule.isPassed),
          } }
        >
          { !isInactive && rule.isPassed ? (
            <CheckCircleRoundedIcon sx={ { fontSize: 16 } } />
          ) : (
            <RadioButtonUncheckedRoundedIcon sx={ { fontSize: 16 } } />
          ) }
          { rule.label }
        </Box>
      )) }
    </Box>
  );
}

export default PasswordRuleList;
