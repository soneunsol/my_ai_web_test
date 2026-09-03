import { useRef, useState } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';

import HashtagList from '../ui/hashtag-list';
import { parseHashtags } from '../../utils/parse-hashtags';
import { uploadPostImage } from '../../lib/community-api';

/** 업로드 허용 최대 이미지 용량 (5MB) */
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

/**
 * PostFormDialog 컴포넌트
 * 제목·내용·이미지·해시태그를 입력해 게시물을 등록하는 다이얼로그.
 *
 * Props:
 * @param {boolean} isOpen - 다이얼로그 열림 여부 [Required]
 * @param {function} onClose - 닫기 요청 시 실행할 함수 [Required]
 * @param {function} onSubmit - 등록 확정 시 실행할 함수(payload 전달) [Required]
 *
 * Example usage:
 * <PostFormDialog isOpen={ isOpen } onClose={ handleClose } onSubmit={ handleCreatePost } />
 */
function PostFormDialog({ isOpen, onClose, onSubmit }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagText, setTagText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  const tags = parseHashtags(tagText);
  const isSubmitDisabled = !title.trim() || !content.trim() || isSubmitting || isUploading;

  /** 입력값을 초기화하고 다이얼로그를 닫는다. */
  const handleClose = () => {
    if (isSubmitting || isUploading) return;

    setTitle('');
    setContent('');
    setTagText('');
    setImageUrl('');
    setErrorMessage('');
    onClose();
  };

  const handleSelectImage = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.size > MAX_IMAGE_SIZE) {
      setErrorMessage('이미지는 5MB 이하만 업로드할 수 있어요.');
      event.target.value = '';

      return;
    }

    setIsUploading(true);
    setErrorMessage('');

    try {
      setImageUrl(await uploadPostImage(file));
    } catch (error) {
      setErrorMessage(`이미지 업로드에 실패했어요. (${ error.message })`);
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await onSubmit({
        title: title.trim(),
        content: content.trim(),
        imageUrl: imageUrl || null,
        tags,
      });
      setTitle('');
      setContent('');
      setTagText('');
      setImageUrl('');
      onClose();
    } catch (error) {
      setErrorMessage(`게시물 등록에 실패했어요. (${ error.message })`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={ isOpen } onClose={ handleClose } fullWidth maxWidth="sm">
      <DialogTitle sx={ { display: 'flex', alignItems: 'center', fontWeight: 700, pr: 1 } }>
        새 게시물 작성
        <Box sx={ { flexGrow: 1 } } />
        <IconButton onClick={ handleClose } size="small" aria-label="닫기">
          <CloseRoundedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={ { display: 'flex', flexDirection: 'column', gap: 2 } }>
        { errorMessage && <Alert severity="error">{ errorMessage }</Alert> }

        <TextField
          label="제목"
          value={ title }
          onChange={ (event) => setTitle(event.target.value) }
          fullWidth
          autoFocus
          slotProps={ { htmlInput: { maxLength: 100 } } }
        />

        <TextField
          label="내용"
          value={ content }
          onChange={ (event) => setContent(event.target.value) }
          fullWidth
          multiline
          minRows={ 6 }
        />

        <TextField
          label="해시태그"
          placeholder="#react #디자인시스템 (최대 5개)"
          value={ tagText }
          onChange={ (event) => setTagText(event.target.value) }
          fullWidth
          helperText="공백 또는 쉼표로 구분해 입력해 주세요."
        />

        { tags.length > 0 && <HashtagList tags={ tags } /> }

        <Box sx={ { display: 'flex', alignItems: 'center', gap: 1.5, flexWrap: 'wrap' } }>
          <Button
            variant="outlined"
            startIcon={ <ImageOutlinedIcon /> }
            onClick={ () => fileInputRef.current?.click() }
            disabled={ isUploading }
          >
            { isUploading ? '업로드 중...' : '이미지 첨부' }
          </Button>

          { imageUrl && (
            <Button size="small" color="inherit" onClick={ () => setImageUrl('') }>
              이미지 제거
            </Button>
          ) }

          <Box
            component="input"
            ref={ fileInputRef }
            type="file"
            accept="image/*"
            onChange={ handleSelectImage }
            sx={ { display: 'none' } }
          />
        </Box>

        { imageUrl && (
          <Box
            component="img"
            src={ imageUrl }
            alt="첨부한 이미지 미리보기"
            sx={ {
              width: '100%',
              maxHeight: 260,
              objectFit: 'cover',
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
            } }
          />
        ) }

        <Typography component="p" sx={ { fontSize: '0.75rem', color: 'text.secondary' } }>
          개발·디자인 정보를 나누는 공간이에요. 서로를 존중하는 글을 남겨주세요.
        </Typography>
      </DialogContent>

      <DialogActions sx={ { px: 3, py: 2 } }>
        <Button onClick={ handleClose } color="inherit" disabled={ isSubmitting || isUploading }>
          취소
        </Button>
        <Button onClick={ handleSubmit } variant="contained" disabled={ isSubmitDisabled }>
          { isSubmitting ? '등록 중...' : '등록하기' }
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PostFormDialog;
