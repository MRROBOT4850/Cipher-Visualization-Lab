import React, { useState } from 'react';
import { Box, Tabs, Tab, Typography, Container, Paper } from '@mui/material';

import CaesarCipher from './components/CaesarCipher';
import VigenereCipher from './components/VigenereCipher';
import AESCipher from './components/AESCipher';
import RSACipher from './components/RSACipher';
import Footer from './components/Footer';
function TabPanel(props) {
  const { children, value, index } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`cipher-tabpanel-${index}`}
      aria-labelledby={`cipher-tab-${index}`}
      style={{ marginTop: 24 }}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState(0);

  const handleChange = (e, newVal) => {
    setTab(newVal);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: 6,
        px: 2,
        background: `linear-gradient(to bottom right, #e0c3fc, #8ec5fc)`,
        color: '#2e003e',
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={5}
          sx={{
            backgroundColor: '#f3e8ff',
            color: '#2e003e',
            p: { xs: 3, md: 5 },
            borderRadius: 3,
            boxShadow: '0 8px 24px rgba(46, 0, 62, 0.2)',
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: '#5e239d',
              textShadow: '0 0 4px rgba(94, 35, 157, 0.2)',
            }}
          >
            🔐 Encryption & Decryption Visualization Lab
          </Typography>

          <Tabs
            value={tab}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="Cipher Tabs"
            textColor="secondary"
            indicatorColor="secondary"
            sx={{
              borderBottom: 1,
              borderColor: '#ccc',
              mb: 2,
              '& .MuiTab-root': {
                color: '#5e239d',
                fontWeight: 'bold',
              },
              '& .Mui-selected': {
                color: '#2e003e',
              },
            }}
          >
            <Tab label="Caesar Cipher" />
            <Tab label="Vigenère Cipher" />
            <Tab label="AES Cipher" />
            <Tab label="RSA Cipher" />
          </Tabs>

          <TabPanel value={tab} index={0}>
            <CaesarCipher />
          </TabPanel>
          <TabPanel value={tab} index={1}>
            <VigenereCipher />
          </TabPanel>
          <TabPanel value={tab} index={2}>
            <AESCipher />
          </TabPanel>
          <TabPanel value={tab} index={3}>
            <RSACipher />
          </TabPanel>
        </Paper>
        <Footer/>
      </Container>
    </Box>
  );
}
