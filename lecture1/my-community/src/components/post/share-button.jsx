import { useState } from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import ShareRoundedIcon from '@mui/icons-material/ShareRounded';

/**
 * ShareButton 컴포넌트
 * 게시물 주소를 공유한다. 공유 기능을 지원하는 기기에서는 공유 시트를 열고,
 * 지원하지 않으면 주소를 클립보드에 복사한다.
 *
 * Props:
 * @param {string} title - 공유 시 함께 전달할 게시물 제목 [Required]
 * @param {string} shareUrl - 공유할 주소 [Optional, 기본값: 현재 페이지 주소]
 *
 * Example usage:
 * <ShareButton title={ post.title } />
 */
function ShareButton({ title, shareUrl = '' }) {
  const [message, setMessage] = useState('');

  /** 공유 시트를 열고, 지원하지 않는 환경에서는 주소를 복사한다. */
  const handleShare = async () => {
    const targetUrl = shareUrl || window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, url: targetUrl });

        return;
      } catch (error) {
        /** 사용자가 공유를 취소한 경우에는 아무것도 알리지 않는다. */
        if (error.name === 'AbortError') return;
      }
    }

    try {
      await navigator.clipboard.writeText(targetUrl);
      setMessage('게시물 링크를 복사했어요!');
    } catch {
      setMessage('링크 복사에 실패했어요. 주소창의 주소를 복사해주세요.');
    }
  };

  return (
    <>
      <Button
        onClick={ handleShare }
        startIcon={ <ShareRoundedIcon /> }
        sx={ {
          px: { xs: 2, md: 3 },
          fontWeight: 700,
          color: 'text.secondary',
          bgcolor: 'transparent',
          border: '1px solid',
          borderColor: 'divider',
          '&:hover': { bgcolor: 'rgba(28, 24, 48, 0.04)' },
        } }
      >
        공유하기
      </Button>

      <Snackbar
        open={ Boolean(message) }
        autoHideDuration={ 2500 }
        onClose={ () => setMessage('') }
        message={ message }
        anchorOrigin={ { vertical: 'bottom', horizontal: 'center' } }
      />
    </>
  );
}

export default ShareButton;
