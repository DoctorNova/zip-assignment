import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import { Login } from './login/Login';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css';
import { Theme } from './Theme';

export default function App() {
  return (
    <Theme>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </Theme>
  );
}
