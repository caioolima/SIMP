import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Alertas from './Pages/Alertas';
import Formulario from './Pages/Formulario';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/alertas" element={<Alertas />} />
        <Route path="/relatar" element={<Formulario />} />
      </Routes>
    </Router>
  );
}

export default App;