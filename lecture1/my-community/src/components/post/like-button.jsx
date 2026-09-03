import Button from '@mui/material/Button';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';

/**
 * LikeButton 컴포넌트
 * 좋아요 상태를 토글하는 버튼. 이미 누른 상태면 다시 눌러 취소한다.
 *
 * Props:
 * @param {number} likeCount - 현재 좋아요 수 [Required]
 * @param {boolean} isLiked - 내가 좋아요를 눌렀는지 여부 [Required]
 * @param {function} onToggle - 버튼 클릭 시 실행할 함수 [Required]
 * @param {boolean} isDisabled - 버튼 비활성화 여부 [Optional, 기본값: false]
 *
 * Example usage:
 * <LikeButton likeCount={ 3 } isLiked={ false } onToggle={ handleToggleLike } />
 */
function LikeButton({ likeCount, isLiked, onToggle, isDisabled = false }) {
  return (
    <Button
      onClick={ onToggle }
      disabled={ isDisabled }
      startIcon={ isLiked ? <FavoriteRoundedIcon /> : <FavoriteBorderRoundedIcon /> }
      sx={ {
        px: { xs: 2, md: 3 },
        fontWeight: 700,
        color: isLiked ? 'secondary.dark' : 'text.secondary',
        bgcolor: isLiked ? 'rgba(242, 109, 168, 0.12)' : 'transparent',
        border: '1px solid',
        borderColor: isLiked ? 'rgba(242, 109, 168, 0.4)' : 'divider',
        '&:hover': {
          bgcolor: isLiked ? 'rgba(242, 109, 168, 0.2)' : 'rgba(28, 24, 48, 0.04)',
        },
      } }
    >
      좋아요 { likeCount }
    </Button>
  );
}

export default LikeButton;
