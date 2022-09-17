import { Button, VechaiProvider } from '@vechaiui/react';
import { colors, ColorScheme, extendTheme } from '@vechaiui/theme';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';

const dark: ColorScheme = {
  id: 'dark',
  type: 'dark',
  colors: {
    bg: { base: colors.coolGray['900'], fill: colors.coolGray['900'] },
    text: { foreground: colors.coolGray['100'], muted: colors.coolGray['300'] },
    primary: colors.cyan,
    neutral: colors.coolGray,
  },
};

const theme = extendTheme({ cursor: 'pointer', colorSchemes: { dark } });

const Hello = () => {
  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <a
          href="https://electron-react-boilerplate.js.org/"
          target="_blank"
          rel="noreferrer"
        >
          <Button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            Read our docs
          </Button>
        </a>
        <a
          href="https://github.com/sponsors/electron-react-boilerplate"
          target="_blank"
          rel="noreferrer"
        >
          <Button type="button">
            <span role="img" aria-label="folded hands">
              🙏
            </span>
            Donate
          </Button>
        </a>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <VechaiProvider theme={theme} colorScheme="dark">
      <Router>
        <Routes>
          <Route path="/" element={<Hello />} />
        </Routes>
      </Router>
    </VechaiProvider>
  );
}
