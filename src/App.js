// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyles.js';
import Dashboard from './pages/Dashboard';
import Youths from './pages/Youths';
import Events from './pages/Events';
import Announcements from './pages/Announcements';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/youths" element={<Youths />} />
        <Route path="/events" element={<Events />} />
        <Route path="/announcements" element={<Announcements />} />
        {/* Add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;
