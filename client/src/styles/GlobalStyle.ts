import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  :root {
    color-scheme: dark;
    --bg: #0c0c10;
    --surface: #17171f;
    --surface-raised: #22222c;
    --border: #2c2c38;
    --text: #f4f4f6;
    --text-muted: #a3a3b2;
    --accent: #e50914;
    --accent-hover: #ff1f2c;
    --imdb: #e5b91f;
    --radius: 10px;
    --header-height: 68px;
    --gutter: clamp(16px, 4vw, 56px);
    /* Space taken by sticky bars, so scrolled-to sections are not hidden behind them */
    --sticky-offset: calc(var(--header-height) + 16px);
  }

  @media (max-width: 899px) {
    :root {
      --header-height: 60px;
      --sticky-offset: calc(var(--header-height) + 64px);
    }
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100vh;
    background: var(--bg);
    color: var(--text);
    font-family: 'Poppins', system-ui, sans-serif;
    font-size: 16px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, p {
    margin: 0;
  }

  a {
    color: inherit;
  }

  button, input {
    font: inherit;
    color: inherit;
  }

  img {
    display: block;
    max-width: 100%;
  }

  :focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 3px;
  }

  ::selection {
    background: var(--accent);
    color: #fff;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;
