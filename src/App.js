// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GlobalStyle from './styles/GlobalStyles.js';
import Dashboard from './pages/Dashboard';
import Youths from './pages/Youths';
import Events from './pages/Events';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/youths" element={<Youths />} />
        <Route path="/events" element={<Events />} />
        {/* Add more routes here */}
      </Routes>
    </Router>
  );
}

export default App;
