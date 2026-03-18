import React, { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const SNS_LINKS = [
  { icon: <GitHubIcon />, label: 'GitHub', value: 'github.com/your-username' },
  { icon: <LinkedInIcon color="info" />, label: 'LinkedIn', value: 'linkedin.com/in/your-profile' },
  { icon: <EmailIcon color="error" />, label: 'Email', value: 'your-email@example.com' },
];

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = ({ target: { name, value } }) =>
    setForm((prev) => ({ ...prev, [name]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100vh - 64px)',
        bgcolor: 'background.default',
        display: 'flex',
        justifyContent: 'center',
        px: 2,
        py: 6,
      }}
    >
      <Box sx={{ maxWidth: 720, width: '100%' }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography variant="h1" sx={{ color: 'primary.main', mb: 1 }}>
            Contact
          </Typography>
          <Divider sx={{ borderColor: 'primary.light', borderWidth: 2, width: 60, mx: 'auto', mb: 2 }} />
          <Typography variant="body1" sx={{ color: 'text.secondary' }}>
            Contact 페이지입니다. SNS 링크와 간단한 메시지 폼이 들어갈 예정입니다.
          </Typography>
        </Box>

        {/* SNS Links */}
        <Card elevation={2} sx={{ mb: 4 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              SNS / 연락처
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {SNS_LINKS.map(({ icon, label, value }) => (
                <Box key={label} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  {icon}
                  <Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1 }}>
                      {label}
                    </Typography>
                    <Typography variant="body1" sx={{ color: 'text.primary' }}>
                      {value}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Message Form */}
        <Card elevation={2}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h3" sx={{ mb: 2 }}>
              메시지 보내기
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {submitted && (
              <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSubmitted(false)}>
                메시지가 전송되었습니다. 감사합니다!
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="이름"
                name="name"
                value={form.name}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
              />
              <TextField
                label="이메일"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
              />
              <TextField
                label="메시지"
                name="message"
                value={form.message}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
                multiline
                rows={4}
              />
              <Button type="submit" variant="contained" size="large" sx={{ alignSelf: 'flex-end', px: 4 }}>
                전송
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Contact;
