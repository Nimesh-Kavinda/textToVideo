import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/context/ThemeContext';
import HomePage from '@/pages/HomePage';
import TextToVideoConverter from '@/pages/TextToVideoConverter';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/converter" element={<TextToVideoConverter />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
