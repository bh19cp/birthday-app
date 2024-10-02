import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import BirthdaysListPage from './BirthdaysListPage';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <Router>
      <Routes>
        <Route path="/" element={<BirthdaysListPage />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
};

export default App;
