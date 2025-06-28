// import React, { useState } from 'react';
// import forge from 'node-forge';
// import {
//   TextField, Typography, Box, Button, Tooltip, Paper, Snackbar, IconButton
// } from '@mui/material';
// import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import CloseIcon from '@mui/icons-material/Close';

// const explanation = `
// RSA is an asymmetric encryption algorithm using a public/private key pair.
// It is widely used for secure key exchange and digital signatures.
// This demo generates keys, then encrypts/decrypts small messages.
// `;

// export default function RSACipher() {
//   const [publicKey, setPublicKey] = useState(null);
//   const [privateKey, setPrivateKey] = useState(null);
//   const [publicPem, setPublicPem] = useState('');
//   const [privatePem, setPrivatePem] = useState('');
//   const [text, setText] = useState('');
//   const [output, setOutput] = useState('');
//   const [mode, setMode] = useState('encrypt');
//   const [snackOpen, setSnackOpen] = useState(false);
//   const [snackMsg, setSnackMsg] = useState('');

//   const generateKeys = () => {
//     const keypair = forge.pki.rsa.generateKeyPair({ bits: 512, e: 0x10001 });
//     setPublicKey(keypair.publicKey);
//     setPrivateKey(keypair.privateKey);
//     setPublicPem(forge.pki.publicKeyToPem(keypair.publicKey));
//     setPrivatePem(forge.pki.privateKeyToPem(keypair.privateKey));
//     setText('');
//     setOutput('');
//   };

//   const encryptText = (txt) => {
//     if (!publicKey) return '';
//     try {
//       const encryptedBytes = publicKey.encrypt(txt, 'RSAES-PKCS1-V1_5');
//       return forge.util.encode64(encryptedBytes);
//     } catch (e) {
//       return `Encryption error: ${e.message}`;
//     }
//   };

//   const decryptText = (txt) => {
//     if (!privateKey) return '';
//     try {
//       const bytes = forge.util.decode64(txt);
//       return privateKey.decrypt(bytes, 'RSAES-PKCS1-V1_5');
//     } catch (e) {
//       return `Decryption error: ${e.message}`;
//     }
//   };

//   const handleRun = () => {
//     if (!publicKey || !privateKey) {
//       setSnackMsg('Generate keys first');
//       setSnackOpen(true);
//       return;
//     }
//     if (!text) {
//       setSnackMsg('Input text cannot be empty');
//       setSnackOpen(true);
//       return;
//     }

//     if (mode === 'encrypt') {
//       const encryptedResult = encryptText(text);
//       setOutput(encryptedResult);
//     } else {
//       // For decryption, text input should be the encrypted base64 string
//       const decryptedResult = decryptText(text);
//       setOutput(decryptedResult);
//     }
//   };

//   const handleCopy = (value, label) => {
//     navigator.clipboard.writeText(value);
//     setSnackMsg(`${label} copied`);
//     setSnackOpen(true);
//   };

//   return (
//     <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
//       <Box sx={{ flex: 1, minWidth: 320 }}>
//         <Typography variant="h5" gutterBottom>RSA Cipher Demo</Typography>

//         <Button variant="contained" onClick={generateKeys} sx={{ mb: 2 }}>
//           Generate RSA Keys
//         </Button>

//         {/* Display Public Key PEM */}
//         {publicPem && (
//           <Box sx={{ mb: 2 }}>
//             <Typography variant="subtitle2">Public Key (PEM):</Typography>
//             <Paper
//               variant="outlined"
//               sx={{
//                 p: 1,
//                 fontFamily: 'monospace',
//                 maxHeight: 150,
//                 overflowY: 'auto',
//                 whiteSpace: 'pre-wrap',
//                 backgroundColor: '#f9f9f9',
//               }}
//             >
//               {publicPem}
//             </Paper>
//             <Button
//               size="small"
//               startIcon={<ContentCopyIcon />}
//               onClick={() => handleCopy(publicPem, 'Public key')}
//               sx={{ mt: 0.5 }}
//             >
//               Copy Public Key
//             </Button>
//           </Box>
//         )}

//         {/* Display Private Key PEM */}
//         {privatePem && (
//           <Box sx={{ mb: 2 }}>
//             <Typography variant="subtitle2">Private Key (PEM):</Typography>
//             <Paper
//               variant="outlined"
//               sx={{
//                 p: 1,
//                 fontFamily: 'monospace',
//                 maxHeight: 150,
//                 overflowY: 'auto',
//                 whiteSpace: 'pre-wrap',
//                 backgroundColor: '#f9f9f9',
//               }}
//             >
//               {privatePem}
//             </Paper>
//             <Button
//               size="small"
//               startIcon={<ContentCopyIcon />}
//               onClick={() => handleCopy(privatePem, 'Private key')}
//               sx={{ mt: 0.5 }}
//             >
//               Copy Private Key
//             </Button>
//           </Box>
//         )}

//         {/* Input box */}
//         <TextField
//           label={mode === 'encrypt' ? 'Plain Text' : 'Encrypted Base64 Text'}
//           value={text}
//           onChange={e => setText(e.target.value)}
//           fullWidth
//           margin="normal"
//           multiline
//           minRows={3}
//           placeholder={mode === 'encrypt' ? 'Type text to encrypt...' : 'Paste encrypted base64 text here...'}
//           disabled={!publicKey || !privateKey}
//         />

//         <Box sx={{ mt: 1, mb: 1 }}>
//           <Button
//             variant={mode === 'encrypt' ? 'contained' : 'outlined'}
//             onClick={() => setMode('encrypt')}
//             sx={{ mr: 1 }}
//             disabled={!publicKey}
//           >
//             Encrypt
//           </Button>
//           <Button
//             variant={mode === 'decrypt' ? 'contained' : 'outlined'}
//             onClick={() => setMode('decrypt')}
//             disabled={!privateKey}
//           >
//             Decrypt
//           </Button>
//           <Button
//             onClick={handleRun}
//             variant="outlined"
//             sx={{ ml: 2 }}
//             disabled={!text}
//           >
//             Run
//           </Button>
//         </Box>

//         <Box
//           sx={{
//             mt: 2,
//             p: 2,
//             backgroundColor: '#f0f0f0',
//             borderRadius: 1,
//             fontFamily: 'monospace',
//             minHeight: 100,
//             whiteSpace: 'pre-wrap',
//             wordBreak: 'break-word',
//           }}
//         >
//           <Typography variant="subtitle1">
//             {mode === 'encrypt' ? 'Encrypted (Base64):' : 'Decrypted Text:'}
//           </Typography>
//           <Typography variant="body1">{output}</Typography>

//           {output && (
//             <Button
//               size="small"
//               startIcon={<ContentCopyIcon />}
//               onClick={() => handleCopy(output, 'Output')}
//               sx={{ mt: 1 }}
//             >
//               Copy Output
//             </Button>
//           )}
//         </Box>
//       </Box>

//       <Paper
//         elevation={3}
//         sx={{ flexBasis: 300, p: 2, backgroundColor: '#e3f2fd', borderRadius: 2 }}
//       >
//         <Typography variant="h6" gutterBottom>How RSA Works</Typography>
//         <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
//           {explanation}
//         </Typography>
//         <Button
//           startIcon={<ContentCopyIcon />}
//           onClick={() => handleCopy(explanation, 'Explanation')}
//           sx={{ mt: 1 }}
//         >
//           Copy Explanation
//         </Button>
//       </Paper>

//       <Snackbar
//         open={snackOpen}
//         autoHideDuration={2000}
//         onClose={() => setSnackOpen(false)}
//         message={snackMsg}
//         action={
//           <IconButton size="small" onClick={() => setSnackOpen(false)}>
//             <CloseIcon fontSize="small" />
//           </IconButton>
//         }
//       />
//     </Box>
//   );
// }
import React, { useState } from 'react';
import forge from 'node-forge';
import {
  TextField,
  Typography,
  Box,
  Button,
  Paper,
  Snackbar,
  IconButton,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloseIcon from '@mui/icons-material/Close';

const explanation = `
RSA is an asymmetric encryption algorithm using a public/private key pair.
It is widely used for secure key exchange and digital signatures.
This demo generates keys, then encrypts/decrypts small messages.
`;

export default function RSACipher() {
  const [publicKey, setPublicKey] = useState(null);
  const [privateKey, setPrivateKey] = useState(null);
  const [publicPem, setPublicPem] = useState('');
  const [privatePem, setPrivatePem] = useState('');
  const [text, setText] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encrypt');
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMsg, setSnackMsg] = useState('');

  const generateKeys = () => {
    const keypair = forge.pki.rsa.generateKeyPair({ bits: 512, e: 0x10001 });
    setPublicKey(keypair.publicKey);
    setPrivateKey(keypair.privateKey);
    setPublicPem(forge.pki.publicKeyToPem(keypair.publicKey));
    setPrivatePem(forge.pki.privateKeyToPem(keypair.privateKey));
    setText('');
    setOutput('');
  };

  const encryptText = (txt) => {
    if (!publicKey) return '';
    try {
      const encryptedBytes = publicKey.encrypt(txt, 'RSAES-PKCS1-V1_5');
      return forge.util.encode64(encryptedBytes);
    } catch (e) {
      return `Encryption error: ${e.message}`;
    }
  };

  const decryptText = (txt) => {
    if (!privateKey) return '';
    try {
      const bytes = forge.util.decode64(txt);
      return privateKey.decrypt(bytes, 'RSAES-PKCS1-V1_5');
    } catch (e) {
      return `Decryption error: ${e.message}`;
    }
  };

  const handleRun = () => {
    if (!publicKey || !privateKey) {
      setSnackMsg('Generate keys first');
      setSnackOpen(true);
      return;
    }
    if (!text) {
      setSnackMsg('Input text cannot be empty');
      setSnackOpen(true);
      return;
    }

    if (mode === 'encrypt') {
      const encryptedResult = encryptText(text);
      setOutput(encryptedResult);
    } else {
      // For decryption, text input should be the encrypted base64 string
      const decryptedResult = decryptText(text);
      setOutput(decryptedResult);
    }
  };

  const handleCopy = (value, label) => {
    navigator.clipboard.writeText(value);
    setSnackMsg(`${label} copied`);
    setSnackOpen(true);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 4,
        flexWrap: 'wrap',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: 'flex-start',
      }}
    >
      {/* Left panel: RSA UI */}
      <Box
        sx={{
          flex: 1,
          minWidth: { xs: '100%', md: 320 },
          maxWidth: { xs: '100%', md: 'auto' },
        }}
      >
        <Typography variant="h5" gutterBottom>
          RSA Cipher Demo
        </Typography>

        <Button variant="contained" onClick={generateKeys} sx={{ mb: 2 }}>
          Generate RSA Keys
        </Button>

        {/* Public Key Display */}
        {publicPem && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2">Public Key (PEM):</Typography>
            <Paper
              variant="outlined"
              sx={{
                p: 1,
                fontFamily: 'monospace',
                maxHeight: 150,
                overflowY: 'auto',
                overflowX: 'auto',
                whiteSpace: 'pre',
                backgroundColor: '#f9f9f9',
              }}
            >
              {publicPem}
            </Paper>
            <Button
              size="small"
              startIcon={<ContentCopyIcon />}
              onClick={() => handleCopy(publicPem, 'Public key')}
              sx={{ mt: 0.5 }}
            >
              Copy Public Key
            </Button>
          </Box>
        )}

        {/* Private Key Display */}
        {privatePem && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2">Private Key (PEM):</Typography>
            <Paper
              variant="outlined"
              sx={{
                p: 1,
                fontFamily: 'monospace',
                maxHeight: 150,
                overflowY: 'auto',
                overflowX: 'auto',
                whiteSpace: 'pre',
                backgroundColor: '#f9f9f9',
              }}
            >
              {privatePem}
            </Paper>
            <Button
              size="small"
              startIcon={<ContentCopyIcon />}
              onClick={() => handleCopy(privatePem, 'Private key')}
              sx={{ mt: 0.5 }}
            >
              Copy Private Key
            </Button>
          </Box>
        )}

        {/* Input */}
        <TextField
          label={mode === 'encrypt' ? 'Plain Text' : 'Encrypted Base64 Text'}
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          minRows={3}
          placeholder={
            mode === 'encrypt'
              ? 'Type text to encrypt...'
              : 'Paste encrypted base64 text here...'
          }
          disabled={!publicKey || !privateKey}
        />

        {/* Mode buttons + Run */}
        <Box sx={{ mt: 1, mb: 1 }}>
          <Button
            variant={mode === 'encrypt' ? 'contained' : 'outlined'}
            onClick={() => setMode('encrypt')}
            sx={{ mr: 1 }}
            disabled={!publicKey}
          >
            Encrypt
          </Button>
          <Button
            variant={mode === 'decrypt' ? 'contained' : 'outlined'}
            onClick={() => setMode('decrypt')}
            disabled={!privateKey}
          >
            Decrypt
          </Button>
          <Button
            onClick={handleRun}
            variant="outlined"
            sx={{ ml: 2 }}
            disabled={!text}
          >
            Run
          </Button>
        </Box>

        {/* Output */}
        <Box
          sx={{
            mt: 2,
            p: 2,
            backgroundColor: '#f0f0f0',
            borderRadius: 1,
            fontFamily: 'monospace',
            minHeight: 100,
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          <Typography variant="subtitle1">
            {mode === 'encrypt' ? 'Encrypted (Base64):' : 'Decrypted Text:'}
          </Typography>
          <Typography variant="body1">{output}</Typography>

          {output && (
            <Button
              size="small"
              startIcon={<ContentCopyIcon />}
              onClick={() => handleCopy(output, 'Output')}
              sx={{ mt: 1 }}
            >
              Copy Output
            </Button>
          )}
        </Box>
      </Box>

      {/* Right panel: Explanation */}
      <Paper
        elevation={3}
        sx={{
          flexBasis: { xs: '100%', md: 300 },
          maxWidth: { xs: '100%', md: 300 },
          p: 2,
          backgroundColor: '#e3f2fd',
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          How RSA Works
        </Typography>
        <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
          {explanation}
        </Typography>
        <Button
          startIcon={<ContentCopyIcon />}
          onClick={() => handleCopy(explanation, 'Explanation')}
          sx={{ mt: 1 }}
        >
          Copy Explanation
        </Button>
      </Paper>

      {/* Snackbar */}
      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
        onClose={() => setSnackOpen(false)}
        message={snackMsg}
        action={
          <IconButton size="small" onClick={() => setSnackOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Box>
  );
}

