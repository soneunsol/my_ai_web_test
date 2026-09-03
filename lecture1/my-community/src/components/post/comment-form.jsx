import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

/**
 * CommentForm 컴포넌트
 * 댓글 내용을 입력하고 등록하는 폼.
 *
 * Props:
 * @param {function} onSubmit - 댓글 등록 시 실행할 함수(content 전달) [Required]
 *
 * Example usage:
 * <CommentForm onSubmit={ handleCreateComment } />
 */
function CommentForm({ onSubmit }) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmed = content.trim();

    if (!trimmed || isSubmitting) return;

    setIsSubmitting(true);

    try {
      await onSubmit(trimmed);
      setContent('');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={ handleSubmit }
      sx={ { display: 'flex', alignItems: 'flex-start', gap: { xs: 1, md: 1.5 } } }
    >
      <TextField
        value={ content }
        onChange={ (event) => setContent(event.target.value) }
        placeholder="따뜻한 댓글을 남겨주세요."
        fullWidth
        multiline
        maxRows={ 4 }
        size="small"
      />

      <Button
        type="submit"
        variant="contained"
        disabled={ !content.trim() || isSubmitting }
        startIcon={ <SendRoundedIcon /> }
        sx={ { flexShrink: 0, whiteSpace: 'nowrap', py: 1.25 } }
      >
        등록
      </Button>
    </Box>
  );
}

export default CommentForm;
