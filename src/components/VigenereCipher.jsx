import React, { useState, useEffect } from 'react';
import {
  TextField,
  Typography,
  Box,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Tooltip,
  Paper,
  Snackbar,
  IconButton
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';

function shiftChar(char, shift) {
  const code = char.charCodeAt(0);
  if (code >= 65 && code <= 90) {
    return String.fromCharCode(((code - 65 + shift + 26) % 26) + 65);
  } else if (code >= 97 && code <= 122) {
    return String.fromCharCode(((code - 97 + shift + 26) % 26) + 97);
  }
  return char;
}

const explanation = `
The Vigenère cipher uses a keyword to shift each letter by a varying amount.
Each letter of the key defines how much to shift the corresponding letter in the plaintext.
It's a polyalphabetic cipher, more secure than Caesar.
`;

export default function VigenereCipher() {
  const [text, setText] = useState('');
  const [key, setKey] = useState('key');
  const [mode, setMode] = useState('encrypt');
  const [output, setOutput] = useState('');
  const [currentStep, setCurrentStep] = useState(-1);
  const [snackOpen, setSnackOpen] = useState(false);

  useEffect(() => {
    setCurrentStep(-1);
    if (!text || !key) {
      setOutput('');
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      if (i > text.length) {
        clearInterval(interval);
        setCurrentStep(-1);
        return;
      }
      setCurrentStep(i);

      let res = '';
      let keyIndex = 0;
      for (let j = 0; j < i; j++) {
        const c = text[j];
        if (/[a-zA-Z]/.test(c)) {
          const shiftVal =
            mode === 'encrypt'
              ? key.charCodeAt(keyIndex % key.length) - 97
              : -(key.charCodeAt(keyIndex % key.length) - 97);
          res += shiftChar(c, shiftVal);
          keyIndex++;
        } else {
          res += c;
        }
      }
      setOutput(res);
      i++;
    }, 350);

    return () => clearInterval(interval);
  }, [text, key, mode]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setSnackOpen(true);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        gap: { xs: 2, md: 4 },
        px: { xs: 1, sm: 2 },
        py: 2,
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <Box
        sx={{
          flex: 1,
          width: '100%',
          maxWidth: '100%',
          minWidth: 0,
        }}
      >
        <Typography variant="h5" gutterBottom>
          Vigenère Cipher
        </Typography>

        <TextField
          label="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Key (letters only)"
          value={key}
          onChange={(e) => setKey(e.target.value.replace(/[^a-zA-Z]/g, ''))}
          fullWidth
          margin="normal"
          helperText="Key must be letters only"
        />

        <RadioGroup
          row
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          sx={{ flexWrap: 'wrap' }}
        >
          <FormControlLabel value="encrypt" control={<Radio />} label="Encrypt" />
          <FormControlLabel value="decrypt" control={<Radio />} label="Decrypt" />
        </RadioGroup>

        <Box
          sx={{
            mt: 2,
            p: 2,
            backgroundColor: '#f0f0f0',
            borderRadius: 1,
            minHeight: 80,
            fontFamily: 'monospace',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
          }}
        >
          <Typography variant="subtitle1">Output:</Typography>
          <Typography
            variant="body1"
            sx={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
            }}
          >
            {output.split('').map((c, i) => {
              const isCurrent = i === currentStep - 1;
              let shiftVal = 0;
              if (/[a-zA-Z]/.test(text[i])) {
                const keyIndex = output.slice(0, i).replace(/[^a-zA-Z]/g, '').length;
                shiftVal =
                  mode === 'encrypt'
                    ? key.charCodeAt(keyIndex % key.length) - 97
                    : -(key.charCodeAt(keyIndex % key.length) - 97);
              }
              return (
                <Tooltip key={i} title={isCurrent ? `Shifted '${text[i]}' by ${shiftVal}` : ''}>
                  <span
                    style={{
                      color: isCurrent ? '#d32f2f' : 'inherit',
                      transition: 'color 0.3s',
                    }}
                  >
                    {c}
                  </span>
                </Tooltip>
              );
            })}
          </Typography>
          {output && (
            <Button
              startIcon={<ContentCopyIcon />}
              onClick={handleCopy}
              sx={{
                mt: 1,
                fontSize: '0.8rem',
                padding: '4px 8px',
                minWidth: 0,
              }}
              size="small"
              variant="outlined"
            >
              Copy
            </Button>
          )}
        </Box>
      </Box>

      <Paper
        elevation={3}
        sx={{
          flexBasis: { xs: '100%', md: 300 },
          p: 2,
          backgroundColor: '#e3f2fd',
          borderRadius: 2,
          mt: { xs: 2, md: 0 },
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Typography variant="h6" gutterBottom>
          How Vigenère Cipher Works
        </Typography>
        <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
          {explanation}
        </Typography>
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
