import React, { useState } from 'react';
import {
  TextField,
  Typography,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Snackbar,
  IconButton,
  Paper,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';
import CryptoJS from 'crypto-js';

const description = `
AES (Advanced Encryption Standard) is a symmetric encryption algorithm widely used for secure data encryption.
It uses the same key for both encryption and decryption.
In this demo, you can encrypt plaintext or decrypt ciphertext using a password/key.
`;

export default function AESCipher() {
  const [text, setText] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState('encrypt');
  const [output, setOutput] = useState('');
  const [snackOpen, setSnackOpen] = useState(false);

  const handleProcess = () => {
    if (!text || !password) return setOutput('');
    try {
      if (mode === 'encrypt') {
        const encrypted = CryptoJS.AES.encrypt(text, password).toString();
        setOutput(encrypted);
      } else {
        const decrypted = CryptoJS.AES.decrypt(text, password).toString(CryptoJS.enc.Utf8);
        setOutput(decrypted || 'Invalid key or ciphertext');
      }
    } catch {
      setOutput('Error during processing');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setSnackOpen(true);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 4,
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'flex-start',
      }}
    >
      <Box sx={{ flex: 1, minWidth: { xs: '100%', md: 320 } }}>
        <Typography variant="h5" gutterBottom>
          AES Encryption
        </Typography>

        <TextField
          label={mode === 'encrypt' ? 'Plaintext' : 'Ciphertext'}
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
          multiline
          minRows={3}
          margin="normal"
        />

        <TextField
          label="Password / Key"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
        />

        <RadioGroup row value={mode} onChange={(e) => setMode(e.target.value)}>
          <FormControlLabel value="encrypt" control={<Radio />} label="Encrypt" />
          <FormControlLabel value="decrypt" control={<Radio />} label="Decrypt" />
        </RadioGroup>

        <Button variant="contained" onClick={handleProcess} sx={{ mt: 2 }}>
          Process
        </Button>

        {output && (
          <Box sx={{ mt: 2, p: 2, backgroundColor: '#f0f0f0', borderRadius: 1 }}>
            <Typography variant="subtitle1">Output:</Typography>
            <Typography sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>{output}</Typography>
            <Button
              startIcon={<ContentCopyIcon />}
              onClick={handleCopy}
              sx={{ mt: 1 }}
            >
              Copy
            </Button>
          </Box>
        )}
      </Box>

      <Paper
        elevation={3}
        sx={{
          flexBasis: { xs: '100%', md: 300 },
          maxWidth: { xs: '100%', md: 300 },
          p: 2,
          backgroundColor: '#e8f0fe',
          borderRadius: 2,
          whiteSpace: 'pre-wrap',
          lineHeight: 1.5,
        }}
      >
        <Typography variant="h6" gutterBottom>
          About AES
        </Typography>
        <Typography variant="body2">{description}</Typography>
      </Paper>

      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
        onClose={() => setSnackOpen(false)}
        message="Copied to clipboard"
        action={
          <IconButton size="small" onClick={() => setSnackOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
}
