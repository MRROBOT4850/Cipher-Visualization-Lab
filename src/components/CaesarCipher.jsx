import React, { useState, useEffect } from 'react';
import {
  TextField,
  Typography,
  Box,
  Slider,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Tooltip,
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

export default function CaesarCipher() {
  const [text, setText] = useState('');
  const [shift, setShift] = useState(3);
  const [mode, setMode] = useState('encrypt');
  const [output, setOutput] = useState('');
  const [currentStep, setCurrentStep] = useState(-1);
  const [snackOpen, setSnackOpen] = useState(false);

  useEffect(() => {
    setCurrentStep(-1);
    if (!text) {
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
      for (let j = 0; j < i; j++) {
        const c = text[j];
        const s = mode === 'encrypt' ? shift : -shift;
        res += shiftChar(c, s);
      }
      setOutput(res);
      i++;
    }, 350);
    return () => clearInterval(interval);
  }, [text, shift, mode]);

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
          Caesar Cipher
        </Typography>

        <TextField
          label="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
          margin="normal"
        />

        <Box sx={{ mt: 2 }}>
          <Typography gutterBottom>Shift: {shift}</Typography>
          <Slider
            value={shift}
            onChange={(e, val) => setShift(val)}
            min={1}
            max={25}
            step={1}
            valueLabelDisplay="auto"
          />
        </Box>

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
              return (
                <Tooltip
                  key={i}
                  title={isCurrent ? `Shifted '${text[i]}' by ${mode === 'encrypt' ? shift : -shift}` : ''}
                >
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
    </Box>
  );
}
