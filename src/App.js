import React from 'react';
import { ThemeProvider } from 'styled-components';
import Canvas from './components/Canvas/Canvas';

const theme = {
  colors: {
    background: '#ffffff',
    primary: '#000000',
  }
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Canvas />
    </ThemeProvider>
  );
}

export default App;